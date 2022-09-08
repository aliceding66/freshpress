<?php
/**
 * Integration Card block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'integration-card',
	[
		'title'       => 'Integration Card',
		'description' => 'Integration Card used in both the archive pages and in the "Similar Apps" section of the single integration pages',
		'keywords'    => [ 'integration', 'card' ],
		'supports'    => [
			'inserter' => false,
		],
	]
);
