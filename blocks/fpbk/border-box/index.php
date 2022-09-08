<?php
/**
 * BorderBox block.
 *
 * @package FreshPress\BorderBox
 * @subpackage BorderBox
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_border_box_block_init() {
	$block = new \FreshpressBlocks\BorderBoxBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_border_box_block_init' );
