<?php
/**
 * FreshpressBlocks.
 *
 * @package FreshpressBlocks
 */

use FreshpressBlocks\Migrator\Migrator;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require __DIR__ . '/autoloader.php';

foreach ( glob( __DIR__ . '/../../../blocks/fpbk/*/index.php' ) as $fpbk_block_entry ) {
	require_once $fpbk_block_entry;
}

Migrator::add_cli_command();
