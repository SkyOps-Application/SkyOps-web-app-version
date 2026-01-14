import { Router } from 'express';
import exerciseRoutes from './exercise.routes';

const router = Router();

router.get('/status', (_req, res) => {
    // @ts-ignore - IO object is attached to app or handled differently in new structure?
    // We need a way to access IO status. For now, let's keep it simple or inject a service.
    // Ideally, status should be handled by a StatusController that has access to the service.
    res.json({ status: 'API operational' });
});

router.use('/exercises', exerciseRoutes);

export default router;
