/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#4193C2',
        'brand-blue-dark': '#3A84B0',
        'brand-blue-light': '#ECEBF8',
        'brand-yellow': '#F5C842',
        'brand-purple': '#9B7EDE',
        'desert-brown': '#A67C52',
        'desert-brown-light': '#D4A574',
      }
    },
  },
  plugins: [],
}