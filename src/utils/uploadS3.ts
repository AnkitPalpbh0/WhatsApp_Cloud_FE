import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const uploadFile = async (file: File): Promise<string | null> => {
  console.log(file, "file");
  if (!file) return null;

  try {
    const bucketName = import.meta.env.VITE_S3_BUCKET!;
    console.log(bucketName, "bucket");

    const key = `uploads/${Date.now()}_${file.name}`;

    const arrayBuffer = await file.arrayBuffer();
    const fileBody = new Uint8Array(arrayBuffer);
    console.log("heloo");
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: fileBody,
      ContentType: file.type,
    };

    console.log(uploadParams, "uploadParams");

    const uploadCommand = new PutObjectCommand(uploadParams);
    await s3Client.send(uploadCommand);

    // ✅ Construct public URL
    const publicUrl = `${key}`;

    return publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export const getPresignedUrl = async (key: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: import.meta.env.VITE_S3_BUCKET!,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour
  return url;
};
