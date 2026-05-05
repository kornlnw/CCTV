import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "./prisma";
import { createCalendarEvent, listFreeBusy } from "./google-calendar";
import { buildPromptPayPayload } from "./promptpay";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6";

const SYSTEM = `You are a friendly Thai-English sales assistant for ${process.env.SHOP_NAME ?? "CCTV Shop"}.
You help customers pick CCTV products, book installation/consultation appointments, and arrange payment via PromptPay or bank transfer.
Speak in Thai by default; switch to English if the customer writes English. Keep replies short and conversational for LINE chat (LINE messages should feel natural, 1-3 sentences plus a question — not long bullet lists unless the customer asks for full specs).

How to recommend:
1. Ask 2-3 quick discovery questions: where to install (บ้าน/ร้าน/สำนักงาน), indoor/outdoor, how many cameras, budget. Don't dump all questions at once.
2. If the customer's situation matches a typical setup, suggest an InstallPackage from list_packages — packages bundle cameras + NVR + installation, easier to commit.
3. If they want to mix-and-match, use search_products. For deep specs, call get_product_details.
4. Always quote price + key features + stock. Never invent — always call a tool.

How to close:
5. When they want to buy/book, collect: name, phone, preferred date/time, address.
6. Call check_availability, then create_appointment_and_order.
7. Call generate_payment_request → send PromptPay QR. Tell them to upload the slip image in this chat.

Discounts (very important — never give a discount on your own):
- If the customer types or mentions a promo code, call apply_discount(orderId, code). Tell them the result.
- If the customer asks for a discount without a code: first try suggesting an existing promo (you can mention WELCOME500 for new customers ordering 5,000+, BIGORDER10 for orders 20,000+) or recommend a package which is already discounted vs buying separately.
- If they still want a custom discount, call request_discount_approval(orderId, requestedAmount, reason). Tell them politely "ขอตรวจสอบกับทีมก่อนนะคะ" and DO NOT promise the discount until you receive approval. Do not chase / repeat the request.
- Never invent a discount amount. Never reduce the price in your reply text without a tool call updating the order.

Escalation:
8. If you cannot help (complex tech question, complaint, refund, multi-site quote), call request_human_handoff with a clear reason.

Tone: warm, concise, never pushy. Use คะ/ครับ politeness when in Thai.`;

