<?php
/**
 * BlueCTABar block.
 *
 * @package FreshPress\BlueCTABar
 * @subpackage BlueCTABar
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_blue_cta_bar_block_init() {
	$block = new \FreshpressBlocks\BlueCtaBarBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_blue_cta_bar_block_init' );
