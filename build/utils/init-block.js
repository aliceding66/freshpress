/* eslint-disable no-console */

const { argv } = require( 'yargs' );
const blocksPath = 'themes/freshpress/blocks';
const chalk = require( 'chalk' );
const dashify = require( 'dashify' );
const figures = require( 'figures' );
const fs = require( 'fs' );
const inquirer = require( 'inquirer' );
const path = require( 'path' );

const args = {};
const badWordList = [ 'block', 'and', 'the' ];
const prohibitedWords = new RegExp( `(?:^|-)(?:${ badWordList.join( '|' ) })(?:-|$)` );
const repoRoot = path.resolve( __dirname, '..', '..', '..', '..' );

const caseConverter = ( input, target = 'kebab' ) => {
	input = dashify( input );
	const parts = input.split( '-' );

	switch ( target ) {
		case 'title':
			return parts
				.map( ( part ) => `${ part.slice( 0, 1 ).toUpperCase() }${ part.slice( 1 ) }` )
				.join( ' ' );
		case 'snake':
			return parts.join( '_' );
		case 'pascal':
			return parts
				.map( ( part ) => `${ part.slice( 0, 1 ).toUpperCase() }${ part.slice( 1 ) }` )
				.join( '' );
		case 'camel':
			return parts
				.map( ( part, index ) =>
					index === 0 ? part : `${ part.slice( 0, 1 ).toUpperCase() }${ part.slice( 1 ) }`
				)
				.join( '' );
		case 'kebab':
		default:
			return input;
	}
};

const validateName = ( input ) => {
	// All lowercase, no spaces, starts with a letter, ends with alphanumeric.
	if ( ! /^[a-z][a-z0-9-]+[a-z0-9]$/.test( input ) ) {
		return `Error: block name '${ input }' is invalid.`;
	}
	if ( prohibitedWords.test( input ) ) {
		return `Error: block name should not contain '${ prohibitedWords.exec( input ).pop() }'.`;
	}

	return true;
};

const validateTitle = ( input ) => {
	// Each word in title is alphanumeric, with case being all UPPER or Title, allows dashes in words if needed.
	if (
		input
			.split( ' ' )
			.filter( ( v ) => {
				return /^([A-Z][a-zA-Z0-9-]+|[A-Z0-9]+|[0-9]+|)$/.test( v );
			} )
			.join( ' ' ) !== input
	) {
		return `Error: block title '${ input }' is invalid.`;
	}

	return true;
};

const errorOut = ( message, options = { halt: true } ) => {
	console.error( `${ chalk.redBright( figures.cross ) } ${ message }` );
	if ( options.halt ) {
		process.exit( 1 );
	}

	process.exitCode = 1;
};

const createFiles = ( block ) => {
	const files = [
		{
			output: `${ block.path }/init-${ block.name }.php`,
			content: `<?php
/**
 * ${ block.title } block.
 *
 * @package FreshPress\\Website
 */

/**
 * Register block.
 */
fp_register_block(
	'${ block.name }',
	[
		'title'       => '${ block.title }',
		'description' => '${ block.title }', // Please add a description (and remove this comment)
		'keywords'    => [ '${ block.name
			.split( '-' )
			.join( "', '" ) }' ],  // Please confirm keywords (and remove this comment)
	]
);
`,
		},
		{
			output: `${ block.path }/${ block.name }.php`,
			content: `<?php
/**
 * ${ block.title } template.
 *
 * @package FreshPress\\Website
 */

// Please ensure your outermost element has the class '.${ block.name }' (and remove this comment).
`,
		},
		{
			output: `${ block.path }/${ block.name }.js`,
			content: `/**
 * ${ block.title }.
 */

import { initBlock } from 'scripts/helpers/_blocks';

const init${ block.pascalCase } = ( ${ block.camelCase } ) => {

};

initBlock( '.${ block.name }', init${ block.pascalCase } );
`,
		},
		{
			output: `${ block.path }/${ block.name }.scss`,
			content: `// ${ block.title }.

@import '~styles/freshpress-includes';

.${ block.name } {

}
`,
		},
	];

	files.forEach( ( file ) => {
		try {
			fs.mkdirSync( path.resolve( repoRoot, block.path ), { recursive: true, mode: 0o775 } );
			fs.writeFileSync( path.resolve( repoRoot, file.output ), file.content );
			console.log( `${ chalk.greenBright( figures.tick ) } ${ file.output } created.` );
		} catch ( error ) {
			errorOut( `${ file.output }: ${ error.message }`, false );
		}
	} );
};

