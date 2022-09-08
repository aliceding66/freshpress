<?php
/**
 * Flexible Background block.
 *
 * @package FreshPress\FlexibleColourBackgroundBlock
 * @subpackage Button
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_flexible_background_block_init() {
	$block = new \FreshpressBlocks\FlexibleColourBackgroundBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_flexible_background_block_init' );
