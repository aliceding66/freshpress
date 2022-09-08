<?php
/**
 * Carousel block.
 *
 * @package FreshPress\Carousel
 * @subpackage Carousel
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_carousel_block_init() {
	$block = new \FreshpressBlocks\CarouselBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_carousel_block_init' );
