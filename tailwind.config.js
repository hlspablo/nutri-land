/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        forest: {
          900: "#14362c",
          800: "#21493c",
          700: "#3e5b50",
          500: "#5e8f6d",
          400: "#74857c",
          200: "#d7e5d3",
        },
        cream: {
          50:  "#fbfcf8",
          100: "#f6f8f5",
          200: "#edf2ed",
          300: "#dfeade",
          400: "#c5d8c2",
          500: "#5f814e",
        },
        accent: {
          400: "#b9d88d",
          500: "#91b56e",
          700: "#5f814e",
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
