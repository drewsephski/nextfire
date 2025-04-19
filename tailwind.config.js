/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark Blue Main Color Theme
        'dark-blue': {
          100: '#e0e8ff',
          200: '#b3c7ff',
          300: '#86a6ff',
          400: '#5984ff',
          500: '#2c62ff',
          600: '#1f4acc',
          700: '#153799',
          800: '#0e2673',
          900: '#091957',
        },
        // Gray Colors
        gray: {
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
    },
  },
  plugins: [],
};