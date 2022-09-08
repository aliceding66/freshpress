<?php
/**
 * Helper functions for templates.
 *
 * @package FreshPress\Website
 */

/**
 * Inserts Banner Outage partial.
 *
 * @param string $desktop_content Message to be shown on desktop.
 * @param string $mobile_content Message to be shown on mobile.
 * @param string $button_text Button label.
 */
function fp_insert_outage_banner( $desktop_content, $mobile_content, $button_text ) {
	$outage_banner_data = [
		'desktop_content' => $desktop_content,
		'mobile_content'  => $mobile_content,
		'button_text'     => $button_text,
	];

	require_once get_template_directory() . '/partials/common/banner-outage.php';
}

/**
 * Inserts Banner Informational partial.
 *
 * @param string $desktop_content Message to be shown on desktop.
 * @param string $mobile_data array with mobile data (array with content and url keys).
 */
function fp_insert_banner_informational( $desktop_content, $mobile_data ) {
	$informational_banner_data = [
		'content_desktop' => $desktop_content,
		'mobile'          => $mobile_data,
	];

	require_once get_template_directory() . '/partials/common/header/banner-informational.php';
}
