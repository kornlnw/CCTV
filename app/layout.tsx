import type { Metadata, Viewport } from "next";
import { Kanit, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingChat } from "@/components/FloatingChat";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-kanit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trustcam — กล้องที่คุณวางใจ | Trust Every Frame",
  description:
    "Trustcam จำหน่ายและติดตั้งกล้องวงจรปิด CCTV, NVR/DVR และระบบรักษาความปลอดภัยสำหรับบ้านและธุรกิจ ไว้ใจได้ ทุกมุมมอง รับประกัน 1 ปี",
};

export const viewport: Viewport = {
  themeColor: "#0b1d4a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${kanit.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingChat />
      </body>
    </html>
  );
}
