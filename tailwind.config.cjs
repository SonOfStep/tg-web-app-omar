/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        tg: "var(--tg-theme-text-color)",
        tg_hint: "var(--tg-theme-hint-color)",
        tg_link: "var(--tg-theme-hint-color)",
        tg_button: "var(--tg-theme-hint-color)",
      },
      backgroundColor: {
        tg: "var(--tg-theme-bg-color)",
        tg_secondary: "var(--tg-theme-secondary-bg-color)",
        tg_button: "var(--tg-theme-button-text-color)",
      },
    },
  },
  plugins: [],
};
