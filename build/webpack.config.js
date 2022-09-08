'use strict';

// External imports.
const { argv } = require( 'yargs' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );
const glob = require( 'glob' );
const ManifestPlugin = require( 'webpack-manifest-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const path = require( 'path' );
const prettier = require( 'prettier' );
const ScriptDependenciesExtract = require( './plugins/script-dependencies-extract' );
const CssUrlFixer = require( './plugins/css-url-fixer' );
const StylelintPlugin = require( 'stylelint-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const webpack = require( 'webpack' );

// Helper variables.
const themeRoot = path.resolve( __dirname, '..' );
const repoRoot = path.resolve( __dirname, '..', '..', '..' );
const isProduction = !! (
	process.env.NODE_ENV === 'production' ||
	( argv.env && argv.env.production ) ||
	argv.p
);
const isAssetWithoutHash = ( absoluteFilename ) => {
	return !! (
		absoluteFilename.startsWith( paths.assets + '/images/annual-report-2019/' ) ||
		absoluteFilename === paths.assets + '/images/logos/freshbooks-logo.svg' ||
		absoluteFilename.startsWith( paths.assets + '/images/rating/' )
	);
};
const isWatchMode = !! argv.watch;
const filetypes = {
	css: [ 'css' ],
	fonts: [ 'eot', 'otf', 'ttf', 'woff', 'woff2' ],
	images: [ 'gif', 'ico', 'jpg', 'png', 'svg', 'webp' ],
	js: [ 'js' ],
	scss: [ 'scss' ],
};
const paths = {
	assets: path.resolve( themeRoot, 'assets' ),
	assetsScripts: path.resolve( themeRoot, 'assets/scripts' ),
	assetsStyles: path.resolve( themeRoot, 'assets/styles' ),
	assetsImages: path.resolve( themeRoot, 'assets/images' ),
	blocks: path.resolve( themeRoot, 'blocks/acf' ),
	dist: path.resolve( themeRoot, 'dist' ),
	fpbkBlocks: path.resolve( themeRoot, 'blocks/fpbk' ),
	tests: path.resolve( themeRoot, 'tests' ),
};

// Helper functions.
const getFiletypesTest = ( ...args ) => {
	return RegExp( `\.(${ Array.from( [ ...args ] ).join( '|' ) })$` );
};

const mapFilenamesToEntries = ( patterns ) => {
	const entries = {};
	patterns.forEach( ( pattern ) => {
		glob.sync( pattern ).forEach( ( filePath ) => {
			const relativePath = path.relative( themeRoot, filePath );
			const name = relativePath
				.replace(
					/^(blocks)[\/|\\](acf|fpbk)[\/|\\]([^\/|\\]+)[\/|\\](?:-admin)?(?:src[\/|\\])?(?:frontend[\/|\\])?(.+)\.(?:js|scss)/,
					'$1-$2-$3-$4'
				)
				.replace( /^assets[\/|\\](?:scripts|styles)[\/|\\](.*)\.(?:js|scss)/, '$1' )
				.replace( /[\/|\\]/g, '-' );

			if ( ! entries[ name ] || ! Array.isArray( entries[ name ] ) ) {
				entries[ name ] = [];
			}
			entries[ name ].push( filePath );
		} );
	} );

	return entries;
};

const prepareCacheGroups = function () {
	const cacheGroups = {
		'common-helpers': {
			test: /[\/|\\]helpers[\/|\\]/,
			name: 'common-helpers',
			chunks: 'all',
			enforce: true,
			priority: 20,
		},
		'common-json': {
			test: /[\/|\\]json[\/|\\]/,
			name: 'common-json',
			chunks: 'all',
			enforce: true,
			priority: 20,
		},
		'common-modules': {
			test: /[\/|\\]modules[\/|\\]/,
			name: 'common-modules',
			chunks: 'all',
			enforce: true,
			priority: 20,
		},
		'common-components': {
			test: /[\/|\\]scripts[\/|\\]components[\/|\\]/,
			name: 'common-components',
			chunks: 'all',
			enforce: true,
			priority: 20,
		},
		'vendor/magnum-ui': {
			test: /[\/|\\]vendor[\/|\\]magnum-ui[\/|\\]/,
			name: 'vendor-magnum-ui',
			chunks: 'all',
			enforce: true,
			priority: 20,
		},
	};

	const packageJson = require( path.join( repoRoot, 'package.json' ) );
	if ( packageJson && packageJson.dependencies ) {
		Object.keys( packageJson.dependencies ).forEach( ( dependency ) => {
			const dependencyName = `vendor-${ dependency }`;

			if ( ! cacheGroups[ dependencyName ] ) {
				cacheGroups[ dependencyName ] = {
					test: new RegExp( `[\\/|\\\\]node_modules[\\/|\\\\]${ dependency }[\\/|\\\\]` ),
					name: dependencyName,
					chunks: 'all',
					enforce: true,
					priority: 20,
				};
			}
		} );
	}

	return cacheGroups;
};

// Webpack config.
module.exports = {
	stats: {
		all: false,
		assets: true,
		builtAt: true,
		moduleAssets: true,
		performance: true,
		warnings: true,
		errors: true,
		logging: 'warn',
	},
	bail: isProduction,
	cache: isProduction ? false : { type: isWatchMode ? 'memory' : 'filesystem' },
	context: paths.assets,
	devtool: 'source-map',
	externals: {
		jquery: 'jQuery',
	},
	mode: isProduction ? 'production' : 'development',
	target: 'web',
	entry: mapFilenamesToEntries( [
		`${ paths.blocks }/**/[^_]*.{js,scss}`,
		`${ paths.assetsScripts }/**/[^_]*.js`,
		`${ paths.assetsStyles }/**/[^_]*.scss`,
		`${ paths.fpbkBlocks }/**/src/[^_]*.{js,scss}`,
		`${ paths.fpbkBlocks }/**/src/frontend/[^_]*.js`,
	] ),
	output: {
		filename: isProduction ? 'scripts/[name].[contenthash:8].js' : 'scripts/[name].js',
		path: paths.dist,
		publicPath: path.join( '/wp-content/', path.relative( repoRoot, paths.dist ), '/' ),
	},
	resolve: {
		modules: [ paths.blocks, paths.fpbkBlocks, paths.assets, 'node_modules' ],
		enforceExtension: false,
		alias: {
			mui: `${ paths.assets }/vendor/magnum-ui/`,
		},
	},
	watchOptions: {
		ignored: [
			`**/node_modules/**`,
			`${ repoRoot }/{vendor,plugins,mu-plugins,homedir,docs,.*}/**`,
			`${ paths.dist }/**`,
			`${ paths.tests }/**`,
		],
	},
	module: {
		rules: [
			// Enforce eslint standards for scripts.
			{
				enforce: 'pre',
				test: getFiletypesTest( ...filetypes.js ),
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			// Process scripts.
			{
				test: getFiletypesTest( ...filetypes.js ),
				include: [
					paths.assets,
					paths.blocks,
					paths.fpbkBlocks,
					/node_modules[\/|\\](dashify|is-plain-obj)/,
				],
				// Transpile JS/ES with babel.
				use: [
					{
						loader: 'babel-loader',
						options: {
							configFile: `${ repoRoot }/.babelrc.js`,
						},
					},
				],
			},
			{
				// Process styles.
				test: getFiletypesTest( ...filetypes.scss ),
				include: [ paths.assets, paths.blocks, paths.fpbkBlocks ],
				use: [
					// Extract CSS to entries.
					MiniCssExtractPlugin.loader,
					// Load CSS if needed.
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: ! isProduction,
						},
					},
					// Process CSS to cleanup and add vendor prefixes.
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								require( 'postcss-calc' )(),
								require( 'postcss-preset-env' )(),
							],
							sourceMap: ! isProduction,
						},
					},
					// Process our SCSS files.
					{
						loader: 'sass-loader',
						options: {
							sourceMap: ! isProduction,
						},
					},
				],
			},
			// Process fonts and images in our assets and blocks.
			{
				test: getFiletypesTest( ...filetypes.fonts, ...filetypes.images ),
				include: [ paths.assets, paths.blocks, paths.fpbkBlocks ],
				use: [
					// Import assets included from our own folders.
					{
						loader: 'file-loader',
						options: {
							name: isProduction
								? '[path][name].[contenthash:8].[ext]'
								: '[path][name].[ext]',
							context: paths.assets,
						},
					},
				],
			},
			// Process fonts and images in node_modules.
			{
				test: getFiletypesTest( ...filetypes.fonts, ...filetypes.images ),
				include: /node_modules/,
				use: [
					// Import assets included from node_modules and output to vendor folders.
					{
						loader: 'file-loader',
						options: {
							name: isProduction
								? 'vendor/[path][name].[contenthash:8].[ext]'
								: `vendor/[path][name].[ext]`,
							context: path.join( repoRoot, 'node_modules' ),
						},
					},
				],
			},
			// Process Mustache file loading.
			{
				test: /\.mustache$/,
				loader: '@aller/mustachejs-loader',
			},
		],
	},
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin( {
				test: getFiletypesTest( ...filetypes.css ),
				cssProcessorOptions: {
					map: {
						inline: false,
						annotation: true,
					},
				},
			} ),
			new TerserPlugin( {
				test: getFiletypesTest( ...filetypes.js ),
				sourceMap: ! isProduction,
			} ),
		],
		splitChunks: {
			cacheGroups: prepareCacheGroups(),
		},
	},
	plugins: [
		new webpack.ProvidePlugin( {
			$: 'jquery',
			jQuery: 'jquery',
			Popper: [ 'popper.js', 'default' ],
		} ),
		new CleanWebpackPlugin( {
			cleanStaleWebpackAssets: isProduction,
		} ),
		new StylelintPlugin( {
			configFile: '.stylelintrc.js',
			context: repoRoot,
			files: 'themes/freshpress/**/*.scss',
		} ),
		new FixStyleOnlyEntriesPlugin( {
			silent: true,
		} ),
		new MiniCssExtractPlugin( {
			filename: isProduction ? 'styles/[name].[contenthash:8].css' : 'styles/[name].css',
			context: paths.assets,
		} ),
		new DependencyExtractionWebpackPlugin( {
			injectPolyfill: false,
		} ),
		new CopyWebpackPlugin( {
			patterns: [
				{
					from: `{images,fonts}/**/*`,
					to( { absoluteFilename } ) {
						if ( isProduction && ! isAssetWithoutHash( absoluteFilename ) ) {
							return `${ paths.dist }/[path][name].[contenthash:8].[ext]`;
						}
						return `${ paths.dist }/[path][name].[ext]`;
					},
					context: paths.assets,
				},
			],
		} ),
		new ManifestPlugin( {
			filter: ( FileDescriptor ) => {
				return ! /\.map$/.test( FileDescriptor.name );
			},
			map: ( FileDescriptor ) => {
				if ( getFiletypesTest( ...filetypes.css ).test( FileDescriptor.path ) ) {
					FileDescriptor.name = `styles/${ FileDescriptor.name }`;
				} else if ( getFiletypesTest( ...filetypes.js ).test( FileDescriptor.path ) ) {
					FileDescriptor.name = `scripts/${ FileDescriptor.name }`;
				}
				return FileDescriptor;
			},
			generate: ( seed, files ) => {
				// eslint-disable-next-line no-shadow
				return files.reduce( ( manifest, { name, path, isModuleAsset } ) => {
					if ( isModuleAsset ) {
						name = path.replace( module.exports.output.publicPath, '' );
					}
					return {
						...manifest,
						[ name.replace(
							RegExp(
								`([^\/]+)\.[a-f0-9]{8}\.(${ [
									...filetypes.images,
									...filetypes.fonts,
								].join( '|' ) })+$`
							),
							'$1.$2'
						) ]: path,
					};
				}, seed );
			},
			serialize: ( manifest ) =>
				prettier.format( JSON.stringify( manifest ), {
					parser: 'json',
				} ),
		} ),
		new ScriptDependenciesExtract(),
		new CssUrlFixer(),
	],
};
