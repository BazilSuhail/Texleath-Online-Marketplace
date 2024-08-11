module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsx': '900px',
      },
      fontWeight: {
        'extra-black': '900',
      },
      colors: {
        'custom-gray': 'rgb(200, 200, 200)',
        'custom-light-red': '#fff9f9',
        'custom-red': '#1a0303',
      },
      fontSize: {
        'custom-sz': '25px',

        'custom-size': '20px',
      },
      boxShadow: {
        'custom-shadow': '1px 1px 10px #ffb7b7',
        'custom-dark': '0px 0px 5px rgb(0, 30, 65, 0.488 )',
        'custom-text': '0px 0px 2px rgb(0, 30, 0 )',


        'custom-card': '0px 0px 9px rgba(76, 76, 76, 0.718)',
        'custom-blured': '0px -80px 70px #ffeded',
        'custom-blured-2': '0px -120px 70px #ffeded',
        'custom-blured-3': '0px -160px 70px #ffeded',
        'custom-blured-4': '0px -200px 70px #ffeded',
        'custom-blured-5': '0px -230px 40px #ffeded',
      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        fadeInOut: 'fadeInOut 2s infinite',
      }
    },
  },
  plugins: [],
}
