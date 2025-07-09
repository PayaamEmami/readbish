import { Router, Request, Response } from 'express';
import { generateText } from '../llm/openai';

const router = Router();

/**
 * POST /ask
 * Body: { question: string, context?: string }
 * Returns: { answer: string }
 */
router.post('/ask', async (req: Request, res: Response) => {
  const { question, context } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }
  let prompt = question;
  if (context) {
    prompt = `Context: ${context}\nQuestion: ${question}`;
  }
  try {
    const answer = await generateText(prompt);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get answer from assistant.' });
  }
});

export default router;
