<?php
/**
 * Tests fp_add_current_item_class_fallback() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Add_Current_Item_Class_Fallback_Test class.
 */
class FP_Add_Current_Item_Class_Fallback_Test extends FP_Base_Test {

	const CURRENT_PATH = '/current-path';
	const CURRENT_MENU_ITEM_CLASS = 'current-menu-item';

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mockFunction(
			'fp_get_server_var',
			function( $var ) {
				if ( 'REQUEST_URI' === $var ) {
					return self::CURRENT_PATH;
				} else {
					return '';
				}
			}
		);
	}

	/**
	 * Checks whether function fp_add_current_item_class_fallback() properly adds current-menu-item class.
	 *
	 * @dataProvider properlyAddsCurrentMenuItemClassDataProvider
	 *
	 * @param array $links Links to be parsed.
	 * @param array $expected Expected links classes.
	 */
	public function testIfProperlyAddsCurrentMenuItemClass( $links, $expected ) {
		$parsed_links = fp_add_current_item_class_fallback( $links );

		foreach ( $expected as $expected_link_index => $expected_classes ) {
			$this->assertIsArray( $parsed_links[ $expected_link_index ]->classes );
			if ( ! empty( $expected_classes ) ) {
				foreach ( $expected_classes as $expected_class ) {
					$this->assertContains( $expected_class, $parsed_links[ $expected_link_index ]->classes );
				}
			} else {
				$this->assertEmpty( $parsed_links[ $expected_link_index ]->classes );
			}
		}
	}

	/**
	 * Data provider for testIfProperlyAddsCurrentMenuItemClass().
	 *
	 * @return array
	 */
	public function properlyAddsCurrentMenuItemClassDataProvider() {
		return [
			'empty data'                      => [
				'links'    => [],
				'expected' => [],
			],
			'some links without current path' => [
				'links'    => [
					$this->getLink( '/page' ),
					$this->getLink( '/post' ),
					$this->getLink( '/article' ),
				],
				'expected' => [
					0 => [],
					1 => [],
					2 => [],
				],
			],
			'some links with current path'    => [
				'links'    => [
					$this->getLink( '/page' ),
					$this->getLink( self::CURRENT_PATH ),
					$this->getLink( '/article' ),
				],
				'expected' => [
					0 => [],
					1 => [ self::CURRENT_MENU_ITEM_CLASS ],
					2 => [],
				],
			],
			'current menu item is not overriding previous classes' => [
				'links'    => [
					$this->getLink( '/page' ),
					$this->getLink( self::CURRENT_PATH, 'custom', [ 'class-a', 'class-b' ] ),
					$this->getLink( '/article' ),
				],
				'expected' => [
					0 => [],
					1 => [ 'class-a', 'class-b', self::CURRENT_MENU_ITEM_CLASS ],
					2 => [],
				],
			],
			'link with type different then "type" is not handled' => [
				'links'    => [
					$this->getLink( '/page' ),
					$this->getLink( self::CURRENT_PATH, 'link-type' ),
					$this->getLink( '/article' ),
				],
				'expected' => [
					0 => [],
					1 => [],
					2 => [],
				],
			],
		];
	}

	/**
	 * Helper function to mock link objects.
	 *
	 * @param string $path Link path.
	 * @param string $type Link type.
	 * @param array  $classes Link classes.
	 *
	 * @return WP_Post
	 */
	private function getLink( $path, $type = 'custom', $classes = [] ) {
		return new WP_Post(
			[
				'url'     => 'https://www.dev.freshenv.com' . $path,
				'type'    => $type,
				'classes' => $classes,
			]
		);
	}
}
