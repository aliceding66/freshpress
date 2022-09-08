<?php
/**
 * Filter and action handlers for assets.
 *
 * @package FreshPress\Website
 */

$GLOBALS['preload_assets'] = [];

/**
 * Adds scripts and styles to the preload array.
 *
 *  @param string  $href Script/style path.
 *  @param string  $as Script/style type.
 *  @param boolean $onload Script/style event.
 */
function fp_add_to_preload( $href, $as, $onload = false ) {
	if ( $onload && 'style' == $as ) {
		$attr = [
			'href'   => $href,
			'as'     => $as,
			'onload' => "this.onload=null;this.rel='stylesheet'",
		];
	} else {
		$attr = [
			'href' => $href,
			'as'   => $as,
		];
	}
	array_push(
		$GLOBALS['preload_assets'],
		$attr
	);
}

/**
 * Enqueues scripts and styles.
 */
function fp_enqueue_assets() {
	/*
	 * Enqueue styles.
	 */
	if ( is_admin() ) {
		// Admin styles (includes scoped global styles).
		wp_register_style( 'freshpress-admin', fp_get_asset( 'styles/admin.css' ), [], null );
		wp_enqueue_style( 'freshpress-admin' );
		wp_register_style( 'freshpress-fpbk-admin', fp_get_asset( 'styles/fpbk-admin.css' ), [], null );
		wp_enqueue_style( 'freshpress-fpbk-admin' );
	}

	/*
	 * Enqueue vendor and common scripts.
	 */
	$manifest = fp_get_manifest();
	$script_dependencies = fp_get_script_dependencies();
	$admin_script_path = 'scripts/admin.js';

	foreach ( $manifest as $filename => $asset_path ) {
		if ( fp_starts_with( $filename, 'scripts/' ) && strpos( $filename, 'scripts/blocks-' ) === false && strpos( $filename, $admin_script_path ) === false ) {
			$name = basename( $filename, '.js' );
			$asset_dependencies = [];

			if ( array_key_exists( $name, $script_dependencies ) && is_array( $script_dependencies[ $name ] ) ) {
				$asset_dependencies = $script_dependencies[ $name ];
			}

			wp_register_script( "freshpress-${name}", $asset_path, $asset_dependencies, null, true );
		}

		if ( ! is_admin() && 'styles/global.css' === $filename ) {
			wp_register_style( 'global-css', fp_get_asset( $asset_path ), [], null );
			wp_enqueue_style( 'global-css' );
		}
	}

	if ( is_admin() ) {
		// Admin scripts - if it exists.
		if ( fp_asset_exists( $admin_script_path ) ) {
			wp_register_script( 'freshpress-admin', fp_get_asset( $admin_script_path ), [ 'wp-editor', 'wp-hooks' ], null, true );
			wp_enqueue_script( 'freshpress-admin' );
		}
	} else {
		// Global scripts.
		wp_enqueue_script( 'freshpress-global' );
	}
}
add_action( 'wp_enqueue_scripts', 'fp_enqueue_assets' );
add_action( 'admin_enqueue_scripts', 'fp_enqueue_assets' );


/**
 * Disable lazy load for all svgs.
 *
 * @param array $src Array of src filters.
 * @return array
 */
function fp_lazyload_exclude_src( $src ) {
	global $combined_file_locations;
	foreach ( [ 'header', 'footer' ] as $placement ) {
		$type = 'image';
		if ( array_key_exists( '_md5', $combined_file_locations ) && array_key_exists( $placement, $combined_file_locations['_md5'] ) && array_key_exists( $type, $combined_file_locations['_md5'][ $placement ] ) ) {
			$src[] = esc_url( substr( $combined_file_locations['_md5'][ $placement ][ $type ], 0, 4 ) === 'http' ? $combined_file_locations['_md5'][ $placement ][ $type ] : fp_get_asset( $combined_file_locations['_md5'][ $placement ][ $type ] ) );
		}
	}

	return $src;
}
add_filter( 'rocket_lazyload_excluded_src', 'fp_lazyload_exclude_src' );

/**
 * Output preload tags for specific assets.
 */