const tools: Anthropic.Tool[] = [
  {
    name: "search_products",
    description: "Search the product catalog by keyword/feature. Returns up to 5 matches with full details (id, name, price, stock, resolution, description, features, category).",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keywords e.g. 'outdoor 4K', 'กล้องในบ้าน', 'PTZ', 'NVR 16 ช่อง'" },
        categorySlug: { type: "string", description: "Optional filter: dome / bullet / ptz / nvr-dvr" },
        maxPrice: { type: "number", description: "Optional: only products at or below this price (THB)" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_product_details",
    description: "Get full details for a specific product by id when the customer asks for specs or comparisons.",
    input_schema: {
      type: "object",
      properties: { productId: { type: "string" } },
      required: ["productId"],
    },
  },
  {
    name: "list_packages",
    description: "List installation packages (camera + NVR + install fee bundles). Use when the customer is unsure or wants a turn-key solution.",
    input_schema: {
      type: "object",
      properties: {
        recommendedFor: { type: "string", description: "Optional filter, e.g. 'บ้าน', 'ร้าน', 'สำนักงาน'" },
      },
    },
  },
  {
    name: "check_availability",
    description: "Check if a time window is free on the booking calendar.",
    input_schema: {
      type: "object",
      properties: {
        startsAt: { type: "string", description: "ISO datetime, Asia/Bangkok" },
        endsAt: { type: "string", description: "ISO datetime" },
      },
      required: ["startsAt", "endsAt"],
    },
  },
  {
    name: "create_appointment_and_order",
    description: "Create a tentative appointment + draft order. Returns orderId and total.",
    input_schema: {
      type: "object",
      properties: {
        customerName: { type: "string" },
        customerPhone: { type: "string" },
        startsAt: { type: "string" },
        endsAt: { type: "string" },
        location: { type: "string" },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: { productId: { type: "string" }, quantity: { type: "integer" } },
            required: ["productId", "quantity"],
          },
        },
        notes: { type: "string" },
      },
      required: ["customerName", "customerPhone", "startsAt", "endsAt", "items"],
    },
  },
  {
    name: "generate_payment_request",
    description: "Generate a PromptPay QR payload + bank text for an existing order.",
    input_schema: {
      type: "object",
      properties: { orderId: { type: "string" } },
      required: ["orderId"],
    },
  },
  {
    name: "apply_discount",
    description: "Apply a known promotion code to an existing order. Returns the new total or an error if invalid/expired/below min spend.",
    input_schema: {
      type: "object",
      properties: {
        orderId: { type: "string" },
        code: { type: "string", description: "Promo code as typed by the customer (case-insensitive)" },
      },
      required: ["orderId", "code"],
    },
  },
  {
    name: "request_discount_approval",
    description: "Customer is asking for a custom discount that no promo code covers. Send approval request to admin's LINE; admin clicks Approve/Deny. Use only when customer explicitly negotiates beyond standard promos.",
    input_schema: {
      type: "object",
      properties: {
        orderId: { type: "string" },
        requestedAmount: { type: "number", description: "Discount amount in THB the customer is asking for" },
        reason: { type: "string", description: "Customer's stated reason / context" },
      },
      required: ["orderId", "requestedAmount", "reason"],
    },
  },
  {
    name: "request_human_handoff",
    description: "Pause the AI on this conversation and flag for admin review.",
    input_schema: {
      type: "object",
      properties: { reason: { type: "string" } },
      required: ["reason"],
    },
  },
];

type Ctx = { customerId: string; lineUserId: string };

