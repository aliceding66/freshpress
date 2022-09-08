<?php
/**
 * FreshbooksCareers block.
 *
 * @package FreshPress\FreshbooksCareers
 * @subpackage FreshbooksCareers
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_freshbooks_careers_block_init() {
	$block = new \FreshpressBlocks\FreshbooksCareersBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_freshbooks_careers_block_init' );
