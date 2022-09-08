<?php
/**
 * Tests function fp_register_taxonomy() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Register_Taxonomy_Test class.
 */
class FP_Register_Taxonomy_Test extends FP_Base_Test {

	/**
	 * Checks whether function fp_register_taxonomy() return expected value.
	 *
	 * @dataProvider taxonomyGetsRegisteredDataProvider
	 *
	 * @param string $taxonomy Post type.
	 * @param string $taxonomy_plural Post type plural.
	 * @param string $label Label.
	 * @param string $label_plural Label plural.
	 * @param bool   $taxonomy_was_registered Expected value.
	 */
	public function testIfTaxonomyGetsRegistered( $taxonomy, $taxonomy_plural, $label, $label_plural, $taxonomy_was_registered ) {
		WP_Mock::userFunction(
			'register_taxonomy',
			[
				'times' => true === $taxonomy_was_registered ? 1 : 0,
			]
		);

		fp_register_taxonomy( $taxonomy, $taxonomy_plural, $label, $label_plural, [ 'post' ] );
	}

	/**
	 * Checks whether function fp_register_taxonomy() fill plural variations with values from single correctly.
	 */
	public function testIfPluralIsFilledWithSingularValues() {
		$test_passed = true;

		\WP_Mock::userFunction(
			'register_taxonomy',
			[
				'times'  => 1,
				'return' => function( $taxonomy, $post_types, $args ) use ( &$test_passed ) {
					if (
						'Article' !== $args['labels']['name'] // Plural label.
						|| 'article' !== $args['rest_base']  // Plural taxonomy is used only here.
					) {
						$test_passed = false;
					}
				},
			]
		);

		fp_register_taxonomy( 'article', '', 'Article', '', [ 'post' ] );
		$this->assertTrue( $test_passed, 'Plural variation was not correctly set.' );
	}

	/**
	 * Data provider for testIfTaxonomyGetsRegistered().
	 *
	 * @return array
	 */
	public function taxonomyGetsRegisteredDataProvider() {
		return [
			'working data'               => [
				'taxonomy'                => 'article',
				'taxonomy_plural'         => 'articles',
				'label'                   => 'Article',
				'label_plural'            => 'Articles',
				'taxonomy_was_registered' => true,
			],
			'taxonomy is required field' => [
				'taxonomy'                => '',
				'taxonomy_plural'         => 'articles',
				'label'                   => 'Article',
				'label_plural'            => 'Articles',
				'taxonomy_was_registered' => false,
			],
			'label is required field'    => [
				'taxonomy'                => 'article',
				'taxonomy_plural'         => 'articles',
				'label'                   => '',
				'label_plural'            => 'Articles',
				'taxonomy_was_registered' => false,
			],
		];
	}
}
