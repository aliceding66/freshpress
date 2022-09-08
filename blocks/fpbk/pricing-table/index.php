<?php
/**
 * PricingTable block.
 *
 * @package FreshPress\PricingTable
 * @subpackage PricingTable
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_pricing_table_block_init() {
	$block = new \FreshpressBlocks\PricingTableBlock( __DIR__, __FILE__ );

	$block->register();
}

add_action( 'init', 'fpbk_pricing_table_block_init' );
