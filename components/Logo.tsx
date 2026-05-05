type Variant = "color" | "white";

export function Logo({
  variant = "color",
  className = "",
  size = "md",
}: {
  variant?: Variant;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const isWhite = variant === "white";
  const textSize =
    size === "sm" ? "text-xl" : size === "lg" ? "text-4xl" : "text-2xl";
  const dotSize =
    size === "sm" ? "h-1.5 w-1.5" : size === "lg" ? "h-3 w-3" : "h-2 w-2";
  const tagSize = size === "sm" ? "text-[8px]" : "text-[9px]";

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <div className="flex items-end gap-1.5">
        <span
          className={`font-display font-black lowercase leading-none ${textSize} ${
            isWhite ? "text-white" : "text-slate-900"
          }`}
          style={{ letterSpacing: "-0.055em" }}
        >
          trustcam
        </span>
        <span
          className={`relative mb-1 inline-flex ${dotSize}`}
          aria-hidden="true"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400 opacity-60" />
          <span className="relative inline-flex h-full w-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
        </span>
      </div>
      <span
        className={`font-display mt-1.5 font-semibold uppercase ${tagSize} ${
          isWhite ? "text-blue-200/70" : "text-blue-700/80"
        }`}
        style={{ letterSpacing: "0.32em" }}
      >
        trust&nbsp;every&nbsp;frame
      </span>
    </div>
  );
}

export function LogoMark({
  className = "h-9 w-9",
  variant = "color",
}: {
  className?: string;
  variant?: Variant;
}) {
  const isWhite = variant === "white";
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl ${
        isWhite ? "bg-white" : "bg-slate-900"
      } ${className}`}
    >
      <span
        className={`font-display font-black leading-none ${
          isWhite ? "text-slate-900" : "text-white"
        }`}
        style={{ fontSize: "55%", letterSpacing: "-0.06em" }}
      >
        tc
      </span>
      <span className="absolute right-1.5 top-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_2px_rgba(34,211,238,0.6)]" />
    </div>
  );
}
