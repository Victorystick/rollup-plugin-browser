var assert = require( 'assert' );
var rollup = require( 'rollup' );
var browser = require( '..' );

var expectedResource;

fetch = function ( url ) { //eslint-disable-line no-undef
	if ( url === expectedResource ) {
		return Promise.resolve({ text: function () { return ''; } });
	}

	return Promise.reject( new Error( 'Unexpected resource!' ) );
};

location = { //eslint-disable-line no-undef
	href: 'http://example.com/scripts/'
};

describe( 'rollup-plugin-browser', function () {
	it( 'resolves ids relative to "location.href"', function () {
		expectedResource = 'http://example.com/scripts/samples/index.js';

		return rollup.rollup({
			entry: 'samples/index.js',
			plugins: [ browser() ]
		}).then( function ( bundle ) {
			var generated = bundle.generate({ format: 'cjs' });

			assert.equal( generated.code, '\'use strict\';\n\n' );
		});
	});

	it( 'leaves absolute URLs be', function () {
		expectedResource = 'http://foo-bar.inc/app.js';

		return rollup.rollup({
			entry: expectedResource,
			plugins: [ browser() ]
		});
	});
});
