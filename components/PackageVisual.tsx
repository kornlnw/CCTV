type Props = { cameras: number };

const LAYOUTS: Record<number, { cols: number; rows: number; scale: number }> = {
  4: { cols: 2, rows: 2, scale: 1.0 },
  8: { cols: 4, rows: 2, scale: 0.78 },
  12: { cols: 4, rows: 3, scale: 0.66 },
  16: { cols: 4, rows: 4, scale: 0.56 },
};

export function PackageVisual({ cameras }: Props) {
  const layout = LAYOUTS[cameras] ?? LAYOUTS[8];
  const { cols, rows, scale } = layout;

  const camW = 42 * scale;
  const camH = 22 * scale;
  const gapX = 5 * scale;
  const gapY = 6 * scale;

  const gridW = cols * camW + (cols - 1) * gapX;
  const gridH = rows * camH + (rows - 1) * gapY;

  const vbWidth = 220;
  const vbHeight = 150;
  const startX = (vbWidth - gridW) / 2;
  const startY = 6;

  const positions: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push({
        x: startX + c * (camW + gapX),
        y: startY + r * (camH + gapY),
      });
    }
  }

  const nvrY = startY + gridH + 6;
  const nvrW = 130;
  const nvrH = 28;
  const nvrX = (vbWidth - nvrW) / 2;

  return (
    <svg
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      className="w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pv-cam-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="pv-cam-front" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <radialGradient id="pv-lens" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#0b1d4a" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <linearGradient id="pv-nvr" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="60%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="pv-nvr-front" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>

      {/* Cameras */}
      {positions.slice(0, cameras).map((pos, i) => (
        <BulletCamera key={i} x={pos.x} y={pos.y} w={camW} h={camH} scale={scale} />
      ))}

      {/* NVR */}
      <NVRBox x={nvrX} y={nvrY} w={nvrW} h={nvrH} />

      {/* Floating spec badges (only when there's room) */}
      {cameras <= 8 && (
        <>
          <SpecBadge x={6} y={10} text="2MP" tone="red" />
          <SpecBadge x={vbWidth - 30} y={10} text="IP67" tone="dark" />
        </>
      )}
    </svg>
  );
}

function BulletCamera({
  x,
  y,
  w,
  h,
  scale,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  scale: number;
}) {
  const showDetail = scale > 0.65;
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Mount bracket */}
      <rect x={w * 0.46} y={0} width={w * 0.08} height={h * 0.12} fill="#94a3b8" rx="0.4" />
      <rect x={w * 0.42} y={h * 0.1} width={w * 0.16} height={h * 0.06} fill="#64748b" rx="0.4" />
      <rect
        x={w * 0.485}
        y={h * 0.16}
        width={w * 0.03}
        height={h * 0.18}
        fill="#475569"
      />

      {/* Camera body — bullet shape with rounded right end */}
      <path
        d={`M ${w * 0.05} ${h * 0.36}
            L ${w * 0.7} ${h * 0.36}
            Q ${w * 0.95} ${h * 0.36} ${w * 0.95} ${h * 0.62}
            Q ${w * 0.95} ${h * 0.88} ${w * 0.7} ${h * 0.88}
            L ${w * 0.05} ${h * 0.88}
            Z`}
        fill="url(#pv-cam-body)"
        stroke="#94a3b8"
        strokeWidth="0.3"
      />

      {/* Front face (lens housing) — darker recessed */}
      <ellipse
        cx={w * 0.13}
        cy={h * 0.62}
        rx={w * 0.09}
        ry={h * 0.27}
        fill="url(#pv-cam-front)"
      />

      {/* Lens */}
      <circle cx={w * 0.13} cy={h * 0.62} r={Math.min(w * 0.06, h * 0.18)} fill="url(#pv-lens)" />
      <circle
        cx={w * 0.115}
        cy={h * 0.55}
        r={Math.min(w * 0.025, h * 0.07)}
        fill="#60a5fa"
        opacity="0.55"
      />

      {showDetail && (
        <>
          {/* IR/sensor on front face */}
          <circle cx={w * 0.18} cy={h * 0.46} r={h * 0.04} fill="#1e293b" />
          {/* Status LED */}
          <circle cx={w * 0.18} cy={h * 0.78} r={h * 0.04} fill="#22c55e" opacity="0.9" />
          {/* Microphone hole */}
          <circle cx={w * 0.55} cy={h * 0.62} r={h * 0.05} fill="#475569" />
          <circle cx={w * 0.55} cy={h * 0.62} r={h * 0.025} fill="#0f172a" />
          {/* Brand text on body */}
          <text
            x={w * 0.7}
            y={h * 0.55}
            fill="#475569"
            fontSize={Math.max(1.5, h * 0.13)}
            fontWeight="700"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
          >
            TRUSTCAM
          </text>
          <text
            x={w * 0.7}
            y={h * 0.74}
            fill="#94a3b8"
            fontSize={Math.max(1.2, h * 0.1)}
            fontWeight="500"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
          >
            2MP IR
          </text>
        </>
      )}
    </g>
  );
}

function NVRBox({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Top (slim metallic strip) */}
      <rect x={0} y={0} width={w} height={h * 0.18} rx={1.5} fill="url(#pv-nvr)" />
      {/* Front face */}
      <rect x={0} y={h * 0.18} width={w} height={h * 0.82} rx={1.5} fill="url(#pv-nvr-front)" />
      {/* Highlight reflection */}
      <rect
        x={2}
        y={h * 0.2}
        width={w - 4}
        height={h * 0.15}
        rx={1}
        fill="#ffffff"
        opacity="0.05"
      />

      {/* Brand logo */}
      <text
        x={w * 0.05}
        y={h * 0.55}
        fill="#ffffff"
        fontSize={h * 0.28}
        fontWeight="900"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.5"
      >
        TRUSTCAM
      </text>
      <text
        x={w * 0.05}
        y={h * 0.78}
        fill="#22d3ee"
        fontSize={h * 0.16}
        fontWeight="600"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.8"
      >
        4K · ULTRA HD · AI
      </text>

      {/* Power button */}
      <circle
        cx={w - h * 0.55}
        cy={h * 0.62}
        r={h * 0.22}
        fill="#0a0e1a"
        stroke="#475569"
        strokeWidth="0.4"
      />
      <circle
        cx={w - h * 0.55}
        cy={h * 0.62}
        r={h * 0.06}
        fill="#22c55e"
      />

      {/* LED indicators */}
      <circle cx={w * 0.62} cy={h * 0.6} r={h * 0.05} fill="#22c55e" />
      <circle cx={w * 0.66} cy={h * 0.6} r={h * 0.05} fill="#facc15" />
      <circle cx={w * 0.7} cy={h * 0.6} r={h * 0.05} fill="#3b82f6" />
    </g>
  );
}

function SpecBadge({
  x,
  y,
  text,
  tone,
}: {
  x: number;
  y: number;
  text: string;
  tone: "red" | "dark";
}) {
  const fill = tone === "red" ? "#ef4444" : "#0f172a";
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="24" height="14" rx="2" fill={fill} />
      <text
        x="12"
        y="9.5"
        fontSize="6.5"
        fontWeight="800"
        fontFamily="Inter, sans-serif"
        fill="#ffffff"
        textAnchor="middle"
      >
        {text}
      </text>
    </g>
  );
}
