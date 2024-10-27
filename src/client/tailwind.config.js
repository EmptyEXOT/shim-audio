/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,ts,tsx,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#ffffff',
          text: '#000000',
        },
        dark: {
          background: '#000000',
          text: '#ffffff',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
