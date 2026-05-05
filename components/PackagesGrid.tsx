import Link from "next/link";
import { PackageVisual } from "@/components/PackageVisual";

type Pkg = {
  cameras: number;
  title: string;
  subtitle: string;
  channels: string;
  hdd: string;
  price: number;
  oldPrice: number;
  highlight?: boolean;
  tag?: string;
};

const PACKAGES: Pkg[] = [
  {
    cameras: 4,
    title: "แพ็คเกจ 4 ตัว",
    subtitle: "เหมาะกับบ้านหรือร้านขนาดเล็ก",
    channels: "DVR/NVR 4CH",
    hdd: "HDD 1TB",
    price: 8990,
    oldPrice: 12500,
    tag: "เริ่มต้น",
  },
  {
    cameras: 8,
    title: "แพ็คเกจ 8 ตัว",
    subtitle: "เหมาะกับบ้านใหญ่หรือร้านค้า",
    channels: "DVR/NVR 8CH",
    hdd: "HDD 1TB",
    price: 14900,
    oldPrice: 19500,
    highlight: true,
    tag: "ขายดี",
  },
  {
    cameras: 12,
    title: "แพ็คเกจ 12 ตัว",
    subtitle: "เหมาะกับสำนักงานหรือธุรกิจ",
    channels: "DVR/NVR 16CH",
    hdd: "HDD 2TB",
    price: 22900,
    oldPrice: 29500,
    tag: "ธุรกิจ",
  },
  {
    cameras: 16,
    title: "แพ็คเกจ 16 ตัว",
    subtitle: "เหมาะกับโรงงานหรือโกดัง",
    channels: "DVR/NVR 16CH",
    hdd: "HDD 2TB",
    price: 29900,
    oldPrice: 39500,
    tag: "องค์กร",
  },
];

const SPECS = [
  { label: "2MP", sub: "FHD 1080p" },
  { label: "IP67", sub: "กันน้ำ" },
  { label: "IR 30m", sub: "อินฟราเรด" },
  { label: "WDR", sub: "ภาพคมชัด" },
];

const FREE_ITEMS = [
  { label: "สาย RG6 + ไฟ 100m" },
  { label: "Power Supply" },
  { label: "หัวต่อ BNC ครบชุด" },
  { label: "ติดตั้งฟรีในกรุงเทพฯ" },
];

