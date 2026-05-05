import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { updatePromo, deletePromo } from "../actions";

export const dynamic = "force-dynamic";

function toLocalInput(d: Date | null) {
  if (!d) return "";
  const off = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - off).toISOString().slice(0, 16);
}

export default async function EditPromoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await prisma.promotion.findUnique({ where: { id } });
  if (!p) notFound();

  async function save(formData: FormData) {
    "use server";
    await updatePromo(id, formData);
    redirect("/admin/promotions");
  }

  async function remove() {
    "use server";
    await deletePromo(id);
    redirect("/admin/promotions");
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit promotion</h1>
        <Link href="/admin/promotions" className="text-sm text-blue-600 hover:underline">← Back</Link>
      </div>

      <form action={save} className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-5 md:grid-cols-2">
        <Field label="Code *">
          <input name="code" required defaultValue={p.code} className="input" />
        </Field>
        <Field label="Type *">
          <select name="type" defaultValue={p.type} className="input">
            <option value="FIXED">Fixed (THB)</option>
            <option value="PERCENT">Percent (%)</option>
          </select>
        </Field>
        <Field label="Description *" full>
          <input name="description" required defaultValue={p.description} className="input" />
        </Field>
        <Field label="Amount *" hint="THB if FIXED, % if PERCENT">
          <input name="amount" type="number" step="0.01" min="0" required defaultValue={Number(p.amount)} className="input" />
        </Field>
        <Field label="Min order (THB)">
          <input name="minOrderAmount" type="number" step="0.01" min="0" defaultValue={Number(p.minOrderAmount)} className="input" />
        </Field>
        <Field label="Max discount (THB)">
          <input name="maxDiscount" type="number" step="0.01" min="0" defaultValue={p.maxDiscount ? Number(p.maxDiscount) : ""} className="input" />
        </Field>
        <Field label="Usage limit">
          <input name="usageLimit" type="number" min="1" defaultValue={p.usageLimit ?? ""} className="input" />
        </Field>
        <Field label="Expires at">
          <input name="expiresAt" type="datetime-local" defaultValue={toLocalInput(p.expiresAt)} className="input" />
        </Field>
        <Field label="Status">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" name="active" defaultChecked={p.active} className="h-4 w-4" />
            Active (AI can apply this code)
          </label>
        </Field>
        <div className="md:col-span-2 text-xs text-gray-500">
          Used so far: <b>{p.usageCount}</b>{p.usageLimit ? ` / ${p.usageLimit}` : ""} · Created {p.createdAt.toLocaleString()}
        </div>
        <div className="md:col-span-2 flex gap-3">
          <button className="rounded bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800">Save changes</button>
          <Link href="/admin/promotions" className="rounded border px-5 py-2 text-sm hover:bg-gray-50">Cancel</Link>
        </div>
      </form>

      <form action={remove} className="mt-6">
        <button className="text-sm text-red-600 hover:underline">Delete this promotion</button>
      </form>

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
