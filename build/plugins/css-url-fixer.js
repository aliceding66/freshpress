const fse = require( 'fs-extra' );
const fs = require( 'fs' );
const path = require( 'path' );

class CssUrlFixer {
	apply( compiler ) {
		compiler.hooks.afterEmit.tap( this.constructor.name, () => {
			if ( process.platform === 'win32' ) {
				const stylesPath = path.resolve( __dirname, '..', '..', 'dist', 'styles' );
				fs.readdir( stylesPath, ( err, files ) => {
					if ( err ) {
						// eslint-disable-next-line no-console
						console.log( 'Error:', err );
					} else if ( files.length > 0 ) {
						files
							.filter( ( file ) => file.endsWith( '.css' ) )
							.forEach( ( file ) => {
								const filePath = path.resolve( stylesPath, file );
								const content = fs.readFileSync( filePath, {
									encoding: 'utf8',
								} );
								fse.outputFileSync( filePath, content.replace( /\\/g, '/' ) );
							} );
					}
				} );
			}
		} );
	}
}

module.exports = CssUrlFixer;
