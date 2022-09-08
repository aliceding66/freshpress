<?php
/**
 * StatTiles block.
 *
 * @package FreshPress\StatTiles
 * @subpackage StatTiles
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_stat_tiles_block_init() {
	$block = new \FreshpressBlocks\StatTilesBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_stat_tiles_block_init' );
