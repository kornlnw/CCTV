const FEATURES = [
  {
    title: "ตรวจจับด้วย AI",
    desc: "ตรวจจับบุคคล ยานพาหนะ และการบุกรุก พร้อมแจ้งเตือนทันทีบนมือถือ",
    icon: <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />,
    gradient: "from-brand-500 to-accent-500",
  },
  {
    title: "ภาพคมชัด 24 ชม.",
    desc: "ColorVu และ IR ให้ภาพคมชัดเป็นสีตลอด 24 ชั่วโมง แม้ในที่แสงน้อย",
    icon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "เก็บข้อมูล 2 ชั้น",
    desc: "บันทึกบนคลาวด์ที่เข้ารหัส + NVR สำรองในเครื่อง ปลอดภัยไร้กังวล",
    icon: (
      <path d="M16 16l-4-4-4 4M12 12v9M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    ),
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "ติดตั้งโดยมืออาชีพ",
    desc: "ทีมช่างผู้ชำนาญติดตั้งและตั้งค่าให้ครบทุกจุด ทั่วประเทศ",
    icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
    gradient: "from-pink-500 to-rose-500",
  },
];

export function Features() {
  return (
    <section className="container-x py-12 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white sm:text-xs">
          ทำไมต้อง SecureSight
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          โซลูชันความปลอดภัย
          <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
            {" "}ที่คิดมาเพื่อคุณ
          </span>
        </h2>
        <p className="mt-3 text-slate-600">
          สินค้าคุณภาพ ติดตั้งโดยมืออาชีพ ดูแลตลอดอายุการใช้งาน
        </p>
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 sm:p-6"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} text-white shadow-lg`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                {f.icon}
              </svg>
            </div>
            <h3 className="mt-4 text-base font-bold sm:text-lg">{f.title}</h3>
            <p className="mt-1.5 text-sm text-slate-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
