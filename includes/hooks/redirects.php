<?php
/**
 * Filter and action related to redirects.
 *
 * @package FreshPress\Website
 */

/**
 * Adds UTM params to redirection if those are missing.
 *
 * @param string $location New URL for redirect.
 *
 * @return string
 */
function fp_preserve_utm_params( $location ) {
	$allowed_utm_params = [ 'ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term' ];
	$existing_utm_params = [];

	if ( ! empty( $_GET ) ) {
		foreach ( $_GET as $key => $value ) {
			if ( in_array( $key, $allowed_utm_params ) ) {
				$existing_utm_params[ $key ] = esc_attr( $value );
			}
		}
	}

	if ( ! empty( $existing_utm_params ) ) {
		$parsed_location = parse_url( $location );
		$new_query_data = [];
		if ( ! empty( $parsed_location['query'] ) ) {
			parse_str( $parsed_location['query'], $new_query_data );
		}

		$new_query_data = array_merge( $new_query_data, $existing_utm_params );
		$parsed_location['query'] = http_build_query( $new_query_data, '', '&', PHP_QUERY_RFC3986 );
		// by default http_build_query uses PHP_QUERY_RFC1738 and encodes " " (space) with "%20" and so on,
		// while apache sends us space as +, therefore canonical_url tries to normalize it and causing infinite redirect.

		$location = fp_http_build_url( $parsed_location );
	}

	return $location;
}

add_filter( 'wp_redirect', 'fp_preserve_utm_params' );
