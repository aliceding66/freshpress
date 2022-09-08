<?php
/**
 * ComparisonTable block.
 *
 * @package FreshPress\ComparisonTable
 * @subpackage ComparisonTable
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_comparison_table_block_init() {
	$block = new \FreshpressBlocks\ComparisonTableBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_comparison_table_block_init' );
