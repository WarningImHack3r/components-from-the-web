import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	safelist: ["dark"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {}
	},
	plugins: []
} satisfies Config;
