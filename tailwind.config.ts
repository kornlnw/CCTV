import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-kanit)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "var(--font-kanit)", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#0b1d4a",
        },
        accent: {
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
        },
      },
      backgroundImage: {
        "mesh-dark":
          "radial-gradient(at 20% 0%, rgba(37,99,235,0.30) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(30,64,175,0.25) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(29,78,216,0.25) 0px, transparent 50%)",
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
