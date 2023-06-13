/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        back: "url('/background.png')",
      },
      height: {
        "9/10": "90%",
      },
      colors: {
        neon: "#D5FC34",
        purpleP: "#9537FF",
        purpleS: "#ba84f8",
      },
    },
  },
  plugins: [],
};
