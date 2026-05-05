import type { Category, Product } from "@prisma/client";

export function ProductForm({
  action,
  product,
  categories,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  product?: Product | null;
  categories: Category[];
  submitLabel: string;
}) {
  return (
    <form action={action} className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-5 md:grid-cols-2">
      <Field label="Name *">
        <input name="name" required defaultValue={product?.name ?? ""} className="input" />
      </Field>
      <Field label="Slug" hint="Auto-generated if blank (used in URLs)">
        <input name="slug" defaultValue={product?.slug ?? ""} className="input" />
      </Field>
      <Field label="Category *">
        <select name="categoryId" required defaultValue={product?.categoryId ?? ""} className="input">
          <option value="" disabled>Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </Field>
      <Field label="Resolution">
        <input name="resolution" placeholder="4K (8MP)" defaultValue={product?.resolution ?? ""} className="input" />
      </Field>
      <Field label="Description *" full>
        <textarea name="description" required rows={3} defaultValue={product?.description ?? ""} className="input" />
      </Field>
      <Field label="Price (THB) *">
        <input name="price" type="number" step="0.01" min="0" required defaultValue={product ? Number(product.price) : ""} className="input" />
      </Field>
      <Field label="Stock">
        <input name="stock" type="number" min="0" defaultValue={product?.stock ?? 0} className="input" />
      </Field>
      <Field label="Image URL" hint="Public URL to product image">
        <input name="imageUrl" defaultValue={product?.imageUrl ?? ""} className="input" />
      </Field>
      <Field label="Featured">
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} className="h-4 w-4" />
          Show on home/featured sections
        </label>
      </Field>
      <Field label="Features" hint="One per line. The AI uses these when recommending." full>
        <textarea name="features" rows={5} defaultValue={(product?.features ?? []).join("\n")} className="input" placeholder={"กันน้ำ IP67\nอินฟราเรด 30 เมตร\nรองรับ PoE"} />
      </Field>
      <div className="md:col-span-2 flex gap-3">
        <button className="rounded bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800">{submitLabel}</button>
      </div>
      <style>{`.input { width: 100%; border: 1px solid #d1d5db; border-radius: 6px; padding: 8px 10px; font-size: 14px; font-family: inherit; }`}</style>
    </form>
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
