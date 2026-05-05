import { prisma } from "./prisma";
import { SEED_CATEGORIES, SEED_PRODUCTS, type SeedProduct } from "./products";

type ProductView = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  resolution: string;
  features: string[];
  stock: number;
  featured: boolean;
  category: { name: string; slug: string };
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

const fallbackCatBySlug = new Map(SEED_CATEGORIES.map((c) => [c.slug, c]));

function fallbackToView(p: SeedProduct): ProductView {
  const cat = fallbackCatBySlug.get(p.category)!;
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    description: p.description,
    price: p.price,
    imageUrl: p.imageUrl,
    resolution: p.resolution,
    features: p.features,
    stock: p.stock,
    featured: p.featured,
    category: { name: cat.name, slug: cat.slug },
  };
}

async function tryDb<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

export async function getProducts(opts?: {
  category?: string;
  featured?: boolean;
}): Promise<ProductView[]> {
  const dbResult = await tryDb(async () => {
    const rows = await prisma.product.findMany({
      where: {
        ...(opts?.category ? { category: { slug: opts.category } } : {}),
        ...(opts?.featured ? { featured: true } : {}),
      },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { name: "asc" }],
    });
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      description: r.description,
      price: Number(r.price),
      imageUrl: r.imageUrl,
      resolution: r.resolution,
      features: r.features,
      stock: r.stock,
      featured: r.featured,
      category: { name: r.category.name, slug: r.category.slug },
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  });

  if (dbResult && dbResult.length) return dbResult;

  let items = SEED_PRODUCTS.map(fallbackToView);
  if (opts?.category) items = items.filter((p) => p.category.slug === opts.category);
  if (opts?.featured) items = items.filter((p) => p.featured);
  return items;
}

export async function getProductBySlug(slug: string): Promise<ProductView | null> {
  const dbResult = await tryDb(async () => {
    const r = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!r) return null;
    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      description: r.description,
      price: Number(r.price),
      imageUrl: r.imageUrl,
      resolution: r.resolution,
      features: r.features,
      stock: r.stock,
      featured: r.featured,
      category: { name: r.category.name, slug: r.category.slug },
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  });

  if (dbResult) return dbResult;

  const seed = SEED_PRODUCTS.find((p) => p.slug === slug);
  return seed ? fallbackToView(seed) : null;
}

export async function getCategories() {
  const dbResult = await tryDb(() =>
    prisma.category.findMany({ orderBy: { name: "asc" } })
  );
  if (dbResult && dbResult.length) return dbResult;
  return SEED_CATEGORIES.map((c) => ({ id: c.slug, name: c.name, slug: c.slug }));
}
