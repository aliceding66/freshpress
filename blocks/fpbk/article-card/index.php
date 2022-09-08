<?php
/**
 * Article Card block.
 *
 * @package FreshPress\ArticleCard
 * @subpackage ArticleCard
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_article_card_block_init() {
	$block = new \FreshpressBlocks\ArticleCardBlock( __DIR__ );
	$block->register();
}

add_action( 'init', 'fpbk_article_card_block_init' );
