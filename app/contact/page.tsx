import { ContactForm } from "@/components/ContactForm";
import { ContactButtons } from "@/components/ContactButtons";

export default function ContactPage() {
  return (
    <div>
      <section className="bg-slate-900 py-16 text-white">
        <div className="container-x">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            ติดต่อเรา
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            ทักเราทาง Facebook หรือ LINE — ตอบกลับเร็วที่สุด
            (ปกติภายใน 1 ชั่วโมงในเวลาทำการ)
          </p>
          <div className="mt-6">
            <ContactButtons />
          </div>
        </div>
      </section>
      <section className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">พูดคุยกับผู้เชี่ยวชาญ</h2>
          <p className="mt-2 text-slate-600">
            ทีมที่ปรึกษาด้านความปลอดภัยพร้อมให้บริการ จันทร์–เสาร์ เวลา 9.00–18.00 น.
          </p>
          <dl className="mt-8 space-y-6">
            <Item label="Facebook Page" value="@trustcam" />
            <Item label="LINE Official" value="@trustcam" />
            <Item label="ฝ่ายขาย" value="02-000-0000" />
            <Item label="อีเมล" value="support@trustcam.co.th" />
            <Item
              label="สำนักงาน"
              value="123 ถ.สุขุมวิท คลองเตย กรุงเทพฯ 10110"
            />
          </dl>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-lg font-bold">หรือฝากข้อความไว้</h3>
          <p className="mt-1 text-sm text-slate-600">
            กรอกแบบฟอร์ม ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง
          </p>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-base font-medium text-slate-900">{value}</dd>
    </div>
  );
}
