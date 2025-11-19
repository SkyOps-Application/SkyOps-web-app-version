/**
 * Socket.IO event handlers
 */

import { Server, Socket } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents, parseCommand, parseManualCommand, calculateDistance, calculateBearing, ParsedCommand, AircraftData } from '@atc-radar-sim/shared';
import { ExerciseRunner } from '../simulation/exercise-runner';
import { EXERCISE_1, EXERCISE_2 } from '@atc-radar-sim/shared/src/data/exercises';
import { WAYPOINTS } from '@atc-radar-sim/shared/src/data/waypoints';

/**
 * Helper function to apply a command to an aircraft
 * Returns { handled: boolean, error?: string, distanceResult?: string }
 */
function applyCommandToAircraft(
  parsed: ParsedCommand,
  aircraft: AircraftData | undefined,
  exerciseRunner: ExerciseRunner
): { handled: boolean; error?: string; distanceResult?: string } {
  // Handle DISTANCE command (doesn't need an aircraft)
  if (parsed.type === 'DISTANCE' && typeof parsed.value === 'object' && 'item1' in parsed.value) {
    const { item1, item2 } = parsed.value;
    
    // Get positions for both items
    let pos1, pos2;
    
    // Try to find item1 as aircraft or waypoint
    const aircraft1 = exerciseRunner.getAircraft(item1);
    const waypoint1 = WAYPOINTS.find(wp => wp.id === item1 || wp.name === item1);
    
    if (aircraft1) {
      pos1 = { latitude: aircraft1.position.latitude, longitude: aircraft1.position.longitude };
    } else if (waypoint1) {
      pos1 = { latitude: waypoint1.latitude, longitude: waypoint1.longitude };
    }
    
    // Try to find item2 as aircraft or waypoint
    const aircraft2 = exerciseRunner.getAircraft(item2);
    const waypoint2 = WAYPOINTS.find(wp => wp.id === item2 || wp.name === item2);
    
    if (aircraft2) {
      pos2 = { latitude: aircraft2.position.latitude, longitude: aircraft2.position.longitude };
    } else if (waypoint2) {
      pos2 = { latitude: waypoint2.latitude, longitude: waypoint2.longitude };
    }
    
    if (!pos1 || !pos2) {
      return { handled: false, error: `Could not find ${!pos1 ? item1 : item2}` };
    }
    
    // Calculate distance and heading
    const distance = calculateDistance(pos1, pos2);
    const heading = calculateBearing(pos1, pos2);
    
    return {
      handled: true,
      distanceResult: `Distance from ${item1} to ${item2}: ${distance.toFixed(1)} NM, Heading: ${Math.round(heading).toString().padStart(3, '0')}°`,
    };
  }
  
  // For all other commands, we need an aircraft
  if (!aircraft) {
    return { handled: false, error: `Aircraft ${parsed.callsign} not found` };
  }
  
  // Apply command based on type
  switch (parsed.type) {
    case 'DESCEND':
    case 'CLIMB':
      if (typeof parsed.value === 'number') {
        aircraft.targetFlightLevel = parsed.value;
      }
      break;
    
    case 'TURN_LEFT':
    case 'TURN_RIGHT':
    case 'DIRECT':
      if (typeof parsed.value === 'number') {
        aircraft.assignedHeading = parsed.value;
      }
      break;
    
    case 'DIRECT_WAYPOINT':
      if (typeof parsed.value === 'string') {
        const waypoint = WAYPOINTS.find(wp => wp.id === parsed.value || wp.name === parsed.value);
        if (waypoint) {
          // Calculate heading to waypoint
          const heading = calculateBearing(
            { latitude: aircraft.position.latitude, longitude: aircraft.position.longitude },
            { latitude: waypoint.latitude, longitude: waypoint.longitude }
          );
          aircraft.assignedHeading = Math.round(heading);
        } else {
          return { handled: false, error: `Waypoint ${parsed.value} not found` };
        }
      }
      break;
    
    case 'INCREASE_SPEED':
    case 'REDUCE_SPEED':
      if (typeof parsed.value === 'number') {
        // Validate: Cannot change speed by more than 20 knots
        const currentSpeed = aircraft.speed;
        const speedDiff = Math.abs(parsed.value - currentSpeed);
        
        if (speedDiff > 20) {
          return { 
            handled: false, 
            error: `Unable ${parsed.type === 'INCREASE_SPEED' ? 'Increase' : 'Reduce'}: Speed change cannot exceed 20 knots (requested: ${speedDiff} knots)` 
          };
        }
        
        aircraft.assignedSpeed = parsed.value;
        aircraft.speed = parsed.value; // Update displayed speed immediately
      }
      break;
    
    case 'INCREASE_MACH':
    case 'REDUCE_MACH':
      if (typeof parsed.value === 'number') {
        // Validate: Cannot change Mach by more than 0.3
        const currentMach = aircraft.machNumber || 0.78;
        const machDiff = Math.abs(parsed.value - currentMach);
        
        if (machDiff > 0.3) {
          return { 
            handled: false, 
            error: `Unable ${parsed.type === 'INCREASE_MACH' ? 'Increase' : 'Reduce'}: Mach change cannot exceed 0.3 (requested: ${machDiff.toFixed(2)})` 
          };
        }
        
        aircraft.assignedMach = parsed.value;
        aircraft.machNumber = parsed.value; // Update displayed mach immediately
        aircraft.assignedSpeed = Math.round(parsed.value * 575);
        aircraft.speed = Math.round(parsed.value * 575); // Update displayed speed immediately
      }
      break;
    
    case 'IDENTIFY':
      aircraft.state = 'IDENTIFIED';
      aircraft.identified = true;
      break;
    
    case 'CONTACT':
      exerciseRunner.removeAircraft(aircraft.id);
      break;
  }
  
  // Update aircraft
  exerciseRunner.updateAircraft(aircraft);
  
  return { handled: true };
}

