<?php
/**
 * DidYouKnow block.
 *
 * @package FreshPress\DidYouKnow
 * @subpackage DidYouKnow
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_did_you_know_block_init() {

	$block = new \FreshpressBlocks\DidYouKnowBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_did_you_know_block_init' );
