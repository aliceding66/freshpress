<?php
/**
 * Tests fp_modify_menu_link_attributes() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Modify_Menu_Link_Attributes_Test class.
 */
class FP_Modify_Menu_Link_Attributes_Test extends FP_Base_Test {

	/**
	 * Checks whether function fp_modify_menu_link_attributes() properly handles link attributes.
	 *
	 * @dataProvider properlyHandlesLinkAttributesDataProvider
	 *
	 * @param array   $attributes Input attributes.
	 * @param WP_Post $link Link element.
	 * @param array   $expected_attributes Expected attributes value.
	 */
	public function testIfProperlyHandlesLinkAttributes( $attributes, $link, $expected_attributes ) {
		$this->assertEquals( $expected_attributes, fp_modify_menu_link_attributes( $attributes, $link ) );
	}

	/**
	 * Data provider for testIfProperlyHandlesLinkAttributes().
	 *
	 * @return array
	 */
	public function properlyHandlesLinkAttributesDataProvider() {
		return [
			'empty data'                                  => [
				'attributes'          => [],
				'link'                => new WP_Post(),
				'expected_attributes' => [],
			],
			'link with unsupported "classes" passed'      => [
				'attributes'          => [],
				'link'                => new WP_Post( [ 'classes' => [ 'class-a', 'class-b' ] ] ),
				'expected_attributes' => [],
			],
			'link with supported "link_classes" as array' => [
				'attributes'          => [],
				'link'                => new WP_Post( [ 'link_classes' => [ 'class-a', 'class-b' ] ] ),
				'expected_attributes' => [ 'class' => 'class-a class-b' ],
			],
			'link with "link_classes" as string'          => [
				'attributes'          => [],
				'link'                => new WP_Post( [ 'link_classes' => 'class-a,class-b class-c' ] ),
				'expected_attributes' => [ 'class' => 'class-a,class-b class-c' ],
			],
			'link with "link_classes" overrides input class attribute' => [
				'attributes'          => [ 'class' => 'class-a' ],
				'link'                => new WP_Post( [ 'link_classes' => [ 'class-b' ] ] ),
				'expected_attributes' => [ 'class' => 'class-b' ],
			],
		];
	}
}
