/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			green: {
				light: "#E8FCE8",
				DEFAULT: "#40E840",
				dark: "#40E840",
			},
			red: {
				light: "#FCE8E8",
				DEFAULT: "#E84142",
				dark: "#E84142",
			},
		},
		extend: {
			fontFamily: {
				sans: ["Inter"],
			},
		},
	},
	plugins: [],
};
