<?php
/**
 * VatTable block.
 *
 * @package FreshPress\VatTable
 * @subpackage VatTable
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_vat_table_block_init() {
	$block = new \FreshpressBlocks\VatTableBlock( __DIR__, __FILE__ );
	$block->register();
}

add_action( 'init', 'fpbk_vat_table_block_init' );
