<?php
/**
 * Accounting Partners Form block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'accounting-partners-form',
	[
		'title'       => 'Accounting Partners Form',
		'description' => 'Accounting Partners Form',
		'keywords'    => [ 'accounting', 'partners', 'form' ],
		'supports'    => [
			'jsx' => true,
		],
	]
);
