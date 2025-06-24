import { Router } from 'express';

const router = Router();

// Example route
router.get('/', (req, res) => {
    res.send('Welcome to the Readbish API!');
});

// Additional routes can be added here

export default router;