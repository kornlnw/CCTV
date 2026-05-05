import { RecommendationGuide } from "@/components/RecommendationGuide";
import { ContactButtons } from "@/components/ContactButtons";

export const metadata = {
  title: "แนะนำกล้อง — Trustcam",
  description:
    "คู่มือเลือกซื้อกล้องวงจรปิด — กล้องโดมเหมาะกับภายในอาคาร กล้องบูเล็ทเหมาะกับภายนอก พร้อมคำแนะนำสำหรับ PTZ และเครื่องบันทึก",
};

export default function GuidePage() {
  return (
    <div>
      <section className="bg-slate-900 py-16 text-white">
        <div className="container-x">
          <span className="inline-block rounded-full bg-brand-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-50">
            คู่มือเลือกซื้อ
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            แนะนำกล้องตามการใช้งาน
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            ก่อนตัดสินใจซื้อกล้องวงจรปิด ลองดูคำแนะนำสั้น ๆ ด้านล่าง
            ว่ากล้องแต่ละแบบเหมาะกับสถานที่ใด
            หรือทักทีมงานเพื่อให้ช่วยเลือกให้ฟรี
          </p>
          <div className="mt-6">
            <ContactButtons />
          </div>
        </div>
      </section>
      <RecommendationGuide />
    </div>
  );
}
