<?php
/**
 * Autoloader.
 *
 * @package FreshpressBlocks\Autoloader
 * @subpackage Autoloader
 */

ob_start();
include_once __DIR__ . '/../../../vendor/mustache/mustache/bin/build_bootstrap.php';
include_once __DIR__ . '/fpbk-helpers.php';
ob_end_clean();

spl_autoload_register(
	function( $class_name ) {
		if ( strpos( $class_name, 'FreshpressBlock' ) !== false ) {
			if ( strpos( $class_name, 'ABlock' ) !== false ) {
				include_once __DIR__ . '/class-ablock.php';
			} else if ( strpos( $class_name, 'ACli' ) !== false ) {
				include_once __DIR__ . '/class-acli.php';
			} else if ( strpos( $class_name, 'Migrator\Migrator' ) !== false ) {
				include_once __DIR__ . '/migrator/class-migrator.php';
			} else if ( strpos( $class_name, 'Migrator\BlockParser' ) !== false ) {
				include_once __DIR__ . '/migrator/class-blockparser.php';
			} else {
				$class_name_file = str_replace( 'FreshpressBlocks\\', '', $class_name ) . '.php';
				$class_dir_name = trim( strtolower( preg_replace( '/([A-Z])/', '-$0', substr( $class_name_file, 0, strlen( $class_name_file ) - 9 ) ) ), '-' );
				$class_name_file = mb_strtolower( $class_name_file );
				$class_path = __DIR__ . '/../../../blocks/fpbk/' . $class_dir_name . '/class-' . $class_name_file;
				if ( file_exists( $class_path ) ) {
					include_once $class_path;
				}
			}
		}
	}
);
