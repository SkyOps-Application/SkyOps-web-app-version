import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import routes from './routes';

const app = express();

// Middleware
app.use(cors({
    origin: env.CORS_ORIGIN,
}));
app.use(express.json());

// Routes
app.use('/api', routes); // Mount API routes under /api
app.use('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
