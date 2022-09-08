<?php
/**
 * Tests function fp_register_post_type() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Register_Post_Type_Test class.
 */
class FP_Register_Post_Type_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		$this->use_default_mocks['register_post_type'] = false;

		parent::setUp();
	}

	/**
	 * Checks whether function fp_register_post_type() return expected value.
	 *
	 * @dataProvider postGetsRegisteredDataProvider
	 *
	 * @param string $post_type Post type.
	 * @param string $post_type_plural Post type plural.
	 * @param string $label Label.
	 * @param string $label_plural Label plural.
	 * @param bool   $post_was_registered Expected value.
	 */
	public function testIfPostGetsRegistered( $post_type, $post_type_plural, $label, $label_plural, $post_was_registered ) {
		WP_Mock::userFunction(
			'register_post_type',
			[
				'times' => true === $post_was_registered ? 1 : 0,
			]
		);

		fp_register_post_type( $post_type, $post_type_plural, $label, $label_plural );
	}

	/**
	 * Checks whether function fp_register_post_type() fill plural variations with values from single correctly.
	 */
	public function testIfPluralIsFilledWithSingularValues() {
		$test_passed = true;

		\WP_Mock::userFunction(
			'register_post_type',
			[
				'times'  => 1,
				'return' => function( $post_type, $args ) use ( &$test_passed ) {
					if (
						'Article' !== $args['labels']['name'] // Plural label.
						|| 'article' !== $args['rewrite']['slug']  // Plural post_type is used only here.
					) {
						$test_passed = false;
					}
				},
			]
		);

		fp_register_post_type( 'article', '', 'Article', '' );
		$this->assertTrue( $test_passed, 'Plural variation was not correctly set.' );
	}

	/**
	 * Data provider for testIfPostGetsRegistered().
	 *
	 * @return array
	 */
	public function postGetsRegisteredDataProvider() {
		return [
			'working data'                => [
				'post_type'           => 'article',
				'post_type_plural'    => 'articles',
				'label'               => 'Article',
				'label_plural'        => 'Articles',
				'post_was_registered' => true,
			],
			'post_type is required field' => [
				'post_type'           => '',
				'post_type_plural'    => 'articles',
				'label'               => 'Article',
				'label_plural'        => 'Articles',
				'post_was_registered' => false,
			],
			'label is required field'     => [
				'post_type'           => 'article',
				'post_type_plural'    => 'articles',
				'label'               => '',
				'label_plural'        => 'Articles',
				'post_was_registered' => false,
			],
		];
	}
}
