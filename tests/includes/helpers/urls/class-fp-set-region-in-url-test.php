<?php
/**
 * Tests fp_set_region_in_url() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Set_Region_In_Url_Test class.
 */
class FP_Set_Region_In_Url_Test extends FP_Base_Test {
	/**
	 * Setup for FP_Set_Region_In_Url_Test tests.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::userFunction(
			'fp_get_all_regions',
			[
				'return' => [
					'en-ca' => [ 'url' => 'https://freshbooks.com/en-ca/' ],
					'fr-fr' => [ 'url' => 'https://freshbooks.com/fr-fr/' ],
					'en-us' => [ 'url' => 'https://freshbooks.com/' ],
				],
			]
		);

		WP_Mock::userFunction(
			'fp_get_server_var',
			[
				'return' => function( $variable ) {
					if ( 'HTTP_HOST' === $variable ) {
						return 'freshbooks.com';
					} else {
						return '';
					}
				},
			]
		);
	}

	/**
	 * Checks whether function fp_set_region_in_url() return expected value.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string $url URL.
	 * @param string $language_code Language code.
	 * @param string $expected Expected URL.
	 */
	public function testIfReturnsExpectedResultWithYoastFunction( $url, $language_code, $expected ) {
		$this->assertEquals( $expected, fp_set_region_in_url( $url, $language_code ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'empty data'                               => [
				'url'           => '',
				'language_code' => '',
				'expected'      => '',
			],
			'invalid language code'                    => [
				'url'           => 'https://freshbooks.com',
				'language_code' => 'no-ok',
				'expected'      => 'https://freshbooks.com',
			],
			'homepage us -> us'                        => [
				'url'           => 'https://freshbooks.com',
				'language_code' => 'en-us',
				'expected'      => 'https://freshbooks.com',
			],
			'homepage us -> us (with trailing slash)'  => [
				'url'           => 'https://freshbooks.com/',
				'language_code' => 'en-us',
				'expected'      => 'https://freshbooks.com',
			],
			'homepage us -> ca'                        => [
				'url'           => 'https://freshbooks.com',
				'language_code' => 'en-ca',
				'expected'      => 'https://freshbooks.com/en-ca',
			],
			'homepage ca -> fr'                        => [
				'url'           => 'https://freshbooks.com/en-ca',
				'language_code' => 'fr-fr',
				'expected'      => 'https://freshbooks.com/fr-fr',
			],
			'homepage fr -> us'                        => [
				'url'           => 'https://freshbooks.com/fr-fr',
				'language_code' => 'en-us',
				'expected'      => 'https://freshbooks.com',
			],
			'some page us -> us'                       => [
				'url'           => 'https://freshbooks.com/page',
				'language_code' => 'en-us',
				'expected'      => 'https://freshbooks.com/page',
			],
			'some page us -> us (with trailing slash)' => [
				'url'           => 'https://freshbooks.com/page/',
				'language_code' => 'en-us',
				'expected'      => 'https://freshbooks.com/page',
			],
			'some page us -> ca'                       => [
				'url'           => 'https://freshbooks.com/page',
				'language_code' => 'en-ca',
				'expected'      => 'https://freshbooks.com/en-ca/page',
			],
			'some page ca -> fr'                       => [
				'url'           => 'https://freshbooks.com/en-ca/page',
				'language_code' => 'fr-fr',
				'expected'      => 'https://freshbooks.com/fr-fr/page',
			],
			'some page fr -> us'                       => [
				'url'           => 'https://freshbooks.com/fr-fr/page',
				'language_code' => 'en-us',
				'expected'      => 'https://freshbooks.com/page',
			],
		];
	}
}
