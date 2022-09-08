<?php
/**
 * CompetitorTable block.
 *
 * @package FreshPress\CompetitorTable
 * @subpackage CompetitorTable
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_competitor_table_block_init() {
	$block = new \FreshpressBlocks\CompetitorTableBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_competitor_table_block_init' );
