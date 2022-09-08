<?php
/**
 * Helper functions for different environments.
 *
 * @package FreshPress\Website
 */

/**
 * Return the appropriate FreshBooks product domain based on environment.
 *
 * @param  string $subdomain Optional subdomain to prepend to domain.
 * @param  string $hostname Optional hostname for which to get the environment.
 * @return string
 */
function fp_get_fb_domain( $subdomain = '', $hostname = '' ) {
	$env = fp_get_env( $hostname );
	$domain = 'production' === $env ? 'freshbooks.com' : 'staging.freshenv.com';

	$subdomain = trim( $subdomain, ' .' );

	if ( ! empty( $subdomain ) ) {
		$domain = "$subdomain.$domain";
	}

	return $domain;
}

/**
 * Return the environment based on WP_ENVIRONMENT_TYPE constant, legacy WP_ENV constant,
 * SERVER_NAME or HTTP_HOST variables, or a $hostname argument.
 *
 * Should return one of productions|staging|development|local.
 *
 * @param  string $hostname Optional hostname for which to get the environment.
 * @return string
 */
function fp_get_env( $hostname = '' ) {
	if ( empty( $hostname ) ) {
		if ( ! defined( 'WP_ENVIRONMENT_TYPE' ) && defined( 'WP_ENV' ) && trim( WP_ENV ) !== '' ) {
			return WP_ENV;
		} else {
			return wp_get_environment_type();
		}
	} else {
		$hostname = trim( $hostname );
	}

	switch ( $hostname ) {
		case 'www.freshbooks.com':
		case 'prod.web.freshenv.com':
			return 'production';
		case 'www.staging.freshenv.com':
		case 'staging.web.freshenv.com':
		case 'www.uat.freshenv.com':
		case 'uat.web.freshenv.com':
			return 'staging';
		case 'www.dev.freshenv.com':
			return 'local';
		default:
			return 'development';
	}
}

/**
 * Get the hostname for the current site as reliably as possible.
 *
 * @return string
 */
function fp_get_hostname() {
	foreach ( [ 'SERVER_NAME', 'HTTP_HOST' ] as $key ) {
		$hostname = fp_get_server_var( $key );
		if ( ! empty( $hostname ) ) {
			return $hostname;
		}
	}
	return wp_parse_url( home_url(), PHP_URL_HOST );
}

/**
 * Get variable from $_SERVER.
 *
 * @param string  $var_name    Array key for variable.
 * @param integer $filter_type Filter type to use.
 * @return string|null
 */
function fp_get_server_var( $var_name, $filter_type = FILTER_SANITIZE_URL ) {
	if ( ! empty( $_SERVER[ $var_name ] ) ) {
		return filter_var( wp_unslash( $_SERVER[ $var_name ] ), $filter_type );
	}
	return null;
}

/**
 * Get variable from $_POST.
 *
 * @param string $var_name    Array key for variable.
 * @param mixed  $default Default value to return.
 * @return string|null
 */
function fp_get_post_var( $var_name, $default = null ) {
    // @codingStandardsIgnoreStart
	if ( ! empty( $_POST[ $var_name ] ) ) {
		return esc_html( wp_unslash( $_POST[ $var_name ] ) );
	}
    // @codingStandardsIgnoreEnd

	return $default;
}
