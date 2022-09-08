<?php
/**
 * CTA Ba block.
 *
 * @package FreshPress\CtaBar
 * @subpackage CtaBar
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_cta_bar_block_init() {
	/**
	 * Minimalistic block registration call.
	 */
	$block = new \FreshpressBlocks\CtaBarBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_cta_bar_block_init' );
