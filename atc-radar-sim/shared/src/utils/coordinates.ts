/**
 * Coordinate conversion and distance calculation utilities
 * Uses internal 2D coordinate system (NOT real-world lat/lng)
 */

// Keep LatLng interface for backward compatibility, but treat as internal 2D coordinates
export interface LatLng {
  latitude: number;  // Internal Y coordinate
  longitude: number; // Internal X coordinate
}

export interface ScreenPosition {
  x: number;
  y: number;
}

/**
 * Calculate distance between two coordinates in nautical miles
 * Uses simple 2D Euclidean distance scaled to NM
 */
export function calculateDistance(point1: LatLng, point2: LatLng): number {
  const dx = point2.longitude - point1.longitude;
  const dy = point2.latitude - point1.latitude;
  
  // Scale factor: 1 unit = 1 nautical mile in our internal coordinate system
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  return distance;
}

/**
 * Calculate bearing from point1 to point2 in degrees
 * Uses simple 2D angle calculation
 */
export function calculateBearing(point1: LatLng, point2: LatLng): number {
  const dx = point2.longitude - point1.longitude;
  const dy = point2.latitude - point1.latitude;
  
  // Calculate angle in degrees (0 = North, 90 = East)
  let bearing = toDegrees(Math.atan2(dx, dy));
  
  // Normalize to 0-360
  return (bearing + 360) % 360;
}

/**
 * Convert internal coordinates to screen coordinates
 * Simple 2D transformation with zoom and pan
 */
export function latLngToScreen(
  position: LatLng,
  center: LatLng,
  zoom: number,
  canvasSize: { width: number; height: number }
): ScreenPosition {
  // Scale: pixels per unit at zoom level
  const scale = zoom * 5; // 5 pixels per NM at zoom=1
  
  // Calculate offset from center
  const dx = position.longitude - center.longitude;
  const dy = position.latitude - center.latitude;
  
  // Convert to screen coordinates
  return {
    x: canvasSize.width / 2 + dx * scale,
    y: canvasSize.height / 2 - dy * scale, // Invert Y axis (screen Y goes down)
  };
}

/**
 * Convert screen coordinates to internal coordinates
 */
export function screenToLatLng(
  screen: ScreenPosition,
  center: LatLng,
  zoom: number,
  canvasSize: { width: number; height: number }
): LatLng {
  const scale = zoom * 5;
  
  const deltaX = screen.x - canvasSize.width / 2;
  const deltaY = canvasSize.height / 2 - screen.y; // Invert Y axis
  
  return {
    latitude: center.latitude + deltaY / scale,
    longitude: center.longitude + deltaX / scale,
  };
}

/**
 * Calculate new position after moving distance and bearing
 * Simple 2D vector math
 */
export function calculateDestination(
  origin: LatLng,
  distance: number,  // nautical miles
  bearing: number    // degrees (0 = North, 90 = East)
): LatLng {
  const brng = toRadians(bearing);
  
  // Calculate displacement in X and Y
  const dx = distance * Math.sin(brng);
  const dy = distance * Math.cos(brng);
  
  return {
    latitude: origin.latitude + dy,
    longitude: origin.longitude + dx,
  };
}

/**
 * Normalize heading to 0-360 range
 */
export function normalizeHeading(heading: number): number {
  let normalized = heading % 360;
  if (normalized < 0) normalized += 360;
  return normalized;
}

/**
 * Calculate shortest turn direction
 */
export function getShortestTurnDirection(
  currentHeading: number,
  targetHeading: number
): 'left' | 'right' {
  const diff = normalizeHeading(targetHeading - currentHeading);
  return diff <= 180 ? 'right' : 'left';
}

/**
 * Convert degrees to radians
 */
export function toRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

/**
 * Convert radians to degrees
 */
export function toDegrees(radians: number): number {
  return radians * 180 / Math.PI;
}

