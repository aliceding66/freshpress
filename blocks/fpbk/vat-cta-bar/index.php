<?php
/**
 * VatCtaBar block.
 *
 * @package FreshPress\VatCtaBar
 * @subpackage VatCtaBar
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_vat_cta_bar_block_init() {
	$block = new \FreshpressBlocks\VatCtaBarBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_vat_cta_bar_block_init' );
