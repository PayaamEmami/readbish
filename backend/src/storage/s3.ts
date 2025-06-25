import { S3 } from 'aws-sdk';

const s3 = new S3();

export const uploadFile = async (bucketName: string, key: string, body: Buffer | string) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: body,
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location;
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        throw new Error(`Error uploading file: ${err.message}`);
    }
};

export const getFile = async (bucketName: string, key: string) => {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        const data = await s3.getObject(params).promise();
        return data.Body;
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        throw new Error(`Error getting file: ${err.message}`);
    }
};

export const deleteFile = async (bucketName: string, key: string) => {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        await s3.deleteObject(params).promise();
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        throw new Error(`Error deleting file: ${err.message}`);
    }
};