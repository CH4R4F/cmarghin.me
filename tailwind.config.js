const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",

  content: ["./public/**/*.html", "./public/assets/js/*.js"],
  theme: {
    extend: {
      // ======= add my own colors ====== //
      colors: {
        primary: "#0065D8",
        dark: "#00062C",
      },
      // ======== add my own font family ======= //
      fontFamily: {
        headings: ["Montserrat", "sans-serif"],
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn": {
          padding: ".5em 1.5em",
          background: "#0065D8",
          color: "#ffffff",
          borderRadius: "3px",
          userSelect: "none",
          transition: "all 0.3s",
          "&:hover": {
            background: "#0379FF",
          },
        },
        ".load": {
          transform: "translateY(40px)",
          opacity: 0,
        },
      });
    }),
  ],
};
