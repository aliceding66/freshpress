<?php
/**
 * Filter and action handlers for SEO.
 *
 * @package FreshPress\Website
 */

/*
 * Prevent 404 permalink guessing.
 */
add_filter( 'do_redirect_guess_404_permalink', '__return_false' );

/*
 * Prevent Yoast adding its default schema.
 */
add_filter( 'wpseo_json_ld_output', '__return_false' );

/**
 * Modify the meta robots values.
 *
 * @param array $robots Robots meta values.
 * @return array
 */
function fp_modify_meta_robots( $robots ) {
	if ( 'production' !== fp_get_env() || fp_ends_with( fp_get_server_var( 'HTTP_HOST' ), 'freshenv.com' ) ) {
		$robots['index'] = 'noindex';
		$robots['follow'] = 'nofollow';
	}

	return $robots;
}
add_filter( 'wpseo_robots_array', 'fp_modify_meta_robots' );

/**
 * Ensure correct formatting of our canonical URLs.
 *
 * @param string $canonical_url Canonical URL for a post.
 * @return string
 */
function fp_format_canonicals( $canonical_url ) {
	if ( is_admin() || is_404() ) {
		return $canonical_url;
	}

	$is_encoded = strpos( $canonical_url, urlencode( '//' ) ) !== false;

	if ( $is_encoded ) {
		$canonical_url = urldecode( $canonical_url );
	}

	$current_region = fp_get_current_language();
	$canonical_url = apply_filters( 'wpml_permalink', $canonical_url, $current_region );
	$canonical_url = preg_replace( '/^https?:\/\/(www.)?freshbooks.com/', 'https://www.freshbooks.com', $canonical_url );
	$canonical_url = fp_add_remove_trailing_slash( $canonical_url );
	$canonical_url = fp_set_region_in_url( $canonical_url, $current_region );

	if ( $is_encoded ) {
		$canonical_url = urlencode( $canonical_url );
	}

	return $canonical_url;
}
add_filter( 'wpseo_canonical', 'fp_format_canonicals', 30 );

/**
 * Strip or force trailing slashes based on URL (except for admin or errors).
 *
 * @param string $url    URL to process for slashing.
 * @param string $region Region for this URL (defaults to current region).
 * @return string
 */
function fp_add_remove_trailing_slash( $url, $region = false ) {
	if ( is_admin() || is_404() ) {
		return $url;
	}

	$parsed_url = wp_parse_url( $url );

	if ( ! $region ) {
		$region = fp_get_current_language();
	}

	if ( isset( $parsed_url['path'] ) ) {
		if ( "/$region" === $parsed_url['path'] || "/$region/" === $parsed_url['path'] ) {
			$parsed_url['path'] = trailingslashit( $parsed_url['path'] );
		} else {
			$parsed_url['path'] = untrailingslashit( $parsed_url['path'] );
		}
	}

	return fp_http_build_url( $parsed_url );
}
add_filter( 'redirect_canonical', 'fp_add_remove_trailing_slash', 10, 1 );

/**
 * Ensure regional site roots have a trailing slash through redirection.
 */
function fp_regional_root_redirects() {
	if ( ! is_admin() && ! is_404() ) {
		$path_name = wp_parse_url( fp_get_server_var( 'REQUEST_URI' ), PHP_URL_PATH );
		$current_region = fp_get_current_language();

		if ( "/$current_region" === $path_name && wp_safe_redirect( trailingslashit( $path_name ), 301 ) ) {
			fp_die();
		}
	}
}
add_action( 'wp_loaded', 'fp_regional_root_redirects' );

/**
 * Remove hreflangs for noindex pages, add custom translation paths to hreflangs, and add "x-default".
 *
 * @param  array $langs Array of language URLs.
 * @return array
 */
