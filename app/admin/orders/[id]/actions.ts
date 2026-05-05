"use server";

import { prisma } from "@/lib/prisma";
import { pushMessage } from "@/lib/line";
import { updateCalendarEvent } from "@/lib/google-calendar";
import { revalidatePath } from "next/cache";

export async function confirmOrder(id: string) {
  const order = await prisma.order.update({
    where: { id },
    data: { status: "PAID", confirmedAt: new Date() },
    include: { customer: true, appointment: true },
  });
  if (order.appointment?.googleEventId) {
    try {
      await updateCalendarEvent(order.appointment.googleEventId, {
        summary: `[CCTV] ${order.customer.name ?? "Booking"} - PAID`,
        colorId: "10",
      });
    } catch (e) { console.error(e); }
    await prisma.appointment.update({ where: { id: order.appointment.id }, data: { status: "CONFIRMED" } });
  }
  try {
    await pushMessage(order.customer.lineUserId, [
      { type: "text", text: `✅ Payment received! Total ${order.totalAmount}฿\nWe'll see you on ${order.appointment?.startsAt.toLocaleString("th-TH") ?? "the booked date"}. Thank you!` },
    ]);
  } catch (e) { console.error(e); }
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin");
}

export async function rejectOrder(id: string) {
  const order = await prisma.order.update({
    where: { id },
    data: { status: "REJECTED", rejectedReason: "Slip rejected by admin" },
    include: { customer: true },
  });
  try {
    await pushMessage(order.customer.lineUserId, [
      { type: "text", text: "❌ We couldn't verify your payment slip. Please re-send the correct slip or contact us." },
    ]);
  } catch (e) { console.error(e); }
  revalidatePath(`/admin/orders/${id}`);
}
