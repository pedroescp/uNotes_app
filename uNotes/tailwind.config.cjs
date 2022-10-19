/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	darkMode: ['class'],
	content: ['./src/**/*.{js,jsx,ts,tsx}'],

	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		styled: true,
		themes: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		darkTheme: 'dark',
	},
};
