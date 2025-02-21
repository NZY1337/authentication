import dotenv from 'dotenv';

dotenv.config({ path: '.env'});

export const PORT = process.env.PORT!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD!
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME!;
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION!;
export const AWS_USER_ACCESS_KEY = process.env.AWS_USER_ACCESS_KEY!;
export const AWS_USER_SECRET_ACCESS_KEY = process.env.AWS_USER_SECRET_ACCESS_KEY!;
