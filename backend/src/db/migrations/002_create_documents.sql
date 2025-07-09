-- 002_create_documents.sql
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    s3_key TEXT NOT NULL,
    metadata JSONB,
    extracted_text TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
