<?php
/**
 * Product Tour Hero block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'product-tour-hero',
	[
		'title'       => 'Product Tour Hero',
		'description' => 'Product Tour Hero',
		'keywords'    => [ 'product', 'tour', 'hero' ],
		'supports'    => [
			'jsx' => true,
		],
	]
);
