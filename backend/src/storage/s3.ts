// S3 stubs for local/dev: Replace with real AWS logic when infra is ready

export interface UploadFileParams {
  key: string;
  body: Buffer;
  contentType: string;
}

export const uploadFile = async (params: UploadFileParams) => {
    void params; // Prevent unused variable lint error
    // TODO: Implement real S3 upload when AWS is ready
    throw new Error('S3 uploadFile not implemented: no cloud infrastructure configured.');
};

export const getFile = async () => {
    // TODO: Implement real S3 get when AWS is ready
    throw new Error('S3 getFile not implemented: no cloud infrastructure configured.');
};

export const deleteFile = async () => {
    // TODO: Implement real S3 delete when AWS is ready
    throw new Error('S3 deleteFile not implemented: no cloud infrastructure configured.');
};