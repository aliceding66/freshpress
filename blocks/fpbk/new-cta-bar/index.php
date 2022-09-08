<?php
/**
 * NewCtaBar block.
 *
 * @package FreshPress\NewCtaBar
 * @subpackage NewCtaBar
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_new_cta_bar_block_init() {
	$block = new \FreshpressBlocks\NewCtaBarBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_new_cta_bar_block_init' );
