<?php
/**
 * BusinessLoanCalculator block.
 *
 * @package FreshPress\BusinessLoanCalculator
 * @subpackage BusinessLoanCalculator
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_markup_calculator_block_init() {
	$block = new \FreshpressBlocks\MarkupCalculatorBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_markup_calculator_block_init' );
