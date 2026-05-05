import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { name, email, phone, message } = body as Record<string, string>;
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  try {
    await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, message },
    });
  } catch (err) {
    console.error("[contact] DB unavailable, logging only:", err);
  }

  return NextResponse.json({ ok: true });
}
