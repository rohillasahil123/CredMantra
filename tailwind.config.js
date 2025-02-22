/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#5a79a7',
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '11rem',
        '12xl': '12rem',
        '15xl': '15rem',
        '200px': '200px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif' , 'Inconsolata'], 
      },
      animation: {
        blink: 'blink 1s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
