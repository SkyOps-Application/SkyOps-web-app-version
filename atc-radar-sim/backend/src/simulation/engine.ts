/**
 * Core simulation engine
 * Handles aircraft movement, state updates, and command execution
 */

import { Server } from 'socket.io';
import {
  AircraftData,
  ParsedCommand,
  AircraftCommand,
  ServerToClientEvents,
  ClientToServerEvents,
  calculateDestination,
  calculateDistance,
  normalizeHeading,
  SEPARATION_STANDARDS,
  AIRCRAFT_PERFORMANCE,
} from '@atc-radar-sim/shared';

export class SimulationEngine {
  private aircraft: Map<string, AircraftData> = new Map();
  private updateInterval: NodeJS.Timeout | null = null;
  private separationCheckInterval: NodeJS.Timeout | null = null;
  private io: Server<ClientToServerEvents, ServerToClientEvents>;
  
  constructor(io: Server<ClientToServerEvents, ServerToClientEvents>) {
    this.io = io;
    this.initializeMockAircraft();
  }
  
  /**
   * Start the simulation
   */
  start() {
    console.log('Starting simulation engine...');
    
    // Update aircraft positions every second
    this.updateInterval = setInterval(() => {
      this.updateAircraftPositions();
    }, 1000);
    
    // Check separation every 2 seconds
    this.separationCheckInterval = setInterval(() => {
      this.checkSeparation();
    }, 2000);
  }
  
