"use client";

import { useEffect, useState } from "react";

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 transition-all sm:bottom-6 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        className={`flex flex-col items-end gap-2 transition-all ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <a
          href="https://line.me/R/ti/p/@securesight"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#06C755] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-black/10"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M19.4 10.6c0-3.4-3.4-6.1-7.6-6.1S4.2 7.2 4.2 10.6c0 3 2.7 5.5 6.4 6 .2 0 .6.2.7.4.1.2.1.5 0 .7l-.1.6c0 .2-.2.7.6.4 1.2-.5 6.6-3.9 7-7.1z" />
          </svg>
          แชท LINE
        </a>
        <a
          href="https://www.facebook.com/securesight"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-black/10"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12H16l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z" />
          </svg>
          Facebook
        </a>
        <a
          href="tel:+6620000000"
          className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-black/10"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.4.6 3.5.1.4.1.8-.2 1l-2.2 2.3z" />
          </svg>
          โทร
        </a>
      </div>
      <button
        type="button"
        aria-label={open ? "ปิดเมนูติดต่อ" : "เปิดเมนูติดต่อ"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-2xl shadow-brand-600/40 transition active:scale-95"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M12 2C6.5 2 2 6 2 11c0 2.7 1.4 5.2 3.7 6.9L5 22l4.4-2.3c.8.2 1.7.3 2.6.3 5.5 0 10-4 10-9s-4.5-9-10-9z" />
          </svg>
        )}
      </button>
    </div>
  );
}
