import { PrismaClient } from "@prisma/client";
import { SEED_CATEGORIES, SEED_PRODUCTS } from "../lib/products";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding categories...");
  const catMap = new Map<string, string>();
  for (const c of SEED_CATEGORIES) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: { name: c.name, slug: c.slug },
    });
    catMap.set(c.slug, cat.id);
  }

  console.log("Seeding products...");
  for (const p of SEED_PRODUCTS) {
    const categoryId = catMap.get(p.category)!;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        price: p.price,
        imageUrl: p.imageUrl,
        resolution: p.resolution,
        features: p.features,
        stock: p.stock,
        featured: p.featured,
        categoryId,
      },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        imageUrl: p.imageUrl,
        resolution: p.resolution,
        features: p.features,
        stock: p.stock,
        featured: p.featured,
        categoryId,
      },
    });
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
