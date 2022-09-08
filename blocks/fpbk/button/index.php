<?php
/**
 * {{ title }} block.
 *
 * @package FreshPress\{{ pascal }}
 * @subpackage {{ pascal }}
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_button_block_init() {
	$block = new \FreshpressBlocks\ButtonBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_button_block_init' );
