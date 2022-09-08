<?php
/**
 * Iframe block.
 *
 * @package FreshPress\Iframe
 * @subpackage Iframe
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_iframe_block_init() {
	/**
	 * Minimalistic block registration call.
	 */
	$block = new \FreshpressBlocks\IframeBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_iframe_block_init' );
