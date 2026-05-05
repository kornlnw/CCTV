import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-mesh-dark" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/90 to-slate-950" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="container-x relative pb-20 pt-14 sm:pt-20 md:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl animate-fade-up text-center">
          {/* Tiny eyebrow tag */}
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-300 sm:text-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span>The future of security · Trustcam</span>
          </div>

          {/* Massive headline — mixed weight technique */}
          <h1 className="mt-7 font-display text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <span className="block font-black text-white">
              กล้องที่คุณวางใจ
            </span>
            <span
              className="mt-1 block bg-gradient-to-b from-slate-300/90 to-slate-500/40 bg-clip-text font-light italic text-transparent"
              style={{ letterSpacing: "-0.02em" }}
            >
              ไว้ใจได้ ทุกมุมมอง.
            </span>
          </h1>

          {/* Body */}
          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-base">
            Trustcam คือผู้นำด้านระบบกล้องวงจรปิด — จำหน่ายและติดตั้งกล้องคุณภาพ
            ตั้งแต่บ้านขนาดเล็กจนถึงระบบ NVR สำหรับองค์กร
            พร้อม AI ตรวจจับอัจฉริยะ และรับประกัน 1 ปี
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/products" className="btn-primary justify-center">
              ดูสินค้าทั้งหมด
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="https://line.me/R/ti/p/@trustcam"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line justify-center"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M19.4 10.6c0-3.4-3.4-6.1-7.6-6.1S4.2 7.2 4.2 10.6c0 3 2.7 5.5 6.4 6 .2 0 .6.2.7.4.1.2.1.5 0 .7l-.1.6c0 .2-.2.7.6.4 1.2-.5 6.6-3.9 7-7.1z" />
              </svg>
              ทักผ่าน LINE
            </a>
          </div>

          {/* Trust strip — minimal, single-line */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              2,000+ Installations
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              1-Year Warranty
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              24/7 Support
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-slate-50" />
    </section>
  );
}
