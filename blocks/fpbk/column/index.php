<?php
/**
 * Column block.
 *
 * @package FreshPress\Column
 * @subpackage Column
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_column_block_init() {
	$block = new \FreshpressBlocks\ColumnBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_column_block_init' );
