/* eslint-disable no-console */

const { argv } = require( 'yargs' );
const chalk = require( 'chalk' );
const { exec, spawn } = require( 'child_process' );
const figures = require( 'figures' );
const fs = require( 'fs' );
const path = require( 'path' );
const prettier = require( 'prettier' );
const repoRoot = path.resolve( __dirname, '..', '..', '..', '..' );
const composerJsonPath = path.resolve( repoRoot, 'composer.json' );
const pluginsUpdated = {};

const logError = ( data ) => {
	console.error( `${ chalk.redBright( figures.cross ) } ${ data }` );
};

const logVerboseOnly = ( data ) => {
	if ( argv.verbose ) {
		console.log( data );
	}
};

const updateRequire = ( configSection, plugins ) => {
	for ( const plugin of plugins ) {
		Object.keys( configSection ).forEach( ( key ) => {
			if ( key.endsWith( `/${ plugin.name }` ) ) {
				if ( configSection[ key ] === '*' ) {
					logVerboseOnly( `Skipping ${ plugin.name } with wildcard version` );
				} else {
					logVerboseOnly(
						`Updating ${ plugin.name } from ${ plugin.version } to ${ plugin.update_version }`
					);
					configSection[ key ] = plugin.update_version;
					pluginsUpdated[ plugin.name ] = `${ chalk.greenBright( figures.tick ) } ${
						plugin.name
					}: ${ plugin.version } ${ figures.arrowRight } ${ plugin.update_version }`;
				}
			}
		} );
	}

	return configSection;
};

const updateRepositories = ( configSection, plugins ) => {
	if (
		Array.isArray( configSection ) &&
		configSection.length > 0 &&
		'type' in configSection[ 0 ]
	) {
		for ( const plugin of plugins ) {
			configSection.forEach( ( repo, index ) => {
				if (
					repo.type === 'package' &&
					repo.package &&
					repo.package.name &&
					repo.package.name.endsWith( `/${ plugin.name }` ) &&
					repo.package.version
				) {
					logVerboseOnly(
						`Updating ${ plugin.name } package from ${ plugin.version } to ${ plugin.update_version }`
					);
					configSection[ index ].package.version = plugin.update_version;
					pluginsUpdated[ plugin.name ] = `${ chalk.greenBright( figures.tick ) } ${
						plugin.name
					}: ${ plugin.version } ${ figures.arrowRight } ${ plugin.update_version }`;
				}
			} );
		}
	}

	return configSection;
};

const run = ( error, stdout, stderr ) => {
	if ( error ) {
		logError( error );
		return;
	}
	if ( stderr ) {
		logError( stderr );
		return;
	}

	try {
		const updatesAvailable = JSON.parse( stdout );
		const config = require( composerJsonPath );

		if ( ! updatesAvailable || updatesAvailable.length === 0 ) {
			console.log( 'No plugins require updating' );
		} else {
			// Update composer.json
			config.require = updateRequire( config.require, updatesAvailable );
			config[ 'require-dev' ] = updateRequire( config[ 'require-dev' ], updatesAvailable );
			config.repositories = updateRepositories( config.repositories, updatesAvailable );

			fs.writeFileSync(
				composerJsonPath,
				prettier.format( JSON.stringify( config ), {
					parser: 'json-stringify',
				} )
			);

			console.log( '\nUpdated the following plugins:' );
			Object.keys( pluginsUpdated ).forEach( ( plugin ) => {
				console.log( `  ${ pluginsUpdated[ plugin ] }` );
			} );
			console.log( `
Now running ${ chalk.yellowBright( 'composer update' ) } to get the latest plugin files...
` );

			spawn( 'composer', [ 'update' ], {
				shell: true,
				stdio: 'inherit',
			} );
		}
	} catch ( err ) {
		logError( err.message );
	}
};

exec(
	'docker-compose exec -Tu devuser freshpress-docker wp plugin list --update=available --fields=name,version,update_version --format=json',
	run
);
