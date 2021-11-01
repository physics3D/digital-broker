module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{png,js,css,xml,ico,html,svg}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'dist/sw.js'
};