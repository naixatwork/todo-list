const { guessProductionMode } = require("@ngneat/tailwind");

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
      fontFamily: {
        roboto: ["'Roboto'", "sans-serif"],
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
