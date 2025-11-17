/**
 * Socket.io event types for real-time communication
 */

import { AircraftData, AircraftCommand } from './aircraft';
import { SessionEvent } from './training';

export interface ServerToClientEvents {
  // Aircraft updates
  'aircraft:update': (aircraft: AircraftData) => void;
  'aircraft:add': (aircraft: AircraftData) => void;
  'aircraft:remove': (aircraftId: string) => void;
  'aircraft:batch': (aircraft: AircraftData[]) => void;
  
  // Exercise events
  'exercise:loaded': (data: { exerciseId: number; name: string }) => void;
  'exercise:timeUpdate': (data: { currentTime: string; elapsedMinutes: number }) => void;
  
  // Command acknowledgment
  'command:acknowledged': (command: AircraftCommand) => void;
  'command:error': (error: CommandError) => void;
  
  // Separation alerts
  'separation:violation': (data: SeparationViolation) => void;
  'separation:warning': (data: SeparationWarning) => void;
  'separation:restored': (aircraftIds: string[]) => void;
  
  // Session events
  'session:event': (event: SessionEvent) => void;
  'session:ended': (sessionId: string) => void;
  
  // System
  'connected': () => void;
  'error': (error: string) => void;
}

export interface ClientToServerEvents {
  // Session management
  'session:join': (sessionId: string) => void;
  'session:leave': (sessionId: string) => void;
  'session:start': (exerciseId: number) => void;
  'session:pause': () => void;
  'session:resume': () => void;
  'session:end': () => void;
  
  // Exercise control
  'exercise:load': (exerciseId: number) => void;
  'exercise:start': () => void;
  'exercise:pause': () => void;
  'exercise:resume': () => void;
  'exercise:stop': () => void;
  'exercise:setSpeed': (speed: number) => void;
  'exercise:seekTo': (minutes: number) => void;
  
  // Commands
  'command:issue': (command: Omit<AircraftCommand, 'timestamp' | 'acknowledged'>) => void;
  'command:text': (text: string) => void;
  'command:manual': (data: { callsign: string; clearance: string }) => void;
  
  // Requests
  'aircraft:request': () => void;
  'aircraft:requestById': (aircraftId: string) => void;
}

export interface CommandError {
  command: string;
  error: string;
  timestamp: Date;
}

export interface SeparationViolation {
  aircraft1: string;
  aircraft2: string;
  horizontalDistance: number; // NM
  verticalDistance: number;   // feet
  timestamp: Date;
  severity: 'WARNING' | 'CRITICAL';
}

export interface SeparationWarning {
  aircraft1: string;
  aircraft2: string;
  horizontalDistance: number;
  verticalDistance: number;
  timeToClosestApproach: number; // seconds
  timestamp: Date;
}
