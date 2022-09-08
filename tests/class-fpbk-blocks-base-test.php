<?php
/**
 * Abstract Test class with WP_Mock enabled.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . '/class-fp-base-test.php';
require_once __DIR__ . '/../includes/blocks/fpbk/fpbk-helpers.php';

/**
 * WP_Base_Test that is a base for other test suites.
 */
abstract class Fpbk_Blocks_Base_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mock_dir( __DIR__ . '/../dist' );
		$this->mock_file( __DIR__ . '/../dist/_universal_asset', '<?php return array(\'dependencies\' => array(), \'version\' => \'123456\');' );

		$all_fpbk_blocks = array_map(
			function( $block_name ) {
				return $block_name . '-index';
			},
			$this->get_all_fpbk_blocks()
		);
		$all_frontend_scripts = $this->get_frontend_scripts();
		$all_scripts = array_merge( $all_fpbk_blocks, $all_frontend_scripts );

		$this->mock_file(
			__DIR__ . '/../dist/manifest.json',
			json_encode(
				array_combine(
					array_map(
						function( $block_name ) {
							return "blocks-fpbk-{$block_name}.php";
						},
						$all_scripts
					),
					array_fill( 0, count( $all_scripts ), '/themes/freshpress/dist/_universal_asset' )
				),
				JSON_UNESCAPED_SLASHES
			)
		);
	}

	/**
	 * Passthru WP function used when registering block.
	 */
	protected function passthru_fpbk_block_registration_functions() {
		WP_Mock::passthruFunction( 'wp_register_script' );
		WP_Mock::passthruFunction( 'wp_enqueue_script' );
		WP_Mock::passthruFunction( 'wp_register_style' );
		WP_Mock::passthruFunction( 'wp_enqueue_style' );
		WP_Mock::passthruFunction( 'wp_set_script_translations' );
		WP_Mock::passthruFunction( 'wp_localize_script' );
		WP_Mock::passthruFunction( 'set_transient' );
	}

	/**
	 * Helper function to properly initiate fpbk block in test suite.
	 *
	 * @param string $block_name Block name to return.
	 *
	 * @return \FreshpressBlocks\ABlock
	 */
	protected function get_fpbk_block( $block_name ) {
		$this->mockFunction(
			'fp_get_asset',
			function( $asset_path ) {
				if ( strpos( $asset_path, 'blocks-fpbk-' ) !== false ) {
					return __DIR__ . '/../dist/_universal_asset';
				} else {
					$manifest = fp_get_manifest();

					// Get asset path from manifest.
					if ( fp_asset_exists( $asset_path ) ) {
						$real_asset_path = $manifest[ $asset_path ];
					} else {
						$real_asset_path = $asset_path;
					}

					// Output correct URI based on relative or absolute path provided.
					if ( substr( $real_asset_path, 0, 1 ) !== '/' ) {
						$full_asset_path = get_stylesheet_directory_uri() . '/' . $real_asset_path;
					} else {
						$full_asset_path = site_url( $real_asset_path );
					}

					return $full_asset_path;
				}
			}
		);

		// Format block name as a class name.
		$title_case_block_name = implode(
			'',
			array_map(
				function( $word ) {
					return ucfirst( $word );
				},
				explode( '-', $block_name )
			)
		);
		$class_name = '\FreshpressBlocks\\' . $title_case_block_name . 'Block';

		// Return new blocks object.
		return new $class_name( __DIR__ . "/../blocks/fpbk/{$block_name}/" );
	}

	/**
	 * Returns all FPBK block names.
	 *
	 * @return array
	 */
	protected function get_all_fpbk_blocks() {
		return array_filter(
			scandir( __DIR__ . '/../blocks/fpbk/' ),
			function( $item ) {
				return '.' !== $item && '..' !== $item;
			}
		);
	}

	/**
	 * Returns frontend JS files.
	 *
	 * @param string $block_name Block name.
	 *
	 * @return array Frontend scripts for all blocks.
	 */
	protected function get_frontend_scripts( $block_name = '*' ) {
		$frontend_scripts = glob( __DIR__ . "/../blocks/fpbk/{$block_name}/src/frontend/*.js" );

		if ( empty( $frontend_scripts ) ) {
			return [];
		}

		foreach ( $frontend_scripts as $key => $frontend_script ) {
			preg_match( '/fpbk\/(.+)\/src\/frontend\/(.+)\.js/', $frontend_script, $matches );
			if ( ! empty( $matches[2] ) ) {
				if ( ! empty( $matches[1] ) && '*' === $block_name ) {
					$frontend_scripts[ $key ] = $matches[1] . '-' . $matches[2];
				} else {
					$frontend_scripts[ $key ] = $matches[2];
				}
			} else {
				unset( $frontend_scripts[ $key ] );
			}
		}

		return $frontend_scripts;
	}
}

