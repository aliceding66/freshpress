<?php
/**
 * Filter and action handlers for assets.
 *
 * @package FreshPress\Website
 */

global $combined_file_locations;
$combined_file_locations = [
	'path_prefix' => 'dist' . DIRECTORY_SEPARATOR,
];

/**
 * Combines all script fiels into one bundle.
 *
 * @param string $placement Scripts placement: either header or footer.
 * @param string $action Hook that is running the function.
 */
function fp_combine_all_scripts( $placement, $action ) {
	global $wp_scripts;
	global $combined_file_locations;

	$wp_scripts->all_deps( $wp_scripts->queue );

	$combined_file_name = 'combined_' . ( '' === $placement ? '' : $placement . '_' ) . get_the_ID() . getmypid() . '.js';
	$combined_handle = 'combined-scripts' . ( '' === $placement ? '' : '-' . $placement );

	$js_path = get_stylesheet_directory();
	$js_path_uri = get_stylesheet_directory_uri();

	$combined_file_name_with_path = $js_path . DIRECTORY_SEPARATOR . $combined_file_locations['path_prefix'];
	$combined_file_locations['js'] = $js_path . DIRECTORY_SEPARATOR;

	if ( ! is_dir( $combined_file_name_with_path ) ) {
		@mkdir( $combined_file_name_with_path, 0777, true );
	}
	$combined_file_name_with_path .= $combined_file_name;

	if ( get_the_ID() && fp_get_env() !== 'local' ) {

		if ( 'wp_print_footer_scripts' === $action ) {
			$wp_scripts->done = [];
		}

		foreach ( $wp_scripts->to_do as $handle ) {
			if ( ! array_key_exists( $handle, $wp_scripts->registered ) ) {
				continue;
			}

			$src = strtok( $wp_scripts->registered[ $handle ]->src, '?' );
			$js_file_with_path = $src;

			if ( strpos( $src, 'http' ) !== false ) {
				$site_url = site_url();

				if ( strpos( $src, $site_url ) !== false ) {
					$js_file_with_path = str_replace( $site_url, '', $src );
				}
			}

			$js_file_with_path = ABSPATH . ltrim( $js_file_with_path, '/' );

			if ( is_file( $js_file_with_path ) && file_exists( $js_file_with_path ) ) {
				if ( ! array_key_exists( $combined_file_name_with_path, $combined_file_locations ) ) {
					$combined_file_locations[ $combined_file_name_with_path ] = [];
					file_put_contents( $combined_file_name_with_path, '' );
				}

				if ( ( 'wp_print_footer_scripts' === $action && ! array_key_exists( $js_file_with_path, $combined_file_locations[ $combined_file_name_with_path ] ) ) || ( ! array_key_exists( 'group', $wp_scripts->registered[ $handle ]->extra ) || 1 !== $wp_scripts->registered[ $handle ]->extra['group'] ) ) {
					// Sometimes assets files being added few times, therefore not including them into the bundle, but dequeuing.
					$combined_file_locations[ $combined_file_name_with_path ][ $js_file_with_path ] = true;

					$localize = '';
					if ( @key_exists( 'data', $wp_scripts->registered[ $handle ]->extra ) ) {
						$localize = $wp_scripts->registered[ $handle ]->extra['data'] . ';';
					}

					file_put_contents(
						$combined_file_name_with_path,
						[
							$localize,
							$wp_scripts->print_inline_script( $handle, 'before', false ),
							';',
							file_get_contents( $js_file_with_path ),
							';',
							$wp_scripts->print_inline_script( $handle, 'after', false ),
							';',
						],
						FILE_APPEND
					);

					wp_dequeue_script( $handle );
					wp_deregister_script( $handle );
				}

				if ( 'wp_print_footer_scripts' !== $action ) {
					$wp_scripts->done[] = $handle;
				}
			}
		}
	}

	if ( 'footer' === $placement && 'wp_print_footer_scripts' === $action ) {
		$fouc = 'document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){document.getElementsByTagName("body")[0].style.opacity=1},1)})';
		if ( 'local' === fp_get_env() ) {
			echo fp_noesc( '<script>' . $fouc . '</script>' );
		} else {
			// fouc finishes here.
			file_put_contents(
				$combined_file_name_with_path,
				";\n" . $fouc,
				FILE_APPEND
			);

			$md5 = @md5_file( $combined_file_name_with_path ) . '.js';
			@rename( $combined_file_name_with_path, $js_path . DIRECTORY_SEPARATOR . $combined_file_locations['path_prefix'] . $md5 );
			$combined_file_locations['_md5'][ $placement ]['js'] = $combined_file_locations['path_prefix'] . $md5;
		}
	}
}