export function setupSocketHandlers(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  exerciseRunner: ExerciseRunner
) {
  io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    console.log(`Client connected: ${socket.id}`);
    
    // Send current aircraft state to new client
    const aircraft = exerciseRunner.getAllAircraft();
    socket.emit('aircraft:batch', aircraft);
    
    // Handle session join
    socket.on('session:join', (sessionId) => {
      socket.join(`session-${sessionId}`);
      console.log(`Client ${socket.id} joined session ${sessionId}`);
    });
    
    // Handle session leave
    socket.on('session:leave', (sessionId) => {
      socket.leave(`session-${sessionId}`);
      console.log(`Client ${socket.id} left session ${sessionId}`);
    });
    
    // Handle command input (text)
    socket.on('command:text', (text) => {
      const parsed = parseCommand(text);
      
      if (!parsed.valid) {
        socket.emit('command:error', {
          command: text,
          error: parsed.error || 'Invalid command',
          timestamp: new Date(),
        });
        return;
      }
      
      // Execute command
      try {
        const aircraft = parsed.callsign ? exerciseRunner.getAircraft(parsed.callsign) : undefined;
        const result = applyCommandToAircraft(parsed, aircraft, exerciseRunner);
        
        if (!result.handled) {
          socket.emit('command:error', {
            command: text,
            error: result.error || 'Command failed',
            timestamp: new Date(),
          });
          return;
        }
        
        // If it's a distance result, emit as session event
        if (result.distanceResult) {
          socket.emit('session:event', {
            id: `distance-${Date.now()}`,
            sessionId: 'current',
            type: 'DISTANCE_RESULT',
            data: result.distanceResult,
            timestamp: new Date(),
          });
        } else if (aircraft) {
          // Otherwise emit command acknowledged
          socket.emit('command:acknowledged', {
            aircraftId: aircraft.id,
            commandType: parsed.type,
            value: parsed.value,
            timestamp: new Date(),
            acknowledged: true,
          });
        }
      } catch (error: any) {
        socket.emit('command:error', {
          command: text,
          error: error.message,
          timestamp: new Date(),
        });
      }
    });
    
    // Handle manual command (callsign + clearance)
    socket.on('command:manual', (data) => {
      const parsed = parseManualCommand(data.callsign, data.clearance);
      
      if (!parsed.valid) {
        socket.emit('command:error', {
          command: `${data.callsign} ${data.clearance}`,
          error: parsed.error || 'Invalid command',
          timestamp: new Date(),
        });
        return;
      }
      
      // Execute command
      try {
        const aircraft = parsed.callsign ? exerciseRunner.getAircraft(parsed.callsign) : undefined;
        const result = applyCommandToAircraft(parsed, aircraft, exerciseRunner);
        
        if (!result.handled) {
          socket.emit('command:error', {
            command: `${data.callsign} ${data.clearance}`,
            error: result.error || 'Command failed',
            timestamp: new Date(),
          });
          return;
        }
        
        // If it's a distance result, emit as session event
        if (result.distanceResult) {
          socket.emit('session:event', {
            id: `distance-${Date.now()}`,
            sessionId: 'current',
            type: 'DISTANCE_RESULT',
            data: result.distanceResult,
            timestamp: new Date(),
          });
        } else if (aircraft) {
          // Otherwise emit command acknowledged
          socket.emit('command:acknowledged', {
            aircraftId: aircraft.id,
            commandType: parsed.type,
            value: parsed.value,
            timestamp: new Date(),
            acknowledged: true,
          });
        }
      } catch (error: any) {
        socket.emit('command:error', {
          command: `${data.callsign} ${data.clearance}`,
          error: error.message,
          timestamp: new Date(),
        });
      }
    });
    
    // Handle direct command issue
    socket.on('command:issue', (command) => {
      try {
        const aircraft = exerciseRunner.getAircraft(command.aircraftId);
        if (!aircraft) {
          socket.emit('command:error', {
            command: JSON.stringify(command),
            error: `Aircraft ${command.aircraftId} not found`,
            timestamp: new Date(),
          });
          return;
        }
        
        socket.emit('command:acknowledged', {
          ...command,
          timestamp: new Date(),
          acknowledged: true,
        });
      } catch (error: any) {
        socket.emit('command:error', {
          command: JSON.stringify(command),
          error: error.message,
          timestamp: new Date(),
        });
      }
    });
    
    // Handle aircraft data requests
    socket.on('aircraft:request', () => {
      const aircraft = exerciseRunner.getAllAircraft();
      socket.emit('aircraft:batch', aircraft);
    });
    
    socket.on('aircraft:requestById', (aircraftId) => {
      const aircraft = exerciseRunner.getAircraft(aircraftId);
      if (aircraft) {
        socket.emit('aircraft:update', aircraft);
      }
    });
    
    // Handle exercise control
    socket.on('exercise:load', (exerciseId) => {
      console.log(`Loading exercise ${exerciseId} for client ${socket.id}`);
      const exercise = exerciseId === 1 ? EXERCISE_1 : exerciseId === 2 ? EXERCISE_2 : null;
      if (exercise) {
        exerciseRunner.loadExercise(exercise);
        socket.emit('exercise:loaded', { exerciseId, name: exercise.name });
      }
    });
    
    socket.on('exercise:start', () => {
      console.log(`Starting exercise for client ${socket.id}`);
      exerciseRunner.start();
    });
    
    socket.on('exercise:pause', () => {
      console.log(`Pausing exercise for client ${socket.id}`);
      exerciseRunner.pause();
    });
    
    socket.on('exercise:resume', () => {
      console.log(`Resuming exercise for client ${socket.id}`);
      exerciseRunner.resume();
    });
    
    socket.on('exercise:stop', () => {
      console.log(`Stopping exercise for client ${socket.id}`);
      exerciseRunner.stop();
    });
    
    socket.on('exercise:setSpeed', (speed) => {
      console.log(`Setting speed to ${speed}x for client ${socket.id}`);
      exerciseRunner.setSpeed(speed);
    });
    
    socket.on('exercise:seekTo', (minutes) => {
      console.log(`Seeking to ${minutes} minutes for client ${socket.id}`);
      exerciseRunner.seekTo(minutes);
    });
    
    // Handle session control (legacy)
    socket.on('session:start', (exerciseId) => {
      console.log(`Starting exercise ${exerciseId} (legacy) for client ${socket.id}`);
      const exercise = exerciseId === 1 ? EXERCISE_1 : exerciseId === 2 ? EXERCISE_2 : null;
      if (exercise) {
        exerciseRunner.loadExercise(exercise);
        exerciseRunner.start();
      }
    });
    
    socket.on('session:pause', () => {
      exerciseRunner.pause();
    });
    
    socket.on('session:resume', () => {
      exerciseRunner.resume();
    });
    
    socket.on('session:end', () => {
      exerciseRunner.stop();
    });
    
    // Handle disconnect
    socket.on('disconnect', (reason) => {
      console.log(`Client disconnected: ${socket.id} (${reason})`);
    });
  });
}
