<?php
/**
 * Animate block.
 *
 * @package FreshPress\Animate
 * @subpackage Animate
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_animate_block_init() {
	$block = new \FreshpressBlocks\AnimateBlock( __DIR__, __FILE__ );
	$block->register();
}

add_action( 'init', 'fpbk_animate_block_init' );
