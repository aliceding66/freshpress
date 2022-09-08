<?php
/**
 * Tests fp_get_sharing_url() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Sharing_Url_Test class.
 */
class FP_Get_Sharing_Url_Test extends FP_Base_Test {

	/**
	 * Checks whether function fp_get_sharing_url() return expected value.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string       $platform Social share platform.
	 * @param string       $permalink Current page permalink.
	 * @param string       $title Current page title.
	 * @param string       $custom_url Custom url to be used in function.
	 * @param string       $custom_title Custom title to be used in function.
	 * @param string|array $expected Expected value.
	 */
	public function testIfReturnsExpectedResultWithYoastFunction( $platform, $permalink, $title, $custom_url, $custom_title, $expected ) {
		WP_Mock::userFunction(
			'get_permalink',
			[
				'times'  => empty( $custom_url ) ? 1 : 0,
				'return' => $permalink,
			]
		);
		WP_Mock::userFunction(
			'get_the_title',
			[
				'times'  => empty( $custom_title ) ? 1 : 0,
				'return' => $title,
			]
		);

		$this->assertEquals( $expected, fp_get_sharing_url( $platform, $custom_url, $custom_title ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'empty data'                                   => [
				'platform'     => '',
				'permalink'    => '',
				'title'        => '',
				'custom_url'   => '',
				'custom_title' => '',
				'expected'     => '',
			],
			'valid platform'                               => [
				'platform'     => 'facebook',
				'permalink'    => 'permalink',
				'title'        => 'Title',
				'custom_url'   => '',
				'custom_title' => '',
				'expected'     => 'https://www.facebook.com/sharer/sharer.php?u=permalink&t=Title',
			],
			'valid platform with permalink with special chars' => [
				'platform'     => 'facebook',
				'permalink'    => 'permalink&page 😊',
				'title'        => 'Title',
				'custom_url'   => '',
				'custom_title' => '',
				'expected'     => 'https://www.facebook.com/sharer/sharer.php?u=permalink%26page%20%F0%9F%98%8A&t=Title',
			],
			'valid platform with title with special chars' => [
				'platform'     => 'facebook',
				'permalink'    => 'permalink',
				'title'        => 'Title&Title 😊',
				'custom_url'   => '',
				'custom_title' => '',
				'expected'     => 'https://www.facebook.com/sharer/sharer.php?u=permalink&t=Title%26Title%20%F0%9F%98%8A',
			],
			'valid platform with custom title'             => [
				'platform'     => 'facebook',
				'permalink'    => 'permalink',
				'title'        => 'Title',
				'custom_url'   => '',
				'custom_title' => 'Custom title',
				'expected'     => 'https://www.facebook.com/sharer/sharer.php?u=permalink&t=Custom%20title',
			],
			'valid platform with custom url'               => [
				'platform'     => 'facebook',
				'permalink'    => 'permalink',
				'title'        => 'Title',
				'custom_url'   => 'custom-url',
				'custom_title' => '',
				'expected'     => 'https://www.facebook.com/sharer/sharer.php?u=custom-url&t=Title',
			],
			'valid platform with custom title and custom url' => [
				'platform'     => 'facebook',
				'permalink'    => 'permalink',
				'title'        => 'Title',
				'custom_url'   => 'custom-url',
				'custom_title' => 'Custom title',
				'expected'     => 'https://www.facebook.com/sharer/sharer.php?u=custom-url&t=Custom%20title',
			],
			'platform not lowercased'                      => [
				'platform'     => 'Facebook',
				'permalink'    => 'permalink',
				'title'        => 'Title',
				'custom_url'   => '',
				'custom_title' => '',
				'expected'     => '',
			],
			'platform that is not covered'                 => [
				'platform'     => 'instagram',
				'permalink'    => 'permalink',
				'title'        => 'Title',
				'custom_url'   => '',
				'custom_title' => '',
				'expected'     => '',
			],
		];
	}
}
