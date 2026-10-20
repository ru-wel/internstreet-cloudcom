import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

// Neon object storage (S3-compatible). Locally the Neon CLI writes the AWS_* names to .env.
// Vercel reserves AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY/AWS_REGION for its own credentials,
// so the deployed app reads the S3_* names instead.
const s3 = new S3Client({
  region: process.env.S3_REGION || process.env.AWS_REGION,
  endpoint: process.env.S3_ENDPOINT || process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // Neon only supports path-style addressing
});

// Private bucket declared in neon.ts; holds resumes and cover letters
const BUCKET = 'uploads';

export { s3, BUCKET };
