export type S3UploadParams = {
    Bucket: string;
    Key: string;
    Body: Buffer;
    ContentType: string;
};
