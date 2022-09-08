<?php
/**
 * Promo Hero block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'promo-hero',
	[
		'title'       => 'Promo Hero',
		'description' => 'Promotional Unicorn Hero for Direct Buy to replace the regular hero.',
		'keywords'    => [ 'promo', 'hero', 'directbuy', 'direct', 'buy' ],
		'supports'    => [
			'inserter' => false,
		],
	]
);
