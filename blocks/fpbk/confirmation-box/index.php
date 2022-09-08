<?php
/**
 * Confirmation Box block.
 *
 * @package FreshPress\ConfirmationBox
 * @subpackage ConfirmationBox
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_confirmation_box_block_init() {
	$block = new \FreshpressBlocks\ConfirmationBoxBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_confirmation_box_block_init' );
