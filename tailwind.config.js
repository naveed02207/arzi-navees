/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urdu: ['"Jameel Noori Nastaleeq Kasheeda"', '"Noto Nastaliq Urdu"', '"Noto Sans Arabic"', 'serif'],
      },
    },
  },
  plugins: [],
};