export function PackagesGrid() {
  return (
    <section className="container-x py-12 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white sm:text-xs">
          🔥 โปรโมชั่นเดือนนี้
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          แพ็คเกจติดตั้งกล้องวงจรปิด
        </h2>
        <p className="mt-3 text-slate-600">
          ครบชุด พร้อมติดตั้ง · รับประกัน 1 ปี · ฟรี! สาย + อุปกรณ์เสริม + HDD
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PACKAGES.map((p) => (
          <PackageCard key={p.cameras} pkg={p} />
        ))}
      </div>

      <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 p-1 shadow-2xl shadow-brand-900/30">
        {/* Animated gradient ring */}
        <div className="pointer-events-none absolute -inset-1 rounded-[inherit] opacity-60 [background:conic-gradient(from_var(--angle),transparent_0%,#3b82f6_15%,transparent_30%,transparent_55%,#22d3ee_70%,transparent_85%)] [animation:spin_8s_linear_infinite] [--angle:0deg]" />
        <div className="relative rounded-[calc(theme(borderRadius.3xl)-4px)] bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 p-6 sm:p-8">
          {/* Decorative blurs */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative flex flex-col items-center gap-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="flex items-start gap-4">
              {/* Custom icon */}
              <div className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-600/40 sm:flex">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 2 L14 8 L20 9 L15.5 13 L17 19 L12 16 L7 19 L8.5 13 L4 9 L10 8 Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-yellow-400" />
                  </span>
                  ข้อเสนอพิเศษ
                </div>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  ต้องการมากกว่า{" "}
                  <span className="bg-gradient-to-r from-brand-300 to-cyan-300 bg-clip-text text-transparent">
                    16 ตัว
                  </span>{" "}
                  หรือสเปคพิเศษ?
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  ทีมเซลล์มืออาชีพออกแบบโซลูชันให้คุณ · เสนอราคาภายใน 24 ชม.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <a
                href="https://line.me/R/ti/p/@trustcam"
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#06C755] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-[#06C755]/25 transition active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
                <svg viewBox="0 0 24 24" className="relative h-4 w-4" fill="currentColor">
                  <path d="M19.4 10.6c0-3.4-3.4-6.1-7.6-6.1S4.2 7.2 4.2 10.6c0 3 2.7 5.5 6.4 6 .2 0 .6.2.7.4.1.2.1.5 0 .7l-.1.6c0 .2-.2.7.6.4 1.2-.5 6.6-3.9 7-7.1z" />
                </svg>
                <span className="relative">ทักสอบถามราคาพิเศษ</span>
                <svg viewBox="0 0 24 24" className="relative h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="tel:+6620000000"
                className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white"
              >
                หรือโทร 02-000-0000
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: Pkg }) {
  const discount = Math.round(((pkg.oldPrice - pkg.price) / pkg.oldPrice) * 100);
  const price = pkg.price.toLocaleString("th-TH");
  const oldPrice = pkg.oldPrice.toLocaleString("th-TH");

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-3xl border ${
        pkg.highlight
          ? "border-brand-600 bg-gradient-to-b from-white to-brand-50 shadow-xl shadow-brand-600/15"
          : "border-slate-200 bg-white shadow-sm"
      } transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10`}
    >
      {pkg.highlight && (
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 py-1.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">
          ⭐ ขายดีที่สุด
        </div>
      )}

      <div className="flex flex-col p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            {pkg.tag && !pkg.highlight && (
              <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                {pkg.tag}
              </span>
            )}
            <h3 className="mt-1 text-lg font-extrabold text-slate-900">
              {pkg.title}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">{pkg.subtitle}</p>
          </div>
          <span className="rounded-2xl bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
            -{discount}%
          </span>
        </div>

        {/* Camera + NVR illustration */}
        <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3">
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.25),transparent_60%)]" />
          <div className="relative">
            <PackageVisual cameras={pkg.cameras} />
          </div>
          <div className="absolute right-2 top-2 flex flex-col items-center rounded-lg bg-yellow-400 px-2 py-1 text-[10px] font-extrabold leading-tight text-slate-900 shadow">
            <span className="text-base leading-none">1</span>
            <span>YEAR</span>
          </div>
          <div className="absolute left-2 top-2 rounded-md bg-brand-600 px-2 py-0.5 text-[10px] font-extrabold text-white shadow">
            {pkg.cameras} CH
          </div>
        </div>

        {/* What's included */}
        <ul className="mt-5 space-y-2 text-sm">
          <Item bold>
            <span className="text-slate-700">กล้อง 2MP IR Bullet × </span>
            <span className="font-bold">{pkg.cameras} ตัว</span>
          </Item>
          <Item bold>
            <span className="text-slate-700">{pkg.channels}</span>
          </Item>
          <Item bold>
            <span className="text-slate-700">{pkg.hdd}</span>
          </Item>
        </ul>

        {/* Specs row */}
        <div className="mt-4 grid grid-cols-4 gap-1.5">
          {SPECS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-slate-50 px-1.5 py-2 text-center"
            >
              <div className="text-[11px] font-extrabold text-brand-700">
                {s.label}
              </div>
              <div className="text-[9px] text-slate-500">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Free items */}
        <div className="mt-4 rounded-2xl border border-dashed border-red-300 bg-red-50/50 p-3">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-red-600">
            ฟรี! ของแถมครบชุด
          </div>
          <ul className="mt-1.5 space-y-1">
            {FREE_ITEMS.map((f) => (
              <li
                key={f.label}
                className="flex items-center gap-1.5 text-[12px] text-slate-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 flex-shrink-0 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    d="M5 12l5 5L20 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {f.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-[11px] text-slate-500 line-through">
              ปกติ ฿{oldPrice}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 sm:text-4xl">
                ฿{price}
              </span>
            </div>
            <div className="text-[10px] text-slate-500">รวมติดตั้ง · VAT แล้ว</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-4 flex gap-2">
          <a
            href="https://line.me/R/ti/p/@trustcam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#06C755] py-2.5 text-sm font-bold text-white shadow-lg shadow-[#06C755]/25 transition active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M19.4 10.6c0-3.4-3.4-6.1-7.6-6.1S4.2 7.2 4.2 10.6c0 3 2.7 5.5 6.4 6 .2 0 .6.2.7.4.1.2.1.5 0 .7l-.1.6c0 .2-.2.7.6.4 1.2-.5 6.6-3.9 7-7.1z" />
            </svg>
            สั่งซื้อ
          </a>
          <Link
            href="/contact"
            aria-label="ดูรายละเอียดเพิ่มเติม"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Item({
  children,
  bold,
}: {
  children: React.ReactNode;
  bold?: boolean;
}) {
  return (
    <li className="flex items-start gap-2">
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={bold ? "2.8" : "2.2"}
      >
        <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </li>
  );
}
