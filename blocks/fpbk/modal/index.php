<?php
/**
 * Modal block.
 *
 * @package FreshPress\Modal
 * @subpackage Modal
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_modal_block_init() {
	$block = new \FreshpressBlocks\ModalBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_modal_block_init' );
