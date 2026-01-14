import { Router } from 'express';
import { ExerciseController } from '../controllers/exercise.controller';

const router = Router();

router.get('/', ExerciseController.getAll);
router.get('/:id', ExerciseController.getById);

export default router;
