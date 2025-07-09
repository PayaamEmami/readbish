import { Router, Request, Response } from 'express';
import authRoutes from './auth';
import llmRoutes from './llm';

const router = Router();

router.use('/auth', authRoutes);
router.use('/llm', llmRoutes);

// Example route
router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Readbish API!');
});

// Additional routes can be added here

export default router;