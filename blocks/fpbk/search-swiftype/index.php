<?php
/**
 * SearchSwiftype block.
 *
 * @package FreshPress\SearchSwiftype
 * @subpackage SearchSwiftype
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_search_swiftype_block_init() {
	$block = new \FreshpressBlocks\SearchSwiftypeBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_search_swiftype_block_init' );
