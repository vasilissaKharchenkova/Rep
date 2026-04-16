/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./app/**/*.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#788678',
        primaryDark: '#667566',
        textMain: '#523E33',
        textLight: '#FFFFFF',
        border: '#E5E5E5',
        brown: '#563F30'
      },
      fontFamily: {
        heading: ['Roscha', 'sans-serif'],
        body: ['"Arsenal SC"', 'sans-serif']
      },
    },
  },
  plugins: [],
}