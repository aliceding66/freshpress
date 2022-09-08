<?php
/**
 * Testimonial Quote block.
 *
 * @package FreshPress\TestimonialQuote
 * @subpackage TestimonialQuote
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_testimonial_quote_block_init() {
	$block = new \FreshpressBlocks\TestimonialQuoteBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_testimonial_quote_block_init' );
