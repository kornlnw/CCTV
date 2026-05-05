import Link from "next/link";

type CamType = {
  slug: string;
  name: string;
  bestFor: string;
  desc: string;
  points: string[];
  illustration: React.ReactNode;
  gradient: string;
};

const TYPES: CamType[] = [
  {
    slug: "dome",
    name: "กล้องโดม",
    bestFor: "ภายในอาคาร",
    desc: "ดีไซน์โดมกลมกลืนกับเพดาน มุมมอง 360° ไม่สังเกตทิศทาง เหมาะกับร้านค้า สำนักงาน คลังสินค้า โรงแรม และภายในบ้าน",
    points: [
      "ติดใต้เพดานสวยงาม ไม่เกะกะ",
      "ผู้ร้ายดูไม่ออกว่ากล้องชี้ทางไหน",
      "มุมรับภาพกว้าง ครอบคลุมทั้งห้อง",
    ],
    gradient: "from-blue-500 to-blue-700",
    illustration: <DomeIllustration />,
  },
  {
    slug: "bullet",
    name: "กล้องกระบอก",
    bestFor: "ภายนอกอาคาร",
    desc: "ตัวกล้องทรงกระบอกยาว ระยะมองไกล ทนแดดทนฝน เหมาะกับรั้วบ้าน ลานจอดรถ ทางเข้า–ออก หรือพื้นที่กลางแจ้งทุกประเภท",
    points: [
      "ระยะอินฟราเรดไกลถึง 50 เมตร",
      "กันน้ำ IP67 ทนสภาพอากาศ",
      "เห็นกล้องชัด ช่วยป้องกันการบุกรุก",
    ],
    gradient: "from-emerald-500 to-teal-600",
    illustration: <BulletIllustration />,
  },
  {
    slug: "ptz",
    name: "กล้อง PTZ",
    bestFor: "พื้นที่กว้าง",
    desc: "หมุน เอียง ซูมได้ตามต้องการ พร้อมติดตามวัตถุอัตโนมัติ เหมาะกับโรงงาน โกดัง ลานจอดรถใหญ่ และพื้นที่ที่ต้องดูครอบคลุมหลายมุม",
    points: [
      "ซูมเข้าใกล้ดูรายละเอียดได้",
      "ติดตามคนหรือรถยนต์อัตโนมัติ",
      "1 ตัวแทนกล้องคงที่หลายตัว",
    ],
    gradient: "from-violet-500 to-purple-700",
    illustration: <PTZIllustration />,
  },
  {
    slug: "nvr-dvr",
    name: "NVR & DVR",
    bestFor: "ระบบบันทึกภาพ",
    desc: "เครื่องบันทึกภาพหัวใจของระบบ CCTV เก็บข้อมูลย้อนหลังได้ตามต้องการ ดูภาพย้อนหลังและสดผ่านมือถือได้ทุกที่ทั่วโลก",
    points: [
      "บันทึกได้สูงสุด 16 ช่อง",
      "ดูผ่านแอปฯ มือถือทุกที่",
      "รองรับฮาร์ดดิสก์ใหญ่ถึง 8TB",
    ],
    gradient: "from-amber-500 to-orange-600",
    illustration: <NVRIllustration />,
  },
];