function fp_preload_assets() {
	$output = '';
	$link_html = '';
	$assets = [];

	$assets = array_merge( $assets, $GLOBALS['preload_assets'] );

	foreach ( $assets as $asset ) {
		if ( ! empty( $asset['href'] ) && ! empty( $asset['as'] ) && strpos( $asset['href'], '-acf-' ) === false ) {
			$output .= '<link rel="preload"';
			$id = $asset['href'];
			if ( substr( $asset['href'], 0, 4 ) !== 'http' ) {
				$asset['href'] = esc_url( fp_get_asset( $asset['href'] ) );
			}

			$onload = false;

			if ( 'font' === $asset['as'] ) {
				$output .= ' crossorigin="anonymous"';
			}

			foreach ( $asset as $key => $value ) {
				$output .= " ${key}=\"${value}\"";
				if ( 'onload' == $key ) {
					$onload = true;
				}
			}

			$output .= " />\n";

			if ( $onload ) {
				$id = preg_split( '/[\/\.]/', $id, -1, PREG_SPLIT_NO_EMPTY );
				$html = "<link rel='preload' id='freshbooks-$id[1]-css'";
				foreach ( $asset as $key => $value ) {
					if ( 'href' == $key ) {
						$html .= " ${key}='${value}'";
					}
				}
				$html .= " type='text/css' media='all'>";
				$link_html .= str_replace( 'preload', 'stylesheet', $html );
			}
		}
	}

	echo fp_noesc( $output );
	fp_add_noscript( $link_html );
}
add_action( 'wp_head', 'fp_preload_assets', 5 );


/**
 * Add noscript tag.
 *
 * @param string $html inside noscript tag.
 */
function fp_add_noscript( $html ) {
	if ( ! empty( $html ) ) {
		echo fp_noesc( "<noscript>$html</noscript>\n" );
	}
}
add_action( 'wp_head', 'fp_add_noscript', 4 );


/**
 * Echos a script tag with global JS variables.
 *
 * @param boolean $return Defines if function should return or render fbVars.
 */
function fp_js_global_vars( $return = false ) {
	$site_lang = fp_parse_language_code( fp_get_current_language() );
	// Some of these are hardcoded values for development only.
	$vars = [
		'fbDomains' => [
			'api'  => fp_get_fb_domain( 'api' ),
			'app'  => fp_get_fb_domain( 'my' ),
			'auth' => fp_get_fb_domain( 'auth' ),
			'base' => fp_get_fb_domain( '' ),
		],
		'i18n'      => [
			'supportedRegions' => fp_get_all_regions(),
			'siteLangCode'     => $site_lang['lang'],
			'siteCountryCode'  => $site_lang['country'],
		],
	];

	if ( $return ) {
		return $vars;
	}
	echo '<script>window.fbVars=' . wp_json_encode( $vars ) . '</script>';
}
add_action( 'wp_head', 'fp_js_global_vars' );

/**
 * Output markup for handling favicons.
 */
function fp_init_favicons() {
	$icon_path = site_url();
	$icon_colour = '#0075dd';

	$favicons = "<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"${icon_path}/apple-touch-icon.png?v=2020\">
<link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"${icon_path}/favicon-32x32.png?v=2020\">
<link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"${icon_path}/favicon-16x16.png?v=2020\">
<link rel=\"manifest\" href=\"${icon_path}/site.webmanifest?v=2020\">
<link rel=\"mask-icon\" href=\"${icon_path}/safari-pinned-tab.svg?v=2020\" color=\"${icon_colour}\">
<link rel=\"shortcut icon\" href=\"${icon_path}/favicon.ico?v=2020\">
<meta name=\"msapplication-TileColor\" content=\"${icon_colour}\">
<meta name=\"theme-color\" content=\"${icon_colour}\">";

	echo fp_noesc( $favicons );
}
add_action( 'wp_head', 'fp_init_favicons' );

/**
 * Load scripts at wp_head.
 */
function fp_load_head_scripts() {
	fp_load_external_scripts( 'head' );
}
add_action( 'wp_head', 'fp_load_head_scripts' );
add_action( 'wp_head', 'fp_load_mutiny_snippet', 4 );

/**
 * Load scripts at wp_footer.
 */
function fp_load_footer_scripts() {
	fp_load_external_scripts( 'footer' );

	if ( get_query_var( 'nodrift' ) == '' ) {
		fp_load_chatbot_snippet( 'drift' );
	}

	if ( get_query_var( 'noqualified' ) == '' ) {
		fp_load_chatbot_snippet( 'qualified' );
	}
}
add_action( 'wp_footer', 'fp_load_footer_scripts' );

/**
 * Load scripts at wp_body_open.
 */
function fp_load_body_scripts() {
	fp_load_external_scripts( 'body' );
}
add_action( 'wp_body_open', 'fp_load_body_scripts', 0 );

/**
 * Cache the list of styles normally loaded in the footer (mostly from blocks) for preloading on next request.
 */
