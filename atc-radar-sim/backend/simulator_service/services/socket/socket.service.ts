import { Server } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '@atc-radar-sim/shared';

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
        return this.io;
    }
}

export const socketService = SocketService.getInstance();
