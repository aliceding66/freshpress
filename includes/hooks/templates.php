<?php
/**
 * Filter and action related to templates.
 *
 * @package FreshPress\Website
 */

/**
 * Add a system-level smart banner to show a link to the app on iOS devices.
 */
function fp_add_smart_banner_ios() {
	if ( ! is_page( 'signup' ) && ! is_page( 'signup2' ) ) {
		echo '<meta name="apple-itunes-app" content="app-id=1052884030" />';
	}
}
add_action( 'wp_head', 'fp_add_smart_banner_ios' );

/**
 * Add a browser-level smart banner to show a link to the Android app on Chrome browsers and Android devices.
 */
function fp_add_smart_banner_android() {
	if ( ! is_page( 'signup' ) && ! is_page( 'signup2' ) ) {
		require_once get_template_directory() . '/partials/common/app-smart-banner.php';
	}
}
add_action( 'wp_body_open', 'fp_add_smart_banner_android' );
