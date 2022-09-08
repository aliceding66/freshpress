<?php
/**
 * LogoGroup block.
 *
 * @package FreshPress\LogoGroup
 * @subpackage LogoGroup
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_logo_group_block_init() {
	$block = new \FreshpressBlocks\LogoGroupBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_logo_group_block_init' );
