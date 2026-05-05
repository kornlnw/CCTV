import Link from "next/link";

const CATEGORIES = [
  {
    name: "กล้องโดม",
    slug: "dome",
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    desc: "เหมาะกับภายในอาคาร",
  },
  {
    name: "กล้องกระบอก",
    slug: "bullet",
    img: "https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=800&q=80",
    desc: "เหมาะกับภายนอกอาคาร",
  },
  {
    name: "กล้อง PTZ",
    slug: "ptz",
    img: "https://images.unsplash.com/photo-1551446591-142875a901a1?w=800&q=80",
    desc: "หมุน เอียง ซูม",
  },
  {
    name: "NVR & DVR",
    slug: "nvr-dvr",
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    desc: "เครื่องบันทึกภาพ",
  },
];

export function CategoryGrid() {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container-x">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              เลือกกล้องตามประเภท
            </h2>
            <p className="mt-2 text-slate-600">เลือกกล้องที่เหมาะกับทุกพื้นที่</p>
          </div>
          <Link href="/products" className="hidden text-sm font-semibold text-brand-600 hover:underline md:block">
            ดูทั้งหมด →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-200"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition group-hover:scale-110"
                style={{ backgroundImage: `url('${c.img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="text-sm text-slate-300">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
