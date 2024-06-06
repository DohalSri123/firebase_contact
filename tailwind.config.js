/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        yellow: "#FFEAAE",
        "dark-yellow": "#FCCA3F",
        orange: "#F6820C",
      },
    },
  },
  plugins: [],
}