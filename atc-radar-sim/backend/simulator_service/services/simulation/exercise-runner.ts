/**
 * Exercise Runner - Manages exercise playback and replay
 */

import { Server } from 'socket.io';
import {
  AircraftData,
  ServerToClientEvents,
  ClientToServerEvents,
} from '@atc-radar-sim/shared';
import { WAYPOINTS } from '@atc-radar-sim/shared/src/data/waypoints';
import { Exercise, ExerciseAircraft, parseTime, formatTime } from '@atc-radar-sim/shared/src/data/exercises';
import { calculateDistance, calculateBearing, calculateDestination, isPointInPolygon, LatLng } from '@atc-radar-sim/shared/src/utils/coordinates';
import redisService from '../redis/redis.service';

export class ExerciseRunner {
  private io: Server<ClientToServerEvents, ServerToClientEvents>;
  private exercise: Exercise | null = null;
  private currentTime: number = 0; // Minutes since exercise start
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private playbackSpeed: number = 1; // 1x, 2x, 3x, 4x
  private updateInterval: NodeJS.Timeout | null = null;
  private spawnedAircraft: Set<string> = new Set();
  private aircraftData: Map<string, AircraftData> = new Map();
  private lastUpdateTime: number = 0; // Track last update to prevent double updates
  private tickCounter: number = 0; // Count ticks for position updates
  private boundaryPolygon: LatLng[] = []; // Boundary polygon for out-of-boundary checks
  private violationCount: number = 0; // Track total violations in session

  constructor(io: Server<ClientToServerEvents, ServerToClientEvents>) {
    this.io = io;
    // Initialize boundary polygon
    this.initializeBoundary();
  }

  /**
   * Initialize the boundary polygon from waypoints
   */
  private initializeBoundary() {
    const boundaryWaypoints = [
      'CAMPU', 'POPET', 'GONLY', 'PLK', 'PCA', 'VEPAM',
      'KARAN', 'PTH', 'ELSAS', 'CN', 'BIBAN', 'PQU'
    ];

    this.boundaryPolygon = boundaryWaypoints
      .map(name => WAYPOINTS.find(wp => wp.id === name || wp.name === name))
      .filter((wp): wp is typeof WAYPOINTS[0] => wp !== undefined)
      .map(wp => ({ latitude: wp.latitude, longitude: wp.longitude }));
  }

  /**
   * Load and start an exercise
   */
  loadExercise(exercise: Exercise) {
    // Only stop if already running
    if (this.isRunning) {
      this.stop();
    } else {
      // Just clear state without emitting remove events
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
      }
      this.isRunning = false;
      this.isPaused = false;
      this.aircraftData.clear();
      this.spawnedAircraft.clear();
    }

    this.exercise = exercise;
    this.currentTime = 0;
    this.violationCount = 0;

