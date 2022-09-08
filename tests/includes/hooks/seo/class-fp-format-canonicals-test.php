<?php
/**
 * Tests function fp_format_canonicals() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Format_Canonicals_Test class.
 */
class FP_Format_Canonicals_Test extends FP_Base_Test {

	/**
	 * Stores is_admin() return value.
	 *
	 * @var bool
	 */
	private $is_admin;

	/**
	 * Stores is_400() return value.
	 *
	 * @var bool
	 */
	private $is_404;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		$this->use_default_mocks['is_admin'] = false;
		$this->use_default_mocks['is_404'] = false;

		parent::setUp();

		WP_Mock::userFunction(
			'is_admin',
			[
				'return' => function() {
					return $this->is_admin;
				},
			]
		);

		WP_Mock::userFunction(
			'is_404',
			[
				'return' => function() {
					return $this->is_404;
				},
			]
		);
	}

	/**
	 * Checks whether function fp_format_canonicals() return expected value.
	 *
	 * @dataProvider returnsExpectedValuesDataProvider
	 *
	 * @param bool   $is_admin If is admin page.
	 * @param bool   $is_404 If is 404 page.
	 * @param string $url Input url.
	 * @param bool   $expected Expected values.
	 */
	public function testIfReturnsExpectedValues( $is_admin, $is_404, $url, $expected ) {
		$this->is_admin = $is_admin;
		$this->is_404 = $is_404;

		$this->assertEquals( $expected, fp_format_canonicals( $url ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedValues().
	 *
	 * @return array
	 */
	public function returnsExpectedValuesDataProvider() {
		return [
			'empty data'                              => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => '',
				'expected' => '',
			],
			'not production domain with slash at end' => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://dev.freshenv.com/',
				'expected' => 'https://dev.freshenv.com',
			],
			'production domain with "www."'           => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://www.freshbooks.com',
				'expected' => 'https://www.freshbooks.com',
			],
			'production domain without "www."'        => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://freshbooks.com',
				'expected' => 'https://www.freshbooks.com',
			],
			'production domain without "www." and path with slash at end' => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://freshbooks.com/page/',
				'expected' => 'https://www.freshbooks.com/page',
			],
		];
	}
}
