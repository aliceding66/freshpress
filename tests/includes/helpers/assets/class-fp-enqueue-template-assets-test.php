<?php
/**
 * Tests fp_enqueue_template_assets() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Load_Drift_Snippet_Test class.
 */
class FP_Enqueue_Template_Assets_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mockFunction(
			'fp_asset_exists',
			function( $asset_name ) {
				return (
					'scripts/templates-test-page.js' === $asset_name
					|| 'styles/templates-test-page.css' === $asset_name
					|| 'scripts/templates-only-js-with-dependencies.js' === $asset_name
				);
			}
		);

		$this->mockFunction(
			'fp_get_asset',
			function( $asset_name ) {
				if ( 'scripts/templates-test-page.js' === $asset_name ) {
					return 'https://www.dev.freshbooks.com/scripts/test-page.js';
				} else if ( 'styles/templates-test-page.css' === $asset_name ) {
					return 'https://www.dev.freshbooks.com/styles/test-page.css';
				} else if ( 'scripts/templates-only-js-with-dependencies.js' === $asset_name ) {
					return 'https://www.dev.freshbooks.com/scripts/only-js-with-dependencies.js';
				} else {
					return '';
				}
			}
		);

		$this->mockAssetsManifest(
			[
				'scripts/templates-test-page.js' => 'https://www.dev.freshbooks.com/scripts/test-page.js',
				'styles/templates-test-page.css' => 'https://www.dev.freshbooks.com/styles/test-page.css',
				'scripts/templates-only-js-with-dependencies.js' => 'https://www.dev.freshbooks.com/scripts/only-js-with-dependencies.js',
			]
		);

		$this->mockScriptDependenciesManifest(
			[
				'templates-only-js-with-dependencies' => [
					'dependency-a',
					'dependency-b',
				],
			]
		);
	}

	/**
	 * Checks whether fp_enqueue_template_assets() return expected value for different cases.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string      $page_template Current page template.
	 * @param string|null $asset_name_override Asset name override to pass.
	 * @param array       $expected Expected enqueues.
	 */
	public function testIfReturnsExpectedResult( $page_template, $asset_name_override, $expected ) {
		WP_Mock::userFunction(
			'get_page_template',
			[
				'return' => $page_template,
			]
		);

		WP_Mock::userFunction(
			'wp_enqueue_script',
			[
				'args'  => [
					WP_Mock\Functions::type( 'string' ),
					! empty( $expected['script'] ) ? $expected['script']['url'] : '',
					! empty( $expected['script'] ) ? $expected['script']['dependencies'] : [],
					null,
					WP_Mock\Functions::type( 'bool' ),
				],
				'times' => ! empty( $expected['script'] ) ? 1 : 0,
			]
		);

		WP_Mock::userFunction(
			'wp_enqueue_style',
			[
				'args'  => [
					WP_Mock\Functions::type( 'string' ),
					! empty( $expected['style'] ) ? $expected['style']['url'] : '',
					WP_Mock\Functions::type( 'array' ),
					null,
				],
				'times' => ! empty( $expected['style'] ) ? 1 : 0,
			]
		);

		if ( ! empty( $asset_name_override ) ) {
			fp_enqueue_template_assets( $asset_name_override );
		} else {
			fp_enqueue_template_assets();
		}
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		$default_script_dependencies = [ 'freshpress-global' ];

		return [
			'template with existing JS and CSS assets' => [
				'page_template'       => 'test-page',
				'asset_name_override' => '',
				'expected'            => [
					'script' => [
						'url'          => 'https://www.dev.freshbooks.com/scripts/test-page.js',
						'dependencies' => $default_script_dependencies,
					],
					'style'  => [
						'url' => 'https://www.dev.freshbooks.com/styles/test-page.css',
					],
				],
			],
			'template with existing JS and CSS assets passed with matching asset_name_override' => [
				'page_template'       => 'test-page',
				'asset_name_override' => 'templates-test-page',
				'expected'            => [
					'script' => [
						'url'          => 'https://www.dev.freshbooks.com/scripts/test-page.js',
						'dependencies' => $default_script_dependencies,
					],
					'style'  => [
						'url' => 'https://www.dev.freshbooks.com/styles/test-page.css',
					],
				],
			],
			'template with existing JS and CSS assets, but asset_name_override passed to template without any assets' => [
				'page_template'       => 'test-page',
				'asset_name_override' => 'missing-template-page',
				'expected'            => [
					'script' => null,
					'style'  => null,
				],
			],
			'template with existing only JS file that has script dependencies set' => [
				'page_template'       => 'only-js-with-dependencies',
				'asset_name_override' => '',
				'expected'            => [
					'script' => [
						'url'          => 'https://www.dev.freshbooks.com/scripts/only-js-with-dependencies.js',
						'dependencies' => [ 'dependency-a', 'dependency-b' ],
					],
					'style'  => null,
				],
			],
		];
	}
}