    console.log(`Loaded exercise: ${exercise.name}`);
  }

  /**
   * Start the exercise
   */
  start() {
    if (!this.exercise) {
      throw new Error('No exercise loaded');
    }

    if (this.isRunning) {
      console.log('Exercise already running, ignoring start');
      return;
    }

    // Clear any existing interval first
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }

    this.isRunning = true;
    this.isPaused = false;

    console.log(`Starting exercise: ${this.exercise.name} at speed ${this.playbackSpeed}x`);

    // Update every 1 second (real time)
    this.updateInterval = setInterval(() => {
      if (!this.isPaused) {
        this.update();
      }
    }, 1000);
  }

  /**
   * Pause the exercise
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * Resume the exercise
   */
  resume() {
    this.isPaused = false;
  }

  /**
   * Stop the exercise
   */
  stop() {
    if (this.isRunning && this.exercise) {
      // Push session stats to Redis before clearing
      const sessionData = {
        userId: 'current-user', // TODO: Pass real user ID from context/socket
        timestamp: new Date().toISOString(),
        duration: Math.floor(this.currentTime * 60), // Convert minutes to seconds
        violations: this.violationCount,
        traffic_count: this.spawnedAircraft.size
      };

      console.log('Session ended, saving history:', sessionData);
      redisService.addToQueue('history_logs', sessionData);
    }

    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }

    this.isRunning = false;
    this.isPaused = false;

    // Remove all aircraft
    this.aircraftData.forEach((_, id) => {
      this.io.emit('aircraft:remove', id);
    });

    this.aircraftData.clear();
    this.spawnedAircraft.clear();
  }

  /**
   * Set playback speed
   */
  setSpeed(speed: number) {
    this.playbackSpeed = Math.max(1, Math.min(4, speed));
    console.log(`Playback speed set to ${this.playbackSpeed}x`);
  }

  /**
   * Jump to specific time in the exercise (replay)
   */
  seekTo(minutes: number) {
    this.currentTime = Math.max(0, minutes);
    this.tickCounter = 0; // Reset tick counter

    console.log(`Seeking to ${this.currentTime} minutes`);

    // Reset and respawn aircraft up to this time
    this.spawnedAircraft.clear();
    this.aircraftData.forEach((_, id) => {
      this.io.emit('aircraft:remove', id);
    });
    this.aircraftData.clear();

    if (this.exercise) {
      const exerciseStartMin = parseTime(this.exercise.startTime);
      const targetTime = exerciseStartMin + this.currentTime;

      // Spawn all aircraft that should exist at this time
      this.exercise.aircraft.forEach((acData) => {
        const spawnMin = parseTime(acData.spawnTime);
        if (spawnMin <= targetTime) {
          const elapsed = targetTime - spawnMin;
          this.spawnAircraft(acData, elapsed);
        }
      });

      // Emit time update
      this.io.emit('session:event', {
        id: `time-${Date.now()}`,
        sessionId: 'current',
        type: 'TIME_UPDATE',
        data: this.getCurrentTime(),
        timestamp: new Date(),
      });
    }
  }

  /**
   * Get current simulation time
   */
  getCurrentTime(): string {
    if (!this.exercise) return '00:00:00';
    const exerciseStartMin = parseTime(this.exercise.startTime);
    return formatTime(exerciseStartMin + this.currentTime);
  }

  /**
   * Update simulation (called every second)
   */
  private update() {
    if (!this.exercise) return;

    // Prevent duplicate updates within the same 500ms window
    const now = Date.now();
    if (now - this.lastUpdateTime < 500) {
      console.warn('Update called too soon, skipping');
      return;
    }
    this.lastUpdateTime = now;

    // Increment tick counter
    this.tickCounter++;

    // Increment time based on playback speed
    const incrementMinutes = this.playbackSpeed / 60;
    this.currentTime += incrementMinutes;

    const exerciseStartMin = parseTime(this.exercise.startTime);
    const currentSimTime = exerciseStartMin + this.currentTime;

    // Emit time update
    const currentTimeStr = this.getCurrentTime();
    this.io.emit('session:event', {
      id: `time-${Date.now()}`,
      sessionId: 'current',
      type: 'TIME_UPDATE',
      data: currentTimeStr,
      timestamp: new Date(),
    });

    // Check for aircraft to spawn
    this.exercise.aircraft.forEach((acData) => {
      const spawnMin = parseTime(acData.spawnTime);

      if (spawnMin <= currentSimTime && !this.spawnedAircraft.has(acData.callsign)) {
        this.spawnAircraft(acData, 0);
      }
    });

    // Position updates: every 5 seconds at 1x speed, proportionally faster at higher speeds
    // At 1x: update every 5 ticks
    // At 2x: update every 3 ticks
    // At 3x: update every 2 ticks
    // At 4x: update every tick
    const positionUpdateInterval = Math.max(1, Math.floor(5 / this.playbackSpeed));
    const shouldUpdatePosition = this.tickCounter % positionUpdateInterval === 0;

    // Always update smooth turning animation
    this.aircraftData.forEach((aircraft) => {
      this.updateSmoothTurning(aircraft);
      if (shouldUpdatePosition) {
        this.updateAircraftPosition(aircraft);
      }
    });

    // Check for separation violations
    this.checkSeparationViolations();

    // Check for boundary violations
    this.checkBoundaryViolations();

    // Emit all aircraft updates (for smooth animation rendering)
    this.aircraftData.forEach((aircraft) => {
      this.io.emit('aircraft:update', aircraft);
    });
  }

  /**
   * Spawn an aircraft
   */
  private spawnAircraft(acData: ExerciseAircraft, elapsedMinutes: number = 0) {
    // Find spawn waypoint
    const spawnWaypoint = WAYPOINTS.find(wp => wp.id === acData.spawnPoint);
    if (!spawnWaypoint) {
      console.error(`Spawn waypoint not found: ${acData.spawnPoint}`);
      return;
    }

    // Determine initial altitude and target
    let initialAltitude: number;
    let targetFL: number | undefined;
    let verticalSpeed = 0;

    if (acData.flightLevel === "0" || acData.flightLevel === 0) {
      // Aircraft is climbing
      initialAltitude = 1000; // Start at 1000 ft

      // Determine target FL based on callsign pattern from project.md
      if (acData.callsign.includes("1120")) targetFL = 370;
      else if (acData.callsign.includes("121")) targetFL = 180;
      else if (acData.callsign.includes("853")) targetFL = 310;
      else if (acData.callsign.includes("1338")) targetFL = 150;
      else if (acData.callsign.includes("759")) targetFL = 340;
      else if (acData.callsign.includes("1214")) targetFL = 370;
      else if (acData.callsign.includes("757")) targetFL = 280;
      else targetFL = 300; // Default

      verticalSpeed = 2000; // Climbing at 2000 fpm
    } else {
      initialAltitude = (typeof acData.flightLevel === 'number' ? acData.flightLevel : parseInt(acData.flightLevel)) * 100;
    }

    // Calculate position if elapsed time > 0 (using geographic calculations)
    let latitude = spawnWaypoint.latitude;
    let longitude = spawnWaypoint.longitude;
    let currentWaypointIndex = 0;

    // Position calculation: move towards next waypoint using spherical Earth model
    if (elapsedMinutes > 0 && acData.route.length > 1) {
      const nextWaypoint = WAYPOINTS.find(wp => wp.id === acData.route[1]);
      if (nextWaypoint) {
        // Calculate distance traveled (in nautical miles)
        const distanceNM = (acData.speed / 60) * elapsedMinutes;

        // Calculate bearing to next waypoint using spherical trigonometry
        const bearing = calculateBearing(
          { latitude: spawnWaypoint.latitude, longitude: spawnWaypoint.longitude },
          { latitude: nextWaypoint.latitude, longitude: nextWaypoint.longitude }
        );

        // Calculate new position using spherical Earth model
        const newPos = calculateDestination(
          { latitude: spawnWaypoint.latitude, longitude: spawnWaypoint.longitude },
          distanceNM,
          bearing
        );

        latitude = newPos.latitude;
        longitude = newPos.longitude;
      }
    }

    // Calculate heading to next waypoint using geographic bearing
    let heading = 0;
    if (acData.route.length > 1) {
      const nextWaypoint = WAYPOINTS.find(wp => wp.id === acData.route[1]);
      if (nextWaypoint) {
        heading = calculateBearing(
          { latitude, longitude },
          { latitude: nextWaypoint.latitude, longitude: nextWaypoint.longitude }
        );
      }
    }

    const aircraft: AircraftData = {
      id: acData.callsign,
      callsign: acData.callsign,
      position: {
        latitude,
        longitude,
        altitude: initialAltitude,
        timestamp: new Date(),
      },
      heading,
      speed: acData.speed,
      machNumber: acData.mach,
      verticalSpeed,
      flightLevel: Math.round(initialAltitude / 100),
      targetFlightLevel: targetFL,
      squawk: '2000',
      aircraftType: 'B738',
      state: 'CONTACT',
      phase: verticalSpeed > 0 ? 'CLIMB' : 'CRUISE',
      identified: false,
      conflict: false,
      outOfBoundary: false,
      labelRotation: 0,
      departure: acData.spawnPoint,
      destination: acData.destination,
      route: acData.route,
      currentWaypoint: acData.route[currentWaypointIndex],
      nextWaypoint: acData.route[currentWaypointIndex + 1],
      lastUpdate: new Date(),
    };

    this.aircraftData.set(aircraft.id, aircraft);
    this.spawnedAircraft.add(acData.callsign);

    // Emit to clients
    this.io.emit('aircraft:add', aircraft);

    console.log(`Spawned aircraft: ${acData.callsign} at ${acData.spawnPoint}`);
  }

  /**
   * Update smooth turning animation (called every tick)
   * Gradually rotate aircraft toward target heading over 15-20 seconds
   */
  private updateSmoothTurning(aircraft: AircraftData) {
    // If there's a target heading, gradually turn toward it
    if (aircraft.targetHeading !== undefined) {
      const targetHeading = aircraft.targetHeading;
      const currentHeading = aircraft.heading;

      // Calculate shortest turn direction
      let delta = targetHeading - currentHeading;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      // Turn rate: 3 degrees per second at 1x speed (20 seconds for 60° turn)
      // Adjust for playback speed
      const turnRate = 3 * this.playbackSpeed;

      if (Math.abs(delta) < turnRate) {
        // Reached target heading
        aircraft.heading = targetHeading;
        aircraft.targetHeading = undefined;
      } else {
        // Continue turning
        aircraft.heading = (currentHeading + (delta > 0 ? turnRate : -turnRate) + 360) % 360;
      }
    }
  }

  /**
   * Update aircraft position (using WGS84 geographic coordinates)
   */
  private updateAircraftPosition(aircraft: AircraftData) {
    // If aircraft has an assigned heading (from controller), use it
    // Otherwise, follow the route
    if (!aircraft.assignedHeading && aircraft.route && aircraft.route.length > 0) {
      // Find current position in route
      const currentWaypointId = aircraft.currentWaypoint || aircraft.route[0];
      const currentIndex = aircraft.route.indexOf(currentWaypointId);

      if (currentIndex >= 0 && currentIndex < aircraft.route.length - 1) {
        // Get next waypoint
        const nextWaypointId = aircraft.route[currentIndex + 1];
        const nextWaypoint = WAYPOINTS.find(wp => wp.id === nextWaypointId || wp.name === nextWaypointId);

        if (nextWaypoint) {
          // Calculate distance to next waypoint using Haversine formula
          const distanceToWaypoint = calculateDistance(
            { latitude: aircraft.position.latitude, longitude: aircraft.position.longitude },
            { latitude: nextWaypoint.latitude, longitude: nextWaypoint.longitude }
          );

          // If within 2 NM of waypoint, move to next waypoint in route
          if (distanceToWaypoint < 2) {
            aircraft.currentWaypoint = nextWaypointId;
            aircraft.nextWaypoint = aircraft.route[currentIndex + 2];

            // Set target heading to next waypoint if exists
            if (aircraft.nextWaypoint) {
              const nextNextWaypoint = WAYPOINTS.find(wp => wp.id === aircraft.nextWaypoint || wp.name === aircraft.nextWaypoint);
              if (nextNextWaypoint) {
                const bearing = calculateBearing(
                  { latitude: nextWaypoint.latitude, longitude: nextWaypoint.longitude },
                  { latitude: nextNextWaypoint.latitude, longitude: nextNextWaypoint.longitude }
                );
                aircraft.targetHeading = bearing;
              }
            }
          } else {
            // Set target heading to point toward next waypoint
            const bearing = calculateBearing(
              { latitude: aircraft.position.latitude, longitude: aircraft.position.longitude },
              { latitude: nextWaypoint.latitude, longitude: nextWaypoint.longitude }
            );
            aircraft.targetHeading = bearing;
          }
        }
      }
    } else if (aircraft.assignedHeading !== undefined) {
      // Set target heading from controller (smooth turn)
      aircraft.targetHeading = aircraft.assignedHeading;
    }

    // Calculate distance traveled in this update
    // Use position update interval to get correct distance
    const positionUpdateInterval = Math.max(1, Math.floor(5 / this.playbackSpeed));
    const effectiveTimeStep = positionUpdateInterval * this.playbackSpeed; // seconds
    const distanceNM = (aircraft.speed / 3600) * effectiveTimeStep;

    // Update position using spherical Earth model
    const newPosition = calculateDestination(
      { latitude: aircraft.position.latitude, longitude: aircraft.position.longitude },
      distanceNM,
      aircraft.heading
    );

    aircraft.position.latitude = newPosition.latitude;
    aircraft.position.longitude = newPosition.longitude;

    // Update altitude if climbing/descending - 100 ft per simulation tick (per second at 1x speed)
    if (aircraft.targetFlightLevel && aircraft.flightLevel !== aircraft.targetFlightLevel) {
      const diff = aircraft.targetFlightLevel - aircraft.flightLevel;
      const altChangePerTick = 100; // 100 ft per tick
      const altChange = (diff > 0 ? altChangePerTick : -altChangePerTick) * this.playbackSpeed;

      aircraft.position.altitude += altChange;
      aircraft.flightLevel = Math.round(aircraft.position.altitude / 100);
      aircraft.verticalSpeed = diff > 0 ? altChangePerTick * 60 : -altChangePerTick * 60; // Convert to ft/min for display

      // Check if reached target (within 100 ft)
      if (Math.abs(aircraft.position.altitude - aircraft.targetFlightLevel * 100) < 100) {
        aircraft.flightLevel = aircraft.targetFlightLevel;
        aircraft.position.altitude = aircraft.targetFlightLevel * 100;
        aircraft.verticalSpeed = 0;
        aircraft.targetFlightLevel = undefined;
        aircraft.phase = 'CRUISE';
      }
    }

    aircraft.position.timestamp = new Date();
    aircraft.lastUpdate = new Date();
  }

  /**
   * Check for separation violations between all aircraft
   * Separation is lost when BOTH conditions are true:
   * - Horizontal distance < 10 NM
   * - Vertical separation < 1000 ft
   */
  private checkSeparationViolations() {
    const aircraftArray = Array.from(this.aircraftData.values());

    // Clear all conflict flags first
    aircraftArray.forEach(ac => ac.conflict = false);

    // Check all pairs of aircraft
    for (let i = 0; i < aircraftArray.length; i++) {
      for (let j = i + 1; j < aircraftArray.length; j++) {
        const ac1 = aircraftArray[i];
        const ac2 = aircraftArray[j];

        // Calculate horizontal distance using Haversine formula (in NM)
        const horizontalDistance = calculateDistance(
          { latitude: ac1.position.latitude, longitude: ac1.position.longitude },
          { latitude: ac2.position.latitude, longitude: ac2.position.longitude }
        );

        // Calculate vertical separation (in feet)
        const verticalSeparation = Math.abs(ac2.position.altitude - ac1.position.altitude);

        // Check if separation is lost (BOTH conditions must be true)
        if (horizontalDistance < 10 && verticalSeparation < 1000) {
          // Mark both aircraft as in conflict
          ac1.conflict = true;
          ac2.conflict = true;

          // Emit separation violation event
          // Emit separation violation event
          this.io.emit('separation:violation', {
            aircraft1: ac1.callsign,
            aircraft2: ac2.callsign,
            horizontalDistance,
            verticalDistance: verticalSeparation,
            timestamp: new Date(),
            severity: horizontalDistance < 5 ? 'CRITICAL' : 'WARNING',
          });

          this.violationCount++;
        }
      }
    }
  }

  /**
   * Check for aircraft flying outside the boundary
   */
  private checkBoundaryViolations() {
    if (this.boundaryPolygon.length === 0) return;

    this.aircraftData.forEach(aircraft => {
      const position: LatLng = {
        latitude: aircraft.position.latitude,
        longitude: aircraft.position.longitude
      };

      // Check if aircraft is outside the boundary
      const isInside = isPointInPolygon(position, this.boundaryPolygon);
      aircraft.outOfBoundary = !isInside;
    });
  }

  /**
   * Get all active aircraft
   */
  getAllAircraft(): AircraftData[] {
    return Array.from(this.aircraftData.values());
  }

  /**
   * Get aircraft by ID
   */
  getAircraft(id: string): AircraftData | undefined {
    return this.aircraftData.get(id);
  }

  /**
   * Update aircraft (for command execution)
   */
  updateAircraft(aircraft: AircraftData) {
    this.aircraftData.set(aircraft.id, aircraft);
    this.io.emit('aircraft:update', aircraft);
  }

  /**
   * Remove aircraft
   */
  removeAircraft(id: string) {
    this.aircraftData.delete(id);
    this.spawnedAircraft.delete(id);
    this.io.emit('aircraft:remove', id);
  }
}

