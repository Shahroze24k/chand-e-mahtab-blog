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
        'sans': ['Garamond', 'EB Garamond', 'Times New Roman', 'serif'],
        'serif': ['Garamond', 'EB Garamond', 'Times New Roman', 'serif'],
        'playfair': ['Garamond', 'EB Garamond', 'var(--font-playfair)', 'serif'],
        'urdu': ['Garamond', 'EB Garamond', 'var(--font-urdu)', 'serif'],
      },
    },
  },
  plugins: [],
}
