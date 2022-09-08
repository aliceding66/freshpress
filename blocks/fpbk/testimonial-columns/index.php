<?php
/**
 * Testimonial columns block.
 *
 * @package FreshPress\TestimonialColumns
 * @subpackage Example
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_testimonial_columns_block_init() {
	$block = new \FreshpressBlocks\TestimonialColumnsBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_testimonial_columns_block_init' );
