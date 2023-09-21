/** @type {import('tailwindcss').Configuration} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/assets/1243346.png')"
      },
      animation: {
        'menu-animated': 'menu-animate 5s ease-in-out'
      },
      keyframes: {
        'menu-animate': {
          '0%': { translate: -50 },
          '50%': { opacity: 0.3 },
          '100%': { opacity: 1 }
        }
      }
    },
  },
  plugins: [],
}