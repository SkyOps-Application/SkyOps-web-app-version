import { Router } from 'express';
import exerciseRoutes from './exercise.routes';

const router = Router();

router.get('/status', (_req, res) => {
    // keep it simple
    res.json({ status: 'API operational' });
});

router.use('/exercises', exerciseRoutes);

export default router;
