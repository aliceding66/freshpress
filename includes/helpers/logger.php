<?php
/**
 * Helper functions for logger.
 *
 * @package FreshPress\Website
 */

/**
 * Helper function to log in Sentry.
 *
 * @param Throwable $e Throwable to be logged.
 */
function fp_log( $e ) {
	if ( function_exists( 'wp_sentry_safe' ) ) {
		wp_sentry_safe(
			function( $client ) use ( $e ) {
				$client->captureException( $e );
			}
		);
	}
}
