<?php
/**
 * Hero block.
 *
 * @package FreshPress\Hero
 * @subpackage Hero
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_hero_block_init() {
	$block = new \FreshpressBlocks\HeroBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_hero_block_init' );
