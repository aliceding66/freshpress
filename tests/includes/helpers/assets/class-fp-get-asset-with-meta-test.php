<?php
/**
 * Tests fp_get_asset_with_meta() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Asset_With_Mea_Test class.
 */
class FP_Get_Asset_With_Meta_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
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
		$this->mock_dir( $this->getThemeRootPath() . '/dist/fp_get_asset_with_meta' );

		// 10x20 PNG image.
		$png = 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAQAAAAe52TdAAAAE0lEQVR42mNM+c+AARhHBQeTIADH/RvRFPprrgAAAABJRU5ErkJggg==';
		$this->mock_file( $this->getThemeRootPath() . '/dist/fp_get_asset_with_meta/image.png', base64_decode( $png ) );

		// 20x30 SVGs image.
		$svg_exact_size_attributes = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="30"></svg>';
		$this->mock_file( $this->getThemeRootPath() . '/dist/fp_get_asset_with_meta/image_exact.svg', $svg_exact_size_attributes );

		// 15.1x20.5 SVGs image.
		$svg_float_sizes = '<svg xmlns="http://www.w3.org/2000/svg" width="15.5" height="20.5"></svg>';
		$this->mock_file( $this->getThemeRootPath() . '/dist/fp_get_asset_with_meta/image_float.svg', $svg_float_sizes );

		// 50x20 SVGs image that has size stores in viewport only.
		$svg_size_in_viewport = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 20"></svg>';
		$this->mock_file( $this->getThemeRootPath() . '/dist/fp_get_asset_with_meta/image_viewport.svg', $svg_size_in_viewport );

		$this->mockAssetsManifest(
			[
				'image_png'          => '/dist/fp_get_asset_with_meta/image.png',
				'image_svg_exact'    => '/dist/fp_get_asset_with_meta/image_exact.svg',
				'image_svg_float'    => '/dist/fp_get_asset_with_meta/image_float.svg',
				'image_svg_viewport' => '/dist/fp_get_asset_with_meta/image_viewport.svg',
			]
		);
	}

	/**
	 * Checks whether fp_get_asset_with_meta() return expected asset with meta for different cases.
	 *
	 * @dataProvider returnsExpectedAssetWithMetaDataProvider
	 *
	 * @param string $path Asset path.
	 * @param array  $expected Expected value.
	 */
	public function testIfReturnsExpectedAssetWithMeta( $path, $expected ) {
		$this->assertEquals( $expected, fp_get_asset_with_meta( $path ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedAssetWithMeta().
	 *
	 * @return array
	 */
	public function returnsExpectedAssetWithMetaDataProvider() {
		return [
			'png with path to asset'           => [
				'path'     => 'image_png',
				'expected' => [
					'url'    => 'https://www.dev.freshenv.com/dist/fp_get_asset_with_meta/image.png',
					'width'  => 10.0,
					'height' => 20.0,
				],
			],
			'png with path as full url'        => [
				'path'     => 'https://www.dev.freshenv.com/dist/fp_get_asset_with_meta/image.png',
				'expected' => [
					'url'    => 'https://www.dev.freshenv.com/dist/fp_get_asset_with_meta/image.png',
					'width'  => 10.0,
					'height' => 20.0,
				],
			],
			'svg with size attributes'         => [
				'path'     => 'image_svg_exact',
				'expected' => [
					'url'    => 'https://www.dev.freshenv.com/dist/fp_get_asset_with_meta/image_exact.svg',
					'width'  => 20.0,
					'height' => 30.0,
				],
			],
			'svg with float attributes'        => [
				'path'     => 'image_svg_float',
				'expected' => [
					'url'    => 'https://www.dev.freshenv.com/dist/fp_get_asset_with_meta/image_float.svg',
					'width'  => 16.0, // Rounded up value.
					'height' => 21.0,  // Rounded up value.
				],
			],
			'svg with viewport attribute only' => [
				'path'     => 'image_svg_viewport',
				'expected' => [
					'url'    => 'https://www.dev.freshenv.com/dist/fp_get_asset_with_meta/image_viewport.svg',
					'width'  => 50.0,
					'height' => 20.0,
				],
			],
		];
	}
}
