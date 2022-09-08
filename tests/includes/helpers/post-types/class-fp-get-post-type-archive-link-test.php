<?php
/**
 * Tests fp_get_post_type_archive_link() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Post_Type_Archive_Link_Test class.
 */
class FP_Get_Post_Type_Archive_Link_Test extends FP_Base_Test {

	const VALID_POST_TYPE_WITH_ARCHIVE = 'post-type-with-archive';
	const VALID_POST_TYPE_WITHOUT_ARCHIVE = 'post-type-without-archive';

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::userFunction(
			'get_post_type_object',
			[
				'return' => function( $post_type ) {
					switch ( $post_type ) {
						case self::VALID_POST_TYPE_WITH_ARCHIVE:
							return (object) [ 'has_archive' => true ];
						case self::VALID_POST_TYPE_WITHOUT_ARCHIVE:
							return (object) [ 'has_archive' => false ];
						default:
							return null;
					}
				},
			]
		);

		WP_Mock::userFunction(
			'get_post_type_archive_link',
			[
				'return' => 'https://www.dev.freshenv.com/archive-link',
			]
		);
	}

	/**
	 * Checks whether function fp_get_post_type_archive_link() return expected value.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string       $post_type Post type.
	 * @param string       $page_slug Fallback page slug.
	 * @param string|array $expected Expected value.
	 */
	public function testIfReturnsExpectedResult( $post_type, $page_slug, $expected ) {
		$this->assertEquals( $expected, fp_get_post_type_archive_link( $post_type, $page_slug ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'empty post_type and page_slug'   => [
				'post_type' => '',
				'page_slug' => '',
				'expected'  => false,
			],
			'invalid post_type'               => [
				'post_type' => 'INVALID',
				'page_slug' => '',
				'expected'  => false,
			],
			'valid post_type with archive'    => [
				'post_type' => self::VALID_POST_TYPE_WITH_ARCHIVE,
				'page_slug' => '',
				'expected'  => 'https://www.dev.freshenv.com/archive-link',
			],
			'valid post_type without archive' => [
				'post_type' => self::VALID_POST_TYPE_WITHOUT_ARCHIVE,
				'page_slug' => '',
				'expected'  => 'https://www.dev.freshenv.com/',
			],
			'valid post_type without archive with page_slug' => [
				'post_type' => self::VALID_POST_TYPE_WITHOUT_ARCHIVE,
				'page_slug' => 'page-slug',
				'expected'  => 'https://www.dev.freshenv.com/page-slug',
			],
		];
	}
}
