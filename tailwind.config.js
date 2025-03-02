/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rick-green': '#97ce4c',
        'rick-dark': '#242424',
        'rick-light': '#f0f2eb',
      },
      fontFamily: {
        'rick': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}