<?php
/**
 * Tests fp_pre_get_posts() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Pre_Get_Posts_Test class.
 */
class FP_Pre_Get_Posts_Test extends FP_Base_Test {

	const ORIGINAL_VALUE = 'original';
	const GMDATE_YEAR = '2020';
	const QUERY_YEAR = '2021';

	/**
	 * Stores return value for is_admin().
	 *
	 * @var bool|string
	 */
	private $is_admin = false;

	/**
	 * Stores return value for is_post_type_archive().
	 *
	 * @var bool|string
	 */
	private $is_archive = false;

	/**
	 * Stores return value for is_taxonomy().
	 *
	 * @var bool|string
	 */
	private $is_tax = false;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		$this->use_default_mocks['is_admin'] = false;
		parent::setUp();

		WP_Mock::userFunction(
			'is_admin',
			[
				'return' => function() {
					return $this->is_admin;
				},
			]
		);

		WP_Mock::userFunction(
			'is_post_type_archive',
			[
				'return' => function( $post_type ) {
					return false !== $this->is_archive && $post_type === $this->is_archive;
				},
			]
		);

		WP_Mock::userFunction(
			'is_tax',
			[
				'return' => function( $taxonomies = null ) {
					if ( empty( $taxonomies ) && false === $this->is_tax ) {
						return false;
					} else {
						if ( is_null( $taxonomies ) ) {
							return true;
						}

						if ( ! is_array( $taxonomies ) ) {
							$taxonomies = [ $taxonomies ];
						}

						return in_array( $this->is_tax, $taxonomies );
					}
				},
			]
		);

