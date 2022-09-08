<?php
/**
 * Nicereply block.
 *
 * @package FreshPress\Nicereply
 * @subpackage Nicereply
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_nicereply_block_init() {
	$block = new \FreshpressBlocks\NicereplyBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_nicereply_block_init' );
