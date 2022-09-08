<?php
/**
 * Tests fp_register_custom_objects() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Register_Custom_Objects_Test class.
 */
class FP_Register_Custom_Objects_Test extends FP_Base_Test {

	const VALID_JSON_FILE_PATH = 'valid-json';
	const VALID_JSON_FILE_WITH_TYPE_POST_PATH = 'valid-with-type-post-json';
	const VALID_JSON_FILE_WITH_TYPE_ARTICLE_PATH = 'valid-with-type-article-json';
	const INVALID_JSON_FILE_PATH = 'invalid-json';
	const WITH_DISABLED_JSON_FILE_PATH = 'with-disabled-json';
	const WITH_DISABLED_AS_FALSE_JSON_FILE_PATH = 'with-disabled-as-false-json';

	/**
	 * Helper variable to store info if ACF function exists.
	 *
	 * @var bool
	 */
	private $acf_function_exists = false;

	/**
	 * Helper variable to store registered taxonomies.
	 *
	 * @var int
	 */
	private $registered_taxonomies = 0;

	/**
	 * Helper variable to store registered post types.
	 *
	 * @var int
	 */
	private $registered_post_types = 0;

	/**
	 * Helper variable to store registered options pages.
	 *
	 * @var int
	 */
	private $registered_options_pages = 0;

	/**
	 * Helper variable to store registered options pages by ACF for post type.
	 *
	 * @var int
	 */
	private $registered_acf_options_pages_post = 0;

	/**
	 * Helper variable to store registered options pages by ACF for article type.
	 *
	 * @var int
	 */
	private $registered_acf_options_pages_article = 0;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mockFunction(
			'function_exists',
			function( $function_name ) {
				if ( 'acf_add_options_page' === $function_name ) {
					return $this->acf_function_exists;
				} else {
					return Patchwork\relay( [ $function_name ] ); // Call original "function_exists".
				}
			}
		);

		$this->mockFunction(
			'fp_read_file',
			function( $filepath ) {
				switch ( $filepath ) {
					case self::VALID_JSON_FILE_PATH:
						return '{"key":"value"}';
					case self::VALID_JSON_FILE_WITH_TYPE_POST_PATH:
						return '{"type":"post"}';
					case self::VALID_JSON_FILE_WITH_TYPE_ARTICLE_PATH:
						return '{"type":"article"}';
					case self::INVALID_JSON_FILE_PATH:
						return '{"key"-:-"value"}';
					case self::WITH_DISABLED_JSON_FILE_PATH:
						return '{"disabled":true}';
					case self::WITH_DISABLED_AS_FALSE_JSON_FILE_PATH:
						return '{"disabled":false}';

					default:
						return '';
				}
			}
		);

		$this->mockFunction(
			'fp_register_all_taxonomies',
			function() {
				++ $this->registered_taxonomies;

				return true;
			}
		);

		$this->mockFunction(
			'fp_register_all_post_types',
			function() {
				++ $this->registered_post_types;

				return true;
			}
		);

		$this->mockFunction(
			'fp_register_all_options_pages',
			function() {
				++ $this->registered_options_pages;

				return true;
			}
		);

		$this->mockFunction(
			'acf_add_options_post',
			function() {
				++ $this->registered_acf_options_pages_post;

				return true;
			}
		);

