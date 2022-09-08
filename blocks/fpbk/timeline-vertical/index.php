<?php
/**
 * TimelineVertical block.
 *
 * @package FreshPress\TimelineVertical
 * @subpackage TimelineVertical
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_timeline_vertical_block_init() {
	$block = new \FreshpressBlocks\TimelineVerticalBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_timeline_vertical_block_init' );
