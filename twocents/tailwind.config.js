/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d0d0d",
        highlight: "#FFC43D",
        orange: "#FF8700",
        lightText: "#F5F5F5",
        card: "#121212",
        pill: "#292929",
        grayBorder: "#3f3f3f",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
      },
      boxShadow: {
        card: "0 2px 6px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
