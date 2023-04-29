/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"    
  ],
  theme: {
    extend: {
      minWidth: {
        '4': '1rem',
        '16': '4rem',
        '20': '5rem',
        '32': '8rem'
      },
      colors: {
        'primary': '#3789B4',
        'secondary': '#04AB1F',
        'danger': '#FE0D0D',
        'gray-1': '#C5C5C5',
        'gray-2': '#D9D9D9',
        'gray-3': '#F9F9F9',
        'gray-4': '#B3B3B3',
        'black-1': '#5C5C5C',
        'default': '#F4F4F4',
        'default-2': '#FAFAFA',
        'danger':  '#FF0000'
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        'cs': '0 1px 12px rgba(0, 0, 0, 0.07)',
        'inner': 'inset 0px 2.7421px 2.7421px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}
