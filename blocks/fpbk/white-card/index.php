<?php
/**
 * Example block.
 *
 * @package FreshPress\Example
 * @subpackage Example
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_white_card_block_init() {
	$block = new \FreshpressBlocks\WhiteCardBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_white_card_block_init' );