function fp_add_default_hreflang( $langs = [] ) {
	if ( fp_is_noindex() ) {
		return [];
	}

	$eu_default_lang_code = FP_Site_Options::get_option( 'eu_default_lang_code' );
	$eu_default_for = FP_Site_Options::get_option( 'eu_default_for' );

	$all_regions = fp_get_all_regions( [ 'wpml_format' => true ] );

	foreach ( $all_regions as $lang_code => $lang ) {
		if ( ! array_key_exists( $lang_code, $langs ) && ! empty( $lang['url'] ) && ! $lang['missing'] ) {
			$langs[ $lang_code ] = $lang['url'];
		}
	}

	foreach ( $langs as $lang_code => $url ) {
		$langs[ $lang_code ] = fp_add_remove_trailing_slash( $url, $lang_code );
	}

	if ( ! empty( $langs ) ) {

		// Copy en-eu (europe) hreflang tag for all supported european countries.
		if ( ! empty( $langs[ $eu_default_lang_code ] ) ) {
			foreach ( $eu_default_for as $supported_eu_lang ) {
				$langs[ $supported_eu_lang ] = $langs[ $eu_default_lang_code ];
			}

			// Remove 'en-eu' hreflang tag.
			unset( $langs[ $eu_default_lang_code ] );
		}

		// Set the x-default hreflang tag.
		if ( empty( $langs['x-default'] ) ) {
			if ( ! empty( $langs['en-us'] ) ) {
				$langs['x-default'] = $langs['en-us'];
			} elseif ( ! empty( $langs['en-gb'] ) ) {
				$langs['x-default'] = $langs['en-gb'];
			} else {
				$langs['x-default'] = $langs[ array_key_first( $langs ) ];
			}
		}
	}

	return $langs;
}
add_filter( 'wpml_hreflangs', 'fp_add_default_hreflang' );

/**
 * Returns the schema markup for a page after sanity checking.
 */
function fp_get_schema_markup() {
	if ( function_exists( 'get_field' ) && function_exists( 'acf_get_field' ) ) {
		$schema_markup = get_field( 'schema_markup' );
		$default_schema_markup = acf_get_field( 'schema_markup' )['default_value'];

		if ( is_string( $schema_markup ) ) {
			$schema_markup = trim( $schema_markup );
		}

		// In case there is no schema_markup data (or bad data) for the page, we use the field default.
		if ( empty( $schema_markup ) || strpos( $schema_markup, '<script' ) !== 0 || substr( $schema_markup, -9 ) !== '</script>' ) {
			echo fp_noesc( $default_schema_markup );
		} else {
			echo fp_noesc( $schema_markup );
		}
	}
}
add_action( 'wp_head', 'fp_get_schema_markup', 0 );

/**
 * Sets custom page title using wpseo_title hook.
 *
 * @param  string $wpseo_replace_var WP SEO title var.
 * @return string
 */
function fp_title_override( $wpseo_replace_var ) {
	$title = $wpseo_replace_var;
	$queried_object = get_queried_object();

	if ( 'true' === get_query_var( 'news_coverage' ) ) {
		$base_title = explode( '|', $wpseo_replace_var );
		$base_title[0] = 'News Coverage Archives';
		$title = implode( ' | ', $base_title );
	}

	if (
		! is_admin()
		&& ! empty( $queried_object->taxonomy )
		&& ( 'integration' === get_post_type() ||
			'integration_category' === $queried_object->taxonomy ||
			'integration_collection' === $queried_object->taxonomy ||
			'integration_tag' === $queried_object->taxonomy
		)
	) {
		$base_title = explode( '|', $wpseo_replace_var );

		if ( get_queried_object()->name === 'integration' ) {
			$base_title[0] = 'Accounting Software Add-Ons &amp; Integration';
		}

		$title = implode( ' + ', $base_title );
	}

	// API title.
	if ( 'api' === get_post_type() ) {
		$base_title = explode( '|', $wpseo_replace_var );
		$title = $base_title[0] . '- API' . ( ! empty( $base_title[1] ) ? ( ' |' . $base_title[1] ) : '' );
	}

	// Invoice Template Archive.
	if ( ( null !== get_queried_object() ) && get_queried_object()->name === 'invoice_template' ) {
		$title = esc_attr__( 'Invoice Templates | Save Time, Generate & Send Invoices Easily', 'freshpress-website' );
	}

	return $title;
}
add_filter( 'wpseo_title', 'fp_title_override' );


/**
 * Sets custom page descriptipon using wpseo_metadesc hook.
 *
 * @param  string $wpseo_replace_var WP SEO Description var.
 * @return string
 */
function fp_description_override( $wpseo_replace_var ) {
	$description = $wpseo_replace_var;

	if ( ( null !== get_queried_object() ) && get_queried_object()->name === 'invoice_template' ) {
		$description = esc_attr__( 'Choose from 100s of free, customizable invoice templates. Download professional Excel, PDF, Word formats. Generate and send invoices today!', 'freshpress-website' );
	}
	return $description;
}
add_filter( 'wpseo_metadesc', 'fp_description_override', 10, 1 );

