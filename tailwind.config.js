/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14131a",
        paper: "#ffffff",
        cream: "#fff7f7",
        panel: "#ffffff",
        panel2: "#fbeeef",
        line: "#f0dcdd",
        mist: "#6b6a72",
        brand: "#d81e2c",
        brand2: "#9b1c31",
        gold: "#c8a24a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 10px 40px -12px rgba(216,30,44,0.35)",
        soft: "0 8px 30px -12px rgba(20,19,26,0.12)",
      },
    },
  },
  plugins: [],
};
