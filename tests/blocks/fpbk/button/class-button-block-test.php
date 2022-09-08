<?php
/**
 * Tests ButtonBlock class.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . '/../../../class-fpbk-blocks-base-test.php';

/**
 * Blue CTA Bar block Test suite.
 */
class Button_Block_Test extends Fpbk_Blocks_Base_Test {
	/**
	 * Button_Block_Test setup.
	 */
	public function setUp() {
		parent::setUp();
		$this->passthru_fpbk_block_registration_functions();
	}

	/**
	 * Checks whether block adds proper class depending on selected block style.
	 */
	public function testWhenBlockStyleChosenThenCorrectButtonClassAdded() {
		$block = $this->get_fpbk_block( 'button' );
		$default_attributes = [ 'button_click_action' => 'open_link' ];
		$default_block_style_class = 'is-style-btn-cta-green';
		$default_button_class = 'btn-cta-green';
		$white_block_style_class = 'is-style-btn-white';
		$white_button_class = 'btn-white';

		// When no style is selected, then default button class should be set.
		$template_data_without_style_selected = $block->get_template_data( $default_attributes );
		$this->assertArrayHasKey( 'button_class_name', $template_data_without_style_selected );
		$this->assertStringContainsString( $default_button_class, $template_data_without_style_selected['button_class_name'] );

		// When green style is selected, then default button class should be set.
		$template_data_with_default_style_selected = $block->get_template_data( array_merge( $default_attributes, [ 'className' => $default_block_style_class ] ) );
		$this->assertArrayHasKey( 'button_class_name', $template_data_with_default_style_selected );
		$this->assertStringContainsString( $default_button_class, $template_data_with_default_style_selected['button_class_name'] );

		// When white style is selected, then white button class should be set.
		$template_data_with_white_style_selected = $block->get_template_data( array_merge( $default_attributes, [ 'className' => $white_block_style_class ] ) );
		$this->assertArrayHasKey( 'button_class_name', $template_data_with_white_style_selected );
		$this->assertStringContainsString( $white_button_class, $template_data_with_white_style_selected['button_class_name'] );
	}

	/**
	 * Checks whether button "target" property is set properly in all cases.
	 */
	public function testIfTargetIsSetCorrectly() {
		$block = $this->get_fpbk_block( 'button' );

		// Both "open_link" should not change output "target" value.
		$template_data_for_link_in_same_window = $block->get_template_data(
			[
				'button_click_action' => 'open_link',
				'button_link'         => [ 'target' => '_self' ],
			]
		);
		$this->assertEquals( '_self', $template_data_for_link_in_same_window['button_link']['target'] );
		$template_data_for_link_in_new_window = $block->get_template_data(
			[
				'button_click_action' => 'open_link',
				'button_link'         => [ 'target' => '_blank' ],
			]
		);
		$this->assertEquals( '_blank', $template_data_for_link_in_new_window['button_link']['target'] );

		// For "open_modal" "target" property should be changed to "modal".
		$template_data_for_modal = $block->get_template_data(
			[
				'button_click_action' => 'open_modal',
				'button_link'         => [ 'target' => '_self' ],
			]
		);
		$this->assertEquals( 'modal', $template_data_for_modal['button_link']['target'] );
	}
}
