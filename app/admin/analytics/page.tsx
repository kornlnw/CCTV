import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const since = new Date(); since.setDate(since.getDate() - 30);
  const [totalOrders, paidOrders, paidSum, newCustomers, conversations, reviewCount] = await Promise.all([
    prisma.order.count({ where: { createdAt: { gte: since } } }),
    prisma.order.count({ where: { status: "PAID", confirmedAt: { gte: since } } }),
    prisma.order.aggregate({ where: { status: "PAID", confirmedAt: { gte: since } }, _sum: { totalAmount: true } }),
    prisma.customer.count({ where: { createdAt: { gte: since } } }),
    prisma.conversation.count({ where: { lastMessageAt: { gte: since } } }),
    prisma.conversation.count({ where: { needsReview: true } }),
  ]);
  const conversion = conversations > 0 ? ((paidOrders / conversations) * 100).toFixed(1) : "0.0";

  const cards = [
    ["Revenue (30d)", `${Number(paidSum._sum.totalAmount ?? 0).toLocaleString()}฿`],
    ["Paid orders (30d)", paidOrders],
    ["All orders (30d)", totalOrders],
    ["New customers (30d)", newCustomers],
    ["Active chats (30d)", conversations],
    ["Chat → paid conversion", `${conversion}%`],
    ["AI handoffs pending", reviewCount],
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Analytics — last 30 days</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, val]) => (
          <div key={label as string} className="rounded-lg border bg-white p-5">
            <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
            <div className="mt-2 text-2xl font-bold">{val}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-gray-500">Charts (revenue trend, top products, busiest time slots) coming next.</p>
    </div>
  );
}
