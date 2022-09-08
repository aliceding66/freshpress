<?php
/**
 * Tabbed Cards block.
 *
 * @package FreshPress\TabbedCards
 * @subpackage FeatureRow
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_tabbed_cards_block_init() {
	$block = new \FreshpressBlocks\TabbedCardsBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_tabbed_cards_block_init' );
