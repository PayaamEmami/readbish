import { S3 } from 'aws-sdk';
import { createReadStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3();

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

if (!BUCKET_NAME) {
    throw new Error('AWS_S3_BUCKET_NAME environment variable is not set.');
}

async function generateAudio(): Promise<string> {
    const audioFileName = `${uuidv4()}.mp3`;
    const audioFilePath = join(__dirname, audioFileName);

    // Simulate audio generation (replace with actual TTS logic)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Upload the generated audio file to S3
    await uploadToS3(audioFilePath, audioFileName);

    return audioFileName;
}

async function uploadToS3(filePath: string, key: string): Promise<void> {
    const fileStream = createReadStream(filePath);
    const uploadParams = {
        Bucket: BUCKET_NAME as string, // ensure type is string
        Key: key,
        Body: fileStream,
    };

    await s3.upload(uploadParams).promise();
}

if (require.main === module) {
    const filePath = process.argv[2];
    if (!filePath) {
        console.error('Please provide a file path to generate audio from.');
        process.exit(1);
    }

    generateAudio()
        .then((audioFileName) => {
            console.log(`Audio generated and uploaded: ${audioFileName}`);
        })
        .catch((error) => {
            console.error('Error generating audio:', error);
        });
}