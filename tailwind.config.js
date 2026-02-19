/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{handlebars, html, js}", "./public/js/*.js"],
  theme: {
    extend: {
      colors: {
        gren: '#E5F0D5',
        yelr: '#FCF0CB',
        orng: '#F7D7AE',
        purp: '#FBE7FD',
      },
      backgroundImage: {
        'greenBackground': "url('/assets/greenBackground.svg')"
      },
    },
  },
  plugins: [],
}
