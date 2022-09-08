<?php
/**
 * VatTextImage block.
 *
 * @package FreshPress\VatTextImage
 * @subpackage VatTextImage
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_vat_text_image_block_init() {
	$block = new \FreshpressBlocks\VatTextImageBlock( __DIR__, __FILE__ );
	$block->register();
}

add_action( 'init', 'fpbk_vat_text_image_block_init' );
