<?php
/**
 * Tests fp_get_trial_length_attr() helper functions.
 *
 * @package FreshPress\Website
 */

use PHPUnit\Framework\TestCase;

/**
 * FP_Get_Trial_Length_Attr_Test class.
 */
class FP_Get_Trial_Length_Attr_Test extends TestCase {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		\WP_Mock::setUp();
	}

	/**
	 * Clean up after the test is run.
	 */
	public function tearDown() {
		// This triggers checks for WP_Mock::expect* functions used during tests.
		$this->addToAssertionCount( Mockery::getContainer()->mockery_getExpectationCount() );
		\WP_Mock::tearDown();
	}

	/**
	 * Checks whether fp_get_trial_length_attr() handles "not-set" string.
	 */
	public function testIfHandlesNotSetString() {
		$this->mockTrialLengthValue( 'not-set' );

		$this->assertEquals( '', fp_get_trial_length_attr() );
		$this->assertEquals( 0, fp_get_trial_length_attr( false ) );
	}

	/**
	 * Checks whether fp_get_trial_length_attr() handles not-numerical strings different from "not-set".
	 *
	 * @dataProvider notNumericalStringsDifferentFromNotSetDataProvider
	 *
	 * @param string $string String to be tested.
	 */
	public function testIfHandlesNotNumericalStringsDifferentFromNotSet( $string ) {
		$this->mockTrialLengthValue( $string );

		$this->assertEquals( '', fp_get_trial_length_attr() );
		$this->assertEquals( 0, fp_get_trial_length_attr( false ) );
	}

	/**
	 * Data provider for testIfHandlesNotNumericalStringsDifferentFromNotSet().
	 *
	 * @return array
	 */
	public function notNumericalStringsDifferentFromNotSetDataProvider() {
		return [
			'string'      => [ 'string' => 'Lorem ipsum' ],
			'chars'       => [ 'string' => '--++--' ],
			'space'       => [ 'string' => ' ' ],
			'whitespaces' => [ 'string' => "\n\t" ],
			'hard space'  => [ 'string' => '&nbsp;' ],
			'html'        => [ 'string' => '<div>HTML</div>' ],
		];
	}

	/**
	 * Checks whether fp_get_trial_length_attr() handles empty values.
	 *
	 * @dataProvider emptyValuesDataProvider
	 *
	 * @param mixed $value Value to be tested.
	 */
	public function testIfHandlesEmptyValues( $value ) {
		$this->mockTrialLengthValue( $value );

		$this->assertEquals( '', fp_get_trial_length_attr() );
		$this->assertEquals( 0, fp_get_trial_length_attr( false ) );
	}

	/**
	 * Data provider for testIfHandlesEmptyValues().
	 *
	 * @return array
	 */
	public function emptyValuesDataProvider() {
		return [
			'string' => [ 'value' => '' ],
			'array'  => [ 'value' => [] ],
			'null'   => [ 'value' => null ],
			'zero'   => [ 'value' => 0 ],
		];
	}

	/**
	 * Checks whether fp_get_trial_length_attr() handles numerical values bigger than 0.
	 *
	 * @dataProvider numericalValuesDataProvider
	 *
	 * @param mixed $value Numerical value to be tested.
	 * @param array $expected Expected values for attr and not.
	 */
	public function testIfHandlesNumericalValues( $value, $expected ) {
		$this->mockTrialLengthValue( $value );

		$this->assertEquals( $expected['attr'], fp_get_trial_length_attr() );
		$this->assertEquals( $expected['no_attr'], fp_get_trial_length_attr( false ) );
	}

	/**
	 * Data provider for testIfHandlesNumericalValues().
	 *
	 * @return array
	 */
	public function numericalValuesDataProvider() {
		$no_data = [
			'attr'    => '',
			'no_attr' => 0,
		];

		return [
			'integer'                   => [
				'value'    => 123,
				'expected' => [
					'attr'    => 'data-tl="123"',
					'no_attr' => 123,
				],
			],
			'number as string'          => [
				'value'    => '123',
				'expected' => [
					'attr'    => 'data-tl="123"',
					'no_attr' => 123,
				],
			],
			'float'                     => [
				'value'    => 123.5,
				'expected' => [
					'attr'    => 'data-tl="123"',
					'no_attr' => 123,
				],
			],
			'hex'                       => [
				'value'    => dechex( 123 ), /* "7b" */
				'expected' => [
					'attr'    => 'data-tl="7"',
					'no_attr' => 7,
				],
			],

			'negative integer'          => [
				'value'    => -123,
				'expected' => $no_data,
			],
			'negative number as string' => [
				'value'    => '-123',
				'expected' => $no_data,
			],
			'negative float'            => [
				'value'    => -123.5,
				'expected' => $no_data,
			],
			'negative hex'              => [
				'value'    => dechex( -123 ), /* "-7b" */
				'expected' => $no_data,
			],
		];
	}

	/**
	 * Helper function to quickly mock value used in tested function.
	 *
	 * @param mixed $value Value to be passed by get_field() function.
	 */
	private function mockTrialLengthValue( $value ) {
		WP_Mock::userFunction(
			'get_field',
			[
				'args'   => 'trial_length',
				'return' => $value,
			]
		);
	}
}
