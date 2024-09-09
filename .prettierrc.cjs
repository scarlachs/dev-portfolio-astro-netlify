/** @type {import('prettier').Config} */
module.exports = {
	useTabs: true,
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	tabWidth: 4,
	bracketSameLine: false,
	arrowParens: "always",
	proseWrap: "preserve",
	overrides: [{ files: "*.astro", options: { parser: "astro" } }],
	astroAllowShorthand: false,
	tailwindConfig: "./tailwind.config.cjs",
};