function fp_set_preloadable_styles() {
	if ( ! is_admin() ) {
		global $wp_styles;
		$post_id = get_the_ID();
		$transient = "fp_styles_${post_id}";
		if ( empty( get_transient( $transient ) ) ) {
			$preload_styles_remaining = array_intersect( get_option( 'fp_preloadable_styles', [] ), array_diff( $wp_styles->queue ?? [], $wp_styles->done ?? [] ) );
			if ( ! empty( $preload_styles_remaining ) ) {
				set_transient( $transient, $preload_styles_remaining );
			}
		}
	}
}
add_action( 'wp_footer', 'fp_set_preloadable_styles' );

/**
 * Load styles in the head if we determined the need on last visit.
 */
function fp_preload_styles() {
	if ( ! is_admin() ) {
		$post_id = get_the_ID();
		$preload_styles = get_transient( "fp_styles_${post_id}" );
		if ( ! empty( $preload_styles ) && is_array( $preload_styles ) ) {
			foreach ( $preload_styles as $style ) {
				if ( wp_style_is( $style, 'registered' ) ) {
					$asset_name = "acf-{$style}-{$style}";
					$asset_path = str_replace( home_url(), '', fp_get_asset( "styles/blocks-${asset_name}.css" ) );
					fp_add_to_preload( $asset_path, 'style' );
					wp_enqueue_style( $style );
				}
			}
		}
	}
}
add_action( 'wp_enqueue_scripts', 'fp_preload_styles' );

/**
 * Clear the preloadable styles cache when a post is saved.
 *
 * @param  int $post_id ID of post being saved.
 */
function fp_clear_preload_styles_cache( $post_id ) {
	$transient = "fp_styles_${post_id}";
	if ( false !== get_transient( $transient ) ) {
		// Delete the existing preloadable styles.
		delete_transient( $transient );
		// Send a request to the page to precache the styles.
		wp_remote_get( get_permalink( $post_id ), [ 'blocking' => false ] );
	}
}
add_action( 'save_post', 'fp_clear_preload_styles_cache' );

/**
 * Disable the emoji's
 */
add_action( 'init', 'fp_disable_emojis' );

/**
 * Action function used to remove the tinymce emoji plugin.
 */
function fp_disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	add_filter( 'tiny_mce_plugins', 'fp_disable_emojis_tinymce' );
	add_filter( 'wp_resource_hints', 'fp_disable_emojis_remove_dns_prefetch', 10, 2 );
}

/**
 * Filter function used to remove the tinymce emoji plugin.
 *
 * @param array $plugins Plugins array.
 *
 * @return array Difference betwen the two arrays
 */
function fp_disable_emojis_tinymce( $plugins ) {
	if ( is_array( $plugins ) ) {
		return array_diff( $plugins, [ 'wpemoji' ] );
	}
	return [];
}

/**
 * Remove emoji CDN hostname from DNS prefetching hints.
 *
 * @param array  $urls URLs to print for resource hints.
 * @param string $relation_type The relation type the URLs are printed for.
 * @return array Difference betwen the two arrays.
 */
function fp_disable_emojis_remove_dns_prefetch( $urls, $relation_type ) {
	if ( 'dns-prefetch' == $relation_type ) {
		/** This filter is documented in wp-includes/formatting.php */
		$emoji_svg_url = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' ); // phpcs:ignore

		$urls = array_diff( $urls, [ $emoji_svg_url ] );
	}

	return $urls;
}

/**
 * JQuery migrate removal.
 *
 * @param array $scripts Currently added scripts array.
 */
function fp_remove_jquery_migrate( $scripts ) {
	if ( ! is_admin() && isset( $scripts->registered['jquery'] ) ) {
		$script = $scripts->registered['jquery'];
		if ( $script->deps ) {
			$script->deps = array_diff( $script->deps, [ 'jquery-migrate' ] );
		}
	}
}
add_action( 'wp_default_scripts', 'fp_remove_jquery_migrate' );

if ( function_exists( 'remove_action' ) ) {
	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
	global $sitepress;
	remove_action( 'wp_head', [ $sitepress, 'meta_generator_tag' ] );
}

/** Avoid FOUC with inline css. */
function fp_avoid_fouc_css() {
	echo '<style id="avoid-fouc-css" type="text/css">body{opacity:0;}</style>';
}
add_action( 'wp_head', 'fp_avoid_fouc_css' );



add_action(
	'init',
	function() {
		remove_action( 'wp_head', 'wp_resource_hints', 2, 99 );
	}
);

add_filter( 'wpseo_debug_markers', '__return_false' );

add_filter(
	'query_vars',
	function( $qvars ) {
		$qvars[] = 'nodrift';
		$qvars[] = 'noqualified';
		return $qvars;
	}
);
