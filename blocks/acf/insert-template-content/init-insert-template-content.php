<?php
/**
 * Insert Template Content block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'insert-template-content',
	[
		'title'       => 'Insert Template Content',
		'description' => 'A block that inserts server-side template content if any exists',
		'keywords'    => [ 'insert', 'template', 'content', 'replace' ],
		'mode'        => 'preview',
		'post_types'  => [ 'template_page' ],
		'supports'    => [
			'anchor'          => false,
			'className'       => false,
			'customClassName' => false,
			'html'            => false,
			'mode'            => false,
			'multiple'        => false,
			'reusable'        => false,
		],
	]
);

/**
 * Render function for Replace Content block.
 */
function fp_render_block_insert_template_content() {
	echo '<!-- insert-template-content /-->';
}
