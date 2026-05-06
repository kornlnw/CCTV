import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 text-slate-300">
      <div className="container-x grid gap-8 py-12 sm:grid-cols-2 md:grid-cols-4 md:py-16">
        <div className="sm:col-span-2 md:col-span-1">
          <Logo variant="white" size="md" />
          <p className="mt-4 text-sm italic text-blue-200">
            “กล้องที่คุณวางใจ”
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Trustcam — ระบบกล้องวงจรปิดมืออาชีพ
            ที่ได้รับความไว้วางใจจากธุรกิจกว่า 2,000 แห่งทั่วประเทศไทย
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href="https://line.me/R/ti/p/@securesight"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LINE"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06C755] text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M19.4 10.6c0-3.4-3.4-6.1-7.6-6.1S4.2 7.2 4.2 10.6c0 3 2.7 5.5 6.4 6 .2 0 .6.2.7.4.1.2.1.5 0 .7l-.1.6c0 .2-.2.7.6.4 1.2-.5 6.6-3.9 7-7.1z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/securesight"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12H16l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">หมวดสินค้า</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/products?category=dome" className="hover:text-white">กล้องโดม</Link></li>
            <li><Link href="/products?category=bullet" className="hover:text-white">กล้องกระบอก</Link></li>
            <li><Link href="/products?category=ptz" className="hover:text-white">กล้อง PTZ</Link></li>
            <li><Link href="/products?category=nvr-dvr" className="hover:text-white">NVR & DVR</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">บริษัท</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">เกี่ยวกับเรา</Link></li>
            <li><Link href="/guide" className="hover:text-white">แนะนำการเลือกซื้อ</Link></li>
            <li><Link href="/services" className="hover:text-white">บริการติดตั้ง</Link></li>
            <li><a href="/blog" className="hover:text-white">บล็อก</a></li>
            <li><Link href="/contact" className="hover:text-white">ติดต่อเรา</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">ติดต่อ</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>กรุงเทพมหานคร, ประเทศไทย</li>
            <li>โทร. 02-000-0000</li>
            <li>support@trustcam.co.th</li>
            <li>LINE: @trustcam</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} บริษัท Trustcam จำกัด · กล้องที่คุณวางใจ
      </div>
    </footer>
  );
}
