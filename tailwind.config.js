import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities({
        '.font-ibm-plex-sans-kr': {
          fontFamily: '"IBM Plex Sans KR", sans-serif',
        },
        '.font-gowun-dodum': {
          fontFamily: '"Gowun Dodum", sans-serif',
        },
        '.font-madimi-one': {
          fontFamily: '"Madimi One", sans-serif',
        },
      });
    }),
  ],
};
