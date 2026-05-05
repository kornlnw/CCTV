import { NextRequest, NextResponse } from "next/server";
import { uploadToR2, r2Configured } from "@/lib/r2";
import crypto from "crypto";

export const runtime = "nodejs";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  if (!r2Configured) {
    return NextResponse.json({ error: "R2 not configured. Set R2_* env vars." }, { status: 500 });
  }
  const form = await req.formData();
  const file = form.get("file") as File | null;
  const folder = String(form.get("folder") ?? "uploads");
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Unsupported type" }, { status: 400 });
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "File too large (5 MB max)" }, { status: 400 });

  const buf = Buffer.from(await file.arrayBuffer());
  const ext = file.type.split("/")[1] ?? "bin";
  const key = `${folder.replace(/[^a-z0-9-_/]/gi, "")}/${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const url = await uploadToR2({ key, body: buf, contentType: file.type });
  return NextResponse.json({ url, key });
}
