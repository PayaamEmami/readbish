import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../storage/s3';
import { createDocument } from '../db/document';
import pdfParse from 'pdf-parse';
import { getUserFromRequest } from '../auth/jwt';

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
    await uploadFile(); // S3 stub expects no arguments in current implementation

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

export default router;
