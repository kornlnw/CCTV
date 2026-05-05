import crypto from "crypto";

const COOKIE_NAME = "cctv_admin";
const TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET ?? "";
  if (s.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set (>= 32 chars).");
  }
  return s;
}

export function adminCookieName() {
  return COOKIE_NAME;
}

export function signSession(): string {
  const expires = Date.now() + TTL_MS;
  const payload = `${expires}`;
  const sig = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySession(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  let expected: string;
  try {
    expected = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  } catch {
    return false;
  }
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && expires > Date.now();
}

export function checkPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  if (submitted.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(submitted), Buffer.from(expected));
}
