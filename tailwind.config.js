module.exports = {
  important: true,
  mode: "jit",
  purge: [["./src/**/*.{html,ts,scss}"]],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
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
