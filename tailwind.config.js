/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main': '#0077b6',
        'main-2': '#00b4d8',
        'contrast': '#FFFFFF',
        'background': '#ade8f4',
        'light-green': '#56d156',
        'dark-green': '#008000',
        'light-red': '#fa5e52',
        'dark-red': '#a60c00',
        'light-grey': '#c2c2c2',
        'dark-grey': '#A9A9A9',
      },
    },
  },
  plugins: [],
}
