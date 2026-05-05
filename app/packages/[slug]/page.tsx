import { PackageVisual } from "@/components/PackageVisual";
import { ProductSpecSheet } from "@/components/ProductSpecSheet";
import {
  PACKAGES,
  SPECS,
  FREE_ITEMS,
  getPackageBySlug,
  type Variant,
} from "@/lib/packages";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return { title: "ไม่พบแพ็คเกจ — Trustcam" };
  return {
    title: `${pkg.title} — Trustcam`,
    description: pkg.description,
  };
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const dvrDiscount = Math.round(
    ((pkg.dvr.oldPrice - pkg.dvr.price) / pkg.dvr.oldPrice) * 100
  );
  const related = PACKAGES.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-slate-50">
        <div className="container-x py-4 text-xs text-slate-500 sm:text-sm">
          <Link href="/" className="hover:text-brand-700">หน้าแรก</Link>
          <span className="mx-2">/</span>
          <Link href="/#packages" className="hover:text-brand-700">แพ็คเกจ</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{pkg.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="container-x py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Visual */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-xl shadow-slate-900/20">
              <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.25),transparent_60%)]" />
              <div className="relative">
                <PackageVisual cameras={pkg.cameras} />
              </div>
              <div className="absolute right-4 top-4 flex flex-col items-center rounded-lg bg-yellow-400 px-2.5 py-1.5 text-[11px] font-extrabold leading-tight text-slate-900 shadow">
                <span className="text-lg leading-none">1</span>
                <span>YEAR</span>
              </div>
              <div className="absolute left-4 top-4 rounded-md bg-brand-600 px-2.5 py-1 text-[11px] font-extrabold text-white shadow">
                {pkg.cameras} CH
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-black/40 px-3 py-2 text-[11px] text-white backdrop-blur">
                <span className="font-semibold">รับประกัน 1 ปี</span>
                <span>·</span>
                <span className="font-semibold">ติดตั้งฟรี กรุงเทพฯ</span>
                <span>·</span>
                <span className="font-semibold">VAT แล้ว</span>
              </div>
            </div>

            {/* Specs row */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {SPECS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-slate-200 bg-white px-2 py-3 text-center"
                >
                  <div className="text-sm font-extrabold text-brand-700">
                    {s.label}
                  </div>
                  <div className="text-[10px] text-slate-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Info + price */}
          <div>
            {pkg.tag && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700">
                {pkg.tag} {pkg.highlight && "· ขายดีที่สุด"}
              </div>
            )}
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {pkg.title}
            </h1>
            <p className="mt-2 text-sm font-semibold text-brand-600">
              เหมาะกับ: {pkg.recommendedFor}
            </p>
            <p className="mt-4 text-slate-600">{pkg.description}</p>

            {/* Highlight banner */}
            <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-5 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="relative">
                <span className="inline-block rounded-full bg-yellow-400/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yellow-200">
                  ✨ ไฮไลท์
                </span>
                <p className="mt-2 text-sm font-medium leading-relaxed sm:text-base">
                  กล้อง <span className="font-extrabold">2MP IR Bullet × {pkg.cameras} ตัว</span>{" "}
                  + เครื่องบันทึก <span className="text-yellow-300">DVR/NVR</span>{" "}
                  + <span className="text-cyan-300">{pkg.hdd}</span>{" "}
                  + ของแถมครบชุด พร้อมติดตั้งโดยทีมมืออาชีพ
                </p>
              </div>
            </div>

            {/* What's included */}
            <div className="mt-5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                สิ่งที่ได้ในแพ็คเกจ
              </div>
              <ul className="mt-2 space-y-1.5 text-sm">
                <CheckLine>กล้อง 2MP IR Bullet × <strong>{pkg.cameras} ตัว</strong></CheckLine>
                <CheckLine>เครื่องบันทึก <strong>DVR หรือ NVR</strong></CheckLine>
                <CheckLine>{pkg.hdd}</CheckLine>
                <CheckLine>ติดตั้ง + เดินสายโดยช่างผู้ชำนาญ</CheckLine>
                <CheckLine>รับประกันสินค้า 1 ปี</CheckLine>
              </ul>
            </div>

            {/* Free items */}
            <div className="mt-4 rounded-2xl border border-dashed border-red-300 bg-red-50/50 p-4">
              <div className="text-xs font-extrabold uppercase tracking-wider text-red-600">
                🎁 ฟรี! ของแถมครบชุด
              </div>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {FREE_ITEMS.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-1.5 text-[13px] text-slate-700"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price block */}
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-baseline gap-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  เลือกระบบที่ใช่
                </div>
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  -{dvrDiscount}%
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                <PriceRow label="DVR" sub={pkg.dvr.channels} variant={pkg.dvr} tone="slate" desc="ระบบอนาล็อก ราคาประหยัด" />
                <PriceRow label="NVR" sub={pkg.nvr.channels} variant={pkg.nvr} tone="brand" desc="ระบบ IP + PoE คุณภาพสูง" />
              </div>
              <p className="mt-3 text-[10px] text-slate-500">
                ราคารวมติดตั้ง · VAT แล้ว · ประกัน 1 ปี
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a
                href="https://line.me/R/ti/p/@trustcam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#06C755] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#06C755]/25 transition active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M19.4 10.6c0-3.4-3.4-6.1-7.6-6.1S4.2 7.2 4.2 10.6c0 3 2.7 5.5 6.4 6 .2 0 .6.2.7.4.1.2.1.5 0 .7l-.1.6c0 .2-.2.7.6.4 1.2-.5 6.6-3.9 7-7.1z" />
                </svg>
                สั่งซื้อทาง LINE
              </a>
              <a
                href="https://www.facebook.com/trustcam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#1877F2] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1877F2]/25 transition active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12H16l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProductSpecSheet
        highlight={`${pkg.title} — กล้อง 2MP IR Bullet × ${pkg.cameras} ตัว บันทึกภาพ สี เสียง ตลอด 24 ชม. ด้วยระบบ Smart Hybrid Light`}
        details={pkg.highlights}
      />

      {/* Other packages */}
      {related.length > 0 && (
        <section className="container-x py-12 md:py-20">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                แพ็คเกจอื่น ๆ
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                ลองเปรียบเทียบดู อาจมีแพ็คเกจที่เหมาะกับคุณกว่า
              </p>
            </div>
            <Link
              href="/#packages"
              className="hidden text-sm font-bold text-brand-600 hover:underline sm:block"
            >
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <RelatedCard key={r.slug} pkg={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function CheckLine({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2.8">
        <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-slate-700">{children}</span>
    </li>
  );
}

function PriceRow({
  label,
  sub,
  variant,
  tone,
  desc,
}: {
  label: string;
  sub: string;
  variant: Variant;
  tone: "slate" | "brand";
  desc?: string;
}) {
  const price = variant.price.toLocaleString("th-TH");
  const oldPrice = variant.oldPrice.toLocaleString("th-TH");
  const isBrand = tone === "brand";
  return (
    <div
      className={`flex items-center justify-between rounded-2xl border px-3 py-3 ${
        isBrand
          ? "border-brand-200 bg-brand-50/60"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-xs font-black ${
            isBrand
              ? "bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow"
              : "bg-slate-900 text-white"
          }`}
        >
          {label}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-slate-900">{sub}</div>
          {desc && <div className="text-[11px] text-slate-500">{desc}</div>}
          <div className="text-[10px] text-slate-400 line-through">฿{oldPrice}</div>
        </div>
      </div>
      <div
        className={`text-2xl font-black tracking-tight ${
          isBrand ? "text-brand-700" : "text-slate-900"
        }`}
      >
        ฿{price}
      </div>
    </div>
  );
}

function RelatedCard({ pkg }: { pkg: ReturnType<typeof getPackageBySlug> & {} }) {
  if (!pkg) return null;
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3">
        <PackageVisual cameras={pkg.cameras} />
        <div className="absolute left-2 top-2 rounded-md bg-brand-600 px-2 py-0.5 text-[10px] font-extrabold text-white">
          {pkg.cameras} CH
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-700">
          {pkg.title}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">{pkg.subtitle}</p>
        <div className="mt-auto pt-3 text-xs text-slate-500">
          เริ่มต้น{" "}
          <span className="text-base font-black text-slate-900">
            ฿{pkg.dvr.price.toLocaleString("th-TH")}
          </span>
        </div>
      </div>
    </Link>
  );
}
