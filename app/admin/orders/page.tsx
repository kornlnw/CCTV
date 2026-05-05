import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function OrdersList({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const sp = await searchParams;
  const status = sp.status as any;
  const orders = await prisma.order.findMany({
    where: status ? { status } : {},
    include: { customer: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Orders</h1>
      <div className="mb-4 flex gap-2 text-sm">
        {["", "SLIP_UPLOADED", "AWAITING_SLIP", "PAID", "REJECTED"].map((s) => (
          <Link key={s || "all"} href={s ? `/admin/orders?status=${s}` : "/admin/orders"}
            className={`rounded border px-3 py-1 ${status === s || (!status && !s) ? "bg-black text-white" : "bg-white"}`}>
            {s || "All"}
          </Link>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr><th className="p-3">Customer</th><th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Status</th><th className="p-3">Created</th><th></th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-3">{o.customer.name ?? o.customer.displayName ?? "—"}<div className="text-xs text-gray-500">{o.customer.phone}</div></td>
                <td className="p-3">{o.items.map((i) => `${i.product.name} ×${i.quantity}`).join(", ")}</td>
                <td className="p-3">{Number(o.totalAmount).toLocaleString()}฿</td>
                <td className="p-3"><span className="rounded bg-gray-100 px-2 py-1 text-xs">{o.status}</span></td>
                <td className="p-3 text-xs text-gray-500">{o.createdAt.toLocaleString()}</td>
                <td className="p-3"><Link href={`/admin/orders/${o.id}`} className="text-blue-600 hover:underline">Open</Link></td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-gray-500">No orders</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
