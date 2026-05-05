import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay); endOfDay.setDate(endOfDay.getDate() + 1);

  const [pendingSlips, todayAppts, todayRevenue, needsReview] = await Promise.all([
    prisma.order.count({ where: { status: "SLIP_UPLOADED" } }),
    prisma.appointment.count({ where: { startsAt: { gte: startOfDay, lt: endOfDay } } }),
    prisma.order.aggregate({
      where: { status: "PAID", confirmedAt: { gte: startOfDay, lt: endOfDay } },
      _sum: { totalAmount: true },
    }),
    prisma.conversation.count({ where: { needsReview: true } }),
  ]);

  const cards = [
    { label: "Pending slips", value: pendingSlips, href: "/admin/orders?status=SLIP_UPLOADED", accent: pendingSlips > 0 },
    { label: "Today's appointments", value: todayAppts, href: "/admin/appointments" },
    { label: "Today's revenue (฿)", value: Number(todayRevenue._sum.totalAmount ?? 0).toLocaleString(), href: "/admin/orders?status=PAID" },
    { label: "Conversations needing review", value: needsReview, href: "/admin/conversations?review=1", accent: needsReview > 0 },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Overview</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className={`rounded-lg border bg-white p-5 transition hover:shadow ${c.accent ? "border-amber-500" : ""}`}>
            <div className="text-xs uppercase tracking-wide text-gray-500">{c.label}</div>
            <div className="mt-2 text-3xl font-bold">{c.value}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
