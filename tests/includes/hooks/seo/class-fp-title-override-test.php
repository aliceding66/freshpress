<?php
/**
 * Tests function fp_title_override() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Title_Override_Test class.
 */
class FP_Title_Override_Test extends FP_Base_Test {

	const REPLACED_WITH_ESC_ATTR_TITLE = 'replaced';

	/**
	 * Stores get_query_var() for "news_coverage" return value.
	 *
	 * @var string
	 */
	private $news_coverage_query_var;

	/**
	 * Stores get_queried_object() return value.
	 *
	 * @var WP_Post|null
	 */
	private $queried_object;

	/**
	 * Stores get_post_type() return value.
	 *
	 * @var string
	 */
	private $post_type;

	/**
	 * Stores is_admin() return value.
	 *
	 * @var bool
	 */
	private $is_admin;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		$this->use_default_mocks['is_admin'] = false;

		parent::setUp();

		WP_Mock::userFunction(
			'get_queried_object',
			[
				'return' => function() {
					return $this->queried_object;
				},
			]
		);

		WP_Mock::userFunction(
			'get_query_var',
			[
				'return' => function( $field ) {
					if ( 'news_coverage' === $field ) {
						return $this->news_coverage_query_var;
					} else {
						return '';
					}
				},
			]
		);

		WP_Mock::userFunction(
			'get_post_type',
			[
				'return' => function() {
					return $this->post_type;
				},
			]
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
			'esc_attr__',
			[
				'return' => self::REPLACED_WITH_ESC_ATTR_TITLE,
			]
		);
	}

	/**
	 * Checks whether function fp_title_override() return expected value.
	 *
	 * @dataProvider returnExpectedValueDataProvider
	 *
	 * @param string       $title Input title.
	 * @param WP_Post|null $queried_object Queried object.
	 * @param string       $news_coverage_query_var Query var for "news_coverage" value.
	 * @param string       $post_type Current post type.
	 * @param bool         $is_admin If is admin page.
	 * @param string       $expected Expected title.
	 */
	public function testIfReturnExpectedValue( $title, $queried_object, $news_coverage_query_var, $post_type, $is_admin, $expected ) {
		$this->queried_object = $queried_object;
		$this->news_coverage_query_var = $news_coverage_query_var;
		$this->post_type = $post_type;
		$this->is_admin = $is_admin;

		$this->assertEquals( $expected, fp_title_override( $title ) );
	}

	/**
	 * Data provider for testIfReturnExpectedValue().
	 *
	 * @return array
	 */
	public function returnExpectedValueDataProvider() {
		return [
			'empty data'                                 => [
				'title'                   => '',
				'queried_object'          => new WP_Post(),
				'news_coverage_query_var' => '',
				'post_type'               => '',
				'is_admin'                => false,
				'expected'                => '',
			],
			'queried object is null'                     => [
				'title'                   => 'Test|title',
				'queried_object'          => null,
				'news_coverage_query_var' => '',
				'post_type'               => '',
				'is_admin'                => false,
				'expected'                => 'Test|title',
			],

			// News coverage.
			'news coverage without "|"'                  => [
				'title'                   => 'Hello coverage',
				'queried_object'          => new WP_Post(),
				'news_coverage_query_var' => 'true',
				'post_type'               => '',
				'is_admin'                => false,
				'expected'                => 'News Coverage Archives',
			],
			'news coverage with "|"'                     => [
				'title'                   => 'Hello|coverage',
				'queried_object'          => new WP_Post(),
				'news_coverage_query_var' => 'true',
				'post_type'               => '',
				'is_admin'                => false,
				'expected'                => 'News Coverage Archives | coverage',
			],
			'news coverage with " | "'                   => [
				'title'                   => 'Hello | coverage',
				'queried_object'          => new WP_Post(),
				'news_coverage_query_var' => 'true',
				'post_type'               => '',
				'is_admin'                => false,
				'expected'                => 'News Coverage Archives |  coverage', // Doubled spaces.
			],

			// Integrations.
			'integration category with "|"'              => [
				'title'                   => 'Hello|integrations',
				'queried_object'          => new WP_Post( [ 'taxonomy' => 'integration_category' ] ),
				'news_coverage_query_var' => '',
				'post_type'               => 'integration',
				'is_admin'                => false,
				'expected'                => 'Hello + integrations',
			],
			'integration collection with " | "'          => [
				'title'                   => 'Hello|integrations',
				'queried_object'          => new WP_Post( [ 'taxonomy' => 'integration_collection' ] ),
				'news_coverage_query_var' => '',
				'post_type'               => 'integration',
				'is_admin'                => false,
				'expected'                => 'Hello + integrations',
			],
			'integration tag without "|"'                => [
				'title'                   => 'Hello integrations',
				'queried_object'          => new WP_Post( [ 'taxonomy' => 'integration_tag' ] ),
				'news_coverage_query_var' => '',
				'post_type'               => 'integration',
				'is_admin'                => false,
				'expected'                => 'Hello integrations',
			],
			'integration with name integration with "|"' => [
				'title'                   => 'Hello|integrations',
				'queried_object'          => new WP_Post(
					[
						'taxonomy' => 'integration',
						'name'     => 'integration',
					]
				),
				'news_coverage_query_var' => '',
				'post_type'               => 'integration',
				'is_admin'                => false,
				'expected'                => 'Accounting Software Add-Ons &amp; Integration + integrations',
			],
			'integration with empty taxonomy'            => [
				'title'                   => 'Hello|integrations',
				'queried_object'          => new WP_Post( [ 'taxonomy' => null ] ),
				'news_coverage_query_var' => '',
				'post_type'               => 'integration',
				'is_admin'                => false,
				'expected'                => 'Hello|integrations', // Unchanged.
			],
			'integration at admin page'                  => [
				'title'                   => 'Hello|integrations',
				'queried_object'          => new WP_Post( [ 'taxonomy' => 'integration' ] ),
				'news_coverage_query_var' => '',
				'post_type'               => 'integration',
				'is_admin'                => true,
				'expected'                => 'Hello|integrations', // Unchanged.
			],

			// API.
			'api with "|"'                               => [
				'title'                   => 'Hello|api',
				'queried_object'          => new WP_Post(),
				'news_coverage_query_var' => '',
				'post_type'               => 'api',
				'is_admin'                => false,
				'expected'                => 'Hello- API |api',
			],
			'api with " | "'                             => [
				'title'                   => 'Hello | api',
				'queried_object'          => new WP_Post(),
				'news_coverage_query_var' => '',
				'post_type'               => 'api',
				'is_admin'                => false,
				'expected'                => 'Hello - API | api',
			],
			'api without "|"'                            => [
				'title'                   => 'Hello api',
				'queried_object'          => new WP_Post(),
				'news_coverage_query_var' => '',
				'post_type'               => 'api',
				'is_admin'                => false,
				'expected'                => 'Hello api- API',
			],

			// Invoice template archive.
			'invoice template archive'                   => [
				'title'                   => 'Hello | invoice | archive',
				'queried_object'          => new WP_Post( [ 'name' => 'invoice_template' ] ),
				'news_coverage_query_var' => '',
				'post_type'               => '',
				'is_admin'                => false,
				'expected'                => self::REPLACED_WITH_ESC_ATTR_TITLE,
			],
		];
	}
}
