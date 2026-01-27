/**
 * Socket.io client for real-time communication
 */

import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '@atc-radar-sim/shared';

import { SIMULATOR_URL } from './config';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export function getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
  if (!socket) {
    const url = SIMULATOR_URL;

    console.log('Creating socket connection to:', url);

    socket = io(url, {
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
      auth: (cb) => {
        // Retrieve token from localStorage on every connection attempt
        const token = localStorage.getItem('access_token');
        cb({ token });
      }
    });

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Connected to server - Socket ID:', socket?.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from server:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
      console.error('Make sure backend is running on http://localhost:4000');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  return socket;
}

export function connectSocket(): void {
  const socket = getSocket();
  if (!socket.connected) {
    console.log('🔌 Connecting socket...');
    socket.connect();
  } else {
    console.log('Socket already connected');
  }
}

export function disconnectSocket(): void {
  if (socket?.connected) {
    socket.disconnect();
  }
}

