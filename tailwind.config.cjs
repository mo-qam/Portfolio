/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        'inner-md': 'inset 0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'inner-lg': 'inset 0 10px 15px -3px rgba(0, 0, 0, 0.1), inset 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'inner-xl': 'inset 0 20px 25px -5px rgba(0, 0, 0, 0.1), inset 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        inner2xl: 'inset 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/mohammed-qamar-herobg.png')",
      },
      keyframes: {
        fade: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        swing: {
          '20%': { transform: 'rotate3d(0, 0, 1, 15deg)' },
          '40%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
          '60%': { transform: 'rotate3d(0, 0, 1, 5deg)' },
          '80%': { transform: 'rotate3d(0, 0, 1, -5deg)' },
          '100%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
        },
        breathe: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '60%': { transform: 'scale(1.01)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        upDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        fade: 'fade 1.5s ease-in-out infinite',
        slideUp: 'slideUp 0.5s ease-out',
        swing: 'swing 1s ease-in-out infinite',
        breathe: 'breathe 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.5, 0, 0.5, .1) infinite',
        'up-down': 'upDown 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

// primary: "#260D13",
// secondary: "#aaa6c3",
// tertiary: "#39131C",
// "black-100": "#331119",
// "black-200": "#4D1925",
// "white-100": "#f3f3f3",
