import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animated'),
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities({
        '.font-ibm-plex-sans': {
          fontFamily: '"IBM Plex Sans", "IBM Plex Sans KR", sans-serif',
        },
        '.font-poppins': {
          fontFamily: '"Poppins", sans-serif',
        },
        '.font-madimi-one': {
          fontFamily: '"Madimi One", sans-serif',
        },
        '.font-playfair': {
          fontFamily: '"Playfair Display", serif',
          fontOpticalSizing: 'auto',
        },
      });
    }),
  ],
};
