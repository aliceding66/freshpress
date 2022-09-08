<?php
/**
 * Common footer for Hub Categories and articles.
 *
 * @package FreshPress\Website
 */

echo fp_render_blocks(
	[
		'name'  => 'sticky-footer',
		'attrs' => [
			'text'           => __( 'Save Time Billing and Get Paid 2x Faster With FreshBooks', 'freshpress-website' ),
			'cta'            => [
				'url'   => home_url( 'signup' ),
				'title' => __( 'Try FreshBooks Free', 'freshpress-website' ),
			],
			'secondary_link' => [
				'url'   => home_url( 'select#form' ),
				'title' => __( 'Contact Sales', 'freshpress-website' ),
			],
		],
	]
);

$exit_modal_attrs = [
	'className'                 => 'trackingSection-pardot-exit-modal pardot-exit-modal',
	'modal_content_heading'     => __( 'Want More Helpful Articles About Running a Business?', 'freshpress-website' ),
	'modal_description'         => __( 'Get more great content in your Inbox.', 'freshpress-website' ),
	'modal_form_include'        => true,
	'pardot_form_url'           => __( 'https://www2.freshbooks.com/l/490351/2020-06-17/234sfbn', 'freshpress-website' ),
	'pardot_form_iframe_width'  => '',
	'pardot_form_form_name'     => 'Exit Modal Form',
	'modal_bottom_text'         => __( 'By subscribing, you agree to receive communications from FreshBooks and acknowledge and agree to <a href="https://www.freshbooks.com/policies/privacy" target="_blank" rel="noopener">FreshBook’s Privacy Policy</a>. You can unsubscribe at any time by contacting us at help@freshbooks.com.', 'freshpress-website' ),
	'modal_visibility'          => 'everyone',
	'modal_open_on_page_load'   => true,
	'modal_delay'               => '5',
	'modal_user_action'         => 'page_leave',
	'modal_close_button_colour' => [ 'hex' => '#000' ],
];

echo fp_render_blocks(
	[
		'name'  => 'modal',
		'attrs' => $exit_modal_attrs,
	]
);
