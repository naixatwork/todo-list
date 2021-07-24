const { guessProductionMode } = require("@ngneat/tailwind");
const colors = require("tailwindcss/colors");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  important: true,
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      color: {
        amber: colors.amber,
        rose: colors.rose,
      },
      fontFamily: {
        roboto: ["'Roboto'", "'Helvetica Neue'", "sans-serif"],
        zen: ["'Zen Loop'"],
        pacifico: ["Pacifico"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
