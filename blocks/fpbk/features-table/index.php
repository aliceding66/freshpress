<?php
/**
 * FeaturesTable block.
 *
 * @package FreshPress\FeaturesTable
 * @subpackage FeaturesTable
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_features_table_block_init() {
	$block = new \FreshpressBlocks\FeaturesTableBlock( __DIR__, __FILE__ );
	$block->register();
}

add_action( 'init', 'fpbk_features_table_block_init' );
