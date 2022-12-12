/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      transitionProperty: {
        text: 'font-size;',
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      }
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: '#F28C18',
          secondary: '#00a0c4',
          accent: '#D926A9',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
    // [
    // 	{
    // 		mytheme: {
    // 			primary: '#F28C18',
    // 			secondary: '#00a0c4',
    // 			accent: '#e0e0e0',
    // 			neutral: '#1B1D1D',
    // 			'base-100': '#212121',
    // 			info: '#2463EB',
    // 			success: '#16A249',
    // 			warning: '#FBBD23',
    // 			error: '#DC2828',
    // 		},
    // 	},
    // ]
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};
