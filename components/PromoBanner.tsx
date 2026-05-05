import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="container-x py-8 md:py-12">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-slate-900 p-6 text-white shadow-xl shadow-brand-700/20 md:col-span-2 md:p-10">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur sm:text-xs">
              🔥 โปรเดือนนี้
            </span>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
              แพ็คเกจกล้อง 4 ตัว + NVR
            </h3>
            <p className="mt-2 text-sm text-brand-100 sm:text-base">
              ครบชุด พร้อมติดตั้ง รับประกัน 1 ปี
            </p>
            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-extrabold sm:text-5xl">฿18,900</span>
              <span className="text-base text-brand-200/70 line-through sm:text-lg">
                ฿24,500
              </span>
              <span className="rounded-full bg-yellow-400 px-2.5 py-0.5 text-xs font-bold text-slate-900">
                ลด 22%
              </span>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-lg transition active:scale-95 hover:bg-slate-100"
            >
              สอบถามแพ็กเกจ
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-6 text-white md:p-8">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-400/15 blur-2xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-yellow-300">
              ฟรี!
            </span>
            <h3 className="mt-3 text-xl font-bold sm:text-2xl">
              สำรวจหน้างาน + เสนอราคา
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              ทีมงานเข้าไปสำรวจถึงที่ ฟรี ไม่มีค่าใช้จ่าย
            </p>
          </div>
          <Link
            href="/contact"
            className="relative mt-6 inline-flex items-center justify-between rounded-full border border-slate-700 bg-slate-800/50 px-5 py-3 text-sm font-semibold backdrop-blur transition active:scale-95 hover:bg-slate-800"
          >
            จองสำรวจฟรี
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
