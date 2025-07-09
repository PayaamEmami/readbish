import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../storage/s3';
import { createDocument } from '../db/document';
import pdfParse from 'pdf-parse';
import { getUserFromRequest } from '../auth/jwt';
import { synthesizeSpeech } from '../services/ttsService';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    const file = (req as { file?: { originalname: string; buffer: Buffer; mimetype: string; } }).file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    // Upload to S3
    const s3Key = `documents/${user.id}/${Date.now()}_${file.originalname}`;
    await uploadFile({
      key: s3Key,
      body: file.buffer,
      contentType: file.mimetype,
    });

    // Parse PDF (extend for other types as needed)
    let extracted_text = '';
    let metadata: Record<string, unknown> = {};
    if (file.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(file.buffer);
      extracted_text = pdfData.text;
      metadata = pdfData.info as Record<string, unknown>;
    }
    // TODO: Add support for other file types

    const doc = await createDocument({
      user_id: user.id,
      filename: file.originalname,
      s3_key: s3Key,
      metadata,
      extracted_text,
    });
    res.json({ document: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload and parse document' });
  }
});

/**
 * POST /tts
 * Body: { text: string, voice?: string }
 * Returns: { audioUrl: string }
 */
router.post('/tts', async (req, res) => {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    const { text, voice } = req.body;
    if (!text) return res.status(400).json({ error: 'No text provided' });
    // Synthesize and upload audio
    const s3Key = await synthesizeSpeech(text, String(user.id), voice);
    // Generate a presigned URL or return the S3 key (stub for now)
    // In production, use S3 SDK to generate a presigned URL
    res.json({ audioKey: s3Key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to synthesize speech' });
  }
});

export default router;
