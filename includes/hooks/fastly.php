<?php
/**
 * Filter and action handlers for Fastly.
 *
 * @package FreshPress\Website
 */

/**
 * Add Fastly cache keys for easier purging
 *
 * @param Object $keys Fastly surrogate cache keys.
 */
function fp_fastly_surrogate_keys( $keys ) {
	if ( ! is_404() ) {
		$queried_obj = get_queried_object();
		$cache_keys = [
			'public-website',
		];

		if ( is_single() || is_page() ) {
			$cache_keys[] = str_replace( '_', '-', get_post_type( $queried_obj->ID ) );

			if ( is_front_page() ) {
				$cache_keys[] = 'url_' . $queried_obj->post_name;
			} else {
				$cache_keys[] = 'url' . str_replace( '/', '_', wp_parse_url( get_permalink( $queried_obj->ID ) )['path'] );
			}
		} elseif ( is_tax() ) {
			$cache_keys[] = 'tax_' . str_replace( '_', '-', $queried_obj->taxonomy );
			$cache_keys[] = 'url' . str_replace( '/', '_', wp_parse_url( get_term_link( $queried_obj ) )['path'] );
		}

		foreach ( $cache_keys as $key ) {
			if ( substr( $key, -1 ) !== '_' ) {
				$keys->add_key( $key );
			}
		}
	}
}
add_action( 'purgely_pre_send_keys', 'fp_fastly_surrogate_keys' );

/**
 * Add rewrite for Faslty health check.
 */
function fp_add_fastly_health_check_rewrite() {
	add_rewrite_rule( 'fastly-hc$', 'index.php?fastly-hc=1', 'top' );
}
add_action( 'init', 'fp_add_fastly_health_check_rewrite' );

/**
 * Add request handling for Fastly health check.
 *
 * @param WP_Query $query WordPress page query.
 * @return WP_Query
 */
function fp_handle_fastly_health_check_request( $query ) {
	if ( isset( $query->request ) && 'fastly-hc' === $query->request ) {
		http_response_code( 200 );
		header( 'Content-length: 0' );
		exit;
	}

	return $query;
}
add_action( 'parse_request', 'fp_handle_fastly_health_check_request' );
