<?php
/**
 * FeatureGrid block.
 *
 * @package FreshPress\FeatureGrid
 * @subpackage FeatureGrid
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_feature_grid_block_init() {
	$block = new \FreshpressBlocks\FeatureGridBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_feature_grid_block_init' );
