/**
 * Coordinate conversion and distance calculation utilities
 * Uses WGS84 Decimal Degrees (real-world coordinates)
 */

export interface LatLng {
  latitude: number;  // WGS84 latitude in decimal degrees
  longitude: number; // WGS84 longitude in decimal degrees
}

export interface ScreenPosition {
  x: number;
  y: number;
}

// Earth radius in nautical miles
const EARTH_RADIUS_NM = 3440.065;

/**
 * Calculate distance between two coordinates in nautical miles
 * Uses Haversine formula for spherical Earth
 */
export function calculateDistance(point1: LatLng, point2: LatLng): number {
  const φ1 = toRadians(point1.latitude);
  const φ2 = toRadians(point2.latitude);
  const Δφ = toRadians(point2.latitude - point1.latitude);
  const Δλ = toRadians(point2.longitude - point1.longitude);

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return EARTH_RADIUS_NM * c;
}

/**
 * Calculate bearing from point1 to point2 in degrees
 * Uses spherical trigonometry for accurate bearing on Earth
 */
export function calculateBearing(point1: LatLng, point2: LatLng): number {
  const φ1 = toRadians(point1.latitude);
  const φ2 = toRadians(point2.latitude);
  const Δλ = toRadians(point2.longitude - point1.longitude);

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) -
          Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  
  let bearing = toDegrees(Math.atan2(y, x));
  
  // Normalize to 0-360
  return (bearing + 360) % 360;
}

/**
 * Convert WGS84 coordinates to screen coordinates
 * Uses equirectangular projection (suitable for small areas)
 */
export function latLngToScreen(
  position: LatLng,
  center: LatLng,
  zoom: number,
  canvasSize: { width: number; height: number }
): ScreenPosition {
  // Pixels per degree at zoom=1 (adjusted for ~12-17 degree latitude range)
  const baseScale = 80;
  const scale = zoom * baseScale;
  
  // Apply cosine correction for longitude at center latitude
  const latCosine = Math.cos(toRadians(center.latitude));
  
  // Calculate offset from center in degrees
  const dx = (position.longitude - center.longitude) * latCosine;
  const dy = position.latitude - center.latitude;
  
  // Convert to screen coordinates
  return {
    x: canvasSize.width / 2 + dx * scale,
    y: canvasSize.height / 2 - dy * scale, // Invert Y axis (screen Y goes down)
  };
}

/**
 * Convert screen coordinates to WGS84 coordinates
 */
export function screenToLatLng(
  screen: ScreenPosition,
  center: LatLng,
  zoom: number,
  canvasSize: { width: number; height: number }
): LatLng {
  const baseScale = 80;
  const scale = zoom * baseScale;
  
  const latCosine = Math.cos(toRadians(center.latitude));
  
  const deltaX = screen.x - canvasSize.width / 2;
  const deltaY = canvasSize.height / 2 - screen.y; // Invert Y axis
  
  return {
    latitude: center.latitude + deltaY / scale,
    longitude: center.longitude + (deltaX / scale) / latCosine,
  };
}

/**
 * Calculate new position after moving distance and bearing
 * Uses spherical Earth model for accuracy
 */
export function calculateDestination(
  origin: LatLng,
  distance: number,  // nautical miles
  bearing: number    // degrees (0 = North, 90 = East)
): LatLng {
  const δ = distance / EARTH_RADIUS_NM; // angular distance
  const θ = toRadians(bearing);
  const φ1 = toRadians(origin.latitude);
  const λ1 = toRadians(origin.longitude);

  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(δ) +
    Math.cos(φ1) * Math.sin(δ) * Math.cos(θ)
  );

  const λ2 = λ1 + Math.atan2(
    Math.sin(θ) * Math.sin(δ) * Math.cos(φ1),
    Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)
  );

  return {
    latitude: toDegrees(φ2),
    longitude: toDegrees(λ2),
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

