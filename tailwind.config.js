/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities({
        ".font-ibm-plex-sans-kr": {
          fontFamily: '"IBM Plex Sans KR", sans-serif',
        },
        ".font-gowun-dodum": {
          fontFamily: '"Gowun Dodum", sans-serif',
        },
        ".font-madimi-one": {
          fontFamily: '"Madimi One", sans-serif',
        },
      });
    }),
  ],
};
