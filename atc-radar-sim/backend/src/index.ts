/**
 * Main server entry point
 */

import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { ServerToClientEvents, ClientToServerEvents } from '@atc-radar-sim/shared';

import { setupSocketHandlers } from './socket/handlers';
import { ExerciseRunner } from './simulation/exercise-runner';
import { EXERCISE_1, EXERCISE_2 } from '@atc-radar-sim/shared/src/data/exercises';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.CORS_ORIGIN || 'http://localhost:3000'
    ],
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.CORS_ORIGIN || 'http://localhost:3000'
  ],
}));
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.get('/api/status', (_req, res) => {
  res.json({
    activeConnections: io.engine.clientsCount,
    uptime: process.uptime(),
  });
});

// Initialize exercise runner (replaces simulation engine for exercises)
const exerciseRunner = new ExerciseRunner(io);

// Setup Socket.IO handlers
setupSocketHandlers(io, exerciseRunner);

// Add exercise routes
app.get('/api/exercises', (_req, res) => {
  res.json([
    { id: 1, name: 'Exercise 1', startTime: '03:00', aircraftCount: 9 },
    { id: 2, name: 'Exercise 2', startTime: '04:30', aircraftCount: 10 },
  ]);
});

app.get('/api/exercises/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exercise = id === 1 ? EXERCISE_1 : id === 2 ? EXERCISE_2 : null;
  
  if (exercise) {
    res.json(exercise);
  } else {
    res.status(404).json({ error: 'Exercise not found' });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`ATC Radar Simulation Server running on port ${PORT}`);
  console.log(`WebSocket server ready`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  exerciseRunner.stop();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

