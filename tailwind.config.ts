import type { Config } from "tailwindcss";

/*
  Los colores apuntan a las CSS vars de app/globals.css.
  Así cambiás la marca en un solo lugar y todo el sistema se actualiza.
  Uso: bg-brand, text-accent-text, border-line, rounded-card, etc.
*/
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
          dark: "var(--brand-dark)",
          tint: "var(--brand-tint)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          text: "var(--accent-text)",
          tint: "var(--accent-tint)",
        },
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        surface: "var(--surface)",
        canvas: "var(--bg)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        control: "var(--radius-control)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
