<?php
/**
 * Tests fp_get_asset() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Asset_Test class.
 */
class FP_Get_Asset_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mockAssetsManifest(
			[
				'scripts/global.js'  => '/manifest-path/scripts/global.js',
				'/scripts/global.js' => '/manifest-path/scripts/global.js',
			]
		);
	}

	/**
	 * Checks whether fp_get_asset() return expected asset for different cases.
	 *
	 * @dataProvider returnsExpectedAssetDataProvider
	 *
	 * @param string $path Asset path.
	 * @param string $suffix Optional suffix.
	 * @param array  $expected Expected value.
	 */
	public function testIfReturnsExpectedAsset( $path, $suffix, $expected ) {
		$this->assertEquals( $expected, fp_get_asset( $path, $suffix ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedAsset().
	 *
	 * @return array
	 */
	public function returnsExpectedAssetDataProvider() {
		return [
			'asset from manifest with relative path' => [
				'path'     => 'scripts/global.js',
				'suffix'   => '',
				'expected' => 'https://www.dev.freshenv.com/manifest-path/scripts/global.js',
			],
			'asset from manifest with direct path'   => [
				'path'     => '/scripts/global.js',
				'suffix'   => '',
				'expected' => 'https://www.dev.freshenv.com/manifest-path/scripts/global.js',
			],
			'asset from manifest with suffix'        => [
				'path'     => '/scripts/global.js',
				'suffix'   => 'suffix',
				'expected' => 'https://www.dev.freshenv.com/manifest-path/scripts/global.js#suffix',
			],
			'asset not from manifest'                => [
				'path'     => 'scripts/private.js',
				'suffix'   => '',
				'expected' => 'https://www.dev.freshenv.com/wp-content/themes/freshpress/scripts/private.js',
			],
		];
	}
}
