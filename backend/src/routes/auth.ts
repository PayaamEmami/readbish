import { Router, Request, Response } from 'express';
import { findUserByEmail, createUser } from '../db/user';
import { hashPassword, comparePassword } from '../auth/password';
import { generateToken } from '../auth/jwt';

const router = Router();

// Registration endpoint
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ error: 'User already exists.' });
      return;
    }
    const password_hash = await hashPassword(password);
    const user = await createUser(email, password_hash);
    const token = generateToken({ userId: user.id, email: user.email });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials.' });
      return;
    }
    const valid = await comparePassword(password, user.password_hash);
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials.' });
      return;
    }
    const token = generateToken({ userId: user.id, email: user.email });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
