/**
 * Waypoint and route types
 * Uses WGS84 Decimal Degrees (real-world coordinates)
 * Vietnam/Southeast Asia airspace region
 */

export interface Waypoint {
  id: string;
  name: string;
  latitude: number;  // WGS84 latitude in decimal degrees
  longitude: number; // WGS84 longitude in decimal degrees
  type: WaypointType;
  description?: string;
}

export type WaypointType = 
  | 'FIX'           // Named waypoint
  | 'VOR'           // VOR station
  | 'NDB'           // NDB station
  | 'AIRPORT'       // Airport
  | 'RUNWAY'        // Runway threshold
  | 'CUSTOM';       // Custom point

export interface Route {
  id: string;
  name: string;
  waypoints: string[];  // Array of waypoint IDs
  description?: string;
  restrictionAltitudes?: Record<string, number>; // waypoint ID -> min altitude
  restrictionSpeeds?: Record<string, number>;    // waypoint ID -> max speed
}

export interface FlightPlan {
  id: string;
  callsign: string;
  aircraftType: string;
  departure: string;      // ICAO code
  destination: string;    // ICAO code
  alternate?: string;     // ICAO code
  route: string[];        // Array of waypoint IDs
  cruiseLevel: number;    // Flight level
  cruiseSpeed: number;    // Knots or Mach
  departureTime: Date;
  estimatedArrivalTime: Date;
  remarks?: string;
}

