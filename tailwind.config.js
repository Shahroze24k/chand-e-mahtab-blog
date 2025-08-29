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
        'brand-green': '#0B5D1E',
        'brand-gold': '#F4C430',
        'ink': '#14221C',
        'bg': '#FAFBF8',
      },
      fontFamily: {
        'playfair': ['var(--font-playfair)', 'serif'],
        'urdu': ['var(--font-urdu)', 'serif'],
      },
    },
  },
  plugins: [],
}