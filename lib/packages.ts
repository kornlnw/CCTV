export type Variant = {
  channels: string;
  price: number;
  oldPrice: number;
};

export type InstallPackage = {
  slug: string;
  cameras: number;
  title: string;
  subtitle: string;
  hdd: string;
  dvr: Variant;
  nvr: Variant;
  highlight?: boolean;
  tag?: string;
  recommendedFor: string;
  description: string;
  highlights: string[];
};

const COMMON_HIGHLIGHTS = [
  "ColorVu — ภาพสีคมชัด 24 ชั่วโมง แม้ในที่แสงน้อย",
  "Smart Hybrid Light ดวงไฟคู่อัจฉริยะ",
  "White Light สว่างไกลถึง 30 เมตร",
  "AI ตรวจจับคนและรถยนต์อัจฉริยะ",
  "ระบบบีบอัด H.265+ ประหยัดพื้นที่ 50%",
  "ไมโครโฟนในตัว บันทึกเสียงพร้อมภาพ",
  "มาตรฐาน IP67 กันน้ำกันฝุ่น",
];

export const PACKAGES: InstallPackage[] = [
  {
    slug: "starter-4",
    cameras: 4,
    title: "แพ็คเกจ 4 ตัว",
    subtitle: "เหมาะกับบ้านหรือร้านขนาดเล็ก",
    hdd: "HDD 1TB",
    dvr: { channels: "DVR 4CH", price: 8990, oldPrice: 12500 },
    nvr: { channels: "NVR 4CH (PoE)", price: 12900, oldPrice: 17900 },
    tag: "เริ่มต้น",
    recommendedFor: "บ้านเดี่ยว · ทาวน์เฮาส์ · ร้านค้าขนาดเล็ก",
    description:
      "แพ็คเกจครบชุดสำหรับการเริ่มต้น เหมาะกับบ้านเดี่ยว ทาวน์เฮาส์ หรือร้านค้าขนาดเล็ก ครอบคลุมประตูหน้า–หลัง ที่จอดรถ และพื้นที่รอบบ้าน พร้อมติดตั้งและรับประกันโดยทีมช่างมืออาชีพ",
    highlights: COMMON_HIGHLIGHTS,
  },
  {
    slug: "popular-8",
    cameras: 8,
    title: "แพ็คเกจ 8 ตัว",
    subtitle: "เหมาะกับบ้านใหญ่หรือร้านค้า",
    hdd: "HDD 1TB",
    dvr: { channels: "DVR 8CH", price: 14900, oldPrice: 19500 },
    nvr: { channels: "NVR 8CH (PoE)", price: 20900, oldPrice: 27500 },
    highlight: true,
    tag: "ขายดี",
    recommendedFor: "บ้านใหญ่ · ร้านอาหาร · มินิมาร์ท",
    description:
      "แพ็คเกจยอดนิยม คุ้มค่าที่สุด เหมาะกับบ้านใหญ่ที่ต้องการจุดเฝ้าระวังหลายจุด ร้านค้า ร้านอาหาร หรือมินิมาร์ท ครอบคลุมจุดขาย ทางเข้า และพื้นที่เก็บของ พร้อม ColorVu ภาพสีกลางคืน",
    highlights: COMMON_HIGHLIGHTS,
  },
  {
    slug: "business-12",
    cameras: 12,
    title: "แพ็คเกจ 12 ตัว",
    subtitle: "เหมาะกับสำนักงานหรือธุรกิจ",
    hdd: "HDD 2TB",
    dvr: { channels: "DVR 16CH", price: 22900, oldPrice: 29500 },
    nvr: { channels: "NVR 16CH (PoE)", price: 31900, oldPrice: 41500 },
    tag: "ธุรกิจ",
    recommendedFor: "สำนักงาน · ธุรกิจขนาดกลาง · ร้านค้าหลายชั้น",
    description:
      "แพ็คเกจสำหรับธุรกิจที่ต้องการระบบรักษาความปลอดภัยอย่างจริงจัง เหมาะกับสำนักงาน ธุรกิจขนาดกลาง หรือร้านค้าหลายชั้น ควบคุมหลายโซน เก็บข้อมูลย้อนหลังได้นาน",
    highlights: COMMON_HIGHLIGHTS,
  },
  {
    slug: "enterprise-16",
    cameras: 16,
    title: "แพ็คเกจ 16 ตัว",
    subtitle: "เหมาะกับโรงงานหรือโกดัง",
    hdd: "HDD 2TB",
    dvr: { channels: "DVR 16CH", price: 29900, oldPrice: 39500 },
    nvr: { channels: "NVR 16CH (PoE)", price: 41900, oldPrice: 54500 },
    tag: "องค์กร",
    recommendedFor: "โรงงาน · โกดัง · คลังสินค้า · พื้นที่ขนาดใหญ่",
    description:
      "แพ็คเกจระดับองค์กรสำหรับโรงงาน โกดัง คลังสินค้า หรือพื้นที่ขนาดใหญ่ที่ต้องการเฝ้าระวังครอบคลุม พร้อม AI ตรวจจับคน/รถ และเก็บข้อมูลความละเอียดสูงต่อเนื่องตลอด 24 ชม.",
    highlights: COMMON_HIGHLIGHTS,
  },
];

export const SPECS = [
  { label: "2MP", sub: "FHD 1080p" },
  { label: "IP67", sub: "กันน้ำ" },
  { label: "IR 30m", sub: "อินฟราเรด" },
  { label: "WDR", sub: "ภาพคมชัด" },
];

export const FREE_ITEMS = [
  "สาย RG6 + ไฟ 100m",
  "Power Supply",
  "หัวต่อ BNC ครบชุด",
  "ติดตั้งฟรีในกรุงเทพฯ",
];

export function getPackageBySlug(slug: string): InstallPackage | null {
  return PACKAGES.find((p) => p.slug === slug) ?? null;
}
