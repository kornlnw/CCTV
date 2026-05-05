"use client";

import { useState, useTransition } from "react";
import type { InstallPackage } from "@prisma/client";

type FormState = {
  name: string;
  slug: string;
  description: string;
  cameraCount: number;
  recommendedFor: string;
  price: number;
  installationFee: number;
  features: string;
  imageUrl: string;
  active: boolean;
};

export function PackageForm({
  action,
  pkg,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  pkg?: InstallPackage | null;
  submitLabel: string;
}) {
  const [s, setS] = useState<FormState>({
    name: pkg?.name ?? "",
    slug: pkg?.slug ?? "",
    description: pkg?.description ?? "",
    cameraCount: pkg?.cameraCount ?? 0,
    recommendedFor: pkg?.recommendedFor ?? "",
    price: pkg ? Number(pkg.price) : 0,
    installationFee: pkg ? Number(pkg.installationFee) : 0,
    features: (pkg?.features ?? []).join("\n"),
    imageUrl: pkg?.imageUrl ?? "",
    active: pkg?.active ?? true,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function up<K extends keyof FormState>(k: K, v: FormState[K]) {
    setS((prev) => ({ ...prev, [k]: v }));
  }

  async function handleFile(file: File) {
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "packages");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      up("imageUrl", json.url);
    } catch (e: any) {
      setUploadError(e.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function onSubmit(formData: FormData) {
    formData.set("name", s.name);
    formData.set("slug", s.slug);
    formData.set("description", s.description);
    formData.set("cameraCount", String(s.cameraCount));
    formData.set("recommendedFor", s.recommendedFor);
    formData.set("price", String(s.price));
    formData.set("installationFee", String(s.installationFee));
    formData.set("features", s.features);
    formData.set("imageUrl", s.imageUrl);
    if (s.active) formData.set("active", "on"); else formData.delete("active");
    startTransition(() => action(formData));
  }

  const featureList = s.features.split("\n").map((f) => f.trim()).filter(Boolean);
  const totalPrice = Number(s.price) + Number(s.installationFee);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <form action={onSubmit} className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-5 md:grid-cols-2">
        <Field label="Name *">
          <input value={s.name} onChange={(e) => up("name", e.target.value)} required className="input" />
        </Field>
        <Field label="Slug" hint="Auto-generated if blank">
          <input value={s.slug} onChange={(e) => up("slug", e.target.value)} className="input" />
        </Field>
        <Field label="Description *" full>
          <textarea value={s.description} onChange={(e) => up("description", e.target.value)} required rows={2} className="input" />
        </Field>
        <Field label="Camera count">
          <input type="number" min={0} value={s.cameraCount} onChange={(e) => up("cameraCount", Number(e.target.value))} className="input" />
        </Field>
        <Field label="Recommended for" hint="e.g. บ้าน, ร้าน, สำนักงาน">
          <input value={s.recommendedFor} onChange={(e) => up("recommendedFor", e.target.value)} className="input" />
        </Field>
        <Field label="Package price (THB)">
          <input type="number" step="0.01" min={0} value={s.price} onChange={(e) => up("price", Number(e.target.value))} className="input" />
        </Field>
        <Field label="Installation fee (THB)">
          <input type="number" step="0.01" min={0} value={s.installationFee} onChange={(e) => up("installationFee", Number(e.target.value))} className="input" />
        </Field>
        <Field label="Active">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={s.active} onChange={(e) => up("active", e.target.checked)} className="h-4 w-4" />
            AI can recommend this package
          </label>
        </Field>
        <Field label="Image" full hint="Upload to Cloudflare R2 — JPG / PNG / WebP, max 5 MB">
          <div className="flex items-center gap-3">
            <label className="inline-flex cursor-pointer items-center rounded border bg-white px-3 py-2 text-sm hover:bg-gray-50">
              {uploading ? "Uploading..." : s.imageUrl ? "Replace image" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                disabled={uploading}
              />
            </label>
            {s.imageUrl && (
              <button type="button" onClick={() => up("imageUrl", "")} className="text-sm text-red-600 hover:underline">Remove</button>
            )}
            <input value={s.imageUrl} onChange={(e) => up("imageUrl", e.target.value)} placeholder="...or paste a URL" className="input flex-1" />
          </div>
          {uploadError && <div className="mt-1 text-xs text-red-600">{uploadError}</div>}
        </Field>
        <Field label="Features" full hint="One per line — what's included">
          <textarea value={s.features} onChange={(e) => up("features", e.target.value)} rows={6} className="input" placeholder={"กล้อง 4MP x 4 ตัว\nNVR 4 ช่อง + HDD 1TB\nเดินสาย 50 เมตร\nรับประกัน 2 ปี"} />
        </Field>
        <div className="md:col-span-2 flex gap-3">
          <button disabled={pending || uploading} className="rounded bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50">
            {pending ? "Saving..." : submitLabel}
          </button>
        </div>
        <style>{`.input { width: 100%; border: 1px solid #d1d5db; border-radius: 6px; padding: 8px 10px; font-size: 14px; font-family: inherit; }`}</style>
      </form>

      <aside className="self-start lg:sticky lg:top-6">
        <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">Live preview</div>
        <PackageCard
          name={s.name || "Package name"}
          description={s.description || "Package description goes here..."}
          imageUrl={s.imageUrl}
          cameraCount={s.cameraCount}
          recommendedFor={s.recommendedFor}
          price={s.price}
          installationFee={s.installationFee}
          features={featureList}
          totalPrice={totalPrice}
          active={s.active}
        />
      </aside>
    </div>
  );
}

function PackageCard(props: {
  name: string;
  description: string;
  imageUrl: string;
  cameraCount: number;
  recommendedFor: string;
  price: number;
  installationFee: number;
  features: string[];
  totalPrice: number;
  active: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border bg-white shadow-sm ${props.active ? "" : "opacity-60"}`}>
      <div className="relative h-44 w-full bg-gradient-to-br from-gray-100 to-gray-200">
        {props.imageUrl ? (
          <img src={props.imageUrl} alt={props.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No image yet
          </div>
        )}
        {props.recommendedFor && (
          <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            สำหรับ {props.recommendedFor}
          </span>
        )}
        {!props.active && (
          <span className="absolute right-3 top-3 rounded bg-gray-700 px-2 py-1 text-xs font-medium text-white">Disabled</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{props.name}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{props.description}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
          {props.cameraCount > 0 && <span>📷 {props.cameraCount} กล้อง</span>}
        </div>

        {props.features.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm">
            {props.features.slice(0, 5).map((f, i) => (
              <li key={i} className="flex gap-2 text-gray-700">
                <span className="text-green-600">✓</span>
                <span className="flex-1">{f}</span>
              </li>
            ))}
            {props.features.length > 5 && (
              <li className="text-xs text-gray-400">+{props.features.length - 5} more</li>
            )}
          </ul>
        )}

        <div className="mt-4 flex items-end justify-between border-t pt-3">
          <div className="text-xs text-gray-500">
            {props.installationFee > 0 ? (
              <>
                <div>{Number(props.price).toLocaleString()}฿ + ติดตั้ง {Number(props.installationFee).toLocaleString()}฿</div>
                <div className="text-gray-400">รวม</div>
              </>
            ) : props.price === 0 ? <span className="text-green-700 font-medium">ฟรี</span> : null}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {props.price === 0 ? "ฟรี" : `${props.totalPrice.toLocaleString()}฿`}
            </div>
          </div>
        </div>
      </div>
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
