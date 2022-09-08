<?php
/**
 * Accounting Partners Detail CTA block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'accounting-partners-detail-cta',
	[
		'title'       => 'Accounting Partners Detail CTA',
		'description' => 'Block for Accounting Partners detail page with Title, CTA and description',
		'keywords'    => [ 'accounting', 'partners', 'detail', 'cta', 'title', 'description' ],
	]
);
