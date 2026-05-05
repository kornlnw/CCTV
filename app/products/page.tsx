import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/data";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts({ category }),
    getCategories(),
  ]);

  return (
    <div className="container-x py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">สินค้าทั้งหมด</h1>
        <p className="mt-2 text-slate-600">
          ค้นหากล้องวงจรปิดและเครื่องบันทึกที่เหมาะกับคุณ
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            !category
              ? "bg-brand-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          ทั้งหมด
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/products?category=${c.slug}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === c.slug
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {categoryNameTh(c.slug, c.name)}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="mt-12 text-center text-slate-500">ไม่พบสินค้า</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function categoryNameTh(slug: string, fallback: string) {
  const map: Record<string, string> = {
    dome: "กล้องโดม",
    bullet: "กล้องกระบอก",
    ptz: "กล้อง PTZ",
    "nvr-dvr": "NVR & DVR",
  };
  return map[slug] ?? fallback;
}