		$this->mockFunction(
			'acf_add_options_article',
			function() {
				++ $this->registered_acf_options_pages_article;

				return true;
			}
		);
	}

	/**
	 * Clean up after the test is run.
	 */
	public function tearDown() {
		parent::tearDown();

		$this->registered_taxonomies = 0;
		$this->registered_post_types = 0;
		$this->registered_options_pages = 0;
		$this->registered_acf_options_pages_post = 0;
		$this->registered_acf_options_pages_article = 0;
	}

	/**
	 * Checks whether function fp_register_custom_objects() registers only valid custom objects.
	 *
	 * @dataProvider registerOnlyValidCustomObjectsDataProvider
	 *
	 * @param array $glob_results Output glob for specified patterns.
	 * @param array $expected Expected amount of registrations.
	 */
	public function testIfRegisterOnlyValidCustomObjects( $glob_results, $expected ) {
		$this->acf_function_exists = false;

		$this->mockFunction(
			'glob',
			function( $pattern, $flags = 0 ) use ( $glob_results ) {
				$parent_dir_name = basename( dirname( $pattern ) );

				return $glob_results[ $parent_dir_name ] ?? [];
			}
		);

		fp_register_custom_objects();

		$this->assertEquals( $expected['registered_taxonomies'] ?? 0, $this->registered_taxonomies, 'Taxonomies not registered in expected amount.' );
		$this->assertEquals( $expected['registered_post_types'] ?? 0, $this->registered_post_types, 'Post types not registered in expected amount.' );
		$this->assertEquals( $expected['registered_options_pages'] ?? 0, $this->registered_options_pages, 'Options pages not registered in expected amount.' );
	}

	/**
	 * Data provider for testIfRegisterOnlyValidCustomObjects().
	 *
	 * @return array
	 */
	public function registerOnlyValidCustomObjectsDataProvider() {
		return [
			'empty data'                       => [
				'glob_results' => [],
				'expected'     => [],
			],
			'invalid JSON'                     => [
				'glob_results' => [ 'taxonomies' => [ self::INVALID_JSON_FILE_PATH ] ],
				'expected'     => [],
			],
			'with disabled = (bool)true JSON'  => [
				'glob_results' => [ 'taxonomies' => [ self::WITH_DISABLED_JSON_FILE_PATH ] ],
				'expected'     => [],
			],
			'with disabled = (bool)false JSON' => [
				'glob_results' => [ 'taxonomies' => [ self::WITH_DISABLED_AS_FALSE_JSON_FILE_PATH ] ],
				'expected'     => [
					'registered_taxonomies' => 1,
				],
			],
			'all with valid JSONs and different amount of JSON files' => [
				'glob_results' => [
					'taxonomies'    => [ self::VALID_JSON_FILE_PATH ],
					'post-types'    => [ self::VALID_JSON_FILE_PATH, self::VALID_JSON_FILE_PATH ],
					'options-pages' => [ self::VALID_JSON_FILE_PATH, self::VALID_JSON_FILE_PATH, self::VALID_JSON_FILE_PATH ],
				],
				'expected'     => [
					'registered_taxonomies'    => 1,
					'registered_post_types'    => 1,
					'registered_options_pages' => 1,
				],
			],
		];
	}

	/**
	 * Checks whether function fp_register_custom_objects() registers correct amount of options pages.
	 *
	 * @dataProvider registerCorrectAmountOfOptionsPagesDataProvider
	 *
	 * @param array $glob_results Output glob for specified patterns.
	 * @param array $expected Expected amount of registrations.
	 */
	public function testIfRegisterCorrectAmountOfOptionsPages( $glob_results, $expected ) {
		$this->acf_function_exists = true;

		$this->mockFunction(
			'glob',
			function( $pattern, $flags = 0 ) use ( $glob_results ) {
				$parent_dir_name = basename( dirname( $pattern ) );

				return $glob_results[ $parent_dir_name ] ?? Patchwork\relay( [ $pattern, $flags ] );
			}
		);

		fp_register_custom_objects();

		if ( isset( $expected['post'] ) ) {
			$this->assertEquals( $expected['post'], $this->registered_acf_options_pages_post, 'ACF post options page registered invalid times.' );
		}
		if ( isset( $expected['page'] ) ) {
			$this->assertEquals( $expected['page'], $this->registered_acf_options_pages_article, 'ACF page options page registered invalid times.' );
		}
	}

	/**
	 * Data provider for testIfRegisterCorrectAmountOfOptionsPages().
	 *
	 * @return array
	 */
	public function registerCorrectAmountOfOptionsPagesDataProvider() {
		return [
			'empty data'                         => [
				'glob_results' => [],
				'expected'     => [],
			],
			'JSON without "type" property'       => [
				'glob_results' => [ 'options_pages' => [ self::VALID_JSON_FILE_PATH ] ],
				'expected'     => [
					'post'    => 0,
					'article' => 0,
				],
			],
			'JSON with "type" property'          => [
				'glob_results' => [ 'options-pages' => [ self::VALID_JSON_FILE_WITH_TYPE_POST_PATH ] ],
				'expected'     => [
					'post'    => 1,
					'article' => 0,
				],
			],
			'multiple JSON with "type" property' => [
				'glob_results' => [ 'options-pages' => [ self::VALID_JSON_FILE_WITH_TYPE_POST_PATH, self::VALID_JSON_FILE_WITH_TYPE_ARTICLE_PATH ] ],
				'expected'     => [
					'post'    => 1,
					'article' => 1,
				],
			],
		];
	}
}
