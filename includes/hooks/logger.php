<?php
/**
 * Filter and action handlers extending logger.
 *
 * @package FreshPress\Website
 */

/* phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound */

/**
 * Setup Sentry env.
 *
 * @return void
 */
function fp_set_sentry_env() {
	if ( ! defined( 'WP_SENTRY_ENV' ) ) {
		$env = fp_get_env();

		if ( defined( 'WP_SENTRY_PREFIX' ) ) {
			$env = ( WP_SENTRY_PREFIX . '-' . $env );
		}

		if ( defined( 'WP_SENTRY_SUFFIX' ) ) {
			$env = ( $env . '-' . WP_SENTRY_SUFFIX );
		}

		define( 'WP_SENTRY_ENV', $env );
	}
}

add_action( 'init', 'fp_set_sentry_env' );
