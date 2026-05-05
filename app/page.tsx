import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { PackagesGrid } from "@/components/PackagesGrid";
import { ProductCard } from "@/components/ProductCard";
import { ContactButtons } from "@/components/ContactButtons";
import { getProducts } from "@/lib/data";
import Link from "next/link";

export default async function HomePage() {
  const all = await getProducts();
  return (
    <>
      <Hero />
      <PackagesGrid />

      <section className="container-x py-12 md:py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              สินค้ามาใหม่
            </h2>
            <p className="mt-2 text-slate-600">อัปเดตสินค้ารุ่นล่าสุดในร้าน</p>
          </div>
          <Link
            href="/guide"
            className="hidden text-sm font-semibold text-brand-600 hover:underline md:block"
          >
            ไม่แน่ใจว่าควรเลือกแบบไหน? ดูคู่มือแนะนำ →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {all.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <Features />

      <section className="bg-brand-700">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              สนใจสินค้า สอบถามได้เลย
            </h2>
            <p className="mt-2 text-brand-100">
              ทักหาเราทาง Facebook หรือ LINE — ตอบกลับเร็ว ปรึกษาฟรี
            </p>
          </div>
          <ContactButtons />
        </div>
      </section>
    </>
  );
}
