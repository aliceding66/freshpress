<?php
/**
 * Tests fp_parse_csv() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Parse_Csv_Test class.
 */
class FP_Parse_Csv_Test extends FP_Base_Test {

	/**
	 * Checks whether fp_parse_csv() return expected value for different cases.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string $csv CSV content.
	 * @param array  $expected Expected value.
	 * @param array  $options Additional options to be passed to tested function.
	 */
	public function testIfReturnsExpectedResult( $csv, $expected, $options = [] ) {
		$delimiter = ! empty( $options['delimiter'] ) ? $options['delimiter'] : ',';
		$trim_fields = ! empty( $options['trim_fields'] ) ? $options['trim_fields'] : true;

		$this->assertEquals( $expected, fp_parse_csv( $csv, $delimiter, $trim_fields ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		$newline = PHP_EOL;

		return [
			'empty csv'                     => [
				'csv'      => '',
				'expected' => [
					'headers' => [ null ],
					'data'    => [],
				],
			],
			'random text without delimiter' => [
				'csv'      => "- Hello there! How are You?{$newline}- I'm fine - thank You!",
				'expected' => [
					'headers' => [ '- Hello there! How are You?' ],
					'data'    => [
						[
							'- hello there! how are you?' => "- I'm fine - thank You!",
						],
					],
				],
			],
			'csv with only 1 row'           => [
				'csv'      => 'Name,Surname,Occupation',
				'expected' => [
					'headers' => [ 'Name', 'Surname', 'Occupation' ],
					'data'    => [],
				],
			],
			'csv with some content'         => [
				'csv'      => "Name,Surname,Occupation{$newline}Joe,Doe,IT guy{$newline}Jane,Doerty,Manager{$newline}Foo,Bar-Bor,Driver",
				'expected' => [
					'headers' => [ 'Name', 'Surname', 'Occupation' ],
					'data'    => [
						[
							'name'       => 'Joe',
							'surname'    => 'Doe',
							'occupation' => 'IT guy',
						],
						[
							'name'       => 'Jane',
							'surname'    => 'Doerty',
							'occupation' => 'Manager',
						],
						[
							'name'       => 'Foo',
							'surname'    => 'Bar-Bor',
							'occupation' => 'Driver',
						],
					],
				],
			],
			'csv with custom delimiter'     => [
				'csv'      => "Name;Surname;Occupation{$newline}Joe;Doe;IT guy",
				'expected' => [
					'headers' => [ 'Name', 'Surname', 'Occupation' ],
					'data'    => [
						[
							'name'       => 'Joe',
							'surname'    => 'Doe',
							'occupation' => 'IT guy',
						],
					],
				],
				'options'  => [ 'delimiter' => ';' ],
			],
			'csv with trimmed values'       => [
				'csv'      => "Name,Surname{$newline}  Joe  ,  Doe  ",
				'expected' => [
					'headers' => [ 'Name', 'Surname' ],
					'data'    => [
						[
							'name'    => 'Joe',
							'surname' => 'Doe',
						],
					],
				],
				'options'  => [ 'trim_fields' => true ],
			],
			'csv without trimmed values'    => [
				'csv'      => "  Name  ,  Surname  {$newline}  Joe  ,  Doe  ",
				'expected' => [
					'headers' => [ '  Name  ', '  Surname  ' ],
					'data'    => [
						[
							'  name  '    => 'Joe',
							'  surname  ' => 'Doe',
						],
					],
				],
				'options'  => [ 'trim_fields' => false ],
			],
		];
	}
}
