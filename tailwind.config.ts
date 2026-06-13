import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep "museum at night" palette.
        ink: {
          950: "#05060a",
          900: "#0a0c14",
          800: "#11141f",
          700: "#1a1f2e",
          600: "#252b3d",
        },
        atlas: {
          // Neon accent — gaming-inspired but restrained.
          50: "#eafdff",
          100: "#c9f7ff",
          200: "#99eeff",
          300: "#5ce0ff",
          400: "#22c9f5",
          500: "#06a8d6",
          600: "#0784ab",
          700: "#0d6a8a",
          800: "#135670",
          900: "#14485f",
        },
        magenta: {
          400: "#f06bff",
          500: "#d63bf0",
          600: "#b023cc",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(34, 201, 245, 0.35)",
        "glow-magenta": "0 0 40px -10px rgba(214, 59, 240, 0.35)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
