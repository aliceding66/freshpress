<?php
/**
 * Helper functions for SEO.
 *
 * @package FreshPress\Website
 */

/**
 * Use Yoast's classes to get the value of robots meta tag for a post.
 *
 * @param int $post Post ID to get robots meta tag for (defaults to current page).
 *
 * @return array
 */
function fp_get_robots_meta( $post = 0 ) {
	if ( $post ) {
		$robots = YoastSEO()->meta->for_post( $post )->robots;
	} else {
		$robots = YoastSEO()->meta->for_current_page()->robots;
	}

	return $robots;
}

/**
 * Using Yoast's robots meta value, check if a post is set to noindex.
 *
 * @param int $post Post ID to check is noindex (defaults to current page).
 *
 * @return boolean
 */
function fp_is_noindex( $post = 0 ) {
	$robots = fp_get_robots_meta( $post );

	return ! empty( $robots ) && is_array( $robots ) && in_array( 'noindex', $robots, true );
}

/**
 * Adds proper canonical and metadata to paginated query on page archive.
 * This function requires to be called before "get_header()".
 *
 * @param WP_Query $query Query that is paginated.
 *
 * @return void
 */
function fp_add_paginated_canonicals( $query ) {
	$page_no = ! empty( $query->query_vars['paged'] ) ? $query->query_vars['paged'] : 1;

	add_filter(
		'wpseo_canonical',
		function( $canonical_url ) use ( $page_no ) {
			$slash = urlencode( '/' );

			if ( $page_no > 1 && strpos( $canonical_url, "page{$slash}{$page_no}" ) === false ) {
				$canonical_url .= "{$slash}page{$slash}{$page_no}";
			} else if ( 1 === $page_no && strpos( $canonical_url, "page{$slash}{$page_no}" ) !== false ) {
				$canonical_url = str_replace( "{$slash}page{$slash}{$page_no}", $slash, $canonical_url );
			}

			return fp_add_remove_trailing_slash( $canonical_url );
		},
		20
	);

	add_action(
		'wp_head',
		function() use ( $page_no, $query ) {
			$url = home_url( fp_get_server_var( 'REQUEST_URI' ) );

			$previous_url = null;
			if ( 2 === $page_no ) {
				$previous_url = str_replace( "page/{$page_no}", '', $url );
			} else if ( $page_no > 2 ) {
				$previous_page_no = $page_no - 1;
				$previous_url = str_replace( "page/{$page_no}", "page/{$previous_page_no}", $url );
			}
			if ( $previous_url ) {
				echo fp_noesc( sprintf( '<link rel="prev" href="%s">', fp_add_remove_trailing_slash( $previous_url ) ) );
			}

			$next_url = null;
			if ( $page_no < $query->max_num_pages ) {
				$next_page_no = $page_no + 1;

				if ( 1 === $page_no ) {
					$next_url = "{$url}/page/{$next_page_no}";
				} else {
					$next_url = str_replace( "page/{$page_no}", "page/{$next_page_no}", $url );
				}
			}
			if ( $next_url ) {
				echo fp_noesc( sprintf( '<link rel="next" href="%s">', fp_add_remove_trailing_slash( $next_url ) ) );
			}
		},
		1
	);
}
