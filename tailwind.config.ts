import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        obsidian: "#050505",
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        heading: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0) 70%)",
      }
    },
  },
  plugins: [],
};
export default config;