<?php
/**
 * Tests fp_fix_rest_url() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Fix_Rest_Url_Test class.
 */
class FP_Fix_Rest_Url_Test extends FP_Base_Test {

	/**
	 * Checks whether function fp_fix_rest_url() is properly fixing REST url.
	 *
	 * @dataProvider removingUserEndpointsDataProvider
	 *
	 * @param string $url Input url.
	 * @param string $expected Expected url.
	 */
	public function testIfProperlyFixingRestUrl( $url, $expected ) {
		$this->assertEquals( $expected, fp_fix_rest_url( $url ) );
	}

	/**
	 * Data provider for testIfRemovingUserEndpoints().
	 *
	 * @return array
	 */
	public function removingUserEndpointsDataProvider() {
		return [
			'empty data'                           => [
				'url'      => '',
				'expected' => '/',
			],
			'slash only'                           => [
				'url'      => '/',
				'expected' => '/',
			],
			'double slash'                         => [
				'url'      => '//',
				'expected' => '/',
			],
			'valid full url'                       => [
				'url'      => 'https://www.dev.fresh.env.com/',
				'expected' => 'https://www.dev.fresh.env.com/',
			],
			'full url without trailing slash'      => [
				'url'      => 'https://www.dev.fresh.env.com',
				'expected' => 'https://www.dev.fresh.env.com/',
			],
			'full url with doubled trailing slash' => [
				'url'      => 'https://www.dev.fresh.env.com//',
				'expected' => 'https://www.dev.fresh.env.com/',
			],
		];
	}
}
