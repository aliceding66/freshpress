<?php
/**
 * Tests function fp_get_schema_markup() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Schema_Markup_Test class.
 */
class FP_Get_Schema_Markup_Test extends FP_Base_Test {

	/**
	 * Stores get_field() for "schema_markup" return value.
	 *
	 * @var string
	 */
	private $schema_markup;

	/**
	 * Stores acf_get_field() for "schema_markup"["default_value"] return value.
	 *
	 * @var string
	 */
	private $default_schema_markup;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mockFunction(
			'get_field',
			function( $field ) {
				if ( 'schema_markup' === $field ) {
					return $this->schema_markup;
				} else {
					return '';
				}
			}
		);

		$this->mockFunction(
			'acf_get_field',
			function( $field ) {
				if ( 'schema_markup' === $field ) {
					return [ 'default_value' => $this->default_schema_markup ];
				} else {
					return '';
				}
			}
		);
	}

	/**
	 * Checks whether function fp_get_schema_markup() outputs expected schema markup.
	 *
	 * @dataProvider outputsExpectedSchemaMarkupDataProvider
	 *
	 * @param string $schema_markup Input schema markup.
	 * @param string $default_schema_markup Input default schema markup.
	 * @param string $expected_schema_markup Expected schema markup.
	 */
	public function testIfOutputsExpectedSchemaMarkup( $schema_markup, $default_schema_markup, $expected_schema_markup ) {
		$this->schema_markup = $schema_markup;
		$this->default_schema_markup = $default_schema_markup;

		$this->expectOutputString( $expected_schema_markup );
		fp_get_schema_markup();
	}

	/**
	 * Data provider for testIfOutputsExpectedSchemaMarkup().
	 *
	 * @return array
	 */
	public function outputsExpectedSchemaMarkupDataProvider() {
		return [
			'empty data'              => [
				'schema_markup'          => '',
				'default_schema_markup'  => '',
				'expected_schema_markup' => '',
			],
			'valid schema markup'     => [
				'schema_markup'          => '<script>SCHEMA</script>',
				'default_schema_markup'  => '<script>DEFAULT_SCHEMA</script>',
				'expected_schema_markup' => '<script>SCHEMA</script>',
			],
			'untrimmed schema markup' => [
				'schema_markup'          => '  <script>SCHEMA</script>  ',
				'default_schema_markup'  => '<script>DEFAULT_SCHEMA</script>',
				'expected_schema_markup' => '<script>SCHEMA</script>',
			],
			'invalid schema markup'   => [
				'schema_markup'          => 'SCHEMA',
				'default_schema_markup'  => '<script>DEFAULT_SCHEMA</script>',
				'expected_schema_markup' => '<script>DEFAULT_SCHEMA</script>',
			],
			'invalid schema markup and default schema markup' => [
				'schema_markup'          => 'SCHEMA',
				'default_schema_markup'  => 'DEFAULT_SCHEMA',
				'expected_schema_markup' => 'DEFAULT_SCHEMA', // Default schema markup has no validation.
			],
		];
	}
}
