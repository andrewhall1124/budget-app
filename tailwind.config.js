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
        'main': '#F077b6',
        'main-2': '#00b4d8',
        'contrast': '#FFFFFF',
        'background': '#ade8f4'
      },
    },
  },
  plugins: [],
}
