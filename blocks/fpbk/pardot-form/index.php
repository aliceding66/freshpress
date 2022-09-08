<?php
/**
 * Pardot Form block.
 *
 * @package FreshPress\PardotForm
 * @subpackage PardotForm
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_pardot_form_block_init() {
	$block = new \FreshpressBlocks\PardotFormBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_pardot_form_block_init' );
