<?php
/**
 * CountdownTimer block.
 *
 * @package FreshPress\CountdownTimer
 * @subpackage CountdownTimer
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_countdown_timer_block_init() {
	$block = new \FreshpressBlocks\CountdownTimerBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_countdown_timer_block_init' );
