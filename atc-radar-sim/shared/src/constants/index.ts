/**
 * Shared constants
 */

// Separation standards
export const SEPARATION_STANDARDS = {
  HORIZONTAL_MIN: 5,      // nautical miles
  VERTICAL_MIN: 1000,     // feet
  WARNING_THRESHOLD: 7,   // nautical miles (start warning)
};

// Display settings
export const RADAR_SETTINGS = {
  DEFAULT_ZOOM: 1.0,
  MIN_ZOOM: 0.5,
  MAX_ZOOM: 4.0,
  ZOOM_STEP: 0.1,
  
  // History trail
  TRAIL_LENGTH: 10,       // number of positions
  TRAIL_INTERVAL: 5000,   // milliseconds
  
  // Vector display
  VECTOR_LENGTH: 60,      // seconds (1 minute)
};

// Aircraft performance
export const AIRCRAFT_PERFORMANCE = {
  MAX_CLIMB_RATE: 2500,    // feet per minute
  MAX_DESCENT_RATE: 3000,  // feet per minute
  TURN_RATE: 3,            // degrees per second (standard rate turn)
  ACCELERATION: 5,         // knots per second
};

// Audio settings
export const AUDIO_SETTINGS = {
  CONFIRMATION_SOUND: '/sounds/ting.mp3',
  ERROR_SOUND: '/sounds/error.mp3',
  ALERT_SOUND: '/sounds/alert.mp3',
};

// Colors
export const RADAR_COLORS = {
  BACKGROUND: '#0a0e1a',
  GRID: '#1a2332',
  WAYPOINT: '#4a5568',
  ROUTE: '#2d3748',
  
  // Aircraft states
  UNKNOWN: '#718096',
  CONTACT: '#f6ad55',
  IDENTIFIED: '#48bb78',
  CONFLICT: '#f56565',
  TRANSFERRED: '#9f7aea',
  HANDOFF: '#4299e1',
  
  // UI elements
  TEXT: '#e2e8f0',
  TEXT_DIM: '#718096',
  HIGHLIGHT: '#63b3ed',
  WARNING: '#fbd38d',
  ERROR: '#fc8181',
};

// Update intervals
export const UPDATE_INTERVALS = {
  AIRCRAFT_POSITION: 1000,  // 1 second
  SEPARATION_CHECK: 2000,   // 2 seconds
  UI_REFRESH: 50,           // 50ms (20 FPS)
};

