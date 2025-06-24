import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { Readable } from 'stream';

const client = new TextToSpeechClient();

export const synthesizeSpeech = async (text: string, voice: string, outputFormat: string) => {
    const request = {
        input: { text },
        voice: { languageCode: 'en-US', name: voice },
        audioConfig: { audioEncoding: outputFormat },
    };

    const [response] = await client.synthesizeSpeech(request);
    const audioStream = new Readable();
    audioStream._read = () => {}; // No-op
    audioStream.push(response.audioContent);
    audioStream.push(null);
    
    return audioStream;
};