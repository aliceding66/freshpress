<?php
/**
 * StickyFooter block.
 *
 * @package FreshPress\StickyFooter
 * @subpackage StickyFooter
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_sticky_footer_block_init() {
	$block = new \FreshpressBlocks\StickyFooterBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_sticky_footer_block_init' );
