const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "index.html"
  ],
  theme: {
    colors: {
      'fun-green': '#00bfb2',
      'background-grey': '#d0d3d4',
      ...colors,
    },
    extend: {},
  },
  plugins: [],
}