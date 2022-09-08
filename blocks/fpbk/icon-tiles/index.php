<?php
/**
 * IconTiles block.
 *
 * @package FreshPress\IconTiles
 * @subpackage IconTiles
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_icon_tiles_block_init() {
	$block = new \FreshpressBlocks\IconTilesBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_icon_tiles_block_init' );
