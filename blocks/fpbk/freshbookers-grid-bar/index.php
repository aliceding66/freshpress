<?php
/**
 * FreshbookersGridBar block.
 *
 * @package FreshPress\FreshbookersGridBar
 * @subpackage FreshbookersGridBar
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_freshbookers_grid_bar_block_init() {
	$block = new \FreshpressBlocks\FreshbookersGridBarBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_freshbookers_grid_bar_block_init' );
