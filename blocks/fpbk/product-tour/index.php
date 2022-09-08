<?php
/**
 * ProductTour block.
 *
 * @package FreshPress\ProductTour
 * @subpackage ProductTour
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_product_tour_block_init() {
	$block = new \FreshpressBlocks\ProductTourBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_product_tour_block_init' );
