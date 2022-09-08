<?php
/**
 * Scroll Tracking block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'scroll-tracking',
	[
		'title'       => 'Scroll Tracking',
		'description' => 'Scroll Tracking block',
		'keywords'    => [ 'scroll', 'tracking' ],
		'supports'    => [
			'multiple' => false,
		],
	]
);
