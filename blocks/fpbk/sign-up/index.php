<?php
/**
 * SignUp block.
 *
 * @package FreshPress\SignUp
 * @subpackage SignUp
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_sign_up_block_init() {
	$block = new \FreshpressBlocks\SignUpBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_sign_up_block_init' );
