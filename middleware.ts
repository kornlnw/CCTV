import { NextRequest, NextResponse } from "next/server";

async function verifyEdge(token: string | undefined, secret: string): Promise<boolean> {
  if (!token || !secret) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || expires <= Date.now()) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const macBuf = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const expected = Array.from(new Uint8Array(macBuf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

function withPath(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return withPath(req);

  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  const token = req.cookies.get("cctv_admin")?.value;
  const ok = await verifyEdge(token, secret);
  if (ok) return withPath(req);

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
