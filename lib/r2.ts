import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

export const r2Configured = Boolean(accountId && accessKeyId && secretAccessKey && process.env.R2_BUCKET);

const client = r2Configured
  ? new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! },
    })
  : null;

export async function uploadToR2(opts: {
  key: string;
  body: Buffer;
  contentType: string;
}): Promise<string> {
  if (!client) throw new Error("R2 not configured. Set R2_* env vars.");
  const bucket = process.env.R2_BUCKET!;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: opts.key,
      Body: opts.body,
      ContentType: opts.contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, "") ?? "";
  return `${base}/${opts.key}`;
}
