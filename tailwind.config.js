/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter','Barlow', 'Noto Sans', 'Poppins','Noto Sans Display'],
      // 'boba': url('./Sniglet-webfont.woff'),
    },
    extend: {
      width: {
        'big': '576px'
      },
      animation: {
        'scale-up-center': 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000)    both',
        "jello-horizontal": "jello-horizontal 0.8s ease   both"
      },
      keyframes: {
        'scale-up-center': {
          '0%': {
            transform: 'scale(.5)',
          },
          to: {
            transform: 'scale(1)',
          },
        },
        "jello-horizontal": {
                    "0%,to": {
                        transform: "scale3d(1, 1, 1)"
                    },
                    "30%": {
                        transform: "scale3d(1.25, .75, 1)"
                    },
                    "40%": {
                        transform: "scale3d(.75, 1.25, 1)"
                    },
                    "50%": {
                        transform: "scale3d(1.15, .85, 1)"
                    },
                    "65%": {
                        transform: "scale3d(.95, 1.05, 1)"
                    },
                    "75%": {
                        transform: "scale3d(1.05, .95, 1)"
                    }
                }
      },
      colors: {
        rhino: {
          50: '#f1f3fc',
          100: '#e5ebfa',
          200: '#d0d8f5',
          300: '#b3bfee',
          400: '#949ee5',
          500: '#7980db',
          600: '#615fcc',
          700: '#534fb3',
          800: '#444291',
          900: '#323262',
        },
      },
    },
   
  },
  plugins: [require('@tailwindcss/forms')({
    strategy: 'class', // only generate classes
  })],
}