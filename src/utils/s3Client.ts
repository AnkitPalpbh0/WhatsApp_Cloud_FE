// src/utils/s3Client.ts
import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: import.meta.env.VITE_S3_REGION_NAME!,
  credentials: {
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY!,
    secretAccessKey: import.meta.env.VITE_S3_SECRET_KEY!,
  },
});
