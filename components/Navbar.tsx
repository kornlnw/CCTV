"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/", label: "หน้าแรก" },
  { href: "/products", label: "สินค้า" },
  { href: "/guide", label: "แนะนำ" },
  { href: "/services", label: "บริการ" },
  { href: "/blog", label: "บล็อก", external: true },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อ" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-xl"
          : "bg-white/0"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="Trustcam">
          <Logo size="md" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const className = `rounded-full px-4 py-2 text-sm font-medium transition ${
              active ? "bg-brand-900 text-white" : "text-slate-700 hover:bg-brand-50"
            }`;
            return item.external ? (
              <a key={item.href} href={item.href} className={className}>{item.label}</a>
            ) : (
              <Link key={item.href} href={item.href} className={className}>{item.label}</Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://line.me/R/ti/p/@securesight"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-[#06C755] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#06C755]/25 transition hover:opacity-90 sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M19.4 10.6c0-3.4-3.4-6.1-7.6-6.1S4.2 7.2 4.2 10.6c0 3 2.7 5.5 6.4 6 .2 0 .6.2.7.4.1.2.1.5 0 .7l-.1.6c0 .2-.2.7.6.4 1.2-.5 6.6-3.9 7-7.1z" />
            </svg>
            LINE
          </a>
          <button
            type="button"
            aria-label="เปิดเมนู"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-white md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 top-16 z-40 origin-top md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 -top-16 bg-slate-900/40 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`relative mx-3 mt-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <nav className="flex flex-col p-3">
            {NAV.map((item) => {
              const active = pathname === item.href;
              const className = `flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition ${
                active ? "bg-brand-900 text-white" : "text-slate-700 hover:bg-brand-50"
              }`;
              const inner = (
                <>
                  {item.label}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-60" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              );
              return item.external ? (
                <a key={item.href} href={item.href} className={className}>{inner}</a>
              ) : (
                <Link key={item.href} href={item.href} className={className}>{inner}</Link>
              );
            })}
            <div className="mt-2 grid grid-cols-2 gap-2 p-1">
              <a
                href="https://line.me/R/ti/p/@securesight"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] py-3 text-sm font-semibold text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M19.4 10.6c0-3.4-3.4-6.1-7.6-6.1S4.2 7.2 4.2 10.6c0 3 2.7 5.5 6.4 6 .2 0 .6.2.7.4.1.2.1.5 0 .7l-.1.6c0 .2-.2.7.6.4 1.2-.5 6.6-3.9 7-7.1z" />
                </svg>
                LINE
              </a>
              <a
                href="https://www.facebook.com/securesight"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#1877F2] py-3 text-sm font-semibold text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12H16l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z" />
                </svg>
                Facebook
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
