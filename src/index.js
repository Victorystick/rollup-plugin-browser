function resolve ( path ) {
	return path.split( '/' ).reduce(( parts, part ) => {
		if ( part === '..' ) parts.pop();
		else if ( part !== '.' ) parts.push(part);
		// part === '.' are ignored
		return parts;
	}, []).join( '/' );
}

function extname ( path ) {
	let ext = '';
	try {
		ext = path.match( /[^\/]\.([^\.\/]+)$/ )[1];
	} finally {
		return ext;
	}
}

const absolutePath = /^(?:\w+:)?\/\//;

export default function browser () {
	return {
		// if `importer` is undefined, resolve relative to `location.href`
		resolveId ( id, importer = location.href ) {
			// don't touch absolute paths
			if ( absolutePath.test( id ) ) return id;

			// add '.js' to paths without extensions
			if ( extname( id ) === '' ) id += '.js';

			// keep everything before the last '/' in `importer`
			const base = importer.slice(0, importer.lastIndexOf('/') + 1);

			// resolve `id` relative to `base`
			return resolve( base + id );
		},

		load ( url ) {
			// TODO: don't require the fetch API
			return fetch( url ).then( response => response.text() );
		}
	};
}
