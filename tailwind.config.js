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
      'special-purple': '#772AFB',
      'special-orange': '#FDB876',
      'special-red': '#FB6970',
      ...colors,
    },
    extend: {
      fontFamily: {
        sans: ['Quicksand'],
    },
    },
  },
  plugins: [],
}