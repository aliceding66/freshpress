<?php
/**
 * Tests function fp_add_default_hreflang() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Add_Default_Hreflang_Test class.
 */
class FP_Add_Default_Hreflang_Test extends FP_Base_Test {

	/**
	 * Stores fp_is_noindex() return value.
	 *
	 * @var bool
	 */
	private $is_noindex;

	/**
	 * Stores fp_get_all_regions() return value.
	 *
	 * @var array
	 */
	private $all_regions;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();
		require_once $this->getThemeRootPath() . DIRECTORY_SEPARATOR . 'includes' . DIRECTORY_SEPARATOR . 'class-fp-site-options.php';

		$this->mockFunction(
			'fp_is_noindex',
			function() {
				return $this->is_noindex;
			}
		);

		$this->mockFunction(
			'fp_get_all_regions',
			function() {
				return $this->all_regions;
			}
		);
	}

	/**
	 * Checks whether function fp_add_default_hreflang() return expected values.
	 *
	 * @dataProvider returnExpectedValueDataProvider
	 *
	 * @param array $langs Input langs.
	 * @param bool  $is_noindex If is noindex page.
	 * @param array $all_regions All regions.
	 * @param array $expected_langs Expected langs.
	 * @param array $expected_missing_langs Expected missing langs.
	 */
	public function testIfReturnExpectedValue( $langs, $is_noindex, $all_regions, $expected_langs, $expected_missing_langs = [] ) {
		$this->is_noindex = $is_noindex;
		$this->all_regions = $all_regions;

		if ( empty( $expected_langs ) ) {
			$this->assertEquals( $expected_langs, fp_add_default_hreflang( $langs ) );
		} else {
			$this->assertArrayContainsArray( fp_add_default_hreflang( $langs ), $expected_langs );
		}

		if ( ! empty( $expected_missing_langs ) ) {
			$this->assertArrayNotContainsArray( fp_add_default_hreflang( $langs ), $expected_missing_langs );
		}
	}

	/**
	 * Data provider for testIfReturnExpectedValue().
	 *
	 * @return array
	 */
	public function returnExpectedValueDataProvider() {
		return [
			'empty data'                                 => [
				'langs'          => [],
				'is_noindex'     => false,
				'all_regions'    => [],
				'expected_langs' => [],
			],
			'noindex page'                               => [
				'langs'          => [
					'en-us' => 'https://www.dev.freshenv.com/',
					'en-ca' => 'https://www.dev.freshenv.com/en-ca/',
				],
				'is_noindex'     => true,
				'all_regions'    => [],
				'expected_langs' => [],
			],

			// Input langs.
			'indexed page with lang passed in'           => [
				'langs'          => [ 'en-us' => 'https://www.dev.freshenv.com' ],
				'is_noindex'     => false,
				'all_regions'    => [],
				'expected_langs' => [
					'en-us'     => 'https://www.dev.freshenv.com',
					'x-default' => 'https://www.dev.freshenv.com',
				],
			],
			'indexed page with lang with extra slash at end passed in' => [
				'langs'          => [ 'en-us' => 'https://www.dev.freshenv.com/' ],
				'is_noindex'     => false,
				'all_regions'    => [],
				'expected_langs' => [
					'en-us' => 'https://www.dev.freshenv.com',
				],
			],
			'indexed page with 2 langs passed in'        => [
				'langs'          => [
					'en-us' => 'https://www.dev.freshenv.com',
					'en-ca' => 'https://www.dev.freshenv.com/en-ca/',
				],
				'is_noindex'     => false,
				'all_regions'    => [],
				'expected_langs' => [
					'en-us' => 'https://www.dev.freshenv.com',
					'en-ca' => 'https://www.dev.freshenv.com/en-ca/',
				],
			],
			'indexed page with 2 langs passed in with wrong slashes at end' => [
				'langs'          => [
					'en-us' => 'https://www.dev.freshenv.com/',
					'en-ca' => 'https://www.dev.freshenv.com/en-ca',
				],
				'is_noindex'     => false,
				'all_regions'    => [],
				'expected_langs' => [
					'en-us' => 'https://www.dev.freshenv.com',
					'en-ca' => 'https://www.dev.freshenv.com/en-ca/',
				],
			],

			// All regions.
			'all regions passed'                         => [
				'langs'          => [],
				'is_noindex'     => false,
				'all_regions'    => [
					'en-us' => [
						'url'     => 'https://www.dev.freshenv.com/',
						'missing' => false,
					],
					'en-ca' => [
						'url'     => 'https://www.dev.freshenv.com/en-ca',
						'missing' => false,
					],
				],
				'expected_langs' => [
					'en-us' => 'https://www.dev.freshenv.com',
					'en-ca' => 'https://www.dev.freshenv.com/en-ca/',
				],
			],
			'all regions passed with missing one'        => [
				'langs'                  => [],
				'is_noindex'             => false,
				'all_regions'            => [
					'en-us' => [
						'url'     => 'https://www.dev.freshenv.com/',
						'missing' => true,
					],
					'en-ca' => [
						'url'     => 'https://www.dev.freshenv.com/en-ca',
						'missing' => false,
					],
				],
				'expected_langs'         => [
					'en-ca' => 'https://www.dev.freshenv.com/en-ca/',
				],
				'expected_missing_langs' => [
					'en-us' => 'https://www.dev.freshenv.com',
				],
			],
			'all regions passed with empty url'          => [
				'langs'                  => [],
				'is_noindex'             => false,
				'all_regions'            => [
					'en-us' => [
						'url'     => '',
						'missing' => false,
					],
					'en-ca' => [
						'url'     => 'https://www.dev.freshenv.com/en-ca',
						'missing' => false,
					],
				],
				'expected_langs'         => [
					'en-ca' => 'https://www.dev.freshenv.com/en-ca/',
				],
				'expected_missing_langs' => [
					'en-us' => '',
				],
			],

			// En-eu.
			'"en-eu" should add support for all european regions with "en-eu" code' => [
				'langs'          => [
					'en-eu' => 'https://www.dev.freshenv.com/en-eu/',
				],
				'is_noindex'     => false,
				'all_regions'    => [],
				'expected_langs' => [
					'en-at' => 'https://www.dev.freshenv.com/en-eu/',
					'en-be' => 'https://www.dev.freshenv.com/en-eu/',
					// (...) Checks for only "en-eu" and 2 first ones.
				],
			],

			// X-default.
			'x-default is en-us url first'               => [
				'langs'          => [
					'en-ca' => 'https://www.dev.freshenv.com/en-ca/',
					'en-us' => 'https://www.dev.freshenv.com',
				],
				'is_noindex'     => false,
				'all_regions'    => [],
				'expected_langs' => [
					'x-default' => 'https://www.dev.freshenv.com',
				],
			],
			'x-default is en-gb url if en-us is missing' => [
				'langs'          => [
					'en-ca' => 'https://www.dev.freshenv.com/en-ca/',
					'en-gb' => 'https://www.dev.freshenv.com/en-gb/',
				],
				'is_noindex'     => false,
				'all_regions'    => [],
				'expected_langs' => [
					'x-default' => 'https://www.dev.freshenv.com/en-gb/',
				],
			],
			'x-default is set to first available language if en-us and en-gb are missing' => [
				'langs'          => [
					'en-ca' => 'https://www.dev.freshenv.com/en-ca/',
					'fr-fr' => 'https://www.dev.freshenv.com/fr-fr/',
				],
				'is_noindex'     => false,
				'all_regions'    => [],
				'expected_langs' => [
					'x-default' => 'https://www.dev.freshenv.com/en-ca/',
				],
			],
			'x-default is unchanged when passed explicitly' => [
				'langs'          => [
					'en-us'     => 'https://www.dev.freshenv.com/',
					'x-default' => 'anything',
				],
				'is_noindex'     => false,
				'all_regions'    => [],
				'expected_langs' => [
					'x-default' => 'anything',
				],
			],
		];
	}
}
