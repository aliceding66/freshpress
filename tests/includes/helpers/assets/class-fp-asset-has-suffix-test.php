<?php
/**
 * Tests fp_asset_has_suffix() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Asset_Has_Suffix_Test class.
 */
class FP_Asset_Has_Suffix_Test extends FP_Base_Test {

	/**
	 * Checks whether fp_asset_has_suffix() return expected value for different cases.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string $asset Current page template.
	 * @param string $suffix Asset name override to pass.
	 * @param string $expected Expected enqueues.
	 */
	public function testIfReturnsExpectedResult( $asset, $suffix, $expected ) {
		$this->assertEquals( $expected, fp_asset_has_suffix( $asset, $suffix ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'correct asset with suffix'            => [
				'asset'    => 'asset.js#OK',
				'suffix'   => 'OK',
				'expected' => true,
			],
			'asset with invalid suffix joint'      => [
				'asset'    => 'asset.js?OK',
				'suffix'   => 'OK',
				'expected' => false,
			],
			'asset with suffix at the beginning'   => [
				'asset'    => 'OK#asset.js',
				'suffix'   => 'OK',
				'expected' => false,
			],
			'asset with suffix at the beginning 2' => [
				'asset'    => '#OKasset.js',
				'suffix'   => 'OK',
				'expected' => false,
			],
			'asset with suffix in the middle'      => [
				'asset'    => 'asset.js#OK?v=1.2.3',
				'suffix'   => 'OK',
				'expected' => false,
			],
		];
	}
}
