import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        newSize: "11.11px",
      },
      keyframes: {
        slideinY: {
          "100%": { transform: "translateY(0%)" },
          "00%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        slideinY: "slideinY 0.7s ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
