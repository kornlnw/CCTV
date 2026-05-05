import { NextRequest, NextResponse } from "next/server";
import { verifyLineSignature, replyText, getProfile, getMessageContent, pushMessage } from "@/lib/line";
import { prisma } from "@/lib/prisma";
import { runAgent } from "@/lib/ai";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sig = req.headers.get("x-line-signature");
  if (!verifyLineSignature(raw, sig)) {
    return NextResponse.json({ error: "bad signature" }, { status: 401 });
  }

  const body = JSON.parse(raw) as { events: any[] };

  // Acknowledge fast; process events without blocking the 200 response.
  Promise.all(body.events.map(handleEvent)).catch((e) => console.error("event error", e));

  return NextResponse.json({ ok: true });
}

async function handleEvent(ev: any) {
  if (ev.type === "postback") return handlePostback(ev);
  if (ev.type !== "message") return;
  const lineUserId: string = ev.source?.userId;
  if (!lineUserId) return;

  const customer = await ensureCustomer(lineUserId);

  let userText = "";
  let imageData: string | undefined;

  if (ev.message.type === "text") {
    userText = ev.message.text;
  } else if (ev.message.type === "image") {
    const buf = await getMessageContent(ev.message.id);
    imageData = buf.toString("base64");
    // Treat as a slip upload: attach to most recent AWAITING_SLIP order.
    await attachSlipIfPending(customer.id, buf);
    userText = "(uploaded a payment slip image)";
  } else {
    return;
  }

  const result = await runAgent({ customerId: customer.id, lineUserId }, userText, imageData);
  if (!result.text) return;

  const messages: any[] = [{ type: "text", text: result.text }];
  if (result.paymentPayload) {
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(result.paymentPayload)}`;
    messages.push({
      type: "image",
      originalContentUrl: qr,
      previewImageUrl: qr,
    });
  }

  if (ev.replyToken) {
    await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ replyToken: ev.replyToken, messages }),
    });
  }
}

async function handlePostback(ev: any) {
  const data: string = ev.postback?.data ?? "";
  const adminId = ev.source?.userId;
  if (adminId !== process.env.ADMIN_LINE_USER_ID) {
    console.warn("postback from non-admin ignored:", adminId);
    return;
  }
  const [action, orderId, rawAmount] = data.split(":");
  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { customer: true } });
  if (!order) return;

  if (action === "discount_approve") {
    const amount = Number(rawAmount);
    const subtotal = Number(order.subtotal);
    const newTotal = Math.max(0, subtotal - amount);
    await prisma.order.update({
      where: { id: order.id },
      data: { discountAmount: amount, totalAmount: newTotal, discountReason: "Admin-approved custom discount", pendingApproval: false },
    });
    await pushMessage(order.customer.lineUserId, [
      { type: "text", text: `🎉 ทีมอนุมัติส่วนลด ${amount.toLocaleString()}฿ ให้แล้วค่ะ\nยอดใหม่: ${newTotal.toLocaleString()}฿\nกรุณาโอนตามยอดใหม่นี้ค่ะ` },
    ]);
    if (ev.replyToken) {
      await fetch("https://api.line.me/v2/bot/message/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}` },
        body: JSON.stringify({ replyToken: ev.replyToken, messages: [{ type: "text", text: `✅ อนุมัติส่วนลด ${amount}฿ แล้ว ลูกค้าได้รับแจ้งแล้ว` }] }),
      });
    }
  } else if (action === "discount_deny") {
    await prisma.order.update({ where: { id: order.id }, data: { pendingApproval: false } });
    await pushMessage(order.customer.lineUserId, [
      { type: "text", text: "ขออภัยค่ะ ทีมไม่สามารถลดราคาเพิ่มเติมในกรณีนี้ได้ แต่ราคาปัจจุบันเป็นราคาที่ดีที่สุดที่เราเสนอได้แล้วค่ะ 🙏" },
    ]);
    if (ev.replyToken) {
      await fetch("https://api.line.me/v2/bot/message/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}` },
        body: JSON.stringify({ replyToken: ev.replyToken, messages: [{ type: "text", text: "❌ ปฏิเสธส่วนลด ลูกค้าได้รับแจ้งแล้ว" }] }),
      });
    }
  }
}

async function ensureCustomer(lineUserId: string) {
  let customer = await prisma.customer.findUnique({ where: { lineUserId } });
  if (!customer) {
    let displayName: string | undefined;
    let pictureUrl: string | undefined;
    try {
      const p = await getProfile(lineUserId);
      displayName = p.displayName;
      pictureUrl = p.pictureUrl;
    } catch {}
    customer = await prisma.customer.create({
      data: { lineUserId, displayName, pictureUrl },
    });
    await prisma.conversation.create({ data: { customerId: customer.id } });
  }
  return customer;
}

async function attachSlipIfPending(customerId: string, buf: Buffer) {
  const order = await prisma.order.findFirst({
    where: { customerId, status: "AWAITING_SLIP" },
    orderBy: { createdAt: "desc" },
  });
  if (!order) return;
  // Store as base64 data URL for now; swap for S3/local FS later.
  const dataUrl = `data:image/jpeg;base64,${buf.toString("base64")}`;
  await prisma.order.update({
    where: { id: order.id },
    data: { status: "SLIP_UPLOADED", slipImageUrl: dataUrl, slipUploadedAt: new Date() },
  });
  // Notify admin via LINE
  if (process.env.ADMIN_LINE_USER_ID) {
    try {
      await pushMessage(process.env.ADMIN_LINE_USER_ID, [
        { type: "text", text: `💰 New slip uploaded\nOrder: ${order.id}\nAmount: ${order.totalAmount}฿\nReview: ${process.env.NEXT_PUBLIC_APP_URL}/admin/orders/${order.id}` },
      ]);
    } catch (e) {
      console.error("admin push failed", e);
    }
  }
}
