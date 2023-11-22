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
        'green': '#00c500',
        'red': '#ff2c2c',
        'grey': '#8e918f'
      },
    },
  },
  plugins: [],
}
