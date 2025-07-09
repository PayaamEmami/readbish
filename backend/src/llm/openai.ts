import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateText = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
    });
    return response.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text from OpenAI");
  }
};

/**
 * Generate speech audio from text using OpenAI TTS API.
 * @param text The text to synthesize.
 * @param voice The voice to use (e.g., 'alloy', 'echo', etc.).
 * @param format The audio format (e.g., 'mp3').
 * @returns Buffer containing audio data.
 */
export const generateSpeech = async (
  text: string,
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'alloy',
  format: 'mp3' | 'opus' | 'aac' | 'flac' | 'wav' | 'pcm' = 'mp3'
): Promise<Buffer> => {
  try {
    const response = await openai.audio.speech.create({
      model: 'tts-1',
      input: text,
      voice,
      response_format: format,
    });
    // OpenAI SDK returns a web ReadableStream, need to convert to Buffer
    const stream = response.body as ReadableStream<Uint8Array>;
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    let done = false;
    while (!done) {
      const result = await reader.read();
      done = result.done;
      if (result.value) chunks.push(result.value);
    }
    return Buffer.concat(chunks.map((c) => Buffer.from(c)));
  } catch (error) {
    console.error('Error generating speech:', error);
    throw new Error('Failed to generate speech from OpenAI');
  }
};