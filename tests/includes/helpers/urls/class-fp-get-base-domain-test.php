<?php
/**
 * Tests fp_get_base_domain() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Base_Domain_Test class.
 */
class FP_Get_Base_Domain_Test extends FP_Base_Test {

	/**
	 * Checks whether function fp_get_base_domain() return expected value.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string $url Input url.
	 * @param string $expected Expected value.
	 */
	public function testIfReturnsExpectedResult( $url, $expected ) {
		$this->assertEquals( $expected, fp_get_base_domain( $url ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'empty data'                      => [
				'url'      => '',
				'expected' => '',
			],
			'invalid url'                     => [
				'url'      => 'just-some-string',
				'expected' => 'just-some-string',
			],
			'invalid url - missing ".com"'    => [
				'url'      => 'freshbooks',
				'expected' => 'freshbooks',
			],
			'url with just base domain'       => [
				'url'      => 'freshbooks.com',
				'expected' => 'freshbooks.com',
			],
			'url with subdomain'              => [
				'url'      => 'subdomain.freshbooks.com',
				'expected' => 'freshbooks.com',
			],
			'url with "www."'                 => [
				'url'      => 'www.freshbooks.com',
				'expected' => 'freshbooks.com',
			],
			'url with "www." and subdomain'   => [
				'url'      => 'www.subomain.freshbooks.com',
				'expected' => 'freshbooks.com',
			],
			'url with scheme'                 => [
				'url'      => 'https://freshbooks.com',
				'expected' => 'freshbooks.com',
			],
			'url with subpages'               => [
				'url'      => 'https://freshbooks.com/subpage',
				'expected' => 'freshbooks.com',
			],
			'url with subdomain and subpages' => [
				'url'      => 'https://subdomain.freshbooks.com/subpage',
				'expected' => 'freshbooks.com',
			],
			'url with subdomain and subpages and query parameters' => [
				'url'      => 'https://subdomain.freshbooks.com/subpage?param=value',
				'expected' => 'freshbooks.com',
			],
		];
	}
}
