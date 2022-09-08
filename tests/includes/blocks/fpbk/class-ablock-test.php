<?php
/**
 * Tests ABlock class.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . '/../../../class-fpbk-blocks-base-test.php';

/**
 * ABlock Test suite.
 */
class ABlock_Test extends Fpbk_Blocks_Base_Test {
	/**
	 * Setup for ABlock tests.
	 */
	public function setUp() {
		parent::setUp();
		$this->passthru_fpbk_block_registration_functions();
	}

	/**
	 * Checks whether data passed with set_static_template_data() are returned in get_template_data().
	 */
	public function testIfSetStaticTemplateDataIsPassingDataToTemplate() {
		// Example block.
		$block = $this->get_fpbk_block( 'article-card' );
		$test_value = 'test_value';

		$block->set_static_template_data(
			[
				'test' => $test_value,
			],
			'testName'
		);

		$block_data_in_template = $block->get_template_data();
		$this->assertArrayHasKey( 'test', $block_data_in_template );
		$this->assertEquals( $test_value, $block_data_in_template['test'] );
	}

	/**
	 * Checks whether get_wrapper_properties() returns properly formatted class.
	 */
	public function testIfGetWrapperAttributesReturnsProperClassName() {
		// Example block.
		$block_name = 'article-card';
		$block = $this->get_fpbk_block( $block_name );

		// Class property exists.
		$empty_properties = $block->get_wrapper_properties( [] );
		$this->assertStringContainsString( 'class="', $empty_properties );

		// Standard classes are added correctly.
		$empty_properties_classes = $this->extract_property( $empty_properties, 'class', true );
		$this->assertArrayHasKey( 'fp-block', $empty_properties_classes );
		$this->assertArrayHasKey( 'wp-block', $empty_properties_classes );
		$this->assertArrayHasKey( "wp-block-fpbk-{$block_name}", $empty_properties_classes );

		// Custom classes are added correctly.
		$custom_class = 'custom-class';
		$this->assertArrayNotHasKey( $custom_class, $empty_properties_classes );

		$properties_with_custom_class = $block->get_wrapper_properties( [], [ 'class' => $custom_class ] );
		$properties_with_custom_class_classes = $this->extract_property( $properties_with_custom_class, 'class', true );

		$this->assertArrayHasKey( $custom_class, $properties_with_custom_class_classes );

		// Align class is added correctly.
		$align = 'right';
		$this->assertArrayNotHasKey( "align{$align}", $empty_properties_classes );

		$properties_with_align = $block->get_wrapper_properties( [ 'align' => $align ] );
		$properties_with_align_classes = $this->extract_property( $properties_with_align, 'class', true );

		$this->assertArrayHasKey( "align{$align}", $properties_with_align_classes );

		// Tracking section class is added correctly.
		$tracking_section = 'tracker-id';
		$this->assertArrayNotHasKey( "trackingSection-{$tracking_section}", $empty_properties_classes );

		$properties_with_tracking_section = $block->get_wrapper_properties( [ 'block_settings_tracking_section' => $tracking_section ] );
		$properties_with_tracking_section_classes = $this->extract_property( $properties_with_tracking_section, 'class', true );

		$this->assertArrayHasKey( "trackingSection-{$tracking_section}", $properties_with_tracking_section_classes );

		// Wide block classes are added correctly.
		$this->assertArrayNotHasKey( 'wide-block', $empty_properties_classes );
		$this->assertArrayNotHasKey( 'wide-block--padded', $empty_properties_classes );

		$properties_with_wide_block = $block->get_wrapper_properties(
			[
				'block_settings_wide_block' => true,
				'block_settings_narrow_content_within_wide_block' => true,
			]
		);
		$properties_with_wide_block_classes = $this->extract_property( $properties_with_wide_block, 'class', true );

		$this->assertArrayHasKey( 'wide-block', $properties_with_wide_block_classes );
		$this->assertArrayHasKey( 'wide-block--padded', $properties_with_wide_block_classes );

		// Styles override classes are added correctly.
		$padding_override_without_breakpoint = [
			'property'  => 'p',
			'direction' => 'r',
			'amount'    => 2,
		];
		$padding_without_breakpoint_class = 'pr-2';

		$padding_override_with_default_breakpoint = [
			'property'   => 'p',
			'direction'  => 'y',
			'amount'     => 8,
			'breakpoint' => 'null',
		];
		$padding_with_default_breakpoint_class = 'py-8';

		$margin_override_with_mobile_breakpoint = [
			'property'   => 'm',
			'direction'  => 'x',
			'amount'     => 4,
			'breakpoint' => '-sm',
		];
		$margin_with_mobile_breakpoint_class = 'mx-sm-4';

		$this->assertArrayNotHasKey( $padding_without_breakpoint_class, $empty_properties_classes );
		$this->assertArrayNotHasKey( $padding_with_default_breakpoint_class, $empty_properties_classes );
		$this->assertArrayNotHasKey( $margin_with_mobile_breakpoint_class, $empty_properties_classes );

		$properties_with_styles_overrides = $block->get_wrapper_properties( [ 'style_overrides' => [ $padding_override_without_breakpoint, $padding_override_with_default_breakpoint, $margin_override_with_mobile_breakpoint ] ] );
		$properties_with_styles_overrides_classes = $this->extract_property( $properties_with_styles_overrides, 'class', true );

		$this->assertArrayHasKey( $padding_without_breakpoint_class, $properties_with_styles_overrides_classes );
		$this->assertArrayHasKey( $padding_with_default_breakpoint_class, $properties_with_styles_overrides_classes );
		$this->assertArrayHasKey( $margin_with_mobile_breakpoint_class, $properties_with_styles_overrides_classes );
	}

