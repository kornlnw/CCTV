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
  console.log("Seeding install packages...");
  const PACKAGES = [
    {
      name: "แพ็คเกจบ้าน 4 กล้อง",
      slug: "home-4cam",
      description: "เหมาะสำหรับบ้านเดี่ยว/ทาวน์เฮาส์ ครอบคลุมประตูหน้า-หลัง ที่จอดรถ และพื้นที่รอบบ้าน",
      cameraCount: 4,
      recommendedFor: "บ้านเดี่ยว, ทาวน์เฮาส์",
      price: 18900,
      installationFee: 3500,
      features: ["กล้อง 4MP x 4 ตัว", "NVR 4 ช่อง + HDD 1TB", "เดินสาย 50 เมตร", "ตั้งค่าแอปดูผ่านมือถือ", "รับประกัน 2 ปี"],
    },
    {
      name: "แพ็คเกจร้านค้า 8 กล้อง",
      slug: "shop-8cam",
      description: "เหมาะสำหรับร้านค้า ร้านอาหาร มินิมาร์ท ครอบคลุมจุดขาย ทางเข้า และพื้นที่เก็บของ",
      cameraCount: 8,
      recommendedFor: "ร้านค้า, ร้านอาหาร, มินิมาร์ท",
      price: 36900,
      installationFee: 5500,
      features: ["กล้อง 5MP x 8 ตัว", "NVR 8 ช่อง + HDD 2TB", "เดินสาย 100 เมตร", "ColorVu กลางคืนชัด", "รับประกัน 2 ปี"],
    },
    {
      name: "แพ็คเกจสำนักงาน 16 กล้อง",
      slug: "office-16cam",
      description: "เหมาะสำหรับสำนักงาน โรงงานขนาดเล็ก คลังสินค้า ควบคุมหลายโซน",
      cameraCount: 16,
      recommendedFor: "สำนักงาน, คลังสินค้า, โรงงานเล็ก",
      price: 78900,
      installationFee: 9500,
      features: ["กล้อง 4K x 16 ตัว", "NVR 16 ช่อง + HDD 4TB", "เดินสายไม่จำกัดในสถานที่", "AI ตรวจจับใบหน้า", "ทีมเข้าตรวจเช็คฟรี 1 ปี"],
    },
    {
      name: "แพ็คเกจประเมินหน้างาน",
      slug: "site-survey",
      description: "ทีมเข้าสำรวจหน้างาน วัดพื้นที่ ออกแบบจุดติดตั้ง และเสนอราคาฟรี",
      cameraCount: 0,
      recommendedFor: "ลูกค้าที่ยังไม่แน่ใจสเปก",
      price: 0,
      installationFee: 0,
      features: ["ฟรีไม่มีค่าใช้จ่าย", "ใช้เวลา ~30 นาที", "ได้ใบเสนอราคาภายในวันเดียวกัน"],
    },
  ];
  for (const pkg of PACKAGES) {
    await prisma.installPackage.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }

  console.log("Seeding promotions...");
  const PROMOS = [
    {
      code: "WELCOME500",
      description: "ลด 500 บาท สำหรับลูกค้าใหม่ ขั้นต่ำ 5,000 บาท",
      type: "FIXED" as const,
      amount: 500,
      minOrderAmount: 5000,
      maxDiscount: null as number | null,
      usageLimit: null as number | null,
      expiresAt: null as Date | null,
      active: true,
    },
    {
      code: "BIGORDER10",
      description: "ลด 10% เมื่อซื้อครบ 20,000 บาท สูงสุด 3,000 บาท",
      type: "PERCENT" as const,
      amount: 10,
      minOrderAmount: 20000,
      maxDiscount: 3000,
      usageLimit: null,
      expiresAt: null,
      active: true,
    },
  ];
  for (const p of PROMOS) {
    await prisma.promotion.upsert({
      where: { code: p.code },
      update: p as any,
      create: p as any,
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
