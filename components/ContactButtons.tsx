import { SOCIAL } from "@/lib/social";

type Variant = "default" | "light" | "compact";

export function ContactButtons({ variant = "default" }: { variant?: Variant }) {
  const compact = variant === "compact";
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? "" : "mt-2"}`}>
      <a
        href={SOCIAL.facebook.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0e63d4]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12H16l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z" />
        </svg>
แชทผ่าน Facebook
      </a>
      <a
        href={SOCIAL.line.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-[#06C755] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#05a548]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M19.4 10.6c0-3.4-3.4-6.1-7.6-6.1S4.2 7.2 4.2 10.6c0 3 2.7 5.5 6.4 6 .2 0 .6.2.7.4.1.2.1.5 0 .7l-.1.6c0 .2-.2.7.6.4 1.2-.5 6.6-3.9 7-7.1zm-10 1.7H8c-.2 0-.3-.1-.3-.3V8.6c0-.2.1-.3.3-.3s.3.1.3.3v3h1c.2 0 .3.1.3.3s0 .4-.2.4zm1.6-.3c0 .2-.1.3-.3.3s-.3-.1-.3-.3V8.6c0-.2.1-.3.3-.3s.3.1.3.3V12zm3.7 0c0 .1-.1.2-.2.3h-.1c-.1 0-.2 0-.3-.1l-1.6-2.1V12c0 .2-.1.3-.3.3s-.3-.1-.3-.3V8.6c0-.1.1-.2.2-.3h.1c.1 0 .2 0 .3.1l1.6 2.1V8.6c0-.2.1-.3.3-.3s.3.1.3.3V12zm2.6-2c.2 0 .3.1.3.3s-.1.3-.3.3h-1v.6h1c.2 0 .3.1.3.3s-.1.3-.3.3h-1.3c-.2 0-.3-.1-.3-.3V8.6c0-.2.1-.3.3-.3h1.3c.2 0 .3.1.3.3s-.1.3-.3.3h-1V10z" />
        </svg>
แชทผ่าน LINE
      </a>
    </div>
  );
}
