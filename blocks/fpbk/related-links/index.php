<?php
/**
 * RelatedLinks block.
 *
 * @package FreshPress\RelatedLinks
 * @subpackage RelatedLinks
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_related_links_block_init() {
	$block = new \FreshpressBlocks\RelatedLinksBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_related_links_block_init' );