/**
 * Adjust locale for page.
 *
 * @param  string $locale Local to adjust.
 * @return string
 */
function fp_set_og_locale( $locale ) {
	$current_language = explode( '-', fp_get_current_language() );
	if ( count( $current_language ) === 2 ) {
		$current_language[1] = strtoupper( $current_language[1] );
		return join( '_', $current_language );
	}

	return $locale;
}
add_filter( 'wpseo_og_locale', 'fp_set_og_locale' );

/**
 * Adjust url for page.
 *
 * @param  string $url URL to adjust.
 * @return string
 */
function fp_set_og_url( $url ) {
	return fp_set_region_in_url( $url, fp_get_current_language() );
}
add_filter( 'wpseo_opengraph_url', 'fp_set_og_url' );

/**
 * Get if it is accounting partners url and return array of object terms, title and description.
 *
 * @return array
 */
function fp_accounting_partners_check_location_url() {
	$split_url = [];
	if ( isset( $_SERVER['REQUEST_URI'] ) ) {
		$split_url = explode( '/', esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
	}
	if ( 3 < count( $split_url ) && 'page' != $split_url[2] && 'accounting-partners' == $split_url[1] ) {
		$location_term = get_term_by( 'slug', $split_url[3], 'accounting_partners_location' );
		$service_term = get_term_by( 'slug', $split_url[2], 'accounting_partners_service' );
		$taxonomy_meta = get_option( 'wpseo_taxonomy_meta' );
		$meta_arr = [
			'location_term' => $location_term,
			'service_term'  => $service_term,
		];

		if ( isset( $taxonomy_meta['accounting_partners_location'] ) && ! empty( $taxonomy_meta['accounting_partners_location'] ) && $location_term ) {
			if ( array_key_exists( $location_term->term_id, $taxonomy_meta['accounting_partners_location'] ) ) {
				$seo_title = '';
				$seo_desc = '';
				if ( array_key_exists( 'wpseo_title', $taxonomy_meta['accounting_partners_location'][ $location_term->term_id ] ) ) {
					$seo_title = wpseo_replace_vars( $taxonomy_meta['accounting_partners_location'][ $location_term->term_id ]['wpseo_title'], $location_term, [] );
				}
				if ( array_key_exists( 'wpseo_desc', $taxonomy_meta['accounting_partners_location'][ $location_term->term_id ] ) ) {
					$seo_desc = wpseo_replace_vars( $taxonomy_meta['accounting_partners_location'][ $location_term->term_id ]['wpseo_desc'], $location_term, [] );
				}
				if ( '' != $seo_title || '' != $seo_desc ) {
					if ( '' != $seo_title ) {
						$meta_arr['seo_title'] = $seo_title;
					}
					if ( '' != $seo_desc ) {
						$meta_arr['seo_desc'] = $seo_desc;
					}
					return $meta_arr;
				}
			}
		}
		return $meta_arr;
	} else {
		return [];
	}
}

/**
 * Include accounting-partners-seo.php file if it is a Accounting Partner URL.
 */
function fp_apply_accounting_partners_seo() {
	$fp_ap_terms_obj = fp_accounting_partners_check_location_url();

	if ( ! empty( $fp_ap_terms_obj ) && ( $fp_ap_terms_obj['location_term'] || $fp_ap_terms_obj['service_term'] ) ) {
		// Load Accounting Partners SEO.
		require_once realpath( __DIR__ . '/..' ) . '/blocks/acf/accounting-partners-seo.php';
	}
}
add_action( 'init', 'fp_apply_accounting_partners_seo' );

/**
 * Adjust "X-Robots-Tag" to be indexed for prod.
 *
 * @param array $headers Output headers.
 * @return array
 */
function fp_adjust_x_robots_tag( $headers ) {
	if ( 'production' === fp_get_env() ) {
		foreach ( array_keys( $headers ) as $header ) {
			if ( fp_starts_with( $header, 'X-Robots-Tag:' ) ) {
				unset( $headers[ $header ] );
				$headers['X-Robots-Tag: index, follow'] = '';
			}
		}
	}

	return $headers;
}

add_filter( 'wpseo_sitemap_http_headers', 'fp_adjust_x_robots_tag' );
