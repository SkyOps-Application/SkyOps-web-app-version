import { Request, Response } from 'express';
import { EXERCISE_1, EXERCISE_2 } from '@atc-radar-sim/shared/src/data/exercises';

export class ExerciseController {
    static getAll(_req: Request, res: Response) {
        res.json([
            { id: 1, name: 'Exercise 1', startTime: '03:00', aircraftCount: 9 },
            { id: 2, name: 'Exercise 2', startTime: '04:30', aircraftCount: 10 },
        ]);
    }

    static getById(req: Request, res: Response) {
        const id = parseInt(req.params.id as string);
        const exercise = id === 1 ? EXERCISE_1 : id === 2 ? EXERCISE_2 : null;

        if (exercise) {
            res.json(exercise);
        } else {
            res.status(404).json({ error: 'Exercise not found' });
        }
    }
}
