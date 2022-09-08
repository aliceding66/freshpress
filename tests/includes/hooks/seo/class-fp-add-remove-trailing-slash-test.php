<?php
/**
 * Tests function fp_add_remove_trailing_slash() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Add_Remove_Trailing_Slash_Test class.
 */
class FP_Add_Remove_Trailing_Slash_Test extends FP_Base_Test {

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
	 * Checks whether function fp_add_remove_trailing_slash() return expected value.
	 *
	 * @dataProvider returnsExpectedValuesDataProvider
	 *
	 * @param bool        $is_admin If is admin page.
	 * @param bool        $is_404 If is 404 page.
	 * @param string      $url Input url.
	 * @param string|bool $region Input region.
	 * @param bool        $expected Expected values.
	 */
	public function testIfReturnsExpectedValues( $is_admin, $is_404, $url, $region, $expected ) {
		$this->is_admin = $is_admin;
		$this->is_404 = $is_404;

		$this->assertEquals( $expected, fp_add_remove_trailing_slash( $url, $region ) );
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
				'region'   => '',
				'expected' => '',
			],
			'url without slash at end'                => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://www.dev.freshenv.com',
				'region'   => '',
				'expected' => 'https://www.dev.freshenv.com',
			],
			'url with slash at end'                   => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://www.dev.freshenv.com/',
				'region'   => '',
				'expected' => 'https://www.dev.freshenv.com',
			],
			'url and region'                          => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://www.dev.freshenv.com/',
				'region'   => 'en-us',
				'expected' => 'https://www.dev.freshenv.com',
			],
			'url and region with region in URL'       => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://www.dev.freshenv.com/en-us',
				'region'   => 'en-us',
				'expected' => 'https://www.dev.freshenv.com/en-us/',
			],
			'url and region with slashes with region in URL' => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://www.dev.freshenv.com/en-us',
				'region'   => '/en-us/',
				'expected' => 'https://www.dev.freshenv.com/en-us',
			],
			'url with some path without slash at end' => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://www.dev.freshenv.com/page',
				'region'   => '',
				'expected' => 'https://www.dev.freshenv.com/page',
			],
			'url with some path with slash at end'    => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://www.dev.freshenv.com/page/',
				'region'   => '',
				'expected' => 'https://www.dev.freshenv.com/page',
			],
			'url with some path with slash and region at end' => [
				'is_admin' => false,
				'is_404'   => false,
				'url'      => 'https://www.dev.freshenv.com/en-us/page/',
				'region'   => 'en-us',
				'expected' => 'https://www.dev.freshenv.com/en-us/page',
			],
			'url with slash at and at admin page'     => [
				'is_admin' => true,
				'is_404'   => false,
				'url'      => 'https://www.dev.freshenv.com/',
				'region'   => '',
				'expected' => 'https://www.dev.freshenv.com/',
			],
			'url with slash at and at 404 page'       => [
				'is_admin' => false,
				'is_404'   => true,
				'url'      => 'https://www.dev.freshenv.com/',
				'region'   => '',
				'expected' => 'https://www.dev.freshenv.com/',
			],
		];
	}
}
