<?php
/**
 * Filter and action handlers for HTTP headers.
 *
 * @package FreshPress\Website
 */

/**
 * Add a last modified header to our response so we can set it in the sitemap.
 */
function fp_add_last_modified_header() {
	// Don't add for 404s.
	if ( is_404() ) {
		return;
	}

	// Don't override the last-modified header if it's already set.
	$headers = headers_list();
	if ( ! empty( $headers['last-modified'] ) ) {
		return;
	}

	// Add last modified header.
	global $post;
	if ( isset( $post ) ) {
		$last_modified = get_post_modified_time( 'D, d M Y H:i:s', true, $post );
		if ( ! empty( $last_modified ) && ! headers_sent() ) {
			header( 'Last-Modified: ' . $last_modified . ' GMT' );
		}
	}
}
add_action( 'template_redirect', 'fp_add_last_modified_header' );
