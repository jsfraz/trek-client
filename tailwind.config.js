/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',    // set dark/light mode automatically
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"   // flowbite js
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')    // flowvite plugin
  ],
}

