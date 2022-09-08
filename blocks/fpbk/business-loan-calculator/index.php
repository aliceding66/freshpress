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
function fpbk_business_loan_calculator_block_init() {
	$block = new \FreshpressBlocks\BusinessLoanCalculatorBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_business_loan_calculator_block_init' );
