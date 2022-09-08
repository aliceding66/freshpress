<?php
/**
 * Tests fp_inline_asset() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Inline_Asset_Test class.
 */
class FP_Inline_Asset_Test extends FP_Base_Test {

	/**
	 * Test css asset content.
	 *
	 * @var string
	 */
	private $css_asset_content = '<style>.test-class { background-color: #123456; }</style>';

	/**
	 * Setup conditions for each test.
	 */
	public function setUp() {
		$this->use_default_mocks['wp_parse_url'] = false;

		parent::setUp();

		WP_Mock::userFunction(
			'wp_parse_url',
			[
				'args'   => [ \WP_Mock\Functions::type( 'string' ), PHP_URL_PATH ],
				'return' => function( $url, $flags = - 1 ) {
					return $this->getThemeRootPath() . parse_url( $url, $flags );
				},
			]
		);

		$this->mock_dir( $this->getThemeRootPath() . '/dist' );
		$this->mock_dir( $this->getThemeRootPath() . '/dist/fp_inline_asset' );

		$this->mock_file( $this->getThemeRootPath() . '/dist/fp_inline_asset/test.css', $this->css_asset_content );

		$this->mockAssetsManifest(
			[
				'fp_inline_asset-test' => $this->getThemeRootPath() . '/dist/fp_inline_asset/test.css',
			]
		);
	}

	/**
	 * Checks whether fp_inline_asset() return expected asset for different cases.
	 *
	 * @dataProvider returnsExpectedAssetDataProvider
	 *
	 * @param string $path Asset path.
	 * @param array  $expected Expected value.
	 */
	public function testIfReturnsExpectedAsset( $path, $expected ) {
		$this->assertEquals( $expected, fp_inline_asset( $path ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedAsset().
	 *
	 * @return array
	 */
	public function returnsExpectedAssetDataProvider() {
		return [
			'inline correct asset'   => [
				'path'     => 'fp_inline_asset-test',
				'expected' => $this->css_asset_content,
			],
			'inline incorrect asset' => [
				'path'     => 'incorrect-asset',
				'expected' => '',
			],
		];
	}
}
