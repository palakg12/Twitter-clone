/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        backgroundColor: {
          'custom-black': '#343434',
          'custom-white': '#36454F',
          'custom-pink': '#800080',
          'custom-grey': '#3B3546',
          'red': '#e74c3c',
          'custom-color':'#0A0A0E',
        },
      },
    },
    plugins: [],
  };