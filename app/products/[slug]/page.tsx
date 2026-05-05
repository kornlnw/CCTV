import { getProductBySlug, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ProductSpecSheet } from "@/components/ProductSpecSheet";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_TH: Record<string, string> = {
  dome: "กล้องโดม",
  bullet: "กล้องกระบอก",
  ptz: "กล้อง PTZ",
  "nvr-dvr": "NVR & DVR",
};

const HIGHLIGHTS = [
  "ColorVu — ภาพสีคมชัด 24 ชั่วโมง แม้ในที่แสงน้อย",
  "Smart Hybrid Light ดวงไฟคู่อัจฉริยะ",
  "White Light สว่างไกลถึง 30 เมตร",
  "AI ตรวจจับคนและรถยนต์อัจฉริยะ",
  "ระบบบีบอัด H.265+ ประหยัดพื้นที่ 50%",
  "ไมโครโฟนในตัว บันทึกเสียงพร้อมภาพ",
  "มาตรฐาน IP67 กันน้ำกันฝุ่น",
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const related = allProducts
    .filter((p) => p.category.slug === product.category.slug && p.slug !== product.slug)
    .slice(0, 4);

  const price = Number(product.price).toLocaleString("th-TH");
  const oldPrice = Math.round(Number(product.price) * 1.25).toLocaleString("th-TH");
  const categoryLabel = CATEGORY_TH[product.category.slug] ?? product.category.name;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-slate-50">
        <div className="container-x py-4 text-xs sm:text-sm text-slate-500">
          <Link href="/" className="hover:text-brand-700">หน้าแรก</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-brand-700">สินค้า</Link>
          <span className="mx-2">/</span>
          <Link
            href={`/products?category=${product.category.slug}`}
            className="hover:text-brand-700"
          >
            {categoryLabel}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{product.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="container-x py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              {product.featured && (
                <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-slate-900 shadow">
                  ⭐ แนะนำ
                </span>
              )}
              <span className="absolute right-4 top-4 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                {product.resolution}
              </span>
            </div>
            {/* Thumbs (placeholder) */}
            <div className="mt-3 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`relative aspect-square overflow-hidden rounded-xl border bg-white ${
                    i === 0 ? "border-brand-600 ring-2 ring-brand-600/20" : "border-slate-200"
                  }`}
                >
                  <Image
                    src={product.imageUrl}
                    alt=""
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700">
              {categoryLabel}
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-slate-600">{product.description}</p>

            {/* Highlight banner */}
            <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-5 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="relative">
                <span className="inline-block rounded-full bg-yellow-400/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yellow-200">
                  ✨ ไฮไลท์
                </span>
                <p className="mt-2 text-sm font-medium leading-relaxed sm:text-base">
                  กล้อง <span className="font-extrabold">{product.resolution}</span>{" "}
                  บันทึกภาพ <span className="text-yellow-300">สี เสียง</span> ตลอด 24 ชม.
                  ด้วยระบบ <span className="text-cyan-300">Smart Hybrid Light</span>
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-slate-500 line-through">฿{oldPrice}</span>
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  -20%
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 sm:text-5xl">
                  ฿{price}
                </span>
                <span className="text-sm text-slate-500">/ ตัว</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">รวมภาษีมูลค่าเพิ่ม · ราคาไม่รวมติดตั้ง</div>
              <div className="mt-3 text-sm">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    มีสินค้าในสต็อก ({product.stock} ชิ้น) · พร้อมส่ง
                  </span>
                ) : (
                  <span className="font-medium text-red-600">● สินค้าหมดชั่วคราว</span>
                )}
              </div>
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
              <a
                href="tel:+6620000000"
                className="flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition active:scale-95 hover:bg-slate-50"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.4.6 3.5.1.4.1.8-.2 1l-2.2 2.3z" />
                </svg>
                โทร
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-5 grid grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-center text-xs">
              <div>
                <div className="text-base">🛡️</div>
                <div className="mt-1 font-bold text-slate-900">รับประกัน 1 ปี</div>
              </div>
              <div>
                <div className="text-base">📋</div>
                <div className="mt-1 font-bold text-slate-900">สำรวจหน้างานฟรี</div>
              </div>
              <div>
                <div className="text-base">📞</div>
                <div className="mt-1 font-bold text-slate-900">ดูแล 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductSpecSheet
        highlight={`กล้อง ${product.resolution} บันทึกภาพ สี เสียง ตลอด 24 ชม. ด้วยระบบ Smart Hybrid Light`}
        details={HIGHLIGHTS}
        createdAt={product.createdAt}
        updatedAt={product.updatedAt}
      />

      {/* Related */}
      {related.length > 0 && (
        <section className="container-x py-12 md:py-20">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                สินค้าหมวดเดียวกัน
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                อาจสนใจสินค้าอื่นในหมวด {categoryLabel}
              </p>
            </div>
            <Link
              href={`/products?category=${product.category.slug}`}
              className="hidden text-sm font-bold text-brand-600 hover:underline sm:block"
            >
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

