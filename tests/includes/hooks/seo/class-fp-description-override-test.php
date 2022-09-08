<?php
/**
 * Tests function fp_description_override() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Description_Override_Test class.
 */
class FP_Description_Override_Test extends FP_Base_Test {

	const START_DESCRIPTION = 'start';
	const REPLACED_DESCRIPTION = 'replaced';

	/**
	 * Stores get_queried_object() return value.
	 *
	 * @var WP_Post|null
	 */
	private $queried_object;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
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
			'esc_attr__',
			[
				'return' => self::REPLACED_DESCRIPTION,
			]
		);
	}

	/**
	 * Checks whether function fp_description_override() return expected value.
	 *
	 * @dataProvider returnExpectedValueDataProvider
	 *
	 * @param string       $description Input description.
	 * @param WP_Post|null $queried_object Queried object.
	 * @param string       $expected Expected description.
	 */
	public function testIfReturnExpectedValue( $description, $queried_object, $expected ) {
		$this->queried_object = $queried_object;

		$this->assertEquals( $expected, fp_description_override( $description ) );
	}

	/**
	 * Data provider for testIfReturnExpectedValue().
	 *
	 * @return array
	 */
	public function returnExpectedValueDataProvider() {
		return [
			'empty data'                              => [
				'description'    => '',
				'queried_object' => new WP_Post(),
				'expected'       => '',
			],
			'queried object is null'                  => [
				'description'    => self::START_DESCRIPTION,
				'queried_object' => null,
				'expected'       => self::START_DESCRIPTION,
			],
			'queried object is have not handled name' => [
				'description'    => self::START_DESCRIPTION,
				'queried_object' => new WP_Post( [ 'name' => 'invoice' ] ),
				'expected'       => self::START_DESCRIPTION,
			],
			'queried object is have handled name'     => [
				'description'    => self::START_DESCRIPTION,
				'queried_object' => new WP_Post( [ 'name' => 'invoice_template' ] ),
				'expected'       => self::REPLACED_DESCRIPTION,
			],
		];
	}
}
