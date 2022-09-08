<?php
/**
 * InfoTooltip block.
 *
 * @package FreshPress\InfoTooltip
 * @subpackage InfoTooltip
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_info_tooltip_block_init() {
	$block = new \FreshpressBlocks\InfoTooltipBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_info_tooltip_block_init' );
