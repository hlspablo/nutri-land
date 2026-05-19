/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#0a201c",
          900: "#0e2b26",
          800: "#143832",
          700: "#1b4339",
          600: "#234f43",
          500: "#2f5e51",
          400: "#4a7a6a",
        },
        cream: {
          50:  "#f6f1dd",
          100: "#ece4c8",
          200: "#dfd5b1",
          300: "#d2c69a",
          400: "#b9aa7e",
          500: "#8e8158",
        },
        gold: {
          400: "#d8b974",
          500: "#c9a961",
          600: "#b08f48",
          700: "#8e7236",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Newsreader"', "Georgia", "serif"],
        sans: ['Geist', "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightish: "-0.012em",
        tighter2: "-0.022em",
        widish: "0.14em",
        widest2: "0.18em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.2,.7,.2,1)",
        bounce2: "cubic-bezier(.34,1.36,.64,1)",
      },
    },
  },
  plugins: [],
};
