<?php
/**
 * Tests fp_add_last_modified_header() helper functions.
 *
 * @package FreshPress\Website
 */

/* phpcs:disable WordPress.WP.GlobalVariablesOverride.Prohibited */
/* phpcs:disable WordPress.NamingConventions.ValidVariableName.VariableNotSnakeCase */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Add_Last_Modified_Header_Test class.
 */
class FP_Add_Last_Modified_Header_Test extends FP_Base_Test {

	const EXPECTED_DATE_FORMAT = 'D, d M Y H:i:s';

	/**
	 * Stores date string.
	 *
	 * @var DateTime
	 */
	private $last_modified_date;

	/**
	 * Last added header.
	 *
	 * @var string|bool
	 */
	private $added_header = false;

	/**
	 * FP_Add_Last_Modified_Header_Test constructor.
	 *
	 * @param null   $name Name.
	 * @param array  $data Data.
	 * @param string $dataName Data name.
	 */
	public function __construct( $name = null, array $data = [], $dataName = '' ) {
		parent::__construct( $name, $data, $dataName );

		$this->last_modified_date = fp_get_date();
	}

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::userFunction(
			'get_post_modified_time',
			[
				'return' => function( $format ) {
					return $this->last_modified_date->format( $format );
				},
			]
		);

		$this->mockFunction(
			'header',
			function( $value ) {
				$this->added_header = $value;
			}
		);
	}

	/**
	 * Clean up after the test is run.
	 */
	public function tearDown() {
		$this->added_header = false;
		if ( isset( $GLOBALS['post'] ) ) {
			unset( $GLOBALS['post'] );
		}
	}

	/**
	 * Checks whether function fp_add_last_modified_header() adds last modified header.
	 *
	 * @dataProvider addLastModifiedHeaderDataProvider
	 *
	 * @param array        $data Page config data.
	 * @param string|array $expected_header_added Expected value.
	 */
	public function testIfAddsLastModifiedHeader( $data, $expected_header_added ) {
		foreach ( $data as $function_name => $return_value ) {
			$this->mockFunction(
				$function_name,
				function() use ( $return_value ) {
					return $return_value;
				}
			);
		}
		if ( isset( $data['has_post'] ) && true === $data['has_post'] ) {
			$GLOBALS['post'] = new WP_Post();
		}

		fp_add_last_modified_header();
		$this->assertEquals( $expected_header_added, $this->added_header );
	}

	/**
	 * Data provider for testIfAddsLastModifiedHeader().
	 *
	 * @return array
	 */
	public function addLastModifiedHeaderDataProvider() {
		return [
			'empty data'                         => [
				'data'     => [
					'is_404'       => false,
					'headers_list' => [],
					'has_post'     => false,
					'headers_sent' => false,
				],
				'expected' => false,
			],
			'404 page'                           => [
				'data'     => [
					'is_404'       => true,
					'headers_list' => [],
					'has_post'     => false,
					'headers_sent' => false,
				],
				'expected' => false,
			],
			'last-modified header already exist' => [
				'data'     => [
					'is_404'       => false,
					'headers_list' => [ 'last-modified' => 'anything' ],
					'has_post'     => false,
					'headers_sent' => false,
				],
				'expected' => false,
			],
			'on valid post page'                 => [
				'data'     => [
					'is_404'       => false,
					'headers_list' => [],
					'has_post'     => true,
					'headers_sent' => false,
				],
				'expected' => 'Last-Modified: ' . $this->last_modified_date->format( self::EXPECTED_DATE_FORMAT ) . ' GMT',
			],
			'on valid post page when headers were already sent' => [
				'data'     => [
					'is_404'       => false,
					'headers_list' => [],
					'has_post'     => true,
					'headers_sent' => true,
				],
				'expected' => false,
			],
		];
	}
}
