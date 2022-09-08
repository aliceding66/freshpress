<?php
/**
 * WebinarsList block.
 *
 * @package FreshPress\WebinarsList
 * @subpackage WebinarsList
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_webinars_list_block_init() {
	$block = new \FreshpressBlocks\WebinarsListBlock( __DIR__, __FILE__ );

	$block->register();
}

add_action( 'init', 'fpbk_webinars_list_block_init' );
