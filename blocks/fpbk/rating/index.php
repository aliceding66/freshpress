<?php
/**
 * Rating block.
 *
 * @package FreshPress\Blocks
 * @subpackage Rating
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_rating_block_init() {
	$block = new \FreshpressBlocks\RatingBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_rating_block_init' );
