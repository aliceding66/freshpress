/* eslint-disable no-console */

const chalk = require( 'chalk' );
const figures = require( 'figures' );
const fs = require( 'fs' );
const path = require( 'path' );
const prettier = require( 'prettier' );
const repoRoot = path.resolve( __dirname, '..', '..', '..', '..' );

require( 'module-alias' ).addAlias(
	'mui',
	path.resolve( 'themes/freshpress/assets/vendor/magnum-ui/' )
);

const resources = [
	{
		input: 'mui/utils/country/list',
		output: 'themes/freshpress/assets/scripts/json/country-list.json',
		process: ( input ) => {
			const output = {};
			input.default.forEach( ( country ) => {
				output[ country.name.short ] = country.name.common;
			} );
			return output;
		},
	},
	{
		input: 'mui/utils/currency/list',
		output: 'themes/freshpress/assets/scripts/json/currency-list.json',
		process: ( input ) => {
			const output = {};
			Object.keys( input.default )
				.filter( ( key ) => input.default[ key ].number !== null )
				.forEach( ( key ) => {
					output[ key ] = {};
					Object.keys( input.default[ key ] )
						.filter( ( field ) => field === 'name' || field === 'symbol' )
						.forEach( ( field ) => {
							output[ key ][ field ] = input.default[ key ][ field ];
						} );
				} );
			return output;
		},
	},
	{
		input: 'mui/utils/country/list',
		output: 'themes/freshpress/assets/scripts/json/country-to-currency.json',
		process: ( input ) => {
			const currencyLookup = require( 'mui/utils/currency/currencyLookup' ).default;
			const output = {};
			input.default.forEach( ( country ) => {
				output[ country.name.short ] = currencyLookup( country.name.short );
			} );
			return output;
		},
	},
];

resources.forEach( ( resource ) => {
	try {
		let data = require( resource.input );
		if ( typeof resource.process === 'function' ) {
			data = resource.process( data );
		}
		data = prettier.format( JSON.stringify( data ), {
			parser: 'json',
		} );
		fs.writeFileSync( path.resolve( repoRoot, resource.output ), data );
		console.log(
			`${ chalk.greenBright( figures.tick ) } ${ resource.input } ${
				figures.arrowRight
			} ${ path.relative( repoRoot, resource.output ) }`
		);
	} catch ( error ) {
		console.error(
			`${ chalk.redBright( figures.cross ) } ${ resource.input }: ${ error.message }`
		);
		process.exitCode = 1;
	}
} );
