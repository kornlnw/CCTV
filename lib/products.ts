export type SeedProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  resolution: string;
  features: string[];
  stock: number;
  featured: boolean;
  category: string;
};

export const SEED_CATEGORIES = [
  { name: "กล้องโดม", slug: "dome" },
  { name: "กล้องกระบอก", slug: "bullet" },
  { name: "กล้อง PTZ", slug: "ptz" },
  { name: "NVR & DVR", slug: "nvr-dvr" },
];

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    name: "VisionPro 4K Dome",
    slug: "visionpro-4k-dome",
    description:
      "กล้องโดม 4K ใช้ได้ทั้งภายในและภายนอกอาคาร อินฟราเรดมองเห็นกลางคืน กันน้ำ IP67 พร้อมระบบตรวจจับการเคลื่อนไหวด้วย AI",
    price: 4990,
    imageUrl:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&q=80",
    resolution: "4K (8MP)",
    features: ["กันน้ำ IP67", "อินฟราเรด 30 เมตร", "ตรวจจับด้วย AI", "รองรับ PoE"],
    stock: 24,
    featured: true,
    category: "dome",
  },
  {
    name: "SecureBullet 5MP Pro",
    slug: "securebullet-5mp-pro",
    description:
      "กล้องกระบอก 5MP สำหรับติดตั้งภายนอกอาคาร อินฟราเรดระยะไกล ตัวกล้องทนทานป้องกันการทุบทำลาย",
    price: 3590,
    imageUrl:
      "https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=1200&q=80",
    resolution: "5MP",
    features: ["กันการทุบทำลาย IK10", "อินฟราเรด 50 เมตร", "WDR", "บีบอัด H.265+"],
    stock: 40,
    featured: true,
    category: "bullet",
  },
  {
    name: "SkyView PTZ 360",
    slug: "skyview-ptz-360",
    description:
      "กล้อง PTZ ความเร็วสูง ซูมแบบออปติคอล 25 เท่า ติดตามวัตถุอัตโนมัติ หมุนได้ 360 องศา",
    price: 18900,
    imageUrl:
      "https://images.unsplash.com/photo-1551446591-142875a901a1?w=1200&q=80",
    resolution: "4MP",
    features: ["ซูม 25 เท่า", "ติดตามอัตโนมัติ", "หมุน 360°", "อินฟราเรด 150 เมตร"],
    stock: 8,
    featured: true,
    category: "ptz",
  },
  {
    name: "GuardCam 2MP Mini Dome",
    slug: "guardcam-2mp-mini",
    description:
      "กล้องโดมขนาดเล็ก 2MP เหมาะสำหรับร้านค้า สำนักงาน และภายในบ้าน",
    price: 1290,
    imageUrl:
      "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=1200&q=80",
    resolution: "2MP (1080p)",
    features: ["ติดตั้งง่าย Plug & Play", "ไมโครโฟนในตัว", "เลนส์มุมกว้าง 110°"],
    stock: 120,
    featured: false,
    category: "dome",
  },
  {
    name: "NightHawk 8MP Bullet",
    slug: "nighthawk-8mp-bullet",
    description:
      "กล้องกระบอกที่ให้ภาพสีคมชัดแม้ในที่แสงน้อย ด้วยเทคโนโลยี ColorVu และไฟสปอตไลต์ในตัว",
    price: 5290,
    imageUrl:
      "https://images.unsplash.com/photo-1574170609830-3c0cc935a6f4?w=1200&q=80",
    resolution: "4K (8MP)",
    features: ["ColorVu ภาพสีกลางคืน", "ไฟสปอตไลต์ในตัว", "พูดสองทาง"],
    stock: 30,
    featured: true,
    category: "bullet",
  },
  {
    name: "CommandCenter NVR 16CH",
    slug: "commandcenter-nvr-16ch",
    description:
      "เครื่องบันทึกภาพ NVR 16 ช่อง รองรับการเข้ารหัสและถอดรหัส 4K รองรับฮาร์ดดิสก์สูงสุด 8TB",
    price: 12500,
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80",
    resolution: "16 ช่อง",
    features: ["ถอดรหัส 4K", "รองรับ HDD 8TB", "แอปพลิเคชันบนมือถือ", "PoE Switch ในตัว"],
    stock: 15,
    featured: false,
    category: "nvr-dvr",
  },
  {
    name: "MiniDVR 8CH HD",
    slug: "minidvr-8ch-hd",
    description:
      "เครื่องบันทึก DVR 8 ช่อง ราคาประหยัด สำหรับกล้องอนาล็อก พร้อมพอร์ต HDMI",
    price: 4290,
    imageUrl:
      "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1200&q=80",
    resolution: "8 ช่อง",
    features: ["บันทึก 1080p", "HDMI/VGA", "ดูออนไลน์ผ่าน P2P Cloud"],
    stock: 22,
    featured: false,
    category: "nvr-dvr",
  },
  {
    name: "PanoView PTZ Pro",
    slug: "panoview-ptz-pro",
    description:
      "กล้อง PTZ ระดับพรีเมียม ติดตามอัจฉริยะ อ่านป้ายทะเบียนรถ และมีไฟกะพริบเตือน",
    price: 26900,
    imageUrl:
      "https://images.unsplash.com/photo-1614064548237-096abc8e5f0a?w=1200&q=80",
    resolution: "8MP",
    features: ["อ่านป้ายทะเบียน (LPR)", "ติดตามอัจฉริยะ", "ไฟกะพริบเตือน", "อินฟราเรด 200 เมตร"],
    stock: 5,
    featured: true,
    category: "ptz",
  },
];
