<?php
/**
 * FileDownload block.
 *
 * @package FreshPress\FileDownload
 * @subpackage FileDownload
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_file_download_block_init() {
	$block = new \FreshpressBlocks\FileDownloadBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_file_download_block_init' );
