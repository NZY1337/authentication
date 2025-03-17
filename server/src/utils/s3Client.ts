import { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_USER_ACCESS_KEY, AWS_USER_SECRET_ACCESS_KEY } from "../secrets";
import { PutObjectCommand, S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { S3UploadParams } from "../types/s3";

const s3client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: AWS_USER_ACCESS_KEY,
      secretAccessKey: AWS_USER_SECRET_ACCESS_KEY,
    },
});

const s3 = {
    setFile: async (key: string, body: Buffer, contenType: string) => {
        const params: S3UploadParams = {    
            Bucket: AWS_BUCKET_NAME,
            Key: key,
            Body: body,
            ContentType: contenType,
        }; 

        const command = new PutObjectCommand(params);
        await s3client.send(command);
    },
    getFile: (key: string) => {
        return `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/${key}`;
    },
    validate: async (key: string) => {
        const params = { Bucket: AWS_BUCKET_NAME, Key: key };
        await s3client.send(new HeadObjectCommand(params)); // Throws an error if the object 
    },
}

export default s3;