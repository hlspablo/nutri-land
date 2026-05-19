/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#061b18",
          900: "#08241f",
          800: "#0d332d",
          700: "#155047",
          600: "#1f6e5f",
          500: "#31705e",
          400: "#61a785",
        },
        cream: {
          50:  "#fff7e7",
          100: "#fff1d6",
          200: "#f3dfb8",
          300: "#dac790",
          400: "#bfa56f",
          500: "#a9915f",
        },
        gold: {
          400: "#f3d15b",
          500: "#e5bd63",
          600: "#b97832",
          700: "#8f5b28",
        },
        teal: {
          300: "#8ee9da",
          400: "#22c3a6",
          500: "#0e8174",
        },
        coral: {
          300: "#f3a19a",
          400: "#f47a5f",
          500: "#bd593d",
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
