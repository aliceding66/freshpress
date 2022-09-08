<?php
/**
 * Tests function fp_regional_root_redirects() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Regional_Root_Redirects_Test class.
 */
class FP_Regional_Root_Redirects_Test extends FP_Base_Test {

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
	 * Stores server variable REQUEST_URI.
	 *
	 * @var string
	 */
	private $request_uri;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		$this->use_default_mocks['is_admin'] = false;
		$this->use_default_mocks['is_404'] = false;

		parent::setUp();

		$this->mockFunction(
			'fp_get_server_var',
			function( $var ) {
				if ( 'REQUEST_URI' === $var ) {
					return $this->request_uri;
				} else {
					return '';
				}
			}
		);

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
	 * Checks whether function fp_regional_root_redirects() made expected redirect.
	 *
	 * @dataProvider madeExpectedRedirectDataProvider
	 *
	 * @param bool        $is_admin If is admin page.
	 * @param bool        $is_404 If is 404 page.
	 * @param string      $request_uri REQUEST_URI server variable mock.
	 * @param bool|string $expected_redirect Expected redirect.
	 */
	public function testIfMadeExpectedRedirect( $is_admin, $is_404, $request_uri, $expected_redirect ) {
		$this->is_admin = $is_admin;
		$this->is_404 = $is_404;
		$this->request_uri = $request_uri;

		$redirect_was_made = false;
		$php_was_terminated = false;

		WP_Mock::userFunction(
			'wp_safe_redirect',
			[
				'return' => function( $redirect ) use ( $expected_redirect, &$redirect_was_made ) {
					$redirect_was_made = $redirect === $expected_redirect;

					return $redirect_was_made;
				},
			]
		);

		$this->mockFunction(
			'fp_die',
			function() use ( $redirect_was_made, &$php_was_terminated ) {
				$php_was_terminated = true;
			}
		);

		fp_regional_root_redirects();

		if ( false === $expected_redirect ) {
			$this->assertFalse( $redirect_was_made );
			$this->assertFalse( $php_was_terminated );
		} else {
			$this->assertTrue( $redirect_was_made );
			$this->assertTrue( $php_was_terminated );
		}
	}

	/**
	 * Data provider for testIfMadeExpectedRedirect().
	 *
	 * @return array
	 */
	public function madeExpectedRedirectDataProvider() {
		return [
			'homepage'           => [
				'is_admin'          => false,
				'is_404'            => false,
				'request_uri'       => '',
				'expected_redirect' => false,
			],
			'some page'          => [
				'is_admin'          => false,
				'is_404'            => false,
				'request_uri'       => 'page',
				'expected_redirect' => false,
			],
			'homepage at region' => [
				'is_admin'          => false,
				'is_404'            => false,
				'request_uri'       => '/en-us',
				'expected_redirect' => '/en-us/',
			],
			'homepage at different region different then current' => [
				'is_admin'          => false,
				'is_404'            => false,
				'request_uri'       => '/en-ca',
				'expected_redirect' => false,
			],
		];
	}
}
