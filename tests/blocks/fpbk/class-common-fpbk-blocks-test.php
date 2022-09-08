<?php
/**
 * Tests that are common for all blocks/fpbk/* classes.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . '/../../class-fpbk-blocks-base-test.php';

/**
 * Common fpbk blocks tests that needs to be triggered on each block.
 */
class Common_Fpbk_Blocks_Test extends Fpbk_Blocks_Base_Test {
	/**
	 * Setup for Common_Fpbk_Blocks_Test.
	 */
	public function setUp() {
		$this->use_default_mocks['do_blocks'] = false;
		parent::setUp();
		WP_Mock::passthruFunction( 'number_format_i18n' );
		$this->mockFunction(
			'fp_init_campaign',
			function() {
				return false;
			}
		);
		Mockery::mock( '\Walker_Nav_Menu' );

		require_once __DIR__ . '/../../../includes/class-fp-site-options.php';
	}

	/**
	 * Checks whether all required steps are done when registering block.
	 */
	public function testBlockRegistersCorrectly() {
		foreach ( $this->get_all_fpbk_blocks() as $block_name ) {
			// Checks whether all required assets were registered.
			$this->assert_js_file( $block_name, 'index' );

			if ( $this->block_has_file( $block_name, 'src/style.scss' ) ) {
				$this->assert_css_file( $block_name, 'index' );
			} else {
				$this->assert_not_css_file( $block_name, 'index' );
			}

			if ( $this->block_has_file( $block_name, 'src/editor.scss' ) ) {
				$this->assert_css_file( $block_name, 'editor' );
			} else {
				$this->assert_not_css_file( $block_name, 'editor' );
			}

			WP_Mock::userFunction(
				'wp_localize_script',
				[
					'args'  => [
						"blocks-fpbk-{$block_name}-index.js",
						\WP_Mock\Functions::type( 'string' ),
						\WP_Mock\Functions::type( 'array' ),
					],
					'times' => '1-',
				]
			);

			foreach ( $this->get_frontend_scripts( $block_name ) as $frontend_script ) {
				$this->assert_js_file( $block_name, $frontend_script );
			}

			// Checks whether block gets registered using WP core function.
			WP_Mock::userFunction(
				'register_block_type',
				[
					'args'  => [
						"fpbk/{$block_name}",
						\WP_Mock\Functions::type( 'array' ),
					],
					'times' => 1,
				]
			);

			// Triggers tests.
			$block = $this->get_fpbk_block( $block_name );
			$block->register();
		}
	}

	/**
	 * Creates proper assertions for JS file.
	 *
	 * @param string $block_name Block name.
	 * @param string $type File type.
	 */
	private function assert_js_file( $block_name, $type ) {
		WP_Mock::userFunction(
			'wp_register_script',
			[
				'args'  => [
					"blocks-fpbk-{$block_name}-{$type}.js",
					"https://www.dev.freshenv.com/themes/freshpress/dist/scripts/blocks-fpbk-{$block_name}-{$type}.js",
					\WP_Mock\Functions::type( 'array' ),
					\WP_Mock\Functions::type( 'string' ),
				],
				'times' => 1,
			]
		);
		WP_Mock::userFunction(
			'wp_set_script_translations',
			[
				'args'  => [
					"blocks-fpbk-{$block_name}-{$type}.js",
					$block_name,
				],
				'times' => 1,
			]
		);
	}

	/**
	 * Creates proper assertions for CSS file.
	 *
	 * @param string $block_name Block name.
	 * @param string $type File type.
	 */
	private function assert_css_file( $block_name, $type ) {
		WP_Mock::userFunction(
			'wp_register_style',
			[
				'args'  => [
					"blocks-fpbk-{$block_name}-{$type}.css",
					"https://www.dev.freshenv.com/themes/freshpress/dist/styles/blocks-fpbk-{$block_name}-{$type}.css",
					\WP_Mock\Functions::type( 'array' ),
					\WP_Mock\Functions::type( 'string' ),
				],
				'times' => 1,
			]
		);
	}

	/**
	 * Creates proper assertions for not included CSS file.
	 *
	 * @param string $block_name Block name.
	 * @param string $type File type.
	 */
	private function assert_not_css_file( $block_name, $type ) {
		WP_Mock::userFunction(
			'wp_register_style',
			[
				'args'  => [
					"blocks-fpbk-{$block_name}-{$type}.css",
					"https://www.dev.freshenv.com/themes/freshpress/dist/styles/blocks-fpbk-{$block_name}-{$type}.css",
					\WP_Mock\Functions::type( 'array' ),
					\WP_Mock\Functions::type( 'string' ),
				],
				'times' => 0,
			]
		);
	}

	/**
	 * Checks whether block contains proper file.
	 *
	 * @param string $block_name Block name.
	 * @param string $file_path File path.
	 *
	 * @return bool
	 */
	private function block_has_file( $block_name, $file_path ) {
		return file_exists( __DIR__ . '/../../../blocks/fpbk/' . $block_name . '/' . $file_path );
	}
}
