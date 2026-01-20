import { Server } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '@atc-radar-sim/shared';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

// Load env from backend root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'dev-secret-key-change-in-prod';

// Extend Socket type to include user data
declare module 'socket.io' {
    interface Socket {
        userId?: string;
    }
}

class SocketService {
    private static instance: SocketService;
    public io: Server<ClientToServerEvents, ServerToClientEvents> | null = null;

    private constructor() { }

    static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    initialize(httpServer: any, options: any) {
        this.io = new Server(httpServer, options);

        // Authentication Middleware
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;

            if (!token) {
                console.log('No token provided, treating as guest/anonymous');
                return next();
            }

            jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    console.error('Socket Auth Error:', err.message);
                    return next(new Error('Authentication error'));
                }

                socket.userId = decoded.sub;
                console.log(`Socket Auth Success: User ${socket.userId} connected`);
                next();
            });
        });

        return this.io;
    }
}

export const socketService = SocketService.getInstance();
