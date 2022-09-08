<?php
/**
 * TeamMembers block.
 *
 * @package FreshPress\TeamMembers
 * @subpackage TeamMembers
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_team_members_block_init() {
	$block = new \FreshpressBlocks\TeamMembersBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_team_members_block_init' );
