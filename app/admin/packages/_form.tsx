import type { InstallPackage } from "@prisma/client";

export function PackageForm({
  action,
  pkg,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  pkg?: InstallPackage | null;
  submitLabel: string;
}) {
  return (
    <form action={action} className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-5 md:grid-cols-2">
      <Field label="Name *">
        <input name="name" required defaultValue={pkg?.name ?? ""} className="input" />
      </Field>
      <Field label="Slug" hint="Auto-generated if blank">
        <input name="slug" defaultValue={pkg?.slug ?? ""} className="input" />
      </Field>
      <Field label="Description *" full>
        <textarea name="description" required rows={2} defaultValue={pkg?.description ?? ""} className="input" />
      </Field>
      <Field label="Camera count">
        <input name="cameraCount" type="number" min="0" defaultValue={pkg?.cameraCount ?? 0} className="input" />
      </Field>
      <Field label="Recommended for" hint="e.g. บ้าน, ร้าน, สำนักงาน — AI uses this to match customers">
        <input name="recommendedFor" defaultValue={pkg?.recommendedFor ?? ""} className="input" />
      </Field>
      <Field label="Package price (THB)">
        <input name="price" type="number" step="0.01" min="0" defaultValue={pkg ? Number(pkg.price) : 0} className="input" />
      </Field>
      <Field label="Installation fee (THB)">
        <input name="installationFee" type="number" step="0.01" min="0" defaultValue={pkg ? Number(pkg.installationFee) : 0} className="input" />
      </Field>
      <Field label="Active">
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked={pkg?.active ?? true} className="h-4 w-4" />
          AI can recommend this package
        </label>
      </Field>
      <Field label="Features" hint="One per line — what's included in the package" full>
        <textarea name="features" rows={6} defaultValue={(pkg?.features ?? []).join("\n")} className="input" placeholder={"กล้อง 4MP x 4 ตัว\nNVR 4 ช่อง + HDD 1TB\nเดินสาย 50 เมตร\nรับประกัน 2 ปี"} />
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
