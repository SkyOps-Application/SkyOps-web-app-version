/**
 * ATC command parser based on project.md specifications
 */

import { ParsedCommand, CommandType } from '../types/aircraft';
import {
  isValidCallsign,
  isValidFlightLevel,
  isValidHeading,
  isValidSpeed,
  isValidMach,
  isValidSquawk,
} from './validation';

/**
 * Parse manual ATC command (typed shorthand)
 * Supports: D120, C90, SD120, SC90, R270, L090, F180, IS250, RS230, IM0.78, RM0.76, CT, ID
 */
export function parseManualCommand(callsign: string, clearance: string): ParsedCommand {
  const cs = callsign.trim().toUpperCase();
  const cmd = clearance.trim().toUpperCase();
  
  // Stop Descend: SD+number
  if (/^SD\d{2,3}$/.test(cmd)) {
    const value = parseInt(cmd.substring(2));
    return {
      type: 'DESCEND',
      callsign: cs,
      value,
      raw: `${cs} ${cmd}`,
      valid: isValidFlightLevel(value),
      error: !isValidFlightLevel(value) ? 'Invalid flight level' : undefined,
    };
  }
  
  // Stop Climb: SC+number
  if (/^SC\d{2,3}$/.test(cmd)) {
    const value = parseInt(cmd.substring(2));
    return {
      type: 'CLIMB',
      callsign: cs,
      value,
      raw: `${cs} ${cmd}`,
      valid: isValidFlightLevel(value),
      error: !isValidFlightLevel(value) ? 'Invalid flight level' : undefined,
    };
  }
  
  // Descend: D+number
  if (/^D\d{2,3}$/.test(cmd)) {
    const value = parseInt(cmd.substring(1));
    return {
      type: 'DESCEND',
      callsign: cs,
      value,
      raw: `${cs} ${cmd}`,
      valid: isValidFlightLevel(value),
      error: !isValidFlightLevel(value) ? 'Invalid flight level' : undefined,
    };
  }
  
  // Climb: C+number
  if (/^C\d{2,3}$/.test(cmd)) {
    const value = parseInt(cmd.substring(1));
    return {
      type: 'CLIMB',
      callsign: cs,
      value,
      raw: `${cs} ${cmd}`,
      valid: isValidFlightLevel(value),
      error: !isValidFlightLevel(value) ? 'Invalid flight level' : undefined,
    };
  }
  
  // Turn Right: R+heading
  if (/^R\d{3}$/.test(cmd)) {
    const value = parseInt(cmd.substring(1));
    return {
      type: 'TURN_RIGHT',
      callsign: cs,
      value,
      raw: `${cs} ${cmd}`,
      valid: isValidHeading(value),
      error: !isValidHeading(value) ? 'Invalid heading' : undefined,
    };
  }
  
  // Turn Left: L+heading
  if (/^L\d{3}$/.test(cmd)) {
    const value = parseInt(cmd.substring(1));
    return {
      type: 'TURN_LEFT',
      callsign: cs,
      value,
      raw: `${cs} ${cmd}`,
      valid: isValidHeading(value),
      error: !isValidHeading(value) ? 'Invalid heading' : undefined,
    };
  }
  
  // Fly Heading: F+heading
  if (/^F\d{3}$/.test(cmd)) {
    const value = parseInt(cmd.substring(1));
    return {
      type: 'DIRECT',
      callsign: cs,
      value,
      raw: `${cs} ${cmd}`,
      valid: isValidHeading(value),
      error: !isValidHeading(value) ? 'Invalid heading' : undefined,
    };
  }
  
  // Direct to Waypoint: DIRECT+waypointName or D+waypointName
  if (/^DIRECT[A-Z0-9]+$/.test(cmd) || (/^D[A-Z]+$/.test(cmd) && cmd.length > 2)) {
    const waypointName = cmd.startsWith('DIRECT') ? cmd.substring(6) : cmd.substring(1);
    return {
      type: 'DIRECT_WAYPOINT',
      callsign: cs,
      value: waypointName,
      raw: `${cs} ${cmd}`,
      valid: true, // Waypoint validation happens on backend
    };
  }
  
  // Increase Speed: IS+speed
  if (/^IS\d{3}$/.test(cmd)) {
    const value = parseInt(cmd.substring(2));
    return {
      type: 'INCREASE_SPEED',
      callsign: cs,
      value,
      raw: `${cs} ${cmd}`,
      valid: isValidSpeed(value),
      error: !isValidSpeed(value) ? 'Invalid speed' : undefined,
    };
  }
  
  // Reduce Speed: RS+speed
  if (/^RS\d{3}$/.test(cmd)) {
    const value = parseInt(cmd.substring(2));
    return {
      type: 'REDUCE_SPEED',
      callsign: cs,
      value,
      raw: `${cs} ${cmd}`,
      valid: isValidSpeed(value),
      error: !isValidSpeed(value) ? 'Invalid speed' : undefined,
    };
  }
  
  // Increase Mach: IM+decimal
  if (/^IM\d\.\d{1,2}$/.test(cmd)) {
    const value = parseFloat(cmd.substring(2));
    return {
      type: 'INCREASE_SPEED',
      callsign: cs,
      value,
      raw: `${cs} ${cmd}`,
      valid: isValidMach(value),
      error: !isValidMach(value) ? 'Invalid Mach number' : undefined,
    };
  }
  
  // Reduce Mach: RM+decimal
  if (/^RM\d\.\d{1,2}$/.test(cmd)) {
    const value = parseFloat(cmd.substring(2));
    return {
      type: 'REDUCE_MACH',
      callsign: cs,
      value,
      raw: `${cs} ${cmd}`,
      valid: isValidMach(value),
      error: !isValidMach(value) ? 'Invalid Mach number' : undefined,
    };
  }
  
  // Contact: CT
  if (cmd === 'CT') {
    return {
      type: 'CONTACT',
      callsign: cs,
      raw: `${cs} ${cmd}`,
      valid: true,
    };
  }
  
  // Identify: ID
  if (cmd === 'ID') {
    return {
      type: 'IDENTIFY',
      callsign: cs,
      raw: `${cs} ${cmd}`,
      valid: true,
    };
  }
  
  return {
    type: 'MAINTAIN',
    callsign: cs,
    raw: `${cs} ${cmd}`,
    valid: false,
    error: 'Invalid command format',
  };
}

