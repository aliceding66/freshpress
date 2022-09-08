<?php
/**
 * Tests fp_add_smart_banner_ios() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Add_Smart_Banner_Ios_Test class.
 */
class FP_Add_Smart_Banner_Ios_Test extends FP_Base_Test {

	/**
	 * Stores page used in is_page() function.
	 *
	 * @var string
	 */
	private $page;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::userFunction(
			'is_page',
			[
				'return' => function( $page_to_check ) {
					return ltrim( $page_to_check, '/' ) === $this->page;
				},
			]
		);
	}

	/**
	 * Checks whether functions fp_add_smart_banner_ios() is properly adding banner.
	 * A fp_add_smart_banner_android() has same logic, but it cannot be tested as it is based on "require_once".
	 *
	 * @dataProvider properlyAddingBannersDataProvider
	 *
	 * @param string $page Cookies for test case.
	 * @param string $expected If to expect banners to be added.
	 */
	public function testIfProperlyAddingBanners( $page, $expected ) {
		$this->page = $page;

		ob_start();
		fp_add_smart_banner_ios();
		$ios_banner = ob_get_clean();

		if ( $expected ) {
			$this->assertNotEmpty( $ios_banner );
		} else {
			$this->assertEmpty( $ios_banner );
		}
	}

	/**
	 * Data provider for testIfProperlyAddingBanners().
	 *
	 * @return array
	 */
	public function properlyAddingBannersDataProvider() {
		return [
			'home page'                        => [
				'page'     => '',
				'expected' => true,
			],
			'not a signup page'                => [
				'page'     => 'just-any-page',
				'expected' => true,
			],
			'page /signup should be excluded'  => [
				'page'     => 'signup',
				'expected' => false,
			],
			'page /signup2 should be excluded' => [
				'page'     => 'signup2',
				'expected' => false,
			],
			'page that only starts with "/signup" but do not match explicit excluded pages should not be excluded' => [
				'page'     => 'signup-to-our-accounting',
				'expected' => true,
			],
		];
	}
}
