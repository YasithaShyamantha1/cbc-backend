/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary" : "#FFE0B5",
        "secondary": "#000000",
        "accent" : "#ca9166 "
      }
    },
  },
  plugins: [],
}