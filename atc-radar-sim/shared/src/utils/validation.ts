/**
 * Validation utilities
 */

/**
 * Validate callsign format (e.g., "VNA123", "UAL456")
 */
export function isValidCallsign(callsign: string): boolean {
  return /^[A-Z]{2,3}\d{1,4}[A-Z]?$/.test(callsign);
}

/**
 * Validate flight level (0-999)
 */
export function isValidFlightLevel(fl: number): boolean {
  return Number.isInteger(fl) && fl >= 0 && fl <= 999;
}

/**
 * Validate heading (0-360)
 */
export function isValidHeading(heading: number): boolean {
  return heading >= 0 && heading < 360;
}

/**
 * Validate speed in knots (50-500)
 */
export function isValidSpeed(speed: number): boolean {
  return speed >= 50 && speed <= 500;
}

/**
 * Validate Mach number (0.30-0.99)
 */
export function isValidMach(mach: number): boolean {
  return mach >= 0.30 && mach <= 0.99;
}

/**
 * Validate squawk code (0000-7777 in octal)
 */
export function isValidSquawk(squawk: string): boolean {
  return /^[0-7]{4}$/.test(squawk);
}

/**
 * Validate ICAO airport code (4 letters)
 */
export function isValidICAO(icao: string): boolean {
  return /^[A-Z]{4}$/.test(icao);
}

/**
 * Validate frequency (118.000-136.975)
 */
export function isValidFrequency(freq: number): boolean {
  return freq >= 118.0 && freq <= 136.975;
}

