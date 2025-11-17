/**
 * Exercise data from project.md
 * Exercise 1 & Exercise 2 with aircraft spawn times and routes
 */


export interface ExerciseAircraft {
  callsign: string;
  mach: number;
  speed: number;
  spawnPoint: string;
  route: string[];
  destination: string;
  spawnTime: string; // Format: "HH:MM"
  flightLevel: number | string; // Can be "0" for climbing aircraft
}

export interface Exercise {
  id: number;
  name: string;
  startTime: string; // Format: "HH:MM"
  aircraft: ExerciseAircraft[];
}

// Exercise 1 - Start time: 03:00
export const EXERCISE_1: Exercise = {
  id: 1,
  name: "Exercise 1",
  startTime: "03:00",
  aircraft: [
    {
      callsign: "HVN1120",
      mach: 0.80,
      speed: 450,
      spawnPoint: "TSH",
      route: ["TSH", "AC", "BMT", "PLK", "DAN"],
      destination: "DAN",
      spawnTime: "03:03",
      flightLevel: "0", // Climbing to FL370
    },
    {
      callsign: "HVN121",
      mach: 0.70,
      speed: 270,
      spawnPoint: "TSH",
      route: ["TSH", "SAPEN", "POPET", "PNH"],
      destination: "PNH",
      spawnTime: "03:07",
      flightLevel: "0", // Climbing to FL180
    },
    {
      callsign: "HVN853",
      mach: 0.82,
      speed: 480,
      spawnPoint: "TSH",
      route: ["TSH", "SAPEN", "POPET", "PNH"],
      destination: "PNH",
      spawnTime: "03:10",
      flightLevel: "0", // Climbing to FL310
    },
    {
      callsign: "VJC793",
      mach: 0.80,
      speed: 420,
      spawnPoint: "PLK",
      route: ["PLK", "BMT", "AC", "TSH"],
      destination: "TSH",
      spawnTime: "03:00",
      flightLevel: 280,
    },
    {
      callsign: "HVN1929",
      mach: 0.80,
      speed: 450,
      spawnPoint: "PLK",
      route: ["PLK", "BMT", "AC", "TSH"],
      destination: "TSH",
      spawnTime: "03:03",
      flightLevel: 320,
    },
    {
      callsign: "HVN465",
      mach: 0.68,
      speed: 270,
      spawnPoint: "LKH",
      route: ["LKH", "AC", "TSH"],
      destination: "TSH",
      spawnTime: "03:00",
      flightLevel: 160,
    },
    {
      callsign: "JAL680",
      mach: 0.81,
      speed: 450,
      spawnPoint: "PNH",
      route: ["PNH", "POPET", "SAPEN", "TSH"],
      destination: "TSH",
      spawnTime: "03:15",
      flightLevel: 330,
    },
    {
      callsign: "BAV645",
      mach: 0.83,
      speed: 500,
      spawnPoint: "PLK",
      route: ["PLK", "BMT", "AC", "TSH", "SAPEN", "POPET", "PNH"],
      destination: "PNH",
      spawnTime: "03:01",
      flightLevel: 340,
    },
    {
      callsign: "FDX5199",
      mach: 0.80,
      speed: 475,
      spawnPoint: "PTH",
      route: ["PTH", "BAOMY", "TSH", "SAPEN", "POPET", "PNH"],
      destination: "PNH",
      spawnTime: "03:11",
      flightLevel: 320,
    },
  ],
};

// Exercise 2 - Start time: 04:30
export const EXERCISE_2: Exercise = {
  id: 2,
  name: "Exercise 2",
  startTime: "04:30",
  aircraft: [
    {
      callsign: "HVN1338",
      mach: 0.70,
      speed: 270,
      spawnPoint: "TSH",
      route: ["TSH", "AC", "BMT"],
      destination: "BMT",
      spawnTime: "04:31",
      flightLevel: "0", // Climbing to FL150
    },
    {
      callsign: "JAL759",
      mach: 0.82,
      speed: 480,
      spawnPoint: "TSH",
      route: ["TSH", "BITIS", "BIBAN"],
      destination: "BIBAN",
      spawnTime: "04:35",
      flightLevel: "0", // Climbing to FL340
    },
    {
      callsign: "HVN1214",
      mach: 0.80,
      speed: 450,
      spawnPoint: "TSH",
      route: ["TSH", "AC", "BMT", "PLK", "DAN"],
      destination: "DAN",
      spawnTime: "04:36",
      flightLevel: "0", // Climbing to FL370
    },
    {
      callsign: "HVN757",
      mach: 0.80,
      speed: 420,
      spawnPoint: "TSH",
      route: ["TSH", "BITIS", "BIBAN"],
      destination: "BIBAN",
      spawnTime: "04:40",
      flightLevel: "0", // Climbing to FL280
    },
    {
      callsign: "HVN1257",
      mach: 0.70,
      speed: 260,
      spawnPoint: "PLK",
      route: ["PLK", "BMT", "AC", "TSH"],
      destination: "TSH",
      spawnTime: "04:24",
      flightLevel: 200,
    },
    {
      callsign: "HVN1219",
      mach: 0.81,
      speed: 450,
      spawnPoint: "PLK",
      route: ["PLK", "BMT", "AC", "TSH"],
      destination: "TSH",
      spawnTime: "04:29",
      flightLevel: 320,
    },
    {
      callsign: "HVN1121",
      mach: 0.81,
      speed: 450,
      spawnPoint: "PLK",
      route: ["PLK", "BMT", "AC", "TSH"],
      destination: "TSH",
      spawnTime: "04:30",
      flightLevel: 360,
    },
    {
      callsign: "BAV862",
      mach: 0.83,
      speed: 475,
      spawnPoint: "BIBAN",
      route: ["BIBAN", "BITIS", "TSH", "AC", "BMT", "PLK"],
      destination: "PLK",
      spawnTime: "04:30",
      flightLevel: 330,
    },
    {
      callsign: "FDX3201",
      mach: 0.80,
      speed: 430,
      spawnPoint: "BIBAN",
      route: ["BIBAN", "BITIS", "TSH", "AC", "BMT", "PLK"],
      destination: "PLK",
      spawnTime: "04:35",
      flightLevel: 270,
    },
    {
      callsign: "VFC992",
      mach: 0.83,
      speed: 475,
      spawnPoint: "ELSAS",
      route: ["ELSAS", "TSH", "SAPEN", "POPET", "PNH"],
      destination: "PNH",
      spawnTime: "04:40",
      flightLevel: 360,
    },
  ],
};

export const EXERCISES = [EXERCISE_1, EXERCISE_2];

/**
 * Get exercise by ID
 */
export function getExercise(id: number): Exercise | undefined {
  return EXERCISES.find(ex => ex.id === id);
}

/**
 * Parse time string to minutes since midnight
 */
export function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Format minutes since midnight to HH:MM:SS
 */
export function formatTime(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const secs = Math.floor((minutes % 1) * 60);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

