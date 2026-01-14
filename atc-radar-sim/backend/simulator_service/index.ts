/**
 * Main server entry point
 */

import http from 'http';
import app from './app';
import { env } from './config/env';
import { socketService } from './services/socket/socket.service';
import { setupSocketHandlers } from './services/socket/handlers';
import { ExerciseRunner } from './services/simulation/exercise-runner';

const server = http.createServer(app);

// Initialize Socket.IO
const io = socketService.initialize(server, {
  cors: {
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

// Initialize exercise runner
const exerciseRunner = new ExerciseRunner(io);

// Setup Socket.IO handlers
setupSocketHandlers(io, exerciseRunner);

// Start server
server.listen(env.PORT, () => {
  console.log(`ATC Radar Simulation Server running on port ${env.PORT}`);
  console.log(`WebSocket server ready`);
  console.log(`Environment: ${env.NODE_ENV}`);
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