export function RecommendationGuide() {
  return (
    <section className="bg-slate-50 py-12 md:py-20">
      <div className="container-x">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {TYPES.map((t) => (
            <TypeCard key={t.slug} type={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TypeCard({ type }: { type: CamType }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10">
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-20`}
        />
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative w-3/5">{type.illustration}</div>
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow backdrop-blur">
          <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${type.gradient}`} />
          เหมาะกับ {type.bestFor}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            {type.name}
          </h3>
          <Link
            href={`/products?category=${type.slug}`}
            className="text-xs font-bold text-brand-600 hover:underline"
          >
            ดูสินค้า →
          </Link>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{type.desc}</p>
        <ul className="mt-4 space-y-1.5">
          {type.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
              <svg
                viewBox="0 0 24 24"
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
              >
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Illustrations ---------- */

function DomeIllustration() {
  return (
    <svg viewBox="0 0 200 110" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="dome-ceiling" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="dome-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <radialGradient id="dome-lens" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="60%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
      </defs>
      {/* Ceiling */}
      <rect x="0" y="0" width="200" height="20" fill="url(#dome-ceiling)" />
      <line x1="0" y1="20" x2="200" y2="20" stroke="#475569" strokeWidth="0.5" />
      {/* Mounting plate */}
      <ellipse cx="100" cy="22" rx="32" ry="4" fill="#cbd5e1" />
      {/* Dome body */}
      <path
        d="M 70 22 Q 70 70 100 70 Q 130 70 130 22 Z"
        fill="url(#dome-body)"
        stroke="#94a3b8"
        strokeWidth="0.6"
      />
      {/* Dome glass */}
      <ellipse cx="100" cy="50" rx="22" ry="20" fill="url(#dome-lens)" opacity="0.95" />
      <ellipse cx="93" cy="42" rx="6" ry="4" fill="#60a5fa" opacity="0.4" />
      {/* Lens */}
      <circle cx="100" cy="55" r="6" fill="#000" />
      <circle cx="100" cy="55" r="3" fill="#1e3a8a" />
      <circle cx="98" cy="53" r="1.2" fill="#60a5fa" opacity="0.8" />
      {/* Coverage cone */}
      <path
        d="M 100 70 L 60 105 L 140 105 Z"
        fill="#3b82f6"
        opacity="0.08"
      />
      <path
        d="M 100 70 L 60 105 L 140 105 Z"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="0.5"
        strokeDasharray="2 2"
        opacity="0.5"
      />
    </svg>
  );
}

function BulletIllustration() {
  return (
    <svg viewBox="0 0 200 110" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="bullet-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="bullet-front" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <radialGradient id="bullet-lens" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="55%" stopColor="#0b1d4a" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
      </defs>
      {/* Wall */}
      <rect x="160" y="0" width="40" height="110" fill="#1e293b" />
      <line x1="160" y1="0" x2="160" y2="110" stroke="#475569" strokeWidth="0.5" />
      {[15, 40, 65, 90].map((y) => (
        <line
          key={y}
          x1="160"
          y1={y}
          x2="200"
          y2={y}
          stroke="#334155"
          strokeWidth="0.4"
        />
      ))}
      {/* Mount bracket */}
      <rect x="155" y="48" width="10" height="14" rx="1.5" fill="#94a3b8" />
      <rect x="148" y="55" width="10" height="3" fill="#64748b" />
      <line x1="148" y1="58" x2="142" y2="62" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body */}
      <path
        d="M 30 50
           L 130 50
           Q 145 50 145 65
           Q 145 80 130 80
           L 30 80 Z"
        fill="url(#bullet-body)"
        stroke="#94a3b8"
        strokeWidth="0.6"
      />
      {/* Mount post */}
      <rect x="138" y="40" width="3" height="12" fill="#64748b" />
      {/* Front face */}
      <ellipse cx="35" cy="65" rx="11" ry="14" fill="url(#bullet-front)" />
      {/* Lens */}
      <circle cx="35" cy="65" r="8" fill="url(#bullet-lens)" />
      <circle cx="32" cy="62" r="2.5" fill="#60a5fa" opacity="0.5" />
      {/* IR sensor */}
      <circle cx="48" cy="58" r="1.5" fill="#1e293b" />
      {/* Mic */}
      <circle cx="80" cy="65" r="2" fill="#475569" />
      <circle cx="80" cy="65" r="1" fill="#0f172a" />
      {/* Brand text */}
      <text
        x="105"
        y="62"
        fill="#475569"
        fontSize="5"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        textAnchor="middle"
      >
        TRUSTCAM
      </text>
      <text
        x="105"
        y="72"
        fill="#94a3b8"
        fontSize="3.5"
        fontWeight="500"
        fontFamily="Inter, sans-serif"
        textAnchor="middle"
      >
        2MP IR · IP67
      </text>
      {/* IR beam */}
      <path
        d="M 25 65 L 0 50 L 0 80 Z"
        fill="#ef4444"
        opacity="0.1"
      />
      <path
        d="M 25 65 L 0 50 L 0 80 Z"
        fill="none"
        stroke="#ef4444"
        strokeWidth="0.4"
        strokeDasharray="2 2"
        opacity="0.5"
      />
    </svg>
  );
}

function PTZIllustration() {
  return (
    <svg viewBox="0 0 200 110" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ptz-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <radialGradient id="ptz-glass" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#a78bfa" opacity="0.6" />
          <stop offset="60%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
      </defs>
      {/* Ceiling */}
      <rect x="0" y="0" width="200" height="14" fill="#1e293b" />
      <line x1="0" y1="14" x2="200" y2="14" stroke="#475569" strokeWidth="0.5" />
      {/* Mount plate */}
      <ellipse cx="100" cy="16" rx="20" ry="3" fill="#cbd5e1" />
      <rect x="96" y="16" width="8" height="6" fill="#94a3b8" />
      {/* Top housing */}
      <rect
        x="78"
        y="22"
        width="44"
        height="14"
        rx="3"
        fill="url(#ptz-body)"
        stroke="#94a3b8"
        strokeWidth="0.5"
      />
      {/* Sphere camera body */}
      <circle cx="100" cy="58" r="22" fill="url(#ptz-body)" stroke="#94a3b8" strokeWidth="0.5" />
      {/* Pan rotation lines */}
      <ellipse cx="100" cy="58" rx="22" ry="6" fill="none" stroke="#cbd5e1" strokeWidth="0.4" />
      {/* Lens window */}
      <ellipse cx="100" cy="60" rx="13" ry="11" fill="url(#ptz-glass)" />
      <circle cx="100" cy="60" r="6" fill="#000" />
      <circle cx="100" cy="60" r="3" fill="#312e81" />
      <circle cx="98" cy="58" r="1.2" fill="#a78bfa" opacity="0.8" />
      {/* Pan arrows */}
      <path d="M 60 58 L 50 58 M 53 55 L 50 58 L 53 61" fill="none" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 140 58 L 150 58 M 147 55 L 150 58 L 147 61" fill="none" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Tilt arrow */}
      <path d="M 100 90 L 100 100 M 97 97 L 100 100 L 103 97" fill="none" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Zoom indicator */}
      <text
        x="170"
        y="62"
        fill="#a78bfa"
        fontSize="6"
        fontWeight="800"
        fontFamily="Inter, sans-serif"
      >
        25x
      </text>
    </svg>
  );
}

function NVRIllustration() {
  return (
    <svg viewBox="0 0 200 110" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="nvr-top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="nvr-front" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="100" cy="92" rx="78" ry="4" fill="#000" opacity="0.2" />
      {/* Top */}
      <path
        d="M 26 30 L 174 30 L 178 38 L 22 38 Z"
        fill="url(#nvr-top)"
      />
      {/* Front face */}
      <rect x="22" y="38" width="156" height="48" rx="3" fill="url(#nvr-front)" />
      {/* Top reflection */}
      <rect x="28" y="40" width="144" height="4" rx="1" fill="#ffffff" opacity="0.05" />
      {/* Brand */}
      <text
        x="34"
        y="60"
        fill="#ffffff"
        fontSize="11"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.5"
      >
        TRUSTCAM
      </text>
      <text
        x="34"
        y="74"
        fill="#22d3ee"
        fontSize="6.5"
        fontWeight="600"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.8"
      >
        4K · ULTRA HD · 16 CH
      </text>
      {/* LEDs */}
      <circle cx="120" cy="62" r="1.8" fill="#22c55e" />
      <circle cx="126" cy="62" r="1.8" fill="#facc15" />
      <circle cx="132" cy="62" r="1.8" fill="#3b82f6" />
      {/* Power button */}
      <circle cx="160" cy="65" r="7" fill="none" stroke="#475569" strokeWidth="0.8" />
      <line x1="160" y1="60" x2="160" y2="64" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 156 65 A 4 4 0 0 0 164 65" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" />
      {/* Bottom strip */}
      <rect x="22" y="82" width="156" height="4" fill="#1e293b" />
    </svg>
  );
}
