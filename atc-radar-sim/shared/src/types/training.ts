/**
 * Training session and exercise types
 */

import { AircraftCommand } from './aircraft';

export interface TrainingSession {
  id: string;
  exerciseId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  status: SessionStatus;

  // Performance metrics
  commandsIssued: number;
  correctCommands: number;
  separationViolations: number;
  averageResponseTime: number; // milliseconds

  // Recording
  events: SessionEvent[];
  score?: number;
}

export type SessionStatus =
  | 'ACTIVE'
  | 'PAUSED'
  | 'COMPLETED'
  | 'ABANDONED';

export interface SessionEvent {
  id: string;
  sessionId: string;
  timestamp: Date;
  type: EventType;
  data: any;
}

export type EventType =
  | 'COMMAND_ISSUED'
  | 'COMMAND_ACKNOWLEDGED'
  | 'AIRCRAFT_STATE_CHANGE'
  | 'SEPARATION_VIOLATION'
  | 'SEPARATION_RESTORED'
  | 'AIRCRAFT_ADDED'
  | 'AIRCRAFT_REMOVED'
  | 'HANDOFF_INITIATED'
  | 'HANDOFF_ACCEPTED'
  | 'TIME_UPDATE'
  | 'DISTANCE_RESULT'
  | 'SCORE_UPDATE';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  duration: number;          // seconds
  initialAircraft: string[]; // Flight plan IDs
  objectives: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface SeparationStandard {
  horizontal: number; // nautical miles
  vertical: number;   // feet
}

export const STANDARD_SEPARATION: SeparationStandard = {
  horizontal: 5,  // 5 NM
  vertical: 1000, // 1000 feet
};

