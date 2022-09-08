<?php
/**
 * Tests fp_authorize_ajax_call() helper functions.
 *
 * @package FreshPress\Website
 */

/* phpcs:disable WordPress.WP.GlobalVariablesOverride.Prohibited */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Authorize_Ajax_Call_Test class.
 */
class FP_Authorize_Ajax_Call_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		global $wpdb;
		$wpdb = $this->createMock( WP_Query::class );
	}

	/**
	 * Checks whether function fp_authorize_ajax_call() is properly authorizing ajax call.
	 *
	 * @dataProvider properlyAuthorizingAjaxCallDataProvider
	 *
	 * @param array  $cookies Cookies for test case.
	 * @param mixed  $user_level User level to be fetched from DB.
	 * @param string $expected If authorized.
	 */
	public function testIfProperlyAuthorizingAjaxCall( $cookies, $user_level, $expected ) {
		global $wpdb;
		$wpdb->method( 'get_var' )->willReturn( $user_level );

		$_COOKIE = $cookies;

		$this->assertEquals( $expected, fp_authorize_ajax_call() );
	}

	/**
	 * Data provider for testIfProperlyAuthorizingAjaxCall().
	 *
	 * @return array
	 */
	public function properlyAuthorizingAjaxCallDataProvider() {
		return [
			'empty data'                        => [
				'cookies'    => [],
				'user_level' => null,
				'expected'   => false,
			],
			'has cookie for user with no level' => [
				'cookies'    => [ 'wordpress_logged_in_0123456789' => 'login' ],
				'user_level' => null,
				'expected'   => false,
			],
			'has cookie for user with level 0'  => [
				'cookies'    => [ 'wordpress_logged_in_0123456789' => 'login' ],
				'user_level' => 0,
				'expected'   => false,
			],
			'has cookie for user with level greater then 0' => [
				'cookies'    => [ 'wordpress_logged_in_0123456789' => 'login' ],
				'user_level' => 1,
				'expected'   => true,
			],
		];
	}
}
