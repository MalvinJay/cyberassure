/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"    
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3789B4',
        'gray-1': '#C5C5C5',
        'gray-2': '#D9D9D9',
        'gray-3': '#D9D9D9',
        'black-1': '#5C5C5C',
        'default': '#F4F4F4',
        'danger':  '#FF0000'
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        'cs': '0 1px 12px rgba(0, 0, 0, 0.07)',
      }
    },
  },
  plugins: [],
}