/**
 * Combines all styles fiels into one bundle.
 *
 * @param string $placement Styles placement: either header or footer.
 * @param string $action Hook that is running the function.
 */
function fp_combine_all_styles( $placement, $action ) {
	if ( false === get_the_ID() || 'local' === fp_get_env() ) {
		return;
	}
	$placement = 'footer';

	global $wp_styles;
	global $combined_file_locations;

	$wp_styles->all_deps( $wp_styles->queue );

	$combined_file_name = 'combined_' . ( '' === $placement ? '' : $placement . '_' ) . get_the_ID() . getmypid() . '.css';
	$combined_handle = 'combined-styles' . ( '' === $placement ? '' : '-' . $placement );

	$css_path = get_stylesheet_directory();
	$css_path_uri = get_stylesheet_directory_uri();

	$combined_file_name_with_path = $css_path . DIRECTORY_SEPARATOR . $combined_file_locations['path_prefix'];
	$combined_file_locations['css'] = $css_path . DIRECTORY_SEPARATOR;

	if ( ! is_dir( $combined_file_name_with_path ) ) {
		@mkdir( $combined_file_name_with_path, 0777, true );
	}
	$combined_file_name_with_path .= $combined_file_name;

	foreach ( $wp_styles->to_do as $handle ) {
		if ( $handle === $combined_handle || ! array_key_exists( $handle, $wp_styles->registered ) ) {
			continue;
		}
		$src = strtok( $wp_styles->registered[ $handle ]->src, '?' );
		$js_file_with_path = $src;

		if ( strpos( $src, 'http' ) !== false ) {
			$site_url = site_url();

			if ( strpos( $src, $site_url ) !== false ) {
				$js_file_with_path = str_replace( $site_url, '', $src );
			}
		}

		$js_file_with_path = ABSPATH . ltrim( $js_file_with_path, '/' );

		if ( is_file( $js_file_with_path ) && file_exists( $js_file_with_path ) ) {
			if ( ! array_key_exists( $combined_file_name_with_path, $combined_file_locations ) ) {
				$combined_file_locations[ $combined_file_name_with_path ] = [];
				file_put_contents( $combined_file_name_with_path, '' );
			}

			if ( ! array_key_exists( $js_file_with_path, $combined_file_locations[ $combined_file_name_with_path ] ) ) {
				$combined_file_locations[ $combined_file_name_with_path ][ $js_file_with_path ] = true;

				file_put_contents(
					$combined_file_name_with_path,
					file_get_contents( $js_file_with_path ),
					FILE_APPEND
				);
			}

			wp_dequeue_style( $handle );
			wp_deregister_style( $handle );
		}
	}

	if ( 'footer' === $placement && 'wp_print_footer_scripts' === $action ) {
		$md5 = @md5_file( $combined_file_name_with_path ) . '.css';
		@rename( $combined_file_name_with_path, $css_path . DIRECTORY_SEPARATOR . $combined_file_locations['path_prefix'] . $md5 );
		$combined_file_locations['_md5'][ $placement ]['css'] = $combined_file_locations['path_prefix'] . $md5;
	}
}

/**
 * Catches all output and injects preloading tags for combined js/css.
 *
 * @param string $buffer Captured buffer.
 *
 * @return string Changed buffer.
 */
