<?php
/**
 * VatSteps block.
 *
 * @package FreshPress\VatSteps
 * @subpackage VatSteps
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_vat_steps_block_init() {
	$block = new \FreshpressBlocks\VatStepsBlock( __DIR__, __FILE__ );
	$block->register();
}

add_action( 'init', 'fpbk_vat_steps_block_init' );
