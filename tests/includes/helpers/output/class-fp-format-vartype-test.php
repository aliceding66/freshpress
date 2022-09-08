<?php
/**
 * Tests function fp_format_vartype() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Format_Vartype_Test class.
 */
class FP_Format_Vartype_Test extends FP_Base_Test {

	/**
	 * Checks whether function fp_format_vartype() return expected value.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param mixed        $string String to be parsed.
	 * @param string|array $expected Expected value.
	 */
	public function testIfReturnsExpectedResult( $string, $expected ) {
		$this->assertEquals( $expected, fp_format_vartype( $string ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'empty string'  => [
				'string'   => '',
				'expected' => '',
			],
			'random string' => [
				'string'   => 'Lorem ipsum',
				'expected' => 'Lorem ipsum',
			],
			'null'          => [
				'string'   => null,
				'expected' => null,
			],
			'array'         => [
				'string'   => [ 'Lorem' => 'ipsum' ],
				'expected' => [ 'Lorem' => 'ipsum' ],
			],
			// Booleans.
			'string true'   => [
				'string' => 'true',
				'expect' => true,
			],
			'string yes'    => [
				'string' => 'yes',
				'expect' => true,
			],
			'string 1'      => [
				'string' => 'yes',
				'expect' => true,
			],
			'bool true'     => [
				'string' => true,
				'expect' => true,
			],
			'string false'  => [
				'string' => 'false',
				'expect' => false,
			],
			'string no'     => [
				'string' => 'no',
				'expect' => false,
			],
			'string 0'      => [
				'string' => '0',
				'expect' => false,
			],
			'bool false'    => [
				'string' => false,
				'expect' => false,
			],
			// Numeric.
			'int 1'         => [
				'string' => 1,
				'expect' => 1,
			],
			'int 0'         => [
				'string' => 0,
				'expect' => 0,
			],
			'random number' => [
				'string' => 123456,
				'expect' => 123456,
			],
		];
	}
}
