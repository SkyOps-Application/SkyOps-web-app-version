/**
 * Socket.IO event handlers
 */

import { Server, Socket } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents, parseCommand, parseManualCommand } from '@atc-radar-sim/shared';
import { ExerciseRunner } from '../simulation/exercise-runner';
import { EXERCISE_1, EXERCISE_2 } from '@atc-radar-sim/shared/src/data/exercises';

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
      
      // Find aircraft and execute command
      try {
        const aircraft = exerciseRunner.getAircraft(parsed.callsign || '');
        if (!aircraft) {
          socket.emit('command:error', {
            command: text,
            error: `Aircraft ${parsed.callsign} not found`,
            timestamp: new Date(),
          });
          return;
        }
        
        // Apply command to aircraft based on type
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
          
          case 'INCREASE_SPEED':
          case 'REDUCE_SPEED':
            if (typeof parsed.value === 'number') {
              aircraft.assignedSpeed = parsed.value;
            }
            break;
          
          case 'REDUCE_MACH':
            if (typeof parsed.value === 'number') {
              aircraft.assignedMach = parsed.value;
              aircraft.assignedSpeed = Math.round(parsed.value * 575);
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
        
        exerciseRunner.updateAircraft(aircraft);
        
        socket.emit('command:acknowledged', {
          aircraftId: aircraft.id,
          commandType: parsed.type,
          value: parsed.value,
          timestamp: new Date(),
          acknowledged: true,
        });
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
      
      // Find aircraft and execute command
      try {
        const aircraft = exerciseRunner.getAircraft(data.callsign);
        if (!aircraft) {
          socket.emit('command:error', {
            command: `${data.callsign} ${data.clearance}`,
            error: `Aircraft ${data.callsign} not found`,
            timestamp: new Date(),
          });
          return;
        }
        
        // Apply command to aircraft based on type
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
          
          case 'INCREASE_SPEED':
          case 'REDUCE_SPEED':
            if (typeof parsed.value === 'number') {
              aircraft.assignedSpeed = parsed.value;
            }
            break;
          
          case 'REDUCE_MACH':
            if (typeof parsed.value === 'number') {
              aircraft.assignedMach = parsed.value;
              aircraft.assignedSpeed = Math.round(parsed.value * 575);
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
        
        exerciseRunner.updateAircraft(aircraft);
        
        socket.emit('command:acknowledged', {
          aircraftId: aircraft.id,
          commandType: parsed.type,
          value: parsed.value,
          timestamp: new Date(),
          acknowledged: true,
        });
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
