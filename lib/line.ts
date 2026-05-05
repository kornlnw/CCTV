import crypto from "crypto";

const LINE_API = "https://api.line.me/v2/bot";
const LINE_DATA_API = "https://api-data.line.me/v2/bot";

export function verifyLineSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  const secret = process.env.LINE_CHANNEL_SECRET ?? "";
  const hmac = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
}

async function lineFetch(path: string, init: RequestInit = {}, base = LINE_API) {
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`LINE ${path} ${res.status}: ${await res.text()}`);
  return res;
}

export async function replyText(replyToken: string, text: string) {
  return lineFetch("/message/reply", {
    method: "POST",
    body: JSON.stringify({ replyToken, messages: [{ type: "text", text }] }),
  });
}

export async function pushMessage(to: string, messages: unknown[]) {
  return lineFetch("/message/push", {
    method: "POST",
    body: JSON.stringify({ to, messages }),
  });
}

export async function getProfile(userId: string) {
  const res = await lineFetch(`/profile/${userId}`);
  return res.json() as Promise<{ userId: string; displayName: string; pictureUrl?: string }>;
}

export async function getMessageContent(messageId: string): Promise<Buffer> {
  const res = await lineFetch(`/message/${messageId}/content`, {}, LINE_DATA_API);
  return Buffer.from(await res.arrayBuffer());
}
