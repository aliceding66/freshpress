<?php
/**
 * Tests fp_custom_post_link() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Custom_Post_Link_Test class.
 */
class FP_Custom_Post_Link_Test extends FP_Base_Test {

	const CUSTOM_TAXONOMY = 'news';
	const POST_ID_WITH_PRIMARY_TERM = 1;
	const POST_ID_WITHOUT_PRIMARY_TERM = 2;
	const PRIMARY_TERM_SLUG = 'primary-term-slug';

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::userFunction(
			'get_taxonomies',
			[
				'return' => [
					self::CUSTOM_TAXONOMY => self::CUSTOM_TAXONOMY,
				],
			]
		);

		$this->mockFunction(
			'fp_get_primary_term',
			function( $taxonomy, $post_id ) {
				if ( self::CUSTOM_TAXONOMY === $taxonomy && self::POST_ID_WITH_PRIMARY_TERM === $post_id ) {
					return new WP_Term( [ 'slug' => self::PRIMARY_TERM_SLUG ] );
				}

				return false;
			}
		);
	}


	/**
	 * Checks whether function fp_custom_post_link() returns expected query based on archive/taxonomy conditions.
	 *
	 * @dataProvider returnExpectedValuesDataProvider
	 *
	 * @param string  $post_link Post link.
	 * @param WP_Post $post Post object.
	 * @param string  $expected Expected value.
	 */
	public function testIfReturnExpectedValues( $post_link, $post, $expected ) {
		$this->assertEquals( $expected, fp_custom_post_link( $post_link, $post ) );
	}

	/**
	 * Data provider for testIfReturnExpectedValues().
	 *
	 * @return array
	 */
	public function returnExpectedValuesDataProvider() {
		return [
			'empty data'                                => [
				'post_link' => '',
				'post'      => new WP_Post(),
				'expected'  => '',
			],
			'not custom taxonomy link'                  => [
				'post_link' => 'https://www.dev.freshenv.com/post/%category%/post-slug',
				'post'      => new WP_Post(),
				'expected'  => 'https://www.dev.freshenv.com/post/%category%/post-slug', // Not changed.
			],
			'custom taxonomy link without primary term' => [
				'post_link' => 'https://www.dev.freshenv.com/article/%news%/article-slug',
				'post'      => new WP_Post(),
				'expected'  => 'https://www.dev.freshenv.com/article//article-slug',
			],
			'custom taxonomy link with primary term'    => [
				'post_link' => 'https://www.dev.freshenv.com/article/%news%/article-slug',
				'post'      => new WP_Post( self::POST_ID_WITH_PRIMARY_TERM ),
				'expected'  => 'https://www.dev.freshenv.com/article/' . self::PRIMARY_TERM_SLUG . '/article-slug',
			],
			'custom taxonomy link with primary term without post' => [
				'post_link' => 'https://www.dev.freshenv.com/article/%news%/article-slug',
				'post'      => new WP_Post( self::POST_ID_WITHOUT_PRIMARY_TERM ),
				'expected'  => 'https://www.dev.freshenv.com/article//article-slug',
			],
		];
	}
}
