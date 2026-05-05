import Image from "next/image";
import Link from "next/link";

type Props = {
  product: {
    slug: string;
    name: string;
    imageUrl: string;
    resolution: string;
    price: number | string;
    featured?: boolean;
  };
};

export function ProductCard({ product }: Props) {
  const price = Number(product.price).toLocaleString("th-TH", {
    minimumFractionDigits: 0,
  });
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition active:scale-[0.99] hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-brand-700 shadow backdrop-blur">
            ⭐ แนะนำ
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {product.resolution}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900 transition group-hover:text-brand-700 sm:text-lg">
          {product.name}
        </h3>
        <div className="mt-auto flex items-baseline justify-between pt-4">
          <div>
            <span className="text-[11px] text-slate-500">เริ่มต้น</span>
            <div className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              ฿{price}
            </div>
          </div>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition group-hover:bg-brand-600">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
