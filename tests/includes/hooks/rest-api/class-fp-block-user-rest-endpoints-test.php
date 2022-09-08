<?php
/**
 * Tests fp_block_user_rest_endpoints() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Block_User_Rest_Endpoints_Test class.
 */
class FP_Block_User_Rest_Endpoints_Test extends FP_Base_Test {

	const USER_ENDPOINTS = [
		'/wp/v2/users'               => '/wp/v2/users',
		'/wp/v2/users/(?P<id>[\d]+)' => '/wp/v2/users/(?P<id>[\d]+)',
	];

	/**
	 * Stores is_admin() result.
	 *
	 * @var bool
	 */
	private $is_admin;

	/**
	 * Stores is_user_logged_in() result.
	 *
	 * @var bool
	 */
	private $is_user_logged_in;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		$this->use_default_mocks['is_admin'] = false;

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
			'is_user_logged_in',
			[
				'return' => function() {
					return $this->is_user_logged_in;
				},
			]
		);
	}

	/**
	 * Checks whether function fp_block_user_rest_endpoints() is removing user endpoints.
	 *
	 * @dataProvider removingUserEndpointsDataProvider
	 *
	 * @param array $endpoints Input endpoints.
	 * @param bool  $is_admin If is admin.
	 * @param bool  $is_user_logged_in If is logged in.
	 * @param array $expected_endpoints Expected endpoints.
	 */
	public function testIfRemovingUserEndpoints( $endpoints, $is_admin, $is_user_logged_in, $expected_endpoints ) {
		$this->is_admin = $is_admin;
		$this->is_user_logged_in = $is_user_logged_in;

		$this->assertEquals( $expected_endpoints, fp_block_user_rest_endpoints( $endpoints ) );
	}

	/**
	 * Data provider for testIfRemovingUserEndpoints().
	 *
	 * @return array
	 */
	public function removingUserEndpointsDataProvider() {
		return [
			'not admin page nor logged in' => [
				'endpoints'          => self::USER_ENDPOINTS,
				'is_admin'           => false,
				'is_user_logged_in'  => false,
				'expected_endpoints' => [],
			],
			'admin page but not logged in (case rather fictional)' => [
				'endpoints'          => self::USER_ENDPOINTS,
				'is_admin'           => true,
				'is_user_logged_in'  => false,
				'expected_endpoints' => self::USER_ENDPOINTS,
			],
			'not admin page but logged in' => [
				'endpoints'          => self::USER_ENDPOINTS,
				'is_admin'           => false,
				'is_user_logged_in'  => true,
				'expected_endpoints' => self::USER_ENDPOINTS,
			],
			'admin page and logged in'     => [
				'endpoints'          => self::USER_ENDPOINTS,
				'is_admin'           => true,
				'is_user_logged_in'  => true,
				'expected_endpoints' => self::USER_ENDPOINTS,
			],
			'removing user endpoints is not removing other endpoints' => [
				'endpoints'          => array_merge(
					self::USER_ENDPOINTS,
					[
						'other'             => 'other',
						'/wp/v2/users/role' => '/wp/v2/users/role',
					]
				),
				'is_admin'           => false,
				'is_user_logged_in'  => false,
				'expected_endpoints' => [
					'other'             => 'other',
					'/wp/v2/users/role' => '/wp/v2/users/role',
				],
			],
		];
	}
}
