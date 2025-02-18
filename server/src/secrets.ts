import dotenv from 'dotenv';

dotenv.config({ path: '.env'});

export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET!
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD!
