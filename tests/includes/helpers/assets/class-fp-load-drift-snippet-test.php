<?php
/**
 * Tests fp_load_drift_snippet() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Load_Drift_Snippet_Test class.
 */
class FP_Load_Drift_Snippet_Test extends FP_Base_Test {

	const PAGE_A_ID = 1;
	const PAGE_B_ID = 2;
	const DRIFT_EXCEPT_MODE = 'everywhere_except';
	const DRIFT_INCLUDE_MODE = 'only_on';
	const DRIFT_SNIPPET = '--drift--';

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		$this->use_default_mocks['is_admin'] = false;

		parent::setUp();
	}

	/**
	 * Checks whether Drift snippet is not included on admin pages.
	 */
	public function testIfSnippetIsNotIncludedOnAdminPages() {
		WP_Mock::userFunction(
			'is_admin',
			[
				'return' => true,
			]
		);

		$this->expectOutputRegex( '/^$/' );

		fp_load_chatbot_snippet( 'drift' );
	}

	/**
	 * Checks whether fp_load_chatbot_snippet( 'drift' ) return expected value for different cases.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param array $get_field_return get_field() mocked return values.
	 * @param int   $current_post_id Value to mock which post ID is current one.
	 * @param bool  $expect_snippet Whether expect drift snippet or not.
	 */
	public function testIfReturnsExpectedResult( $get_field_return, $current_post_id, $expect_snippet ) {
		$get_field_return['drift_snippet'] = self::DRIFT_SNIPPET;

		WP_Mock::userFunction(
			'is_admin',
			[
				'return' => false,
			]
		);

		WP_Mock::userFunction(
			'get_the_ID',
			[
				'return' => $current_post_id,
			]
		);

		WP_Mock::userFunction(
			'get_queried_object',
			[
				'return' => new stdClass(),
			]
		);

		$this->mockFunction(
			'get_field',
			function( $field_name ) use ( $get_field_return ) {
				if ( isset( $get_field_return[ $field_name ] ) ) {
					return $get_field_return[ $field_name ];
				} else {
					return '';
				}
			}
		);

		if ( $expect_snippet ) {
			$this->expectOutputRegex( '/' . self::DRIFT_SNIPPET . '\s*/' );
		} else {
			$this->expectOutputRegex( '/^$/' );
		}

		fp_load_chatbot_snippet( 'drift' );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'drift disabled'                     => [
				'get_field_return' => [
					'drift_enabled'        => false,
					'drift_include_mode'   => '',
					'drift_selected_pages' => [],
				],
				'current_post_id'  => self::PAGE_A_ID,
				'expect_snippet'   => false,
			],
			'drift enabled with no data defined' => [
				'get_field_return' => [
					'drift_enabled'        => true,
					'drift_include_mode'   => '',
					'drift_selected_pages' => [],
				],
				'current_post_id'  => self::PAGE_A_ID,
				'expect_snippet'   => false,
			],
			'drift included on page A is visible on page A' => [
				'get_field_return' => [
					'drift_enabled'        => true,
					'drift_include_mode'   => self::DRIFT_INCLUDE_MODE,
					'drift_selected_pages' => [ self::PAGE_A_ID ],
				],
				'current_post_id'  => self::PAGE_A_ID,
				'expect_snippet'   => true,
			],
			'drift included on page A is not visible on page B' => [
				'get_field_return' => [
					'drift_enabled'        => true,
					'drift_include_mode'   => self::DRIFT_INCLUDE_MODE,
					'drift_selected_pages' => [ self::PAGE_A_ID ],
				],
				'current_post_id'  => self::PAGE_B_ID,
				'expect_snippet'   => false,
			],
			'drift excluded on page A is not visible on page A' => [
				'get_field_return' => [
					'drift_enabled'        => true,
					'drift_include_mode'   => self::DRIFT_EXCEPT_MODE,
					'drift_selected_pages' => [ self::PAGE_A_ID ],
				],
				'current_post_id'  => self::PAGE_A_ID,
				'expect_snippet'   => false,
			],
			'drift excluded on page A is visible on page B' => [
				'get_field_return' => [
					'drift_enabled'        => true,
					'drift_include_mode'   => self::DRIFT_EXCEPT_MODE,
					'drift_selected_pages' => [ self::PAGE_A_ID ],
				],
				'current_post_id'  => self::PAGE_B_ID,
				'expect_snippet'   => true,
			],
			'drift with unsupported include mode on page A is not visible on page A' => [
				'get_field_return' => [
					'drift_enabled'        => true,
					'drift_include_mode'   => 'include_snippet_sir',
					'drift_selected_pages' => [ self::PAGE_A_ID ],
				],
				'current_post_id'  => self::PAGE_A_ID,
				'expect_snippet'   => false,
			],
			'drift with unsupported include mode on page A is not visible on page B' => [
				'get_field_return' => [
					'drift_enabled'        => true,
					'drift_include_mode'   => 'include_snippet_sir',
					'drift_selected_pages' => [ self::PAGE_A_ID ],
				],
				'current_post_id'  => self::PAGE_B_ID,
				'expect_snippet'   => false,
			],
		];
	}
}