	/**
	 * Checks whether get_wrapper_properties() returns proper id.
	 */
	public function testIfGetWrapperAttributesReturnsProperId() {
		// Example block.
		$block = $this->get_fpbk_block( 'article-card' );
		$id = 'id-value';
		$anchor = 'anchor-value';

		// If id or anchor property was not passed, then it doesn't exists.
		$properties_without_id_and_anchor = $block->get_wrapper_properties( [] );
		;
		$this->assertStringNotContainsString( 'id="', $properties_without_id_and_anchor );

		// If id property was passed, then id exists.
		$properties_with_id = $block->get_wrapper_properties( [ 'id' => $id ] );
		$properties_with_id_value = $this->extract_property( $properties_with_id, 'id' );
		$this->assertStringContainsString( 'id="', $properties_with_id );
		$this->assertEquals( $id, $properties_with_id_value );

		// If anchor property was passed, then id exists.
		$properties_with_anchor = $block->get_wrapper_properties( [ 'anchor' => $anchor ] );
		$properties_with_anchor_value = $this->extract_property( $properties_with_anchor, 'id' );
		$this->assertStringContainsString( 'id="', $properties_with_anchor );
		$this->assertEquals( $anchor, $properties_with_anchor_value );

		// If id and anchor property was passed, then id exists and it has anchor value.
		$properties_with_id_and_anchor = $block->get_wrapper_properties(
			[
				'id'     => $id,
				'anchor' => $anchor,
			]
		);
		$properties_with_id_and_anchor_value = $this->extract_property( $properties_with_id_and_anchor, 'id' );
		$this->assertStringContainsString( 'id="', $properties_with_id_and_anchor );
		$this->assertEquals( $anchor, $properties_with_id_and_anchor_value );
	}

	/**
	 * Checks whether get_wrapper_properties() returns custom property.
	 */
	public function testIfGetWrapperAttributesReturnsCustomProperty() {
		// Example block.
		$block = $this->get_fpbk_block( 'article-card' );

		$custom_property_name = 'data-custom-field';
		$custom_property_value = 'test-value';

		// Custom property was not passed and should not exist.
		$empty_properties = $block->get_wrapper_properties( [] );
		$this->assertStringNotContainsString( "{$custom_property_name}=\"", $empty_properties );

		// Custom property was passed and it should exists.
		$properties_with_custom_property = $block->get_wrapper_properties( [], [ $custom_property_name => $custom_property_value ] );
		$properties_with_custom_property_value = $this->extract_property( $properties_with_custom_property, $custom_property_name );
		$this->assertStringContainsString( "{$custom_property_name}=\"", $properties_with_custom_property );
		$this->assertEquals( $custom_property_value, $properties_with_custom_property_value );
	}

	/**
	 * Checks whether empty image/link/file values are escaped to be empty strings.
	 */
	public function testWhenEmptyObjectThenFieldSetAsEmptyArray() {
		// Init empty objects.
		$empty_objects = [
			'image' => [
				'id'     => null,
				'url'    => '',
				'alt'    => '',
				'sizes'  => [],
				'width'  => '',
				'height' => '',
			],
			'link'  => [
				'url'           => '',
				'title'         => '',
				'opensInNewTab' => false,
				'target'        => '_self',
			],
			'file'  => [
				'id'       => null,
				'filename' => '',
				'url'      => '',
				'subtype'  => '',
			],
		];
		// Get example block.
		$block = $this->get_fpbk_block( 'article-card' );

		foreach ( $empty_objects as $object_type => $empty_object ) {
			// Reproduce fetching template data and check assert.
			$standard_block_template_data = $block->get_template_data( [ $object_type => $empty_object ] );
			$this->assertEquals(
				'',
				$standard_block_template_data[ $object_type ],
				"Empty {$object_type} object was not escaped"
			);

			// Reproduce fetching template data from repeater field and check assert.
			$inside_repeater_block_template_data = $block->get_template_data(
				[
					'repeater' => [
						[ $object_type => $empty_object ],
						[ $object_type => $empty_object ],
					],
				]
			);

			$this->assertEquals(
				'',
				$inside_repeater_block_template_data['repeater'][0][ $object_type ],
				"Empty {$object_type} object was not escaped inside Repeater at index 0"
			);
			$this->assertEquals(
				'',
				$inside_repeater_block_template_data['repeater'][1][ $object_type ],
				"Empty {$object_type} object was not escaped inside Repeater at index 1"
			);
		}
	}

