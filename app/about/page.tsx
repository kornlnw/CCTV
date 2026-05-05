export default function AboutPage() {
  return (
    <div>
      <section className="bg-slate-900 py-16 text-white">
        <div className="container-x">
          <span className="inline-block rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-200">
            เกี่ยวกับเรา
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Trustcam — กล้องที่คุณวางใจ
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            เรามีประสบการณ์กว่าทศวรรษในการดูแลความปลอดภัย
            ให้ธุรกิจและบ้านพักทั่วประเทศไทย — ไว้ใจได้ ทุกมุมมอง
          </p>
        </div>
      </section>
      <section className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">เรื่องราวของเรา</h2>
          <p className="mt-4 text-slate-600">
            Trustcam ก่อตั้งขึ้นในปี 2556 ที่กรุงเทพฯ
            โดยทีมวิศวกรที่หลงใหลในระบบเฝ้าระวังที่เชื่อถือได้
            ปัจจุบันเราได้รับความไว้วางใจจากลูกค้ากว่า 2,000 ราย —
            ตั้งแต่ร้านกาแฟไปจนถึงเชนโรงแรมระดับนานาชาติ —
            ในการออกแบบและติดตั้งระบบรักษาความปลอดภัยที่ใช้งานได้จริง
          </p>
          <p className="mt-4 text-slate-600">
            เราจับมือกับแบรนด์ชั้นนำในอุตสาหกรรม
            ผสานกับระบบวิเคราะห์ AI ของเราเอง
            เพื่อมอบโซลูชันที่ฉลาด ดูแลง่าย
            พร้อมทีมซัพพอร์ตในประเทศตลอด 24 ชั่วโมง
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Stat label="ปีที่ดำเนินกิจการ" value="12+" />
          <Stat label="หน้างานที่ใช้งานอยู่" value="2,000+" />
          <Stat label="กล้องที่ติดตั้ง" value="38,000+" />
          <Stat label="เวลาตอบสนองเฉลี่ย" value="< 2 ชม." />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-3xl font-extrabold text-brand-600">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}
