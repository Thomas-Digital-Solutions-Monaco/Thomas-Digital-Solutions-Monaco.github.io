/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── TDSM Monaco palette: red & white ──
        ink: "#14131a", // near-black text
        paper: "#ffffff", // page background
        cream: "#fff7f7", // soft panel background
        panel: "#ffffff", // card background
        panel2: "#fbeeef", // subtle red-tinted fill
        line: "#f0dcdd", // light red-grey border
        mist: "#6b6a72", // muted text
        brand: "#d81e2c", // Monaco red (primary)
        brand2: "#9b1c31", // deep crimson
        gold: "#c8a24a", // luxury accent
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
