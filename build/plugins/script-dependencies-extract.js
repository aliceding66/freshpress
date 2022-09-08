const fse = require( 'fs-extra' );
const path = require( 'path' );
const prettier = require( 'prettier' );

class ScriptDependenciesExtract {
	apply( compiler ) {
		const scriptDependencies = {};

		compiler.hooks.emit.tap( this.constructor.name, ( compilation ) => {
			compilation.entrypoints.forEach( ( entryPoint ) => {
				const currentScriptDeps = new Set();

				entryPoint.chunks.forEach( ( chunk ) => {
					chunk.files
						.filter(
							( filename ) =>
								filename.endsWith( '.js' ) &&
								! filename.startsWith( 'scripts/blocks-' ) &&
								! entryPoint.runtimeChunk.files.includes( filename )
						)
						.forEach( ( filename ) => {
							currentScriptDeps.add(
								`freshpress-${ filename.replace(
									/^scripts\/(.+?)(?:\.[a-f0-9]{8})?\.js$/,
									'$1'
								) }`
							);
						} );

					if ( currentScriptDeps.size > 0 ) {
						const {
							options: { externals = {} },
						} = compiler;
						Object.keys( externals ).forEach( ( externalDep ) => {
							currentScriptDeps.add( externalDep );
						} );
						scriptDependencies[
							entryPoint.options.name.replace( 'blocks-', '' )
						] = Array.from( currentScriptDeps );
					}
				} );

				if ( Object.keys( scriptDependencies ).length > 0 ) {
					fse.outputFileSync(
						path.resolve( __dirname, '..', '..', 'dist', 'script_dependencies.json' ),
						prettier.format( JSON.stringify( scriptDependencies ), {
							parser: 'json',
						} )
					);
				}
			} );
		} );
	}
}

module.exports = ScriptDependenciesExtract;
