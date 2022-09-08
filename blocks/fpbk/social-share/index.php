<?php
/**
 * SocialShare block.
 *
 * @package FreshPress\SocialShare
 * @subpackage SocialShare
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_social_share_block_init() {
	$block = new \FreshpressBlocks\SocialShareBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_social_share_block_init' );
