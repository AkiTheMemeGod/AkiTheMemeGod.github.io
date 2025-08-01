/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        black: '#000000', 
        red: {
          500: '#ef4444', 
          600: '#dc2626', 
          700: '#b91c1c',
        },
        gray: {
          800: '#1a1a1a',
          700: '#2a2a2a', 
        },
      },
    },
  },
  plugins: [],
};