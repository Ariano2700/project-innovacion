/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  "darkMode":"class",
  theme: {
    extend: {
      colors: {
        // p100: '#D3F0EF',
        p500: '#00968f',
        p600: '#006070',
        p700: '#00524b',
        p800: '#003029',
        p900: '#002624',
        // s100: '#E8F7DF',
        s500: '#78BE20',
        logo: {
          primary: '#01978f',
        }
      },
      // dropShadow: {
      //   'custom': ' 0px 8px 24px rgba(149, 157, 165, 0.2)',
      //   'custom-2': '0px 3px 8px rgba(0, 0, 0, 0.24)',
      // }, 
      // gray-color bg XD #202528
    },

  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        pj: {
          'primary': '#00968F', // p500
          'primary-content': '#FFFFFF',
          'secondary': '#29725D',
          'accent': '#1fb2a6',
          'neutral': '#e5e7eb', // Anteriormente era #2a323c (Ahora es Gray 200)
          'base-100': '#FFFFFF', // white
          'base-200': '#F3F4F6', // Gray 100
          'info': '#3abff8',
          'success': '#36d399',
          'warning': '#F6DC8F', // OK
          'error': '#f87272',
          'error-content': '#ffffff',
        },
      }
    ],
    darkTheme: 'pj',
    base: false,
    styled: true,
    utils: true,
    rtl: false,
    prefix: '',
    logs: true,
  },
}