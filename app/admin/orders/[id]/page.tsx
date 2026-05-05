import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { confirmOrder, rejectOrder } from "./actions";

export const dynamic = "force-dynamic";

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { customer: true, items: { include: { product: true } }, appointment: true },
  });
  if (!order) notFound();

  return (
    <div className="max-w-4xl">
      <h1 className="mb-4 text-2xl font-semibold">Order {order.id.slice(-8)}</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 font-medium">Customer</h2>
          <div className="text-sm">{order.customer.name ?? order.customer.displayName}</div>
          <div className="text-sm text-gray-600">{order.customer.phone}</div>
          <div className="mt-2 text-xs text-gray-400">LINE: {order.customer.lineUserId}</div>

          <h2 className="mb-2 mt-4 font-medium">Items</h2>
          <ul className="text-sm">
            {order.items.map((i) => (
              <li key={i.id} className="flex justify-between border-b py-1">
                <span>{i.product.name} ×{i.quantity}</span>
                <span>{(Number(i.unitPrice) * i.quantity).toLocaleString()}฿</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex justify-between text-sm">
            <span>Subtotal</span><span>{Number(order.subtotal).toLocaleString()}฿</span>
          </div>
          {Number(order.discountAmount) > 0 && (
            <div className="flex justify-between text-sm text-green-700">
              <span>Discount {order.promoCode ? `(${order.promoCode})` : ""}</span>
              <span>−{Number(order.discountAmount).toLocaleString()}฿</span>
            </div>
          )}
          <div className="mt-1 flex justify-between border-t pt-1 font-semibold">
            <span>Total</span><span>{Number(order.totalAmount).toLocaleString()}฿</span>
          </div>
          {order.pendingApproval && (
            <div className="mt-2 rounded bg-amber-50 p-2 text-xs text-amber-800">⏳ Awaiting admin discount approval (check your LINE).</div>
          )}

          {order.appointment && (
            <>
              <h2 className="mb-2 mt-4 font-medium">Appointment</h2>
              <div className="text-sm">{order.appointment.startsAt.toLocaleString()} → {order.appointment.endsAt.toLocaleTimeString()}</div>
              <div className="text-xs text-gray-500">{order.appointment.location}</div>
            </>
          )}
        </div>

        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 font-medium">Payment slip</h2>
          {order.slipImageUrl ? (
            <img src={order.slipImageUrl} alt="slip" className="max-h-96 rounded border" />
          ) : (
            <div className="text-sm text-gray-500">No slip uploaded yet.</div>
          )}
          <div className="mt-2 text-xs text-gray-500">Status: <b>{order.status}</b></div>

          {order.status === "SLIP_UPLOADED" && (
            <div className="mt-4 flex gap-2">
              <form action={confirmOrder.bind(null, order.id)}>
                <button className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700">Confirm payment</button>
              </form>
              <form action={rejectOrder.bind(null, order.id)}>
                <button className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">Reject</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
