<?php
/**
 * Tests fp_get_featured_image() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Featured_Image_Test class.
 */
class FP_Get_Featured_Image_Test extends FP_Base_Test {

	const CURRENT_POST_ID = 1;
	const INVALID_POST_ID = 2;
	const CURRENT_POST_FEATURED_IMAGE_ID = 3;
	const CURRENT_POST_FEATURED_IMAGE_URL = 'https://www.dev.freshenv.com/featured-image.png';
	const DEFAULT_FEATURED_IMAGE_FIELD_NAME = '_featured_image';
	const CURRENT_POST_ALTERNATIVE_FEATURED_IMAGE_FIELD_NAME = 'alternative_featured_image';
	const INVALID_ALTERNATIVE_FEATURED_IMAGE_FIELD_NAME = 'invalid_featured_image';
	const CURRENT_POST_ALTERNATIVE_FEATURED_IMAGE_URL = 'https://www.dev.freshenv.com/alternative-featured-image.png';

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::userFunction(
			'has_post_thumbnail',
			[
				'return' => function( $post_id ) {
					return self::CURRENT_POST_ID === $post_id;
				},
			]
		);

		WP_Mock::userFunction(
			'get_post_thumbnail_id',
			[
				'return' => function( $post_id ) {
					if ( self::CURRENT_POST_ID === $post_id ) {
						return self::CURRENT_POST_FEATURED_IMAGE_ID;
					} else {
						return false;
					}
				},
			]
		);

		WP_Mock::userFunction(
			'get_the_post_thumbnail_url',
			[
				'return' => function( $post_id ) {
					if ( self::CURRENT_POST_ID === $post_id ) {
						return self::CURRENT_POST_FEATURED_IMAGE_URL;
					} else {
						return false;
					}
				},
			]
		);

		WP_Mock::userFunction(
			'get_the_ID',
			[
				'return' => self::CURRENT_POST_ID,
			]
		);

		$this->mockFunction(
			'get_field',
			function( $field_name, $post_id ) {
				if ( self::CURRENT_POST_ID === $post_id ) {
					if ( self::DEFAULT_FEATURED_IMAGE_FIELD_NAME === $field_name ) {
						return self::CURRENT_POST_FEATURED_IMAGE_URL;
					} else if ( self::CURRENT_POST_ALTERNATIVE_FEATURED_IMAGE_FIELD_NAME === $field_name ) {
						return self::CURRENT_POST_ALTERNATIVE_FEATURED_IMAGE_URL;
					}
				}

				return '';
			}
		);
	}

	/**
	 * Checks whether fp_get_featured_image() return expected value for different cases.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string   $field_name Field name to fetch featured image from.
	 * @param int|null $post_id Post id to fetch featured image from.
	 * @param string   $output_type Type of output.
	 * @param string   $expected Expected image value.
	 */
	public function testIfReturnsExpectedResult( $field_name, $post_id, $output_type, $expected ) {
		$this->assertEquals( $expected, fp_get_featured_image( $field_name, $post_id, $output_type ) );
	}

	/**
	 * Checks whether fp_get_featured_image() return default values for no param passed in.
	 */
	public function testIfReturnsDefaultValues() {
		$featured_image = fp_get_featured_image();

		$this->assertEquals( self::CURRENT_POST_FEATURED_IMAGE_URL, $featured_image );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'empty data'                                   => [
				'field_name'  => '',
				'post_id'     => '',
				'output_type' => '',
				'expected'    => '',
			],

			'only post_id passed as empty string'          => [
				'field_name'  => self::DEFAULT_FEATURED_IMAGE_FIELD_NAME,
				'post_id'     => '',
				'output_type' => '',
				'expected'    => '',
			],
			'only post_id passed as null string'           => [
				'field_name'  => self::DEFAULT_FEATURED_IMAGE_FIELD_NAME,
				'post_id'     => null,
				'output_type' => '',
				'expected'    => self::CURRENT_POST_FEATURED_IMAGE_URL,
			],
			'only field and post_id passed'                => [
				'field_name'  => self::DEFAULT_FEATURED_IMAGE_FIELD_NAME,
				'post_id'     => self::CURRENT_POST_ID,
				'output_type' => '',
				'expected'    => self::CURRENT_POST_FEATURED_IMAGE_URL,
			],
			'all fields passed with default values'        => [
				'field_name'  => self::DEFAULT_FEATURED_IMAGE_FIELD_NAME,
				'post_id'     => self::CURRENT_POST_ID,
				'output_type' => 'url',
				'expected'    => self::CURRENT_POST_FEATURED_IMAGE_URL,
			],
			'output type "id"'                             => [
				'field_name'  => self::DEFAULT_FEATURED_IMAGE_FIELD_NAME,
				'post_id'     => self::CURRENT_POST_ID,
				'output_type' => 'id',
				'expected'    => self::CURRENT_POST_FEATURED_IMAGE_ID,
			],
			'invalid output type has to return URL as well' => [
				'field_name'  => self::DEFAULT_FEATURED_IMAGE_FIELD_NAME,
				'post_id'     => self::CURRENT_POST_ID,
				'output_type' => 'pdf',
				'expected'    => self::CURRENT_POST_FEATURED_IMAGE_URL,
			],
			'invalid featured image'                       => [
				'field_name'  => self::DEFAULT_FEATURED_IMAGE_FIELD_NAME,
				'post_id'     => self::INVALID_POST_ID,
				'output_type' => 'url',
				'expected'    => '',
			],
			'invalid featured image with output type "id"' => [
				'field_name'  => self::DEFAULT_FEATURED_IMAGE_FIELD_NAME,
				'post_id'     => self::INVALID_POST_ID,
				'output_type' => 'id',
				'expected'    => 0,
			],
			'valid alternative field for featured image'   => [
				'field_name'  => self::CURRENT_POST_ALTERNATIVE_FEATURED_IMAGE_FIELD_NAME,
				'post_id'     => self::CURRENT_POST_ID,
				'output_type' => 'url',
				'expected'    => self::CURRENT_POST_ALTERNATIVE_FEATURED_IMAGE_URL,
			],
			'invalid alternative field for featured image' => [
				'field_name'  => self::INVALID_ALTERNATIVE_FEATURED_IMAGE_FIELD_NAME,
				'post_id'     => self::CURRENT_POST_ID,
				'output_type' => 'url',
				'expected'    => '',
			],
			'valid alternative field with output type "id" still returns URL' => [
				'field_name'  => self::CURRENT_POST_ALTERNATIVE_FEATURED_IMAGE_FIELD_NAME,
				'post_id'     => self::CURRENT_POST_ID,
				'output_type' => 'id',
				'expected'    => self::CURRENT_POST_ALTERNATIVE_FEATURED_IMAGE_URL,
			],
		];
	}
}
