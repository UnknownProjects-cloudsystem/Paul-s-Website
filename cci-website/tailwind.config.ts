import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Tactical / premium dark palette
        charcoal: "#0E0F12",
        ink: "#16181D",
        gunmetal: "#1E2228",
        steel: "#2A2F38",
        "steel-light": "#3A414C",
        navy: "#0B1726",
        silver: "#C7CCD4",
        fog: "#8A909B",
        "soft-white": "#F4F6F8",
        // Police-badge gold accent
        gold: {
          DEFAULT: "#C9A24A",
          bright: "#E2C173",
          deep: "#9E7C2E",
        },
      },
      fontFamily: {
        // Loaded via <link> in layout for offline-safe builds
        display: ['"Oswald"', '"Arial Narrow"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      maxWidth: {
        container: "1240px",
      },
      boxShadow: {
        card: "0 20px 50px -20px rgba(0,0,0,0.7)",
        gold: "0 0 0 1px rgba(201,162,74,0.4), 0 0 30px -6px rgba(201,162,74,0.5)",
      },
      backgroundImage: {
        "grid-tactical":
          "linear-gradient(rgba(58,65,76,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(58,65,76,0.25) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(201,162,74,0.12), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "40%": { opacity: "1" },
          "80%, 100%": { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease forwards",
        scan: "scan 4s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "scroll-cue": "scroll-cue 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