async function runTool(name: string, input: any, ctx: Ctx): Promise<any> {
  switch (name) {
    case "search_products": {
      const q = String(input.query ?? "");
      const products = await prisma.product.findMany({
        where: {
          AND: [
            input.categorySlug ? { category: { slug: input.categorySlug } } : {},
            input.maxPrice ? { price: { lte: input.maxPrice } } : {},
            {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { features: { has: q } },
              ],
            },
          ],
        },
        take: 5,
        include: { category: { select: { name: true, slug: true } } },
      });
      return { products };
    }
    case "get_product_details": {
      const product = await prisma.product.findUnique({
        where: { id: input.productId },
        include: { category: true },
      });
      return product ?? { error: "not found" };
    }
    case "list_packages": {
      const packages = await prisma.installPackage.findMany({
        where: {
          active: true,
          ...(input.recommendedFor ? { recommendedFor: { contains: input.recommendedFor, mode: "insensitive" } } : {}),
        },
        orderBy: { price: "asc" },
      });
      return { packages };
    }
    case "check_availability": {
      const fb = await listFreeBusy(input.startsAt, input.endsAt);
      const busy = Object.values(fb.calendars)[0]?.busy ?? [];
      return { available: busy.length === 0, busy };
    }
    case "create_appointment_and_order": {
      const items = input.items as { productId: string; quantity: number }[];
      const products = await prisma.product.findMany({ where: { id: { in: items.map((i) => i.productId) } } });
      const total = items.reduce((sum, it) => {
        const p = products.find((x) => x.id === it.productId);
        return sum + Number(p?.price ?? 0) * it.quantity;
      }, 0);
      await prisma.customer.update({
        where: { id: ctx.customerId },
        data: { name: input.customerName, phone: input.customerPhone },
      });
      const order = await prisma.order.create({
        data: {
          customerId: ctx.customerId,
          status: "AWAITING_SLIP",
          subtotal: total,
          totalAmount: total,
          notes: input.notes,
          items: {
            create: items.map((it) => {
              const p = products.find((x) => x.id === it.productId)!;
              return { productId: it.productId, quantity: it.quantity, unitPrice: p.price };
            }),
          },
        },
      });
      let googleEventId: string | undefined;
      try {
        const ev = await createCalendarEvent({
          summary: `[CCTV] ${input.customerName} - pending payment`,
          description: `LINE: ${ctx.lineUserId}\nPhone: ${input.customerPhone}\nTotal: ${total}฿\nOrder: ${order.id}\n${input.notes ?? ""}`,
          start: input.startsAt,
          end: input.endsAt,
          colorId: "5",
        });
        googleEventId = ev.id;
      } catch (e) {
        console.error("calendar create failed", e);
      }
      const appt = await prisma.appointment.create({
        data: {
          customerId: ctx.customerId,
          orderId: order.id,
          startsAt: new Date(input.startsAt),
          endsAt: new Date(input.endsAt),
          location: input.location,
          googleEventId,
        },
      });
      return { orderId: order.id, appointmentId: appt.id, total };
    }
    case "generate_payment_request": {
      const order = await prisma.order.findUnique({ where: { id: input.orderId } });
      if (!order) return { error: "order not found" };
      const amount = Number(order.totalAmount);
      const payload = buildPromptPayPayload(process.env.PROMPTPAY_ID ?? "", amount);
      return {
        promptpayPayload: payload,
        amount,
        bankText: process.env.BANK_FALLBACK_TEXT ?? "",
        instructions: "Customer should send slip image in chat after payment.",
      };
    }
    case "apply_discount": {
      const code = String(input.code ?? "").trim().toUpperCase();
      const promo = await prisma.promotion.findUnique({ where: { code } });
      if (!promo || !promo.active) return { error: "code_invalid", message: "ไม่พบโค้ดนี้หรือโค้ดถูกปิดใช้งาน" };
      if (promo.expiresAt && promo.expiresAt < new Date()) return { error: "code_expired", message: "โค้ดหมดอายุแล้ว" };
      if (promo.usageLimit && promo.usageCount >= promo.usageLimit) return { error: "code_used_up", message: "โค้ดถูกใช้ครบแล้ว" };
      const order = await prisma.order.findUnique({ where: { id: input.orderId } });
      if (!order) return { error: "order_not_found" };
      const subtotal = Number(order.subtotal);
      if (subtotal < Number(promo.minOrderAmount)) {
        return { error: "below_minimum", message: `ต้องสั่งขั้นต่ำ ${Number(promo.minOrderAmount).toLocaleString()} บาท` };
      }
      let discount = promo.type === "PERCENT" ? (subtotal * Number(promo.amount)) / 100 : Number(promo.amount);
      if (promo.maxDiscount) discount = Math.min(discount, Number(promo.maxDiscount));
      const newTotal = subtotal - discount;
      await prisma.$transaction([
        prisma.order.update({
          where: { id: order.id },
          data: { discountAmount: discount, totalAmount: newTotal, promoCode: code, discountReason: promo.description },
        }),
        prisma.promotion.update({ where: { id: promo.id }, data: { usageCount: { increment: 1 } } }),
      ]);
      return { ok: true, discountAmount: discount, newTotal, description: promo.description };
    }
    case "request_discount_approval": {
      const order = await prisma.order.findUnique({
        where: { id: input.orderId },
        include: { customer: true },
      });
      if (!order) return { error: "order_not_found" };
      await prisma.order.update({ where: { id: order.id }, data: { pendingApproval: true } });

      if (process.env.ADMIN_LINE_USER_ID) {
        try {
          const { pushMessage } = await import("./line");
          await pushMessage(process.env.ADMIN_LINE_USER_ID, [
            {
              type: "template",
              altText: `Discount request: ${input.requestedAmount}฿ on order ${order.id.slice(-8)}`,
              template: {
                type: "buttons",
                title: `ลูกค้าขอลด ${Number(input.requestedAmount).toLocaleString()}฿`,
                text: `${order.customer.name ?? order.customer.displayName ?? "Customer"}\nยอด: ${Number(order.subtotal).toLocaleString()}฿\nเหตุผล: ${String(input.reason).slice(0, 100)}`,
                actions: [
                  { type: "postback", label: `อนุมัติ ${input.requestedAmount}฿`, data: `discount_approve:${order.id}:${input.requestedAmount}`, displayText: `อนุมัติส่วนลด ${input.requestedAmount}฿` },
                  { type: "postback", label: "ปฏิเสธ", data: `discount_deny:${order.id}`, displayText: "ปฏิเสธส่วนลด" },
                  { type: "uri", label: "เปิดออเดอร์", uri: `${process.env.NEXT_PUBLIC_APP_URL}/admin/orders/${order.id}` },
                ],
              },
            },
          ]);
        } catch (e) { console.error("admin discount push failed", e); }
      }
      return { ok: true, status: "awaiting_admin_approval", message: "ส่งคำขอให้แอดมินแล้ว รอการอนุมัติสักครู่นะคะ" };
    }
    case "request_human_handoff": {
      await prisma.conversation.update({
        where: { customerId: ctx.customerId },
        data: { aiPaused: true, needsReview: true },
      });
      return { ok: true };
    }
  }
  return { error: `unknown tool ${name}` };
}