	/**
	 * Checks whether enabled render_rest_api_endpoint end up with working REST API url.
	 */
	public function testWhenRenderEndpointEnabledThenRestApiActionIsCalled() {
		$block_name_with_rest_render_enabled = 'related-links';
		WP_Mock::expectActionAdded( 'rest_api_init', function() { } );
		$this->get_fpbk_block( $block_name_with_rest_render_enabled );

		$block_name_with_rest_render_disabled = 'article-card';
		WP_Mock::expectActionNotAdded( 'rest_api_init', function() { } );
		$this->get_fpbk_block( $block_name_with_rest_render_disabled );
	}

	/**
	 * Checks whether field that do not match Conditional Logic is not available in blocks data.
	 */
	public function testWhenFieldIsNotMatchingConditionalLogicThenFieldIsUndefined() {
		$block = $this->get_fpbk_block( 'button' );

		// Recreates Conditional Logic data.
		$button_click_action_key = 'button_click_action_key';
		$button_modal_id_key = 'button_modal_id_key';
		$block->set_block_attributes(
			[
				'button_click_action' => [
					'key'  => $button_click_action_key,
					'name' => 'button_click_action',
				],
				'button_modal_id'     => [
					'key'               => $button_modal_id_key,
					'name'              => 'button_modal_id',
					'conditional_logic' => [
						[
							[
								'field'    => $button_click_action_key,
								'operator' => '==',
								'value'    => 'open_modal',
							],
						],
					],
				],
			]
		);

		// Perform tests.
		$modal_id = 'modal_id';
		$block_data_with_conditional_logic_matched = $block->filter_block_attributes(
			[
				'button_click_action' => 'open_modal',
				'button_modal_id'     => $modal_id,
			],
			[]
		);
		$this->assertEquals( $modal_id, $block_data_with_conditional_logic_matched['button_modal_id'], 'Conditional Logic was matched and field has wrong value.' );

		$block_data_with_conditional_logic_not_matched = $block->filter_block_attributes(
			[
				'button_click_action' => 'open_link',
				'button_modal_id'     => $modal_id,
			]
		);
		$this->assertArrayNotHasKey( 'button_modal_id', $block_data_with_conditional_logic_not_matched, 'Conditional Logic was not matched and field still exists.' );
	}

	/**
	 * Checks whether WYSIWYG fields are formatted using autop function.
	 */
	public function testWhenWysiwygFieldThenAutopIsCalled() {
		$block = $this->get_fpbk_block( 'blue-cta-bar' );
		// Recreate block attributes to match 1 normal wysiwyg field and 1 in-repeater wysiwyg field.
		$block->set_block_attributes(
			[
				'blue_cta_bar_text' => [
					'name'          => 'blue_cta_bar_text',
					'original_type' => 'wysiwyg',
				],
				'repeater'          => [
					'original_type' => 'repeater',
					'sub_fields'    => [
						[
							'name' => 'second_blue_cta_bar_text',
							'type' => 'wysiwyg',
						],
					],
				],
			]
		);

		// Set test expectations.
		\WP_Mock::userFunction(
			'wpautop',
			[
				'times' => 3,
			]
		);

		// Trigger function that should call wpautop.
		$block->get_template_data(
			[
				'blue_cta_bar_text' => 'Example text', // 1.
				'repeater'          => [
					[ 'second_blue_cta_bar_text' => 'Example Text' ], // 2.
					[ 'second_blue_cta_bar_text' => 'Example Text' ], // 3.
				],
			]
		);
	}

	/**
	 * Extract content of single property from property string.
	 *
	 * @param string $properties String that contains all properties.
	 * @param string $property_to_extract Property name to extract.
	 * @param bool   $as_array If property needs to be exploded by spaces.
	 * @return string|array
	 */
	private function extract_property( $properties, $property_to_extract, $as_array = false ) {
		preg_match( "/{$property_to_extract}=\"([a-zA-Z0-9\-_ ]+)\"/", $properties, $matches );
		if ( ! empty( $matches[1] ) ) {
			return $as_array ? array_flip( explode( ' ', $matches[1] ) ) : $matches[1];
		}

		return $as_array ? [] : '';
	}
}
