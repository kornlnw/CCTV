import { ContactButtons } from "@/components/ContactButtons";

type Service = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  gradient: string;
};

const SERVICES: Service[] = [
  {
    title: "สำรวจหน้างานและออกแบบระบบ",
    desc: "บริการสำรวจหน้างานฟรี วางตำแหน่งกล้องให้ครอบคลุมจุดเสี่ยง พร้อมออกแบบระบบให้เหมาะกับสถานที่ของคุณ",
    gradient: "from-brand-500 to-brand-700",
    icon: (
      <>
        <path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </>
    ),
  },
  {
    title: "ติดตั้งโดยช่างมืออาชีพ",
    desc: "ทีมช่างผู้ชำนาญดูแลทั้งงานเดินสาย ติดตั้งกล้อง ตั้งค่าเครือข่าย โดยไม่รบกวนการดำเนินงานของคุณ",
    gradient: "from-amber-500 to-orange-600",
    icon: (
      <>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </>
    ),
  },
  {
    title: "ตั้งค่าเครื่องบันทึกและสตอเรจ",
    desc: "ตั้งค่า NVR, RAID, ระยะเวลาเก็บไฟล์ และการดูภาพระยะไกลผ่านมือถือและคอมพิวเตอร์",
    gradient: "from-emerald-500 to-teal-600",
    icon: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
        <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
      </>
    ),
  },
  {
    title: "บำรุงรักษาและซัพพอร์ต",
    desc: "แพ็กเกจบริการรายปีรวมการทำความสะอาด อัปเดตเฟิร์มแวร์ และซัพพอร์ตทางไกล 24 ชั่วโมง พร้อม SLA หน้างาน",
    gradient: "from-pink-500 to-rose-600",
    icon: (
      <>
        <path d="M9 12 L11 14 L15 10" />
        <path d="M12 2 L4 6 V12 C4 17 7.5 21 12 22 C16.5 21 20 17 20 12 V6 Z" />
      </>
    ),
  },
  {
    title: "อัปเกรดระบบเดิม",
    desc: "เปลี่ยนหรือขยายระบบอนาล็อกเดิม ย้ายมาเป็นกล้อง IP โดยใช้สายเดิมได้เท่าที่เป็นไปได้",
    gradient: "from-violet-500 to-purple-600",
    icon: (
      <>
        <path d="M21 12a9 9 0 1 1-9-9c2.5 0 4.7 1 6.4 2.6" />
        <path d="M21 4 V9 H16" />
      </>
    ),
  },
  {
    title: "เชื่อมต่อกับระบบอื่น ๆ",
    desc: "เชื่อมต่อกล้องวงจรปิดกับระบบ Access Control, แจ้งเตือนการบุกรุก และ Building Management ในแดชบอร์ดเดียว",
    gradient: "from-cyan-500 to-blue-600",
    icon: (
      <>
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 12 L15 6 M9 12 L15 18" />
      </>
    ),
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-slate-950 py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-mesh-dark opacity-80" />
        <div className="container-x relative">
          <span className="inline-block rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-200">
            บริการของเรา
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            บริการครบวงจร <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-brand-300 to-cyan-300 bg-clip-text text-transparent">
              จากผู้เชี่ยวชาญ
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
            ตั้งแต่การออกแบบจนถึงการบำรุงรักษา เราให้บริการครบวงจร
            ทั้งบ้าน ร้านค้า สำนักงาน และโรงงาน
          </p>
        </div>
      </section>

      <section className="container-x py-12 md:py-20">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-8 text-white shadow-2xl shadow-brand-900/30 md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-brand-400/15 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-300/30 bg-yellow-300/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-200">
              ฟรี
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              จองสำรวจหน้างานฟรี
            </h2>
            <p className="mt-3 max-w-xl text-brand-100/80">
              แจ้งรายละเอียดสถานที่และความต้องการ ทีมงานจะเข้าไปสำรวจ
              และเสนอราคาภายใน 24 ชั่วโมง โดยไม่มีค่าใช้จ่าย
            </p>
            <div className="mt-7">
              <ContactButtons />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7">
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-2xl transition group-hover:opacity-30`}
      />
      <div className="flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-lg`}
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
            {service.icon}
          </svg>
        </div>
        <span className="font-display text-2xl font-black tracking-tight text-slate-200">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.desc}</p>
    </div>
  );
}
