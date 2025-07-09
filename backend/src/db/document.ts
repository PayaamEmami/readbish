import { query } from './index';

export interface Document {
  id: number;
  user_id: number;
  filename: string;
  s3_key: string;
  metadata: Record<string, unknown>;
  extracted_text: string;
  created_at: string;
  updated_at: string;
}

export async function createDocument({
  user_id,
  filename,
  s3_key,
  metadata,
  extracted_text,
}: {
  user_id: number;
  filename: string;
  s3_key: string;
  metadata: Record<string, unknown>;
  extracted_text: string;
}): Promise<Document> {
  const result = await query(
    `INSERT INTO documents (user_id, filename, s3_key, metadata, extracted_text)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [user_id, filename, s3_key, metadata, extracted_text]
  );
  return result.rows[0];
}

export async function getDocumentsByUser(user_id: number): Promise<Document[]> {
  const result = await query(
    `SELECT * FROM documents WHERE user_id = $1 ORDER BY created_at DESC`,
    [user_id]
  );
  return result.rows;
}
