/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        forest: {
          900: "#1d3a30",
          800: "#265044",
          700: "#3d544c",
          500: "#4a7a64",
          400: "#6b7d76",
          200: "#c8d6cd",
        },
        cream: {
          50:  "#ffffff",
          100: "#f7f1e3",
          200: "#efe7d3",
          300: "#e6dcc2",
          400: "#d4c9a8",
          500: "#a8893f",
        },
        accent: {
          400: "#e5c66c",
          500: "#d9b85a",
          700: "#a8893f",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
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