/**
 * Parse distance measurement command
 * Format: DISTANCE ITEM1 ITEM2
 * where ITEM can be an aircraft callsign or waypoint name
 */
export function parseDistanceCommand(input: string): ParsedCommand {
  const parts = input.trim().toUpperCase().split(/\s+/);
  
  if (parts.length !== 3) {
    return {
      type: 'MAINTAIN',
      raw: input,
      valid: false,
      error: 'Distance command format: DISTANCE ITEM1 ITEM2',
    };
  }
  
  const [keyword, item1, item2] = parts;
  
  if (keyword !== 'DISTANCE') {
    return {
      type: 'MAINTAIN',
      raw: input,
      valid: false,
      error: 'Command must start with DISTANCE',
    };
  }
  
  return {
    type: 'DISTANCE',
    value: { item1, item2 },
    raw: input,
    valid: true,
  };
}

/**
 * Parse voice command using ICAO phraseology
 * Examples from project.md:
 * - "HVN123 descend to flight level one two zero"
 * - "VJC456 turn right heading two seven zero"
 * - "BAV789 increase speed to two five zero knots"
 */
export function parseVoiceCommand(transcript: string): ParsedCommand {
  const lower = transcript.toLowerCase().trim();
  
  // Extract callsign (format: LETTERS+NUMBERS)
  const callsignMatch = lower.match(/^([a-z]+)\s*(\d+)/);
  if (!callsignMatch) {
    return {
      type: 'MAINTAIN',
      raw: transcript,
      valid: false,
      error: 'No callsign detected',
    };
  }
  
  const callsign = (callsignMatch[1] + callsignMatch[2]).toUpperCase();
  
  // DESCEND TO + number + THOUSAND + FEET
  if (/descend to .+ thousand feet/.test(lower)) {
    const altMatch = lower.match(/descend to (.+?) thousand feet/);
    if (altMatch) {
      const altitude = parseICAONumber(altMatch[1]);
      return {
        type: 'DESCEND',
        callsign,
        value: altitude / 100, // Convert to flight level notation
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // CLIMB TO + number + THOUSAND + FEET
  if (/climb to .+ thousand feet/.test(lower)) {
    const altMatch = lower.match(/climb to (.+?) thousand feet/);
    if (altMatch) {
      const altitude = parseICAONumber(altMatch[1]);
      return {
        type: 'CLIMB',
        callsign,
        value: altitude / 100,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // DESCEND TO FLIGHT LEVEL + number
  if (/descend to flight level/.test(lower)) {
    const flMatch = lower.match(/descend to flight level (.+?)(?:\s|$)/);
    if (flMatch) {
      const fl = parseICAOFlightLevel(flMatch[1]);
      return {
        type: 'DESCEND',
        callsign,
        value: fl,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // CLIMB TO FLIGHT LEVEL + number
  if (/climb to flight level/.test(lower)) {
    const flMatch = lower.match(/climb to flight level (.+?)(?:\s|$)/);
    if (flMatch) {
      const fl = parseICAOFlightLevel(flMatch[1]);
      return {
        type: 'CLIMB',
        callsign,
        value: fl,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // STOP DESCEND AT FLIGHT LEVEL + number
  if (/stop descend at flight level/.test(lower)) {
    const flMatch = lower.match(/stop descend at flight level (.+?)(?:\s|$)/);
    if (flMatch) {
      const fl = parseICAOFlightLevel(flMatch[1]);
      return {
        type: 'DESCEND',
        callsign,
        value: fl,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // STOP CLIMB AT FLIGHT LEVEL + number
  if (/stop climb at flight level/.test(lower)) {
    const flMatch = lower.match(/stop climb at flight level (.+?)(?:\s|$)/);
    if (flMatch) {
      const fl = parseICAOFlightLevel(flMatch[1]);
      return {
        type: 'CLIMB',
        callsign,
        value: fl,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // TURN RIGHT HEADING + number
  if (/turn right heading/.test(lower)) {
    const hdgMatch = lower.match(/turn right heading (.+?)(?:\s|$)/);
    if (hdgMatch) {
      const heading = parseICAOFlightLevel(hdgMatch[1]);
      return {
        type: 'TURN_RIGHT',
        callsign,
        value: heading,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // TURN LEFT HEADING + number
  if (/turn left heading/.test(lower)) {
    const hdgMatch = lower.match(/turn left heading (.+?)(?:\s|$)/);
    if (hdgMatch) {
      const heading = parseICAOFlightLevel(hdgMatch[1]);
      return {
        type: 'TURN_LEFT',
        callsign,
        value: heading,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // FLY HEADING + number
  if (/fly heading/.test(lower)) {
    const hdgMatch = lower.match(/fly heading (.+?)(?:\s|$)/);
    if (hdgMatch) {
      const heading = parseICAOFlightLevel(hdgMatch[1]);
      return {
        type: 'DIRECT',
        callsign,
        value: heading,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // INCREASE SPEED BY + number + KNOTS
  if (/increase speed by .+ knots/.test(lower)) {
    const spdMatch = lower.match(/increase speed by (.+?) knots/);
    if (spdMatch) {
      const speed = parseICAONumber(spdMatch[1]);
      return {
        type: 'INCREASE_SPEED',
        callsign,
        value: speed,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // REDUCE SPEED BY + number + KNOTS
  if (/reduce speed by .+ knots/.test(lower)) {
    const spdMatch = lower.match(/reduce speed by (.+?) knots/);
    if (spdMatch) {
      const speed = parseICAONumber(spdMatch[1]);
      return {
        type: 'REDUCE_SPEED',
        callsign,
        value: speed,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // INCREASE SPEED TO + number + KNOTS
  if (/increase speed to .+ knots/.test(lower)) {
    const spdMatch = lower.match(/increase speed to (.+?) knots/);
    if (spdMatch) {
      const speed = parseICAONumber(spdMatch[1]);
      return {
        type: 'INCREASE_SPEED',
        callsign,
        value: speed,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // REDUCE SPEED TO + number + KNOTS
  if (/reduce speed to .+ knots/.test(lower)) {
    const spdMatch = lower.match(/reduce speed to (.+?) knots/);
    if (spdMatch) {
      const speed = parseICAONumber(spdMatch[1]);
      return {
        type: 'REDUCE_SPEED',
        callsign,
        value: speed,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // INCREASE MACH NUMBER BY/TO + decimal
  if (/increase mach number/.test(lower)) {
    const machMatch = lower.match(/increase mach number (?:by|to) (\d\.\d+)/);
    if (machMatch) {
      const mach = parseFloat(machMatch[1]);
      return {
        type: 'INCREASE_SPEED',
        callsign,
        value: mach,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // REDUCE MACH NUMBER BY/TO + decimal
  if (/reduce mach number/.test(lower)) {
    const machMatch = lower.match(/reduce mach number (?:by|to) (\d\.\d+)/);
    if (machMatch) {
      const mach = parseFloat(machMatch[1]);
      return {
        type: 'REDUCE_MACH',
        callsign,
        value: mach,
        raw: transcript,
        valid: true,
      };
    }
  }
  
  // CONTACT + unit + frequency
  if (/contact/.test(lower)) {
    return {
      type: 'CONTACT',
      callsign,
      raw: transcript,
      valid: true,
    };
  }
  
  // IDENTIFIED
  if (/identified/.test(lower)) {
    return {
      type: 'IDENTIFY',
      callsign,
      raw: transcript,
      valid: true,
    };
  }
  
  return {
    type: 'MAINTAIN',
    raw: transcript,
    valid: false,
    error: 'Could not parse voice command',
  };
}

/**
 * Parse ICAO number pronunciation to integer
 * Examples: "one two zero" -> 120, "niner" -> 9, "five thousand" -> 5000
 */
function parseICAONumber(text: string): number {
  const icaoMap: Record<string, string> = {
    'zero': '0',
    'one': '1',
    'two': '2',
    'tree': '3',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'niner': '9',
    'nine': '9',
  };
  
  const words = text.trim().toLowerCase().split(/\s+/);
  let numStr = '';
  let multiplier = 1;
  
  for (const word of words) {
    if (word === 'thousand') {
      multiplier = 1000;
    } else if (icaoMap[word]) {
      numStr += icaoMap[word];
    }
  }
  
  return (parseInt(numStr) || 0) * multiplier;
}

/**
 * Parse ICAO flight level pronunciation to number
 * Examples: "one two zero" -> 120, "two seven zero" -> 270
 */
function parseICAOFlightLevel(text: string): number {
  return parseICAONumber(text);
}

/**
 * Format command for display in command history
 */
export function formatCommand(command: ParsedCommand): string {
  const { callsign, type, value } = command;
  
  switch (type) {
    case 'DESCEND':
      return `${callsign} Descend to Flight Level ${value}`;
    case 'CLIMB':
      return `${callsign} Climb to Flight Level ${value}`;
    case 'TURN_LEFT':
      return `${callsign} Turn left heading ${String(value).padStart(3, '0')}`;
    case 'TURN_RIGHT':
      return `${callsign} Turn right heading ${String(value).padStart(3, '0')}`;
    case 'INCREASE_SPEED':
      if (typeof value === 'number' && value < 10) {
        return `${callsign} Increase Mach number to ${value}`;
      }
      return `${callsign} Increase speed to ${value} knots`;
    case 'REDUCE_SPEED':
      return `${callsign} Reduce speed to ${value} knots`;
    case 'REDUCE_MACH':
      return `${callsign} Reduce Mach number to ${value}`;
    case 'MAINTAIN':
      return `${callsign} Maintain ${value}`;
    case 'DIRECT':
      return `${callsign} Fly heading ${String(value).padStart(3, '0')}`;
    case 'SQUAWK':
      return `${callsign} Squawk ${value}`;
    case 'IDENTIFY':
      return `${callsign} Identified`;
    case 'CONTACT':
      return `${callsign} Contact ${value}`;
    default:
      return command.raw;
  }
}

/**
 * Legacy parseCommand for backward compatibility
 */
export function parseCommand(input: string): ParsedCommand {
  const parts = input.trim().split(/\s+/);
  
  // Check if it's a distance command
  if (parts.length > 0 && parts[0].toUpperCase() === 'DISTANCE') {
    return parseDistanceCommand(input);
  }
  
  if (parts.length < 2) {
    return {
      type: 'MAINTAIN',
      raw: input,
      valid: false,
      error: 'Command must include callsign and clearance',
    };
  }
  
  const callsign = parts[0];
  const clearance = parts.slice(1).join(' ');
  
  return parseManualCommand(callsign, clearance);
}
