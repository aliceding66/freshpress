<?php
/**
 * Tests fp_fastly_surrogate_keys() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Fastly_Surrogate_Keys_Test class.
 */
class FP_Fastly_Surrogate_Keys_Test extends FP_Base_Test {

	/**
	 * Stores post_name value.
	 *
	 * @var string
	 */
	private $post_name;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		$this->use_default_mocks['is_404'] = false;

		parent::setUp();

		WP_Mock::userFunction(
			'get_queried_object',
			[
				'return' => function() {
					if ( is_single() || is_page() ) {
						return new WP_Post(
							[
								'ID'        => 1,
								'post_name' => $this->post_name,
							]
						);
					} else {
						return new WP_Post( [ 'taxonomy' => 'tax-value' ] );
					}
				},
			]
		);

		WP_Mock::userFunction(
			'get_post_type',
			[
				'return' => 'post-type-value',
			]
		);

		WP_Mock::userFunction(
			'get_permalink',
			[
				'return' => 'https://www.dev.freshenv.com/page-url',
			]
		);

		WP_Mock::userFunction(
			'get_term_link',
			[
				'return' => 'https://www.dev.freshenv.com/term-url',
			]
		);
	}

	/**
	 * Checks whether function fp_fastly_surrogate_keys() adds correct cache keys.
	 *
	 * @dataProvider addCorrectCacheKeysDataProvider
	 *
	 * @param array        $data Page config data.
	 * @param string|array $expected Expected value.
	 */
	public function testIfAddsCorrectCacheKeys( $data, $expected ) {
		foreach ( $data as $function_name => $return_value ) {
			WP_Mock::userFunction( $function_name, [ 'return' => $return_value ] );
		}
		if ( isset( $data['post_name'] ) ) {
			$this->post_name = $data['post_name'];
		} else {
			$this->post_name = 'post-name-value';
		}

		$fastly_cache_keys = new Fastly_Cache_Keys();

		fp_fastly_surrogate_keys( $fastly_cache_keys );

		$this->assertEquals( $expected, $fastly_cache_keys->get_keys() );
	}

	/**
	 * Data provider for testIfAddsCorrectCacheKeys().
	 *
	 * @return array
	 */
	public function addCorrectCacheKeysDataProvider() {
		return [
			'empty data'  => [
				'data'     => [
					'is_404'        => false,
					'is_single'     => false,
					'is_page'       => false,
					'is_front_page' => false,
					'is_tax'        => false,
				],
				'expected' => [ 'public-website' ],
			],
			'404 page'    => [
				'data'     => [
					'is_404'        => true,
					'is_single'     => false,
					'is_page'       => false,
					'is_front_page' => false,
					'is_tax'        => false,
				],
				'expected' => [],
			],
			'single page' => [
				'data'     => [
					'is_404'        => false,
					'is_single'     => true,
					'is_page'       => false,
					'is_front_page' => false,
					'is_tax'        => false,
				],
				'expected' => [ 'public-website', 'post-type-value', 'url_page-url' ],
			],
			'page'        => [
				'data'     => [
					'is_404'        => false,
					'is_single'     => false,
					'is_page'       => true,
					'is_front_page' => false,
					'is_tax'        => false,
				],
				'expected' => [ 'public-website', 'post-type-value', 'url_page-url' ],
			],
			'front page'  => [
				'data'     => [
					'is_404'        => false,
					'is_single'     => false,
					'is_page'       => true,
					'is_front_page' => true,
					'is_tax'        => false,
				],
				'expected' => [ 'public-website', 'post-type-value', 'url_post-name-value' ],
			],
			'front page with empty post name that evaluated to invalid field ending with "_"' => [
				'data'     => [
					'is_404'        => false,
					'is_single'     => false,
					'is_page'       => true,
					'is_front_page' => true,
					'is_tax'        => false,
					'post_name'     => '',
				],
				'expected' => [ 'public-website', 'post-type-value' ],
			],
			'taxonomy'    => [
				'data'     => [
					'is_404'        => false,
					'is_single'     => false,
					'is_page'       => false,
					'is_front_page' => false,
					'is_tax'        => true,
				],
				'expected' => [ 'public-website', 'tax_tax-value', 'url_term-url' ],
			],
		];
	}
}