  /**
   * Stop the simulation
   */
  stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    if (this.separationCheckInterval) {
      clearInterval(this.separationCheckInterval);
    }
    console.log('Simulation engine stopped');
  }
  
  /**
   * Initialize mock aircraft for testing
   */
  private initializeMockAircraft() {
    const mockAircraft: AircraftData[] = [
      {
        id: '1',
        callsign: 'VNA123',
        position: {
          latitude: 21.0,
          longitude: 105.8,
          altitude: 35000,
          timestamp: new Date(),
        },
        heading: 90,
        speed: 450,
        machNumber: 0.78,
        verticalSpeed: 0,
        flightLevel: 350,
        squawk: '2000',
        aircraftType: 'B738',
        state: 'IDENTIFIED',
        phase: 'CRUISE',
        identified: true,
        conflict: false,
        outOfBoundary: false,
        labelRotation: 0,
        departure: 'VVNB',
        destination: 'VVTS',
        route: [],
        lastUpdate: new Date(),
      },
      {
        id: '2',
        callsign: 'UAL456',
        position: {
          latitude: 21.1,
          longitude: 105.9,
          altitude: 37000,
          timestamp: new Date(),
        },
        heading: 270,
        speed: 460,
        machNumber: 0.80,
        verticalSpeed: 0,
        flightLevel: 370,
        squawk: '2001',
        aircraftType: 'B77W',
        state: 'IDENTIFIED',
        phase: 'CRUISE',
        identified: true,
        conflict: false,
        outOfBoundary: false,
        labelRotation: 0,
        departure: 'VVTS',
        destination: 'VVNB',
        route: [],
        lastUpdate: new Date(),
      },
      {
        id: '3',
        callsign: 'DAL789',
        position: {
          latitude: 21.2,
          longitude: 105.7,
          altitude: 33000,
          timestamp: new Date(),
        },
        heading: 180,
        speed: 440,
        machNumber: 0.76,
        verticalSpeed: 0,
        flightLevel: 330,
        squawk: '2002',
        aircraftType: 'A320',
        state: 'CONTACT',
        phase: 'CRUISE',
        identified: false,
        conflict: false,
        outOfBoundary: false,
        labelRotation: 0,
        departure: 'VVDN',
        destination: 'VVPQ',
        route: [],
        lastUpdate: new Date(),
      },
    ];
    
    mockAircraft.forEach((ac) => {
      this.aircraft.set(ac.id, ac);
    });
  }
  
  /**
   * Update all aircraft positions
   */
  private updateAircraftPositions() {
    this.aircraft.forEach((aircraft) => {
      // Calculate new position based on speed and heading
      const distanceNM = (aircraft.speed / 3600); // Distance in 1 second
      const newPos = calculateDestination(
        {
          latitude: aircraft.position.latitude,
          longitude: aircraft.position.longitude,
        },
        distanceNM,
        aircraft.heading
      );
      
      // Update altitude if climbing/descending
      if (aircraft.targetFlightLevel && aircraft.flightLevel !== aircraft.targetFlightLevel) {
        const diff = aircraft.targetFlightLevel - aircraft.flightLevel;
        const rate = diff > 0 ? AIRCRAFT_PERFORMANCE.MAX_CLIMB_RATE : -AIRCRAFT_PERFORMANCE.MAX_DESCENT_RATE;
        const altitudeChange = (rate / 60); // feet per second (converted from fpm)
        
        aircraft.position.altitude += altitudeChange;
        aircraft.flightLevel = Math.round(aircraft.position.altitude / 100);
        aircraft.verticalSpeed = rate;
        
        // Check if reached target
        if (Math.abs(aircraft.flightLevel - aircraft.targetFlightLevel) < 5) {
          aircraft.flightLevel = aircraft.targetFlightLevel;
          aircraft.position.altitude = aircraft.targetFlightLevel * 100;
          aircraft.verticalSpeed = 0;
          aircraft.targetFlightLevel = undefined;
        }
      }
      
      // Update heading if assigned
      if (aircraft.assignedHeading !== undefined && aircraft.heading !== aircraft.assignedHeading) {
        const diff = aircraft.assignedHeading - aircraft.heading;
        let turnAmount = AIRCRAFT_PERFORMANCE.TURN_RATE; // degrees per second
        
        // Determine shortest turn direction
        if (Math.abs(diff) > 180) {
          turnAmount = -turnAmount;
        } else if (diff < 0) {
          turnAmount = -turnAmount;
        }
        
        aircraft.heading = normalizeHeading(aircraft.heading + turnAmount);
        
        // Check if reached target
        if (Math.abs(aircraft.heading - aircraft.assignedHeading) < AIRCRAFT_PERFORMANCE.TURN_RATE) {
          aircraft.heading = aircraft.assignedHeading;
          aircraft.assignedHeading = undefined;
        }
      }
      
      // Update speed if assigned
      if (aircraft.assignedSpeed !== undefined && aircraft.speed !== aircraft.assignedSpeed) {
        const diff = aircraft.assignedSpeed - aircraft.speed;
        const acceleration = diff > 0 ? AIRCRAFT_PERFORMANCE.ACCELERATION : -AIRCRAFT_PERFORMANCE.ACCELERATION;
        aircraft.speed += acceleration;
        
        // Check if reached target
        if (Math.abs(aircraft.speed - aircraft.assignedSpeed) < AIRCRAFT_PERFORMANCE.ACCELERATION) {
          aircraft.speed = aircraft.assignedSpeed;
          aircraft.assignedSpeed = undefined;
        }
      }
      
      // Update position
      aircraft.position.latitude = newPos.latitude;
      aircraft.position.longitude = newPos.longitude;
      aircraft.position.timestamp = new Date();
      aircraft.lastUpdate = new Date();
      
      // Emit update to all clients
      this.io.emit('aircraft:update', aircraft);
    });
  }
  
  /**
   * Check separation between all aircraft
   */
  private checkSeparation() {
    const aircraftList = Array.from(this.aircraft.values());
    
    for (let i = 0; i < aircraftList.length; i++) {
      for (let j = i + 1; j < aircraftList.length; j++) {
        const ac1 = aircraftList[i];
        const ac2 = aircraftList[j];
        
        const horizontalDist = calculateDistance(
          { latitude: ac1.position.latitude, longitude: ac1.position.longitude },
          { latitude: ac2.position.latitude, longitude: ac2.position.longitude }
        );
        
        const verticalDist = Math.abs(ac1.position.altitude - ac2.position.altitude);
        
        // Check for violation (per project.md: < 10 NM and < 1000 ft)
        if (
          horizontalDist < SEPARATION_STANDARDS.HORIZONTAL_MIN &&
          verticalDist < SEPARATION_STANDARDS.VERTICAL_MIN
        ) {
          // Update aircraft states to CONFLICT and set conflict flag
          if (ac1.state !== 'CONFLICT') {
            ac1.conflict = true;
            ac1.state = 'CONFLICT';
            this.io.emit('aircraft:update', ac1);
          }
          if (ac2.state !== 'CONFLICT') {
            ac2.conflict = true;
            ac2.state = 'CONFLICT';
            this.io.emit('aircraft:update', ac2);
          }
          
          this.io.emit('separation:violation', {
            aircraft1: ac1.id,
            aircraft2: ac2.id,
            horizontalDistance: horizontalDist,
            verticalDistance: verticalDist,
            timestamp: new Date(),
            severity: 'CRITICAL',
          });
        } else {
          // Clear conflict flag if separation is restored
          if (ac1.conflict) {
            ac1.conflict = false;
            if (ac1.state === 'CONFLICT') {
              ac1.state = ac1.identified ? 'IDENTIFIED' : 'CONTACT';
            }
          }
          if (ac2.conflict) {
            ac2.conflict = false;
            if (ac2.state === 'CONFLICT') {
              ac2.state = ac2.identified ? 'IDENTIFIED' : 'CONTACT';
            }
          }
          
          // Issue warning if getting close
          if (
            horizontalDist < SEPARATION_STANDARDS.WARNING_THRESHOLD &&
            verticalDist < SEPARATION_STANDARDS.VERTICAL_MIN * 2
          ) {
            this.io.emit('separation:warning', {
            aircraft1: ac1.id,
            aircraft2: ac2.id,
            horizontalDistance: horizontalDist,
            verticalDistance: verticalDist,
              timeToClosestApproach: 60, // Simplified calculation
              timestamp: new Date(),
            });
          }
        }
      }
    }
  }
  
  /**
   * Execute a parsed command
   */
  executeCommand(command: ParsedCommand) {
    if (!command.callsign) {
      throw new Error('Command must include callsign');
    }
    
    // Find aircraft by callsign
    const aircraft = Array.from(this.aircraft.values()).find(
      (ac) => ac.callsign === command.callsign
    );
    
    if (!aircraft) {
      throw new Error(`Aircraft ${command.callsign} not found`);
    }
    
    // Execute command based on type
    switch (command.type) {
      case 'DESCEND':
      case 'CLIMB':
        if (typeof command.value === 'number') {
          aircraft.targetFlightLevel = command.value;
        }
        break;
      
      case 'TURN_LEFT':
      case 'TURN_RIGHT':
        if (typeof command.value === 'number') {
          aircraft.assignedHeading = command.value;
        }
        break;
      
      case 'INCREASE_SPEED':
      case 'REDUCE_SPEED':
      case 'MAINTAIN':
        if (typeof command.value === 'number') {
          aircraft.assignedSpeed = command.value;
        }
        break;
      
      case 'REDUCE_MACH':
        if (typeof command.value === 'number') {
          aircraft.assignedMach = command.value;
          // Convert Mach to knots (simplified, assuming FL350)
          aircraft.assignedSpeed = Math.round(command.value * 575);
        }
        break;
      
      case 'SQUAWK':
        if (typeof command.value === 'string') {
          aircraft.squawk = command.value;
        }
        break;
      
      case 'IDENTIFY':
        if (aircraft.state === 'CONTACT' || aircraft.state === 'UNKNOWN') {
          aircraft.state = 'IDENTIFIED';
          aircraft.identified = true;
        }
        break;
      
      case 'CONTACT':
        // Transfer aircraft to another controller
        this.removeAircraft(aircraft.id);
        break;
    }
    
    // Update timestamp
    aircraft.lastUpdate = new Date();
    
    // Emit update
    this.io.emit('aircraft:update', aircraft);
  }
  
  /**
   * Execute a direct command
   */
  executeCommandDirect(command: Omit<AircraftCommand, 'timestamp' | 'acknowledged'>) {
    const aircraft = this.aircraft.get(command.aircraftId);
    
    if (!aircraft) {
      throw new Error(`Aircraft ${command.aircraftId} not found`);
    }
    
    // Similar logic as executeCommand but with direct command structure
    // Implementation details...
  }
  
  /**
   * Get all aircraft
   */
  getAllAircraft(): AircraftData[] {
    return Array.from(this.aircraft.values());
  }
  
  /**
   * Get aircraft by ID
   */
  getAircraft(id: string): AircraftData | undefined {
    return this.aircraft.get(id);
  }
  
  /**
   * Add aircraft to simulation
   */
  addAircraft(aircraft: AircraftData) {
    this.aircraft.set(aircraft.id, aircraft);
    this.io.emit('aircraft:add', aircraft);
  }
  
  /**
   * Remove aircraft from simulation
   */
  removeAircraft(id: string) {
    this.aircraft.delete(id);
    this.io.emit('aircraft:remove', id);
  }
}

