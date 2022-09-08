<?php
/**
 * CtaBanner block.
 *
 * @package FreshPress\CtaBanner
 * @subpackage CtaBanner
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_cta_banner_block_init() {
	$block = new \FreshpressBlocks\CtaBannerBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_cta_banner_block_init' );
