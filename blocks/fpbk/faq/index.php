<?php
/**
 * Faq block.
 *
 * @package FreshPress\Faq
 * @subpackage Faq
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_faq_block_init() {
	/**
	 * Minimalistic block registration call.
	 */
	$block = new \FreshpressBlocks\FaqBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_faq_block_init' );
