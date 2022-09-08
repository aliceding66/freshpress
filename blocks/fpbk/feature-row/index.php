<?php
/**
 * Feature Row block.
 *
 * @package FreshPress\FeatureRow
 * @subpackage FeatureRow
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_feature_row_block_init() {
	$block = new \FreshpressBlocks\FeatureRowBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_feature_row_block_init' );
