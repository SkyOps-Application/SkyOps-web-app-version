import express from 'express';
import { corsMiddleware } from './middleware/cors';
import routes from './routes';

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/api', routes); // Mount API routes under /api
app.use('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