		$this->mockFunction(
			'gmdate',
			function( $format, $timestamp = null ) {
				if ( 'Y' === $format ) {
					return self::GMDATE_YEAR;
				} else {
					return Patchwork\relay( [ $format, $timestamp ] );
				}
			}
		);
	}

	/**
	 * Checks whether query is unchanged when not on admin pages.
	 */
	public function testIfIsAdminThenQueryIsUnchanged() {
		$this->is_admin = true;
		$query = $this->getWPQueryMock();
		$query->method( 'is_main_query' )->willReturn( true );

		$query->expects( $this->never() )->method( 'set' );

		fp_pre_get_posts( $query );
	}

	/**
	 * Checks whether query is unchanged when query is not main one.
	 */
	public function testIfNotMainQueryThenQueryIsUnchanged() {
		$this->is_admin = false;
		$query = $this->getWPQueryMock();
		$query->method( 'is_main_query' )->willReturn( false );

		$query->expects( $this->never() )->method( 'set' );

		fp_pre_get_posts( $query );
	}

	/**
	 * Checks whether function fp_pre_get_posts() returns expected query based on archive/taxonomy conditions.
	 *
	 * @dataProvider returnExpectedQueryDataProvider
	 *
	 * @param string|bool $is_archive Whether is archive.
	 * @param string|bool $is_tax Whether is taxonomy.
	 * @param array       $expected_changed_query_arguments Expected changed query arguments.
	 */
	public function testIfReturnExpectedQuery( $is_archive, $is_tax, $expected_changed_query_arguments ) {
		$this->is_admin = false;
		$this->is_archive = $is_archive;
		$this->is_tax = $is_tax;
		$query = $this->getWPQueryMock();
		$query->method( 'is_main_query' )->willReturn( true );
		$mock_set_call_index = 1;

		if ( count( $expected_changed_query_arguments ) > 0 ) {
			foreach ( $expected_changed_query_arguments as $field => $value ) {
				$query
					->expects( $this->at( $mock_set_call_index ) )
					->method( 'set' )
					->with( $this->equalTo( $field ), $this->equalTo( $value ) );
				++ $mock_set_call_index;
			}
		} else {
			$query->expects( $this->never() )->method( 'set' );
		}

		fp_pre_get_posts( $query );
	}

	/**
	 * Data provider for testIfReturnExpectedQuery().
	 *
	 * @return array
	 */
	public function returnExpectedQueryDataProvider() {
		return [
			'empty data'                       => [
				'is_archive'                       => false,
				'is_tax'                           => false,
				'expected_changed_query_arguments' => [],
			],
			'is not handled archive'           => [
				'is_archive'                       => 'test_archive',
				'is_tax'                           => false,
				'expected_changed_query_arguments' => [],
			],
			'is not handled tax'               => [
				'is_archive'                       => false,
				'is_tax'                           => 'test_category',
				'expected_changed_query_arguments' => [],
			],
			'is hub_article archive'           => [
				'is_archive'                       => 'hub_article',
				'is_tax'                           => false,
				'expected_changed_query_arguments' => [
					'post_type'      => 'hub_article',
					'posts_per_page' => 9,
				],
			],
			'is hub_category tax'              => [
				'is_archive'                       => false,
				'is_tax'                           => 'hub_category',
				'expected_changed_query_arguments' => [
					'post_type'      => 'hub_article',
					'posts_per_page' => 18,
				],
			],
			'is press_article archive'         => [
				'is_archive'                       => 'press_article',
				'is_tax'                           => false,
				'expected_changed_query_arguments' => [
					'post_type'      => 'press_article',
					'posts_per_page' => - 1,
				],
			],
			'is press_category tax'            => [
				'is_archive'                       => false,
				'is_tax'                           => 'press_category',
				'expected_changed_query_arguments' => [
					'post_type'      => 'press_article',
					'posts_per_page' => - 1,
				],
			],
			'is invoice_template archive'      => [
				'is_archive'                       => 'invoice_template',
				'is_tax'                           => false,
				'expected_changed_query_arguments' => [
					'post_type' => 'invoice_template',
				],
			],
			'is invoice_template_category tax' => [
				'is_archive'                       => false,
				'is_tax'                           => 'invoice_template_category',
				'expected_changed_query_arguments' => [
					'post_type' => 'invoice_template',
				],
			],
		];
	}

	/**
	 * Checks whether press
	 *
	 * @param bool        $is_tax If is tax.
	 * @param bool        $is_release If is release type of press article.
	 * @param bool        $query_has_year_filter If query contains year_filter value.
	 * @param bool|string $expected Expected year to be set on query.
	 *
	 * @dataProvider pressArticleReleasesIsHandledProperlyDataProvider
	 *
	 * @return void
	 */
	public function testIfPressArticleReleasesIsHandledProperly( $is_tax, $is_release, $query_has_year_filter, $expected ) {
		$set_year = false;

		$this->is_admin = false;
		$this->is_archive = false;
		$this->is_tax = $is_tax ? 'press_category' : false;
		$query = $this->getWPQueryMock();
		$query->method( 'is_main_query' )->willReturn( true );
		$query->expects( $this->any() )
			  ->method( 'get' )
			->willReturnCallback(
				function( $field ) use ( $is_release, $query_has_year_filter ) {
					if ( 'press_category' === $field && $is_release ) {
						return 'releases';
					} else if ( 'year_filter' === $field && $query_has_year_filter ) {
						return self::QUERY_YEAR;
					} else {
						return '';
					}
				}
			);

		$query->expects( $this->any() )
			  ->method( 'set' )
			->willReturnCallback(
				function( $field, $value ) use ( &$set_year ) {
					if ( 'year' === $field ) {
						$set_year = $value;
					}

					return true;
				}
			);

		fp_pre_get_posts( $query );
		$this->assertEquals( false, $query->is_post_type_archive );
		$this->assertEquals( $expected, $set_year, 'Year was not ser correctly.' );
	}

	/**
	 * Data provider for testIfPressArticleReleasesIsHandledProperly().
	 *
	 * @return array
	 */
	public function pressArticleReleasesIsHandledProperlyDataProvider() {
		return [
			'not a tax'           => [
				'is_tax'                => false,
				'is_release'            => false,
				'query_has_year_filter' => false,
				'expected'              => false,
			],
			'not a release'       => [
				'is_tax'                => true,
				'is_release'            => false,
				'query_has_year_filter' => false,
				'expected'              => false,
			],
			'without year filter' => [
				'is_tax'                => true,
				'is_release'            => true,
				'query has year_filter' => false,
				'expected'              => self::GMDATE_YEAR,
			],
			'with year filter'    => [
				'is_tax'                => true,
				'is_release'            => true,
				'query has year_filter' => true,
				'expected'              => self::QUERY_YEAR,
			],
		];
	}

	/**
	 * Helper function to retrieve WP_Query object filled with original values.
	 *
	 * @return \PHPUnit\Framework\MockObject\MockObject
	 */
	private function getWPQueryMock() {
		return $this->createMock( WP_Query::class );
	}
}
