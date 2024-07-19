/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			backgroundImage: {
				hero: "url('/banner.webp')",
				main: "url('/Background.jpg')",
				about: "url('/aboutpage-bg.jpg')",
				services: "url('/servicespage-bg.jpg')",
				contact: "url('/contactpage-bg.jpg')",
			},
			fontFamily: {
				dm: ["DM Serif Display", "serif"],
				jost: ["Jost", "sans-serif"], // Ensure fonts with spaces have " " surrounding it.
			},
			colors: {
				primary: {
					100: "#04acbc",
					200: "#04acbc ",
					300: "#b4cccc ",
					400: "#b4cccc ",
				},
				text: {
					blue: "#1B2534",
					gray: "#4D4F52",
					"gray-100": "#5F5F5F",
					"gray-200": "#4D5053",
					"gray-300": "#E5E5E5",
				},
			},
			transitionDelay: {
				'200': '200ms',
				'400': '400ms',
				'600': '600ms',
			}
		},
		variants: {},
		plugins: [],
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				".center": {
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
				},
				".startCenter": {
					display: "flex",
					"align-items": "center",
				},
				".btwn": {
					display: "flex",
					"justify-content": "space-between",
					"align-items": "center",
				},
			});
		}),
	],
};

