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
      'special-red': '#fa204e',
      ...colors,
    },
    backgroundImage: {
      '90s-pattern': 'url("/src/assets/shape_pattern.png")',
    },
    extend: {
      fontFamily: {
        sans: ['Quicksand'],
      },
      keyframes: {
        'right-in': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        'right-out': {
          '100%': {
            transform: 'translateX(100%)',
          },
          '0%': {
            transform: 'translateX(0%)',
          },
        },
      },
      animation: {
        'right-in': 'right-in 0.3s cubic-bezier(0.7, 0.3, 0.1, 1)',
        'right-out': 'right-out 0.3s cubic-bezier(0.7, 0.3, 0.1, 1)',
      },
    },
  },
  plugins: [],
}
