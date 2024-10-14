/** @type {import('tailwindcss').Config} */
const colors = require('./colors').colors;

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: colors,
      boxShadow: {
        button: '0px 40px 32px -24px rgba(15, 15, 15, 0.12)'
      }
    },
    fontFamily: {
      poppins700: ['Poppins_700Bold'],
      poppins600: ['Poppins_600SemiBold'],
      poppins500: ['Poppins_500Medium'],
      poppins400: ['Poppins_400Regular'],
      poppins300: ['Poppins_300Light'],
      urbanist400: ['Urbanist_400Regular'],
    },
  },
  plugins: [],
}