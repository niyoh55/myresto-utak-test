/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_bg: "#1e3891",
        green_btn: "#4CAF50",
        blue_btn: "#008CBA",
        red_btn: "#f44336",
      },
      fontFamily: {
        anek: ["Anek Latin"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1e3891",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "light",
      "dark",
    ],
  },
  plugins: [require("daisyui")],
};
