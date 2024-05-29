/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        p100: "#72B8B2",
        p500: "#00968f",
        p600: "#006070",
        p700: "#00524b",
        p800: "#003029",
        p900: "#002624",
        s500: "#78BE20",
        logo: {
          primary: "#01978f",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        pj: {
          primary: "#6b191b", // p500
          "primary-content": "#FFFFFF",
          secondary: "#FEFCF3",
          accent: "#1fb2a6",
          neutral: "#e5e7eb", // Anteriormente era #2a323c (Ahora es Gray 200)
          "base-100": "#FFFFFF", // white
          "base-200": "#F3F4F6", // Gray 100
          info: "#3abff8",
          success: "#36d399",
          warning: "#F6DC8F", // OK
          error: "#f87272",
          "error-content": "#ffffff",
        },
      },
    ],
    darkTheme: "pj",
    base: false,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
  },
};
