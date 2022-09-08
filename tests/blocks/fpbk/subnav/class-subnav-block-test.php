<?php
/**
 * Tests SubnavBlock class.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . '/../../../class-fpbk-blocks-base-test.php';

/**
 * Subnav block Test suite.
 */
class Subnav_Block_Test extends Fpbk_Blocks_Base_Test {
	/**
	 * Subnav_Block_Test setup.
	 */
	public function setUp() {
		parent::setUp();
		$this->passthru_fpbk_block_registration_functions();
		Mockery::mock( 'Walker_Nav_Menu' );
	}

	/**
	 * Checks.
	 */
	public function testDefaultMenu() {
		$block = $this->get_fpbk_block( 'subnav' );
		$default_menu = [
			'key'   => 'subnav-menu',
			'label' => 'Subnav Menu',
		];
		$another_menu = [
			'key'   => 'another-menu',
			'label' => 'Another Menu',
		];

		// Set menu source as block stadard attributes.
		WP_Mock::userFunction(
			'wp_get_nav_menus',
			[
				'return' => [],
			]
		);
		$block->set_block_attributes(
			[
				'subnav_menu' => [
					'choices' => [
						$default_menu['key'] => $default_menu['label'],
						$another_menu['key'] => $another_menu['label'],
					],
				],
			]
		);

		// Passing nothing results in default menu.
		$menu_without_passed_menu = $block->get_subnav_menu();
		$this->assertEquals( $default_menu['label'], $menu_without_passed_menu );

		// Passing specific menu results in that specific menu.
		$menu_with_another_menu = $block->get_subnav_menu( $another_menu['key'] );
		$this->assertEquals( $another_menu['label'], $menu_with_another_menu );

		// Passing specific empty menu results in empty menu (not default).
		$menu_with_empty_menu = $block->get_subnav_menu( '' );
		$this->assertEmpty( $menu_with_empty_menu );
	}

	/**
	 * Checks.
	 */
	public function testDefaultMenuFromFallbackLogic() {
		$block = $this->get_fpbk_block( 'subnav' );
		$default_menu = [
			'key'   => 'subnav-menu',
			'label' => 'Subnav Menu',
		];
		$another_menu = [
			'key'   => 'another-menu',
			'label' => 'Another Menu',
		];

		// Set menu source as "fp_add_menus_to_field_choices" within block that uses "wp_get_nav_menus".
		WP_Mock::userFunction(
			'wp_get_nav_menus',
			[
				'return' => [
					(object) [
						'slug' => $default_menu['key'],
						'name' => $default_menu['label'],
					],
					(object) [
						'slug' => $another_menu['key'],
						'name' => $another_menu['label'],
					],
				],
			]
		);
		$block->set_block_attributes(
			[
				'subnav_menu' => [
					'choices' => [],
				],
			]
		);

		// Passing nothing results in default menu.
		$menu_without_passed_menu = $block->get_subnav_menu();
		$this->assertEquals( $default_menu['label'], $menu_without_passed_menu );

		// Passing specific menu results in that specific menu.
		$menu_with_another_menu = $block->get_subnav_menu( $another_menu['key'] );
		$this->assertEquals( $another_menu['label'], $menu_with_another_menu );

		// Passing specific empty menu results in empty menu (not default).
		$menu_with_empty_menu = $block->get_subnav_menu( '' );
		$this->assertEmpty( $menu_with_empty_menu );
	}
}
