<?php
/**
 * Boxes block.
 *
 * @package FreshPress\Boxes
 * @subpackage Boxes
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_boxes_block_init() {
	$block = new \FreshpressBlocks\BoxesBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_boxes_block_init' );
