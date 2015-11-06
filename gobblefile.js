var gobble = require( 'gobble' );
var babel = require( 'rollup-plugin-babel' );

module.exports = gobble([
	gobble( 'src' ).transform( 'rollup', {
		entry: 'index.js',
		dest: 'rollup-plugin-browser.cjs.js',
		plugins: [ babel() ],
		format: 'cjs'
	}),

	gobble( 'src' ).transform( 'rollup', {
		entry: 'index.js',
		dest: 'rollup-plugin-browser.es6.js',
		plugins: [ babel() ],
		format: 'es6'
	})
]);
