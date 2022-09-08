<?php
/**
 * FreshpressBlocks Helpers.
 *
 * @package FreshpressBlocks\Helpers
 * @subpackage Helpers
 */

if (
	! function_exists( 'fp_get_block_acf_fields' )
	&& function_exists( 'acf_prepare_block' )
	&& function_exists( 'acf_get_block_fields' )
) {
	/**
	 * Returns ACF fields defined for block.
	 *
	 * @param string $block_name The block's name.
	 *
	 * @return array
	 */
	function fp_get_block_acf_fields( $block_name ) {
		if ( 0 === strpos( $block_name, 'fpbk/' ) ) {
			$block_name = str_replace( 'fpbk/', 'acf/', $block_name );
		}
		if ( 0 !== strpos( $block_name, 'acf/' ) ) {
			$block_name = "acf/{$block_name}";
		}

		$block = acf_prepare_block( [ 'name' => $block_name ] );
		if ( $block ) {
			return acf_get_block_fields( $block );
		}

		return [];
	}
}

if ( ! function_exists( 'fp_translate_block_acf_fields_to_fpbk_attributes' ) ) {
	/**
	 * Translates ACF fields to React Gutenberg block's attributes fetched by block's name.
	 *
	 * @param string $block_name The block's name.
	 *
	 * @return array
	 */
	function fp_translate_block_acf_fields_to_fpbk_attributes( $block_name ) {
		$fpbk_attributes = [];

		if ( function_exists( 'fp_get_block_acf_fields' ) ) {
			$acf_fields = fp_get_block_acf_fields( $block_name );
			$fpbk_attributes = fp_do_translate_block_acf_fields_to_fpbk_attributes( $acf_fields );
		}

		return $fpbk_attributes;
	}
}

if ( ! function_exists( 'fp_do_translate_block_acf_fields_to_fpbk_attributes' ) ) {
	/**
	 * Translates ACF fields to React Gutenberg block's attributes.
	 *
	 * @param array  $acf_fields ACF fields.
	 * @param string $group_name Group name that fill be added as field prefix.
	 *
	 * @return array
	 */
	function fp_do_translate_block_acf_fields_to_fpbk_attributes( $acf_fields = [], $group_name = '' ) {
		$fpbk_attributes = [];

		if ( function_exists( 'fp_to_snake_case' ) && ! empty( $acf_fields ) ) {
			$acf_field_type_map = [
				'text'             => 'string',
				'textarea'         => 'string',
				'email'            => 'string',
				'url'              => 'string',
				'password'         => 'string',
				'wysiwyg'          => 'string',
				'select'           => 'string',
				'checkbox'         => 'array',
				'radio'            => 'string',
				'button_group'     => 'string',
				'true_false'       => 'boolean',
				'number'           => 'string',
				'range'            => 'integer',
				'image'            => 'object',
				'file'             => 'object',
				'oembed'           => 'object',
				'gallery'          => 'array',
				'link'             => 'object',
				'post_object'      => 'object',
				'page_link'        => 'object',
				'relationship'     => 'object',
				'taxonomy'         => 'object',
				'user'             => 'object',
				'google_map'       => 'object',
				'date_picker'      => 'object',
				'date_time_picker' => 'object',
				'time_picker'      => 'object',
				'color_picker'     => 'object',
				'message'          => 'object',
				'group'            => 'object',
				'repeater'         => 'array',
				'accordion'        => 'object',
			];

			/**
			 * Capture here is because fields in Accordion and Tabs are defined on same level as "Accordion" or "Tab".
			 * They don't have inner "Fields" where those could be defined.
			 * "Accordion" and "Tabs" simply start that type of element and ends whenever another one occurs.
			 */
			$capture_field_types = [ 'accordion', 'type' ];
			$capture_field_name = null;

			if ( is_array( $acf_fields ) ) {
				foreach ( $acf_fields as $acf_field ) {
					if ( 'clone' === $acf_field['type'] ) {
						// Handle fields from clone.
						$fpbk_attributes = array_merge(
							$fpbk_attributes,
							fp_do_translate_block_acf_fields_to_fpbk_attributes( $acf_field['sub_fields'] )
						);
					} else {
						// Copy all ACF field.
						$fpbk_field = $acf_field;

						// Preserve "original_type" and set correct type for Gutenberg block.
						$fpbk_field['original_type'] = $acf_field['type'];
						if ( ! empty( $acf_field_type_map[ $acf_field['type'] ] ) ) {
							$fpbk_field['type'] = $acf_field_type_map[ $acf_field['type'] ];
						}
						if ( 'select' === $fpbk_field['original_type'] && $acf_field['multiple'] > 0 ) {
							$fpbk_field['type'] = 'array';
						}

						// Set default value if exists.
						if ( isset( $acf_field['default_value'] ) ) {
							$fpbk_field['default'] = $acf_field['default_value'];
						}
						if ( 'repeater' === $acf_field['type'] ) {
							$fpbk_field['default'] = [];
						}
						if ( 'color_picker' === $acf_field['type'] && ! empty( $fpbk_field['default'] ) ) {
							$fpbk_field['default'] = [ 'hex' => $fpbk_field['default'] ];
						}

						// Set correct name. Some fields do not have "name" explicitly defined and for those we will take camel_cased "label".
						$name = ( $group_name ? $group_name . '_' : '' ) . ( ! empty( $acf_field['name'] ) ? $acf_field['name'] : fp_to_snake_case( $acf_field['label'] ) );
						$fpbk_attributes[ $name ] = $fpbk_field;

						// Handle capturing fields.
						if (
							! empty( $capture_field_name )
							&& ! in_array( $acf_field['type'], $capture_field_types )
							&& 'block_settings_tracking_section' !== $name
						) {
							$fpbk_attributes[ $capture_field_name ]['fields'][] = $name;
						}

						// Sets next capture field.
						if ( in_array( $acf_field['type'], $capture_field_types ) ) {
							$capture_field_name = $name;
						}

						// For groups move all fields to main level.
						if ( 'group' === $acf_field['type'] ) {
							$fpbk_attributes = array_merge(
								$fpbk_attributes,
								fp_do_translate_block_acf_fields_to_fpbk_attributes(
									$acf_field['sub_fields'],
									( '' !== $group_name ? "{$group_name}_" : '' ) . $acf_field['name'] // Full hierarchy group prefix.
									// $acf_field['name'] // Single group prefix.
								)
							);
						}
					}
				}
			}
		}

		return $fpbk_attributes;
	}
}
