import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          purple: "#8B5CF6",
          blue: "#3B82F6",
          pink: "#EC4899",
          cyan: "#06B6D4",
        },
        character: {
          khurshed: "#FBBF24", // Amber - for Sun (Khurshed)
          mehrob: "#06B6D4",   // Cyan - for place of light (Mehrob)
          rawshan: "#A78BFA",  // Purple - for luminous (Rawshan)
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #3B82F6, 0 0 10px #3B82F6" },
          "100%": { boxShadow: "0 0 10px #8B5CF6, 0 0 20px #8B5CF6, 0 0 30px #8B5CF6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
