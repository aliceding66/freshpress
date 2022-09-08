<?php
/**
 * Product Tour Grey Line block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'product-tour-grey-line',
	[
		'title'       => 'Product Tour Grey Line',
		'description' => 'Scrolling animation line that engages user to scroll down',
		'keywords'    => [ 'product', 'tour', 'grey', 'line' ],
		'supports'    => [
			'__experimental_jsx' => true,
		],
	]
);
