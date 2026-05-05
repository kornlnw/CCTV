import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { togglePromo, deletePromo, createPromo } from "./actions";

export const dynamic = "force-dynamic";

export default async function PromotionsPage() {
  const promos = await prisma.promotion.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Promotions</h1>
      <p className="mb-4 text-sm text-gray-600">
        The AI applies these codes when customers mention them. Custom (off-code) discounts go through your LINE Approve/Deny flow.
      </p>

      <details className="mb-6 rounded-lg border bg-white" open={promos.length === 0}>
        <summary className="cursor-pointer px-4 py-3 font-medium">+ New promotion</summary>
        <form action={createPromo} className="grid grid-cols-1 gap-3 border-t p-4 md:grid-cols-2">
          <Field label="Code *" hint="e.g. NEWYEAR2026 (uppercased automatically)">
            <input name="code" required className="input" placeholder="WELCOME500" />
          </Field>
          <Field label="Type *">
            <select name="type" className="input">
              <option value="FIXED">Fixed (THB)</option>
              <option value="PERCENT">Percent (%)</option>
            </select>
          </Field>
          <Field label="Description *" hint="Shown to admins; AI also reads this" full>
            <input name="description" required className="input" placeholder="ลด 500 บาท สำหรับลูกค้าใหม่ ขั้นต่ำ 5,000 บาท" />
          </Field>
          <Field label="Amount *" hint="500 = 500฿  |  10 = 10%">
            <input name="amount" type="number" step="0.01" min="0" required className="input" />
          </Field>
          <Field label="Min order (THB)" hint="Customer must spend at least this">
            <input name="minOrderAmount" type="number" step="0.01" min="0" defaultValue={0} className="input" />
          </Field>
          <Field label="Max discount (THB)" hint="Optional cap; mostly for PERCENT type">
            <input name="maxDiscount" type="number" step="0.01" min="0" className="input" />
          </Field>
          <Field label="Usage limit" hint="Optional total uses across all customers">
            <input name="usageLimit" type="number" min="1" className="input" />
          </Field>
          <Field label="Expires at" hint="Optional. Leave blank for no expiry">
            <input name="expiresAt" type="datetime-local" className="input" />
          </Field>
          <div className="md:col-span-2">
            <button className="rounded bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800">Create</button>
          </div>
        </form>
      </details>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Code</th><th className="p-3">Description</th><th className="p-3">Discount</th>
              <th className="p-3">Min order</th><th className="p-3">Used</th><th className="p-3">Expires</th>
              <th className="p-3">Status</th><th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {promos.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-mono">{p.code}</td>
                <td className="p-3 max-w-md">{p.description}</td>
                <td className="p-3">
                  {p.type === "PERCENT" ? `${Number(p.amount)}%` : `${Number(p.amount).toLocaleString()}฿`}
                  {p.maxDiscount && <div className="text-xs text-gray-500">max {Number(p.maxDiscount).toLocaleString()}฿</div>}
                </td>
                <td className="p-3">{Number(p.minOrderAmount).toLocaleString()}฿</td>
                <td className="p-3">{p.usageCount}{p.usageLimit ? ` / ${p.usageLimit}` : ""}</td>
                <td className="p-3 text-xs text-gray-500">{p.expiresAt ? p.expiresAt.toLocaleDateString() : "—"}</td>
                <td className="p-3">
                  <span className={`rounded px-2 py-1 text-xs ${p.active ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}`}>
                    {p.active ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/promotions/${p.id}`} className="text-blue-600 hover:underline">Edit</Link>
                    <form action={togglePromo.bind(null, p.id)}>
                      <button className="text-gray-700 hover:underline">{p.active ? "Disable" : "Enable"}</button>
                    </form>
                    <form action={deletePromo.bind(null, p.id)}>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {promos.length === 0 && <tr><td colSpan={8} className="p-6 text-center text-gray-500">No promotions yet — create your first one above.</td></tr>}
          </tbody>
        </table>
      </div>

      <style>{`.input { width: 100%; border: 1px solid #d1d5db; border-radius: 6px; padding: 8px 10px; font-size: 14px; }`}</style>
    </div>
  );
}

function Field({ label, hint, full, children }: { label: string; hint?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1 text-sm ${full ? "md:col-span-2" : ""}`}>
      <span className="font-medium">{label}</span>
      {children}
      {hint && <span className="text-xs text-gray-500">{hint}</span>}
    </label>
  );
}
