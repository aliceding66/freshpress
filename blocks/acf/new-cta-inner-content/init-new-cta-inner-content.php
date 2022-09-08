<?php
/**
 * New Cta Inner Content block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'new-cta-inner-content',
	[
		'title'       => 'New CTA Inner Content',
		'description' => 'New CTA Inner Content with title, description and button',
		'keywords'    => [ 'new', 'cta', 'inner', 'content', 'title', 'description', 'button' ],
	]
);