export type AiResult = { text: string; paymentPayload?: string; paymentAmount?: number };

export async function runAgent(ctx: Ctx, userText: string, imageDataUrl?: string): Promise<AiResult> {
  const conv = await prisma.conversation.upsert({
    where: { customerId: ctx.customerId },
    create: { customerId: ctx.customerId },
    update: {},
  });
  if (conv.aiPaused) return { text: "" };

  const history = await prisma.message.findMany({
    where: { conversationId: conv.id },
    orderBy: { createdAt: "asc" },
    take: 30,
  });

  const messages: Anthropic.MessageParam[] = history
    .filter((m) => m.role === "USER" || m.role === "ASSISTANT")
    .map((m) => ({
      role: m.role === "USER" ? "user" : "assistant",
      content: m.content,
    }));

  const userContent: Anthropic.MessageParam["content"] = imageDataUrl
    ? [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: imageDataUrl } as any },
        { type: "text", text: userText || "(customer sent an image — likely a payment slip)" },
      ]
    : userText;
  messages.push({ role: "user", content: userContent });

  await prisma.message.create({
    data: { conversationId: conv.id, role: "USER", content: userText, imageUrl: imageDataUrl ? "(image)" : null },
  });

  let paymentPayload: string | undefined;
  let paymentAmount: number | undefined;
  let finalText = "";

  for (let step = 0; step < 6; step++) {
    const resp = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM,
      tools,
      messages,
    });

    messages.push({ role: "assistant", content: resp.content });

    const toolUses = resp.content.filter((c): c is Anthropic.ToolUseBlock => c.type === "tool_use");
    const textParts = resp.content.filter((c): c is Anthropic.TextBlock => c.type === "text");
    finalText = textParts.map((t) => t.text).join("\n").trim();

    if (toolUses.length === 0 || resp.stop_reason !== "tool_use") break;

    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const tu of toolUses) {
      const result = await runTool(tu.name, tu.input, ctx);
      if (tu.name === "generate_payment_request" && result?.promptpayPayload) {
        paymentPayload = result.promptpayPayload;
        paymentAmount = result.amount;
      }
      toolResults.push({
        type: "tool_result",
        tool_use_id: tu.id,
        content: JSON.stringify(result),
      });
    }
    messages.push({ role: "user", content: toolResults });
  }

  await prisma.message.create({
    data: { conversationId: conv.id, role: "ASSISTANT", content: finalText },
  });
  await prisma.conversation.update({
    where: { id: conv.id },
    data: { lastMessageAt: new Date() },
  });

  return { text: finalText, paymentPayload, paymentAmount };
}
