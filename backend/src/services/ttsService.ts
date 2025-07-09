import { generateSpeech } from '../llm/openai';
import { uploadFile } from '../storage/s3';
import { v4 as uuidv4 } from 'uuid';

/**
 * Synthesize speech from text, upload to S3, and return S3 key.
 * @param text The text to synthesize.
 * @param userId The user requesting the audio (for S3 path).
 * @param voice The TTS voice.
 * @returns S3 key of the uploaded audio file.
 */
export const synthesizeSpeech = async (
  text: string,
  userId: string,
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'alloy'
): Promise<string> => {
  // Generate audio buffer from OpenAI
  const audioBuffer = await generateSpeech(text, voice, 'mp3');
  // Generate S3 key
  const s3Key = `tts/${userId}/${uuidv4()}.mp3`;
  // Upload to S3
  await uploadFile({
    key: s3Key,
    body: audioBuffer,
    contentType: 'audio/mpeg',
  });
  return s3Key;
};