/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#716EDC', // Define your primary color
        secondary: '#464646', // Define your secondary color
      },
      fontFamily: {
        'jost': ['"Jost"', ...defaultTheme.fontFamily.sans],
        'inter': ['"Inter"', ...defaultTheme.fontFamily.sans],
        'poppins': ['"Poppins"', ...defaultTheme.fontFamily.sans],
        'opensans': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

