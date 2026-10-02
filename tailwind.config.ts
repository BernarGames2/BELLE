import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ameixa: { DEFAULT: "#4A1F4E", profundo: "#2D1230" },
        perola: "#FFFBF7",
        pessego: "#FFB98E",
        grafite: "#1E1A21",
        giz: "#6F6672",
        ju: {
          DEFAULT: "var(--cor-ju)",
          on: "var(--cor-ju-on)",
          ink: "var(--cor-ju-ink)",
          soft: "var(--cor-ju-soft)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-texto)", "system-ui", "sans-serif"],
        mao: ["var(--font-mao)", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
