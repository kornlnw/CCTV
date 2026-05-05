import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", db: "ok", time: new Date().toISOString() });
  } catch (e: any) {
    return NextResponse.json({ status: "degraded", db: "down", error: e?.message }, { status: 503 });
  }
}
