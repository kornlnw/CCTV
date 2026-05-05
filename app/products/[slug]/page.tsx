import { getProductBySlug } from "@/lib/data";
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

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const price = Number(product.price).toLocaleString("th-TH");
  const categoryLabel = CATEGORY_TH[product.category.slug] ?? product.category.name;

  return (
    <div className="container-x py-12 md:py-16">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-600">หน้าแรก</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-brand-600">สินค้า</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            {categoryLabel} · {product.resolution}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-slate-600">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-slate-900">
              ฿{price}
            </span>
            <span className="text-sm text-slate-500">รวมภาษีมูลค่าเพิ่ม</span>
          </div>

          <div className="mt-2 text-sm">
            {product.stock > 0 ? (
              <span className="font-medium text-emerald-600">
                ● มีสินค้าในสต็อก ({product.stock} ชิ้น)
              </span>
            ) : (
              <span className="font-medium text-red-600">● สินค้าหมด</span>
            )}
          </div>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="text-sm font-medium text-slate-700">
              สนใจสั่งซื้อหรือสอบถามเพิ่มเติม ทักได้เลย:
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href="https://line.me/R/ti/p/@securesight"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#06C755] px-6 py-3 text-sm font-semibold text-white shadow hover:opacity-90"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M19.4 10.6c0-3.4-3.4-6.1-7.6-6.1S4.2 7.2 4.2 10.6c0 3 2.7 5.5 6.4 6 .2 0 .6.2.7.4.1.2.1.5 0 .7l-.1.6c0 .2-.2.7.6.4 1.2-.5 6.6-3.9 7-7.1z" />
                </svg>
                สั่งซื้อทาง LINE
              </a>
              <a
                href="https://www.facebook.com/securesight"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-6 py-3 text-sm font-semibold text-white shadow hover:opacity-90"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12H16l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z" />
                </svg>
                Facebook
              </a>
              <a
                href="tel:+6620000000"
                className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                โทรหาเรา
              </a>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-xs">
            <div>
              <div className="font-bold text-slate-900">รับประกัน</div>
              <div className="text-slate-500">1 ปี</div>
            </div>
            <div>
              <div className="font-bold text-slate-900">สำรวจหน้างาน</div>
              <div className="text-slate-500">ฟรี</div>
            </div>
            <div>
              <div className="font-bold text-slate-900">ดูแล</div>
              <div className="text-slate-500">24/7</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
