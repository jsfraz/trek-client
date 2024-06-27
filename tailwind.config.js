/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',    // set dark/light mode automatically
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"   // flowbite js
  ],
  theme: {
    extend: {
      backdropBlur: {
        'none': '0',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
      }
    },
  },
  variants: {
    backdropBlur: ['responsive'],
  },
  plugins: [
    require('flowbite/plugin')    // flowvite plugin
  ],
}

