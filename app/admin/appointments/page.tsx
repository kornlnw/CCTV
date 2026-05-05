import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const now = new Date();
  const startOfToday = new Date(now); startOfToday.setHours(0, 0, 0, 0);

  const [upcoming, past] = await Promise.all([
    prisma.appointment.findMany({
      where: { startsAt: { gte: startOfToday } },
      include: { customer: true, order: true },
      orderBy: { startsAt: "asc" },
      take: 50,
    }),
    prisma.appointment.findMany({
      where: { startsAt: { lt: startOfToday } },
      include: { customer: true, order: true },
      orderBy: { startsAt: "desc" },
      take: 20,
    }),
  ]);

  const grouped = new Map<string, typeof upcoming>();
  for (const a of upcoming) {
    const key = a.startsAt.toLocaleDateString("th-TH", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    if (!grouped.has(key)) grouped.set(key, [] as any);
    grouped.get(key)!.push(a);
  }

  const statusColor: Record<string, string> = {
    TENTATIVE: "bg-amber-100 text-amber-800",
    CONFIRMED: "bg-green-100 text-green-800",
    CANCELLED: "bg-gray-200 text-gray-700",
    COMPLETED: "bg-blue-100 text-blue-800",
    NO_SHOW: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Appointments</h1>

      <h2 className="mb-2 mt-2 text-sm font-medium text-gray-500">Upcoming</h2>
      {grouped.size === 0 && <div className="rounded border bg-white p-6 text-sm text-gray-500">No upcoming appointments.</div>}
      <div className="space-y-4">
        {[...grouped.entries()].map(([day, list]) => (
          <div key={day} className="rounded-lg border bg-white">
            <div className="border-b bg-gray-50 px-4 py-2 text-sm font-medium">{day}</div>
            <ul>
              {list.map((a) => (
                <li key={a.id} className="flex items-center justify-between border-b px-4 py-3 last:border-b-0">
                  <div>
                    <div className="text-sm font-medium">
                      {a.startsAt.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}
                      {" – "}
                      {a.endsAt.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <div className="text-sm">{a.customer.name ?? a.customer.displayName ?? "—"} · {a.customer.phone ?? "no phone"}</div>
                    {a.location && <div className="text-xs text-gray-500">{a.location}</div>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded px-2 py-1 text-xs ${statusColor[a.status] ?? "bg-gray-100"}`}>{a.status}</span>
                    {a.orderId && <Link href={`/admin/orders/${a.orderId}`} className="text-sm text-blue-600 hover:underline">Order</Link>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mb-2 mt-8 text-sm font-medium text-gray-500">Past (last 20)</h2>
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left"><tr><th className="p-3">When</th><th className="p-3">Customer</th><th className="p-3">Status</th><th></th></tr></thead>
          <tbody>
            {past.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.startsAt.toLocaleString("th-TH")}</td>
                <td className="p-3">{a.customer.name ?? a.customer.displayName}</td>
                <td className="p-3"><span className={`rounded px-2 py-1 text-xs ${statusColor[a.status] ?? "bg-gray-100"}`}>{a.status}</span></td>
                <td className="p-3">{a.orderId && <Link href={`/admin/orders/${a.orderId}`} className="text-blue-600 hover:underline">Order</Link>}</td>
              </tr>
            ))}
            {past.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-gray-500">No past appointments</td></tr>}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Tip: open Google Calendar on your phone to drag-reschedule. The calendar is the source of truth for time slots.
      </p>
    </div>
  );
}
