<?php
/**
 * One Column block.
 *
 * @package FreshPress\One Column
 * @subpackage One Column
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_one_column_block_init() {
	$block = new \FreshpressBlocks\OneColumnBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_one_column_block_init' );
