<?php
/**
 * MobileSegmentNavigation block.
 *
 * @package FreshPress\MobileSegmentNavigation
 * @subpackage MobileSegmentNavigation
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_mobile_segment_navigation_block_init() {
	$block = new \FreshpressBlocks\MobileSegmentNavigationBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_mobile_segment_navigation_block_init' );
