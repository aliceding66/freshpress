<?php
/**
 * Filter and action handlers for REST API.
 *
 * @package FreshPress\Website
 */

/**
 * REST API publicly allowed endpoint.
 */
const FP_WHITELISTED_REST_API_ENDPOINTS = [
	'/wp-json/bng/generate',
	'/wp-json/nicereply/send',
	'/wp-json/roi-calc/roi-calculate',
	'/wp-json/roi-calc/generate-report',
];

/**
 * Remove user endpoints from REST API.
 *
 * @param array $endpoints REST API endpoints for this site.
 *
 * @return array
 */
function fp_block_user_rest_endpoints( $endpoints ) {
	if ( ! is_admin() && ! is_user_logged_in() ) {
		$endpoints_to_remove = [
			'/wp/v2/users',
			'/wp/v2/users/(?P<id>[\d]+)',
			'/wp/v2/users/(?P<user_id>(?:[\d]+|me))/application-passwords',
			'/wp/v2/users/(?P<user_id>(?:[\d]+|me))/application-passwords/introspect',
			'/wp/v2/users/(?P<user_id>(?:[\d]+|me))/application-passwords/wp/v2/users/(?P<id>[\d]+)',
		];

		foreach ( $endpoints_to_remove as $endpoint_to_remove ) {
			if ( isset( $endpoints[ $endpoint_to_remove ] ) ) {
				unset( $endpoints[ $endpoint_to_remove ] );
			}
		}
	}

	return $endpoints;
}

add_filter( 'rest_endpoints', 'fp_block_user_rest_endpoints' );

/**
 * Ensure our REST base url has a trailing slash.
 *
 * @param string $url REST API URL.
 *
 * @return string
 */
function fp_fix_rest_url( $url ) {
	return trailingslashit( $url );
}

add_filter( 'rest_url', 'fp_fix_rest_url' );

/**
 * Ajax authorization action.
 *
 * @return bool Returns if user is logged in and is administrator or editor.
 */
function fp_authorize_ajax_call() {
	global $wpdb;
	$user_login = '';
	$user_level = 0;

	foreach ( $_COOKIE as $key => $cookie ) {
		if ( fp_starts_with( $key, 'wordpress_logged_in_' ) ) {
			$exploded_cookie = explode( '|', urldecode( $cookie ) );
			if ( ! empty( $exploded_cookie ) && $exploded_cookie[0] ) {
				$user_login = $exploded_cookie[0];
				$user_level = $wpdb->get_var(
					$wpdb->prepare(
						"
					SELECT meta_value
					FROM $wpdb->usermeta AS um
					JOIN $wpdb->users AS u ON u.ID = um.user_id
					WHERE u.user_login = %s AND um.meta_key = 'wp_user_level'
				",
						$user_login
					)
				);
			}
			break;
		}
	}

	return ! empty( $user_login ) && $user_level > 0;
}

/**
 * Removed author info from Yoast oembed data.
 *
 * @param array $data Yoast oembed data.
 *
 * @return array Returns if user is logged in and is administrator or editor.
 */
function fp_remove_author_from_oembed( $data ) {
	foreach ( array_keys( $data ) as $key ) {
		if ( fp_starts_with( $key, 'author' ) ) {
			unset( $data[ $key ] );
		}
	}

	return $data;
}

add_filter( 'oembed_response_data', 'fp_remove_author_from_oembed', 1 );


/**
 * Restrict REST API to be exposed only for logged users of on localhost.
 *
 * @param bool $served Param passed to filter.
 */
function fp_restrict_rest_api( $served ) {
	$request_uri = strtok( fp_get_server_var( 'REQUEST_URI' ), '?' );
	$referrer_uri = fp_get_server_var( 'HTTP_REFERER' );

	$is_logged = fp_authorize_ajax_call();
	$is_ide_call = strpos( $referrer_uri, 'admin.php?page=graphiql-ide' ) !== false;

	if (
		! $is_logged
		&& ! $is_ide_call
		&& ! empty( fp_get_server_var( 'HTTP_AUTHORIZATION' ) )
		&& function_exists( 'wp_populate_basic_auth_from_authorization_header' )
		&& function_exists( 'wp_is_application_passwords_available' )
		&& function_exists( 'get_user_by' )
		&& function_exists( 'wp_check_password' )
	) {
		 wp_populate_basic_auth_from_authorization_header();
		if ( wp_is_application_passwords_available() ) {
			$username = fp_get_server_var( 'PHP_AUTH_USER' );
			$password = fp_get_server_var( 'PHP_AUTH_PW' );

			$user  = get_user_by( 'login', $username );
			$password = preg_replace( '/[^a-z\d]/i', '', $password );
			$hashed_passwords = WP_Application_Passwords::get_user_application_passwords( $user->ID );
			foreach ( $hashed_passwords as $item ) {
				if ( wp_check_password( $password, $item['password'], $user->ID ) ) {
					$is_logged = true;
					break;
				}
			}
		}
	}
	$is_localhost = 'local' === fp_get_env();
	$is_whitelisted = in_array( $request_uri, FP_WHITELISTED_REST_API_ENDPOINTS );
	$is_oembed = strpos( $request_uri, 'wp-json/oembed' ) !== false;

	if ( ! $is_logged && ! $is_ide_call && ! $is_localhost && ! $is_whitelisted && ! $is_oembed ) {
		status_header( 403 );
		fp_die();
	}

	return $served;
}

add_filter( 'rest_pre_serve_request', 'fp_restrict_rest_api', 0 );