const run = () => {
	// Set the overwrite arg however we're executing.
	args.overwrite = !! argv.overwrite;

	// If a block name has been specified at runtime, use it.
	if ( argv._.length > 0 ) {
		args.name = dashify( argv._[ 0 ], { condense: true } );
	}

	// If a block title has been specified at runtime, use it.
	if ( argv._.length === 2 ) {
		args.title = argv._[ 1 ].trim();

		const isNameValid = validateName( args.name );
		if ( isNameValid !== true ) {
			errorOut( isNameValid );
		}

		const isTitleValid = validateTitle( args.title );
		if ( isTitleValid !== true ) {
			errorOut( isTitleValid );
		}

		if (
			fs.existsSync( path.resolve( repoRoot, blocksPath, args.name ) ) &&
			args.overwrite !== true
		) {
			errorOut(
				`A block already exists at the path ${ chalk.bold(
					blocksPath + '/' + args.name
				) }. Please remove it or run again with ${ chalk.bold(
					'--overwrite'
				) } option to force block creation.`
			);
		}

		createFiles( {
			name: args.name,
			title: args.title,
			camelCase: caseConverter( args.name, 'camel' ),
			pascalCase: caseConverter( args.name, 'pascal' ),
			snakeCase: caseConverter( args.name, 'snake' ),
			titleCase: caseConverter( args.name, 'title' ),
			path: `${ blocksPath }/${ args.name }`,
		} );
	} else {
		// If we don't have two runtime params, use the interactive menu.
		inquirer
			.prompt( [
				{
					name: 'name',
					type: 'input',
					validate: validateName,
					default: args.name,
					message: 'Name of your block in kebab-case (e.g., awesome-banner)',
				},
				{
					name: 'title',
					type: 'input',
					validate: validateTitle,
					default: ( resp ) => {
						if ( args.title ) {
							return args.title;
						}
						if ( resp.name ) {
							return caseConverter( resp.name, 'title' );
						}
					},
					message: 'Title of your block in Title Case (e.g., Awesome Banner)',
				},
				{
					name: 'overwrite',
					type: 'confirm',
					default: args.overwrite,
					message: ( resp ) =>
						`Do you want to overwrite the existing block (${ blocksPath }/${ resp.name })?`,
					when: ( resp ) =>
						fs.existsSync( path.resolve( repoRoot, blocksPath, resp.name ) ) &&
						! args.overwrite,
				},
			] )
			.then( ( resp ) => {
				if (
					! fs.existsSync( path.resolve( repoRoot, blocksPath, resp.name ) ) ||
					resp.overwrite === true ||
					args.overwrite === true
				) {
					createFiles( {
						name: resp.name,
						title: resp.title,
						camelCase: caseConverter( resp.name, 'camel' ),
						pascalCase: caseConverter( resp.name, 'pascal' ),
						snakeCase: caseConverter( resp.name, 'snake' ),
						titleCase: caseConverter( resp.name, 'title' ),
						path: `${ blocksPath }/${ resp.name }`,
					} );
				} else {
					errorOut(
						`Not overwriting ${ chalk.bold( blocksPath + '/' + args.name ) }`,
						false
					);
				}
			} )
			.catch( ( error ) => {
				errorOut( error.message, false );
			} );
	}
};

run();
