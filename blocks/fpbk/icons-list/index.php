<?php
/**
 * IconsList block.
 *
 * @package FreshPress\IconsList
 * @subpackage IconsList
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_icons_list_block_init() {
	/**
	 * Minimalistic block registration call.
	 */
	$block = new \FreshpressBlocks\IconsListBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_icons_list_block_init' );
