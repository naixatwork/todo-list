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
      backgroundImage: (theme) => ({
        "deep-lava": "url('~assets/bg-1.jpg')",
        cloudly: "url('~assets/bg-2.jpg')",
        "warm-lava": "url('~assets/bg-3.png')",
        orbify: "url('~assets/orbify.gif')",
        "bubble-gum": "url('~assets/bubble-gum.gif')",
        lamp: "url('~assets/lamp.gif')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