function fp_assets_combiner_md5_replacer( $buffer ) {
	global $combined_file_locations;

	if ( ! array_key_exists( '_md5', $combined_file_locations ) ) {
		return $buffer;
	}

	$html = [
		'header' => '',
		'footer' => '',
	];
	$noscript = '';
	$preloads = [
		'css'   => 'as="style" onload="this.onload=null;this.rel=\'stylesheet\'"',
		'js'    => 'as="script"',
		'image' => 'as="image"',
	];

	foreach ( [ 'header', 'footer' ] as $placement ) {
		foreach ( [ 'css', 'js', 'image' ] as $type ) {
			if ( ! array_key_exists( $placement, $combined_file_locations['_md5'] ) ) {
				continue;
			}
			if ( ! array_key_exists( $type, $combined_file_locations['_md5'][ $placement ] ) ) {
				continue;
			}

			$asset_url = $combined_file_locations['_md5'][ $placement ][ $type ];

			if ( ! defined( 'FP_CWV_ALL_IN_ONE' ) ) {
				$asset_url = esc_url( substr( $asset_url, 0, 4 ) === 'http' ? $asset_url : fp_get_asset( $asset_url ) );
				$html['header'] .= '<link rel="preload" href="' . $asset_url . '" ' . $preloads[ $type ] . ' />';
			}

			if ( 'js' === $type ) {
				if ( defined( 'FP_CWV_ALL_IN_ONE' ) ) {
					$html[ $placement ] .= "<script type='text/javascript'>\n" . file_get_contents( $combined_file_locations[ $type ] . $asset_url ) . "</script>\n";
				} else {
					$html[ $placement ] .= "<script type='text/javascript' src='$asset_url'></script>";// phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedScript
				}
			}

			if ( 'css' === $type ) {
				if ( defined( 'FP_CWV_ALL_IN_ONE' ) ) {
					$html[ $placement ] .= "<style>\n" . file_get_contents( $combined_file_locations[ $type ] . $asset_url ) . "</style>\n\n";
				} else {
					$noscript .= '<link href="' . $asset_url . '" as="style" rel="stylesheet" />'; // phpcs:disable WordPress.WP.EnqueuedResources.NonEnqueuedStylesheet
				}
			}
		}
	}

	if ( '' !== $html['header'] ) {
		$buffer = str_replace( '<head>', '<head>' . $html['header'] . '<noscript>' . $noscript . '</noscript>', $buffer );
	}

	// noscript fouc finishes here.
	$buffer = str_replace( '</body>', $html['footer'] . '<noscript><style>body{opacity:1}</style></noscript></body>', $buffer );
	// $buffer = str_replace( '}, 5000);', '}, 0);', $buffer );

	if ( defined( 'FP_CWV_ALL_IN_ONE' ) ) {
		if ( 0 ) {
			$buffer = preg_replace_callback(
				'/<script([\w\W]+?)<\/script>/im',
				function( $matches ) {
					if ( false !== strpos( $matches[1], 'mutiny' ) ) {
						return '<script defer' . $matches[1] . '</script>';
					}

					if ( false !== strpos( $matches[1], 'GTM' ) ) {
						return '<script defer' . $matches[1] . '</script>';
					}

					return $matches[0];
				},
				$buffer
			);
		}
	}

	return $buffer;
}

add_action(
	'wp_enqueue_scripts',
	function() {
		fp_combine_all_scripts( 'footer', 'wp_enqueue_scripts' );
	},
	PHP_INT_MAX
);

add_action(
	'wp_print_header_scripts',
	function() {
		fp_combine_all_scripts( 'header', 'wp_print_header_scripts' );
	},
	0
);

add_action(
	'wp_print_footer_scripts',
	function() {
		fp_combine_all_scripts( 'footer', 'wp_print_footer_scripts' );
	},
	0
);

foreach ( [ 'wp_head', 'wp_print_styles', 'wp_print_header_scripts' ] as $add_action ) {
	add_action(
		$add_action,
		function() use ( $add_action ) {
			fp_combine_all_styles( 'header', $add_action );
		},
		0
	);
}

foreach ( [ 'wp_print_footer_scripts', 'wp_footer' ] as $add_action ) {
	add_action(
		$add_action,
		function() use ( $add_action ) {
			fp_combine_all_styles( 'footer', $add_action );
		},
		0
	);
}

add_action(
	'template_redirect',
	function() {
		if ( ! is_admin() && 'local' !== fp_get_env() ) {
			ob_start( 'fp_assets_combiner_md5_replacer' );
		}
	}
);


add_action(
	'shutdown',
	function() {
		@ob_end_flush();
	}
);


/**
 * Defines a constant depending on post id for feature test purposes.
 */
function fp_decide_cwv_feature() {
	$post = get_post();
	if ( is_object( $post ) && 'hub_article' === $post->post_type ) {
		define( 'FP_CWV_ALL_IN_ONE', true );
	}
}
add_action( 'wp', 'fp_decide_cwv_feature' );
