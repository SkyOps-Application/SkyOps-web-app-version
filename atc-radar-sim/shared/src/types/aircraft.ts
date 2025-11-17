/**
 * Aircraft state and status types
 * NOTE: Position uses internal 2D coordinates (NOT real-world coordinates)
 */

export type AircraftState = 
  | 'UNKNOWN'      // Not yet identified
  | 'CONTACT'      // Detected but not identified
  | 'IDENTIFIED'   // Identified and under control
  | 'CONFLICT'     // Separation violation
  | 'TRANSFERRED'  // Transferred to another controller
  | 'HANDOFF';     // In handoff process

export type FlightPhase = 
  | 'DEPARTURE'
  | 'CLIMB'
  | 'CRUISE'
  | 'DESCENT'
  | 'APPROACH'
  | 'ARRIVAL';

export interface Position {
  latitude: number;  // Internal Y coordinate (NM)
  longitude: number; // Internal X coordinate (NM)
  altitude: number;  // feet
  timestamp: Date;
}

export interface Vector {
  x: number;
  y: number;
}

export interface AircraftData {
  id: string;
  callsign: string;
  
  // Position and movement
  position: Position;
  heading: number;        // degrees (0-360)
  speed: number;          // knots
  machNumber?: number;    // Mach speed
  verticalSpeed: number;  // feet per minute
  
  // Flight information
  flightLevel: number;    // FL in hundreds of feet
  targetFlightLevel?: number;
  squawk: string;         // Transponder code
  aircraftType: string;   // e.g., "B738", "A320"
  
  // State
  state: AircraftState;
  phase: FlightPhase;
  identified: boolean;    // Whether aircraft has been identified by controller
  conflict: boolean;      // Whether aircraft is in separation conflict
  
  // Route information
  departure: string;      // ICAO code
  destination: string;    // ICAO code
  route: string[];        // Array of waypoint IDs
  currentWaypoint?: string;
  nextWaypoint?: string;
  
  // Control
  assignedHeading?: number;
  assignedSpeed?: number;
  assignedMach?: number;
  
  // UI
  labelRotation: number;  // Rotation angle for info label (degrees)
  
  // Metadata
  lastUpdate: Date;
  controllerId?: string;
}

export interface AircraftCommand {
  aircraftId: string;
  commandType: CommandType;
  value?: number | string;
  timestamp: Date;
  controllerId?: string;
  acknowledged: boolean;
}

export type CommandType =
  | 'DESCEND'           // D120 - Descend to FL120
  | 'CLIMB'             // C120 - Climb to FL120
  | 'TURN_LEFT'         // TL030 - Turn left heading 030
  | 'TURN_RIGHT'        // TR270 - Turn right heading 270
  | 'INCREASE_SPEED'    // IS250 - Increase speed to 250kt
  | 'REDUCE_SPEED'      // RS210 - Reduce speed to 210kt
  | 'REDUCE_MACH'       // RM0.78 - Reduce to Mach 0.78
  | 'MAINTAIN'          // M250 - Maintain 250kt
  | 'DIRECT'            // DCT WAYPOINT - Direct to waypoint
  | 'SQUAWK'            // SQ1234 - Set squawk code
  | 'IDENTIFY'          // IDENT - Identify aircraft
  | 'CONTACT'           // CT123.45 - Contact frequency
  | 'CLEARED';          // Cleared for approach/departure

export interface ParsedCommand {
  type: CommandType;
  callsign?: string;
  value?: number | string;
  raw: string;
  valid: boolean;
  error?: string;
}

