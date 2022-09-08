<?php
/**
 * Helper functions for URLs.
 *
 * @package FreshPress\Website
 */

/**
 * Get sharing URL for selected social platform.
 *
 * @param string $platform Social platform name (lowercase: instagram, facebook etc.).
 * @param string $custom_url (optional) Custom page URL to share.
 * @param string $custom_title (optional) Custom page Title to share.
 *
 * @return string
 */
function fp_get_sharing_url( $platform, $custom_url = '', $custom_title = '' ) {
	$url = rawurlencode( ! empty( $custom_url ) ? $custom_url : get_permalink() );
	$title = rawurlencode( ! empty( $custom_title ) ? $custom_title : get_the_title() );

	$platform_sharing_urls = [
		'facebook' => "https://www.facebook.com/sharer/sharer.php?u=$url&t=$title",
		'twitter'  => "https://twitter.com/intent/tweet?text=$title:%20$url",
		'linkedin' => "https://www.linkedin.com/sharing/share-offsite/?url=$url&title=$title",
	];

	return $platform_sharing_urls[ $platform ] ?? '';
}

/**
 * Get $parts array returned by wp_parse_url and creates RFC comatible url back.
 *
 * @param array $parts  array of url parts returned by wp_parse_url.
 * @return string
 */
function fp_http_build_url( $parts ) {
	return ( isset( $parts['scheme'] ) ? "{$parts['scheme']}:" : '' ) .
	( ( isset( $parts['user'] ) || isset( $parts['host'] ) ) ? '//' : '' ) .
	( isset( $parts['user'] ) ? "{$parts['user']}" : '' ) .
	( isset( $parts['pass'] ) ? ":{$parts['pass']}" : '' ) .
	( ( isset( $parts['user'] ) || isset( $parts['pass'] ) ) ? '@' : '' ) .
	( $parts['host'] ?? '' ) .
	( isset( $parts['port'] ) ? ":{$parts['port']}" : '' ) .
	( $parts['path'] ?? '' ) .
	( isset( $parts['query'] ) ? "?{$parts['query']}" : '' ) .
	( isset( $parts['fragment'] ) ? "#{$parts['fragment']}" : '' );
}

/**
 * Force serve 404 page.
 */
function fp_serve_404() {
	status_header( 404 );
	include( get_query_template( '404' ) );
}

/**
 * Verify and fix if necessary region in URL.
 *
 * @param string $url URL to parse with region.
 * @param string $language_code Language code to be set in URL.
 *
 * @return string
 */
function fp_set_region_in_url( $url, $language_code ) {
	$all_language_codes = array_map(
		function( $item ) {
			return fp_add_remove_trailing_slash( $item['url'] );
		},
		fp_get_all_regions( [ 'wpml_format' => true ] )
	);

	if ( isset( $all_language_codes[ $language_code ] ) ) {
		$url = fp_add_remove_trailing_slash( $url );
		$url_has_default_language_code = true;
		$default_language_code = $all_language_codes['en-us'];
		unset( $all_language_codes['en-us'] );

		foreach ( $all_language_codes as $current_language_code => $current_language_url ) {
			if ( fp_starts_with( $url, $current_language_url ) ) {
				$url = str_replace( $current_language_code, 'en-us' !== $language_code ? $language_code : '', $url );
				$url_has_default_language_code = false;
			}
		}

		if ( $url_has_default_language_code && 'en-us' !== $language_code ) {
			$url = str_replace( $default_language_code, $all_language_codes[ $language_code ], $url );
		}
	}

	return str_replace( '.com//', '.com/', fp_add_remove_trailing_slash( $url ) );
}

/**
 * Returns base domain from url.
 *
 * @param string $url Input url.
 * @return string
 */
function fp_get_base_domain( $url ) {
	$original_url = $url;
	if ( ! preg_match( '/https?:\/\//', $url ) ) {
		$url = "https://{$url}";
	}

	$host = wp_parse_url( $url, PHP_URL_HOST );
	$exploded_host = explode( '.', $host );

	if ( count( $exploded_host ) >= 2 ) {
		return join( '.', array_slice( $exploded_host, -2 ) );
	}

	return $original_url;
}

/**
 * Returns regionalized links wrapped with <li>.
 *
 * @param array $page_list List of pages [ 'title' => 'slug' ].
 * @return string HTML content.
 */
function fp_get_regionalized_links( $page_list ) {
	$current_lang = fp_get_current_language();

	$regionalized_origin = 'https://www.freshbooks.com' . ( 'en-us' === $current_lang ? '/' : "/$current_lang/" );
	$links = '';

	if ( ! empty( $page_list ) ) {
		foreach ( $page_list as $page_title => $page_path ) {
			$us_page_id = get_page_by_path( $page_path )->ID;
			$regionalized_page_id = apply_filters( 'wpml_object_id', $us_page_id, 'page', false );

			if ( null !== $regionalized_page_id && 'publish' === get_post_status( $regionalized_page_id ) ) {
				$regionalized_page_path = get_page_uri( $regionalized_page_id );
				$page_link = $regionalized_origin . $regionalized_page_path;
				$links .= "<li><a href='$page_link'>$page_title</a></li>";
			} else {
				$page_link = 'https://www.freshbooks.com' . $page_path;
				$links .= "<li><a href='$page_link'>$page_title</a></li>";
			}
		}
	}

	return $links;
}
