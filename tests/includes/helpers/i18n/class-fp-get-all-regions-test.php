<?php
/**
 * Tests fp_get_all_regions() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_All_Regions_Test class.
 */
class FP_Get_All_Regions_Test extends FP_Base_Test {

	/**
	 * Current language.
	 *
	 * @var string
	 */
	private $current_language = 'en-US';

	/**
	 * Custom language translation field from ACF.
	 *
	 * @var array
	 */
	private $custom_language_translation = [];

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::userFunction(
			'get_the_ID',
			[
				'return' => 1,
			]
		);

		$this->mockFunction(
			'wpml_get_active_languages_filter',
			function() {
				return [
					'en-ca' => [
						'code'             => 'en-ca',
						'id'               => '71',
						'native_name'      => 'Canada (English)',
						'major'            => '1',
						'active'           => 0,
						'default_locale'   => 'en_CA',
						'encode_url'       => '0',
						'tag'              => 'en-CA',
						'translated_name'  => 'Canada (English)',
						'url'              => 'https://www.dev.freshenv.com/en-ca',
						'country_flag_url' => 'https://www.dev.freshenv.com/wp-content/uploads/flags/ca.svg',
						'language_code'    => 'en-ca',
					],
					'en-us' => [
						'code'             => 'en-us',
						'id'               => '65',
						'native_name'      => 'United States (English)',
						'major'            => '1',
						'active'           => '1',
						'default_locale'   => 'en_US',
						'encode_url'       => '0',
						'tag'              => 'en-US',
						'translated_name'  => 'United States (English)',
						'url'              => 'https://www.dev.freshenv.com',
						'country_flag_url' => 'https://www.dev.freshenv.com/wp-content/uploads/flags/us.svg',
						'language_code'    => 'en-us',
					],
				];
			}
		);

		$this->mockFunction(
			'fp_get_current_language',
			function() {
				return $this->current_language;
			}
		);

		$this->mockFunction(
			'get_field',
			function( $field_name ) {
				if ( 'custom_language_translation' === $field_name ) {
					return $this->custom_language_translation;
				} else {
					return null;
				}
			}
		);
	}

	/**
	 * Checks whether fp_get_all_regions() return properly formatted default values.
	 */
	public function testIfDefaultReturnFormattedValue() {
		$all_regions = fp_get_all_regions();

		$this->assertArrayHasKey( 'ca', $all_regions );
		$this->assertArrayHasKey( 'us', $all_regions );
		$this->assertArrayHasKey( 'en', $all_regions['ca'] );
		$this->assertArrayHasKey( 'en', $all_regions['us'] );
		$this->assertIsArray( $all_regions['ca']['en'] );
		$this->assertIsArray( $all_regions['us']['en'] );
	}

	/**
	 * Checks whether fp_get_all_regions() return properly formatted wpml_format value.
	 */
	public function testIfWPMLFormatReturnOriginalValue() {
		$all_regions = fp_get_all_regions( [ 'wpml_format' => true ] );

		$this->assertArrayHasKey( 'en-ca', $all_regions );
		$this->assertArrayHasKey( 'en-us', $all_regions );
		$this->assertIsArray( $all_regions['en-ca'] );
		$this->assertIsArray( $all_regions['en-us'] );
	}

	/**
	 * Checks whether fp_get_all_regions() properly handles custom translation ACF field.
	 *
	 * @dataProvider customTranslationSetsProperURLDataProvider
	 *
	 * @param array $custom_language_translation Passed custom translation data.
	 */
	public function testIfCustomTranslationSetsProperURL( $custom_language_translation ) {
		$this->custom_language_translation = [ $custom_language_translation ];
		$all_regions = fp_get_all_regions();

		// Unchanged.
		$this->assertEquals( 'https://www.dev.freshenv.com/en-ca/', $all_regions['ca']['en']['url'] );
		// Changed.
		$this->assertEquals( 'https://www.dev.freshenv.com/custom-translation-path', $all_regions['us']['en']['url'] );
	}

	/**
	 * Data provider for testIfCustomTranslationSetsProperURL().
	 *
	 * @return array
	 */
	public function customTranslationSetsProperURLDataProvider() {
		return [
			'only path' => [
				'custom_language_translation' => [
					'custom_language_translation_region' => 'en-us',
					'custom_language_translation_path'   => '/custom-translation-path',
				],
			],
			'full url'  => [
				'custom_language_translation' => [
					'custom_language_translation_region' => 'en-us',
					'custom_language_translation_path'   => 'https://www.dev.freshenv.com/custom-translation-path',
				],
			],
		];
	}
}
