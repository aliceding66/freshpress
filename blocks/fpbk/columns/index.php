<?php
/**
 * Columns block.
 *
 * @package FreshPress\Columns
 * @subpackage Columns
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_columns_block_init() {
	$block = new \FreshpressBlocks\ColumnsBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_columns_block_init' );
