<?php
/**
 * Tests fp_get_primary_term() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Primary_Term_Test class.
 */
class FP_Get_Primary_Term_Test extends FP_Base_Test {

	const POST_ID_WITH_TAXONOMY = 1;
	const POST_ID_WITHOUT_TAXONOMY_A = 3;
	const POST_ID_WITHOUT_TAXONOMY_B = 4;
	const TAXONOMY = 'taxonomy';
	const PRIMARY_TERM_ID = 2;

	/**
	 * A get_the_terms() return value.
	 *
	 * @var array
	 */
	private $get_the_terms = [];

	/**
	 * Determine if yoast function exists.
	 *
	 * @var bool
	 */
	private $yoast_function_exists = false;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::userFunction(
			'get_the_terms',
			[
				'return' => function( $post, $taxonomy ) {
					if ( $post instanceof WP_Post ) {
						$post = $post->ID;
					} else {
						$post = (int) $post;
					}

					if ( self::POST_ID_WITH_TAXONOMY === $post && self::TAXONOMY === $taxonomy ) {
						return array_map(
							function( $data ) {
								return new WP_Term( $data );
							},
							$this->get_the_terms
						);
					} else {
						return false;
					}
				},
			]
		);

		WP_Mock::userFunction(
			'get_term',
			[
				'return' => function( $data ) {
					return new WP_Term( $data );
				},
			]
		);

		$this->mockFunction(
			'yoast_get_primary_term_id',
			function( $t, $p ) {
				if ( self::POST_ID_WITH_TAXONOMY === $p && self::TAXONOMY === $t ) {
					return self::PRIMARY_TERM_ID;
				} else {
					return false;
				}
			}
		);

		$this->mockFunction(
			'function_exists',
			function( $function_name ) {
				if ( 'yoast_get_primary_term_id' === $function_name ) {
					return $this->yoast_function_exists;
				} else {
					Patchwork\relay( [ $function_name ] ); // Call original "function_exists".
				}
			}
		);
	}

	/**
	 * Checks whether function fp_get_primary_term() return expected value.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param bool         $yoast_exists Variable to determine if yoast function exists.
	 * @param string       $get_the_terms Terms to be returned for valid post/taxonomy data.
	 * @param string       $taxonomy Taxonomy.
	 * @param mixed        $post Post data.
	 * @param string|array $expected Expected value.
	 */
	public function testIfReturnsExpectedResult( $yoast_exists, $get_the_terms, $taxonomy, $post, $expected ) {
		$this->yoast_function_exists = $yoast_exists;
		$this->get_the_terms = $get_the_terms;

		$this->assertEquals( $expected, fp_get_primary_term( $taxonomy, $post ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {

		return [
			'empty data'                                 => [
				'yoast_exists'  => false,
				'get_the_terms' => [],
				'taxonomy'      => '',
				'post'          => '',
				'expected'      => new WP_Term(),
			],
			'valid post ID with yoast function without terms' => [
				'yoast_exists'  => true,
				'get_the_terms' => [],
				'taxonomy'      => self::TAXONOMY,
				'post'          => self::POST_ID_WITH_TAXONOMY,
				'expected'      => new WP_Term(),
			],
			'valid post ID with yoast function with 1 term' => [
				'yoast_exists'  => true,
				'get_the_terms' => [ self::PRIMARY_TERM_ID ],
				'taxonomy'      => self::TAXONOMY,
				'post'          => self::POST_ID_WITH_TAXONOMY,
				'expected'      => new WP_Term( self::PRIMARY_TERM_ID ),
			],
			'valid post ID with yoast function with more then 1 terms' => [
				'yoast_exists'  => true,
				'get_the_terms' => [ self::PRIMARY_TERM_ID, 3, 4, 5 ],
				'taxonomy'      => self::TAXONOMY,
				'post'          => self::POST_ID_WITH_TAXONOMY,
				'expected'      => new WP_Term( self::PRIMARY_TERM_ID ),
			],
			'valid post object with yoast function with 1 term' => [
				'yoast_exists'  => true,
				'get_the_terms' => [ self::PRIMARY_TERM_ID ],
				'taxonomy'      => self::TAXONOMY,
				'post'          => new WP_Post( self::POST_ID_WITH_TAXONOMY ),
				'expected'      => new WP_Term( self::PRIMARY_TERM_ID ),
			],
			'valid post object with yoast function with more then 1 terms' => [
				'yoast_exists'  => true,
				'get_the_terms' => [ self::PRIMARY_TERM_ID, 3, 4, 5 ],
				'taxonomy'      => self::TAXONOMY,
				'post'          => new WP_Post( self::POST_ID_WITH_TAXONOMY ),
				'expected'      => new WP_Term( self::PRIMARY_TERM_ID ),
			],
			'valid post object without yoast function with 1 term' => [
				'yoast_exists'  => false,
				'get_the_terms' => [ self::PRIMARY_TERM_ID ],
				'taxonomy'      => self::TAXONOMY,
				'post'          => new WP_Post( self::POST_ID_WITH_TAXONOMY ),
				'expected'      => new WP_Term( self::PRIMARY_TERM_ID ),
			],
			'valid post object without yoast function with more then 1 terms' => [
				'yoast_exists'  => false,
				'get_the_terms' => [ self::PRIMARY_TERM_ID, 3, 4, 5 ],
				'taxonomy'      => self::TAXONOMY,
				'post'          => new WP_Post( self::POST_ID_WITH_TAXONOMY ),
				'expected'      => new WP_Term( self::PRIMARY_TERM_ID ),
			],
			'invalid post object with yoast function'    => [
				'yoast_exists'  => true,
				'get_the_terms' => [ self::PRIMARY_TERM_ID ],
				'taxonomy'      => self::TAXONOMY,
				'post'          => new WP_Post( self::POST_ID_WITHOUT_TAXONOMY_A ),
				'expected'      => new WP_Term(),
			],
			'invalid post object without yoast function' => [
				'yoast_exists'  => false,
				'get_the_terms' => [ self::PRIMARY_TERM_ID ],
				'taxonomy'      => self::TAXONOMY,
				'post'          => new WP_Post( self::POST_ID_WITHOUT_TAXONOMY_A ),
				'expected'      => new WP_Term(),
			],
		];
	}
}
