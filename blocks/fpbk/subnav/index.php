<?php
/**
 * Subnav block.
 *
 * @package FreshPress\Subnav
 * @subpackage Subnav
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_subnav_block_init() {
	$block = new \FreshpressBlocks\SubnavBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_subnav_block_init' );
