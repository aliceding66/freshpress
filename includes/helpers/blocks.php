<?php
/**
 * Helper functions for blocks.
 *
 * @package FreshPress\Website
 */

/**
 * Render a block by name with optional attributes passed to the template.
 *
 * @deprecated 1.0.0 fp_render_blocks should always be used instead.
 *
 * @param string $name Name of registered block.
 * @param array  $attr Optional attributes passed to the template.
 * @return string
 */
function fp_render_block( $name = null, $attr = [] ) {
	if ( empty( $name ) ) {
		return '';
	}

	if ( empty( $attr['id'] ) ) {
		$attr['id'] = $name;
	}

	if ( empty( $attr['name'] ) ) {
		if ( in_array( "fpbk/$name", array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() ) ) ) {
			$attr['name'] = "fpbk/$name";
		} else {
			$attr['name'] = "acf/$name";
		}
	}

	return do_blocks( '<!-- wp:' . $attr['name'] . ' ' . wp_json_encode( $attr ) . ' /-->' );
}

/**
 * Render blocks by parsing an array of blocks, attributes, and inner content.
 *
 * $input can receive a single string, which renders a block without attributes, or an array
 * which takes the form [ 'name' => '', 'attrs' => [], 'content' => [] ] and allows nesting.
 *
 * @param array|string $input  Array of blocks, but can also handle strings in most cases.
 * @param int          $nested Level of nesting - this should never be set on initial call.
 * @return string
 */
function fp_render_blocks( $input = [], $nested = 0 ) {
	// Initialise output as an empty string to prevent problems with concatenation on unset values.
	$output = '';

	// Skip if there's no input or we are headed down a nesting rabbit hole (a warren?).
	if ( empty( $input ) || ( ! empty( $nested ) && $nested > 10 ) ) {
		return $output;
	}

	// Most cases will involve an array of arrays (possibly of arrays).
	if ( is_array( $input ) ) {

		// All properly nested blocks will have a name attribute.
		if ( ! empty( $input['name'] ) ) {
			// Parse the block name to get prefix/block_name parts. Default to 'acf'
			// prefix if none specified, so our custom blocks can be referenced by
			// name only.
			if ( strpos( $input['name'], '/', 1 ) !== false ) {
				list( $prefix, $block_name ) = explode( '/', $input['name'], 2 );
			} else {
				$block_name = $input['name'];
				if ( in_array( "fpbk/$block_name", array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() ) ) ) {
					$prefix = 'fpbk';
				} else {
					$prefix = 'acf';
				}
			}

			// Ensure we have a block attrs array.
			$attrs = ! empty( $input['attrs'] ) && is_array( $input['attrs'] ) ? $input['attrs'] : [];

			// Set the block's name attribute if there isn't one specified.
			if ( empty( $attrs['name'] ) ) {
				$attrs['name'] = "$prefix/$block_name";
			}

			// Ensure we have a unique ID attribute.
			$attrs['id'] = fp_get_block_id( $attrs );

			// Handle that fpbk blocks doesn't require "data" wrapper in "attrs".
			if ( 'fpbk' === $prefix && ! empty( $attrs['data'] ) ) {
				$data = $attrs['data'];
				unset( $attrs['data'] );
				$attrs = array_merge( $attrs, $data );
			}

			// Add block opening tag with JSON encoded attributes to output.
			$output .= "<!-- wp:{$attrs['name']} " . wp_json_encode( array_filter( $attrs ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) . ' -->';

			// Add inner content to output.
			if ( ! empty( $input['content'] ) ) {
				$output .= fp_render_blocks( $input['content'], $nested + 1 );
			}

			// Add block closing tag to output.
			$output .= "<!-- /wp:{$attrs['name']} -->";
		} else {
			// We are dealing with a string or oddly-nested array, so keep recursing.
			foreach ( $input as $block ) {
				// Skip empty blocks.
				if ( ! empty( $block ) ) {
					$output .= fp_render_blocks( $block, $nested + 1 );
				}
			}
		}
	} elseif ( is_string( $input ) ) {
		if ( strpos( $input, '/', 1 ) !== false ) {
			$exploded_input = explode( '/', $input, 2 );
			$block_name = $exploded_input[1];
		} else {
			$block_name = $input;
		}
		// Handle edge cases where strings are provided as-is.
		if ( in_array( $block_name, fp_get_fpbk_blocks(), true ) || in_array( $block_name, fp_get_acf_blocks(), true ) ) {
			$output .= fp_render_blocks( [ 'name' => $input ], $nested + 1 );
		} else {
			$output .= $input;
		}
	}

	// If we're still recursing don't parse the blocks yet.
	return $nested ? $output : do_blocks( $output );
}

/**
 * Register an ACF Pro Block with `name`, `enqueue_assets`, and either `render_template`
 * or `render_callback` set automatically from the name of the block. To override the
 * automatic naming, simply pass that value as part of the $attr array.
 *
 * @param string $name Name of the block being registered.
 * @param array  $attr Other attributes to be passed to acf_register_block_type.
 */
function fp_register_acf_block( $name, $attr = [] ) {

	if ( function_exists( 'acf_register_block_type' ) ) {
		$attr['name'] = $name;
		$asset_name = "acf-{$name}-{$name}";
		$has_styles = ! empty( $attr['enqueue_style'] );

		if ( ! array_key_exists( 'enqueue_assets', $attr ) ) {
			if ( file_exists( get_stylesheet_directory() . "/blocks/acf/${name}/${name}.scss" ) ) {
				wp_register_style( $name, fp_get_asset( "styles/blocks-${asset_name}.css" ), [], null );
				$has_styles = true;
			}
			if ( file_exists( get_stylesheet_directory() . "/blocks/acf/${name}/${name}.js" ) ) {
				$script_dependencies = fp_get_script_dependencies();
				$asset_dependencies = [];

				if ( array_key_exists( $asset_name, $script_dependencies ) && is_array( $script_dependencies[ $asset_name ] ) ) {
					$asset_dependencies = $script_dependencies[ $asset_name ];
				}

				wp_register_script( $name, fp_get_asset( "scripts/blocks-${asset_name}.js" ), $asset_dependencies, null, true );
			}
			if ( file_exists( get_stylesheet_directory() . "/blocks/acf/${name}/${name}-admin.scss" ) ) {
				wp_register_style( "${name}-admin", fp_get_asset( "styles/blocks-${asset_name}-admin.css" ), [], null );
			}
			if ( file_exists( get_stylesheet_directory() . "/blocks/acf/${name}/${name}-admin.js" ) ) {
				wp_register_script( "${name}-admin", fp_get_asset( "scripts/blocks-${asset_name}-admin.js" ), [], null, true );
			}
			$attr['enqueue_assets'] = function() use ( $name ) {
				if ( file_exists( get_stylesheet_directory() . "/blocks/acf/${name}/${name}.scss" ) ) {
					wp_enqueue_style( $name );
				}
				if ( file_exists( get_stylesheet_directory() . "/blocks/acf/${name}/${name}.js" ) ) {
					wp_enqueue_script( $name );
				}
				if ( file_exists( get_stylesheet_directory() . "/blocks/acf/${name}/${name}-admin.scss" ) ) {
					add_action(
						'admin_enqueue_scripts',
						function() use ( $name ) {
							wp_enqueue_style( "${name}-admin" );
						}
					);
				}
				if ( file_exists( get_stylesheet_directory() . "/blocks/acf/${name}/${name}-admin.js" ) ) {
					add_action(
						'admin_enqueue_scripts',
						function() use ( $name ) {
							wp_enqueue_script( "${name}-admin" );
						}
					);
				}
			};
		}
		$attr['supports'] = ( $attr['supports'] ?? [] ) + [
			'anchor' => true,
		];
		if ( empty( $attr['category'] ) ) {
			$attr['category'] = 'freshblocks';
		}
		if ( empty( $attr['icon'] ) ) {
			$attr['icon'] = fp_inline_asset( 'images/logos/freshbooks-logomark.svg' );
		}

		$render_template_file = "blocks/acf/${name}/${name}.php";
		$render_function_name = 'fp_render_block_' . strtr( $name, '-', '_' );
		if ( empty( $attr['render_template'] ) && file_exists( get_stylesheet_directory() . "/${render_template_file}" ) ) {
			$attr['render_template'] = $render_template_file;
		} elseif ( empty( $attr['render_callback'] ) && is_callable( $render_function_name ) ) {
			$attr['render_callback'] = $render_function_name;
		}

		if ( $has_styles && array_key_exists( 'preload_styles', $attr ) ) {
			$option_name = 'fp_preloadable_styles';
			$old_option_val = get_option( $option_name, null );
			$new_option_val = is_array( $old_option_val ) ? $old_option_val : [];
			$current_index = array_search( $name, $new_option_val );

			if ( false === $current_index && $attr['preload_styles'] ) {
				$new_option_val[] = $name;
			} elseif ( false !== $current_index && ! $attr['preload_styles'] ) {
				array_splice( $new_option_val, $current_index, 1 );
			}

			if ( null === $old_option_val ) {
				add_option( $option_name, $new_option_val, '', true );
			} else {
				update_option( $option_name, $new_option_val );
			}
		}

		acf_register_block_type( $attr );
	}

}

/**
 * Get all ACF block names.
 *
 * @return array
 */
function fp_get_acf_blocks() {
	// Set a global variable so this is only calculated once as it will never change within a request.
	global $fp_acf_blocks;

	// If the variable has not been set already, set it.
	if ( empty( $fp_acf_blocks ) ) {
		$fp_acf_blocks = glob( get_stylesheet_directory() . '/blocks/acf/*/' );

		if ( is_array( $fp_acf_blocks ) ) {
			$fp_acf_blocks = array_map( 'basename', $fp_acf_blocks );
		}
	}

	return $fp_acf_blocks ?? [];
}

/**
 * Get all FPBK block names.
 *
 * @return array
 */
function fp_get_fpbk_blocks() {
	// Set a global variable so this is only calculated once as it will never change within a request.
	global $fp_fpbk_blocks;

	// If the variable has not been set already, set it.
	if ( empty( $fp_fpbk_blocks ) ) {
		$fp_fpbk_blocks = glob( get_stylesheet_directory() . '/blocks/fpbk/*/' );

		if ( is_array( $fp_fpbk_blocks ) ) {
			$fp_fpbk_blocks = array_map( 'basename', $fp_fpbk_blocks );
		}
	}

	return $fp_fpbk_blocks ?? [];
}

/**
 * Add our custom block categories.
 *
 * @param array $categories Existing block categories.
 *
 * @return array
 */
function fp_custom_block_categories( $categories ) {
	$custom_categories = [
		[
			'slug'  => 'freshblocks',
			'title' => __( 'FreshBlocks', 'freshpress-website' ),
		],
	];

	return array_merge(
		$custom_categories,
		$categories
	);
}

/**
 * Get associative array of breakpoint names and minimum pixel values
 *
 * @return array breakpoint names and minimum pixel values
 */
function fp_get_breakpoints() {
	return [
		'xs'  => 0,
		'sm'  => 480,
		'md'  => 768,
		'lg'  => 1024,
		'xl'  => 1280,
		'xxl' => 1600,
	];
}

/**
 * Get array of breakpoint keys
 *
 * @return array breakpoint keys
 */
function fp_get_breakpoint_keys() {
	return array_keys( fp_get_breakpoints() );
}

/**
 * Get Classes for the block.  Especially useful if you have cloned in the BLock Settings ACF field
 *
 * @param string $class_names Other existing class names for a given element.
 * @return String HTML classes for the block
 */
function fp_get_block_classes( $class_names = '' ) {
	$default_class = 'fp-block';
	$style_overrides = get_field( 'style_overrides' );
	$block_classes = [ $default_class ];

	if ( ! empty( $class_names ) ) {
		$block_classes[] = $class_names;
	}

	if ( ! empty( $style_overrides ) ) {
		foreach ( $style_overrides as $override ) {
			if ( empty( $override['breakpoint'] ) ) {
				$override['breakpoint'] = '';
			}
			$block_classes[] = $override['property'] . $override['direction'] . str_replace( 'null', '', $override['breakpoint'] ) . '-' . $override['amount'];
		}
	}

	if ( get_field( 'block_settings_tracking_section' ) ) {
		$cta_section = get_field( 'block_settings_tracking_section' );
		$block_classes[] = 'trackingSection-' . $cta_section;
	}

	// Wide block settings.
	if ( $block['block_settings_wide_block'] ?? get_field( 'block_settings_wide_block' ) ) {
		$block_classes[] = 'wide-block';
	}

	// Narrow content within wide block settings.
	if ( get_field( 'block_settings_narrow_content_within_wide_block' ) ) {
		$block_classes[] = 'wide-block--padded';
	}

	return implode( ' ', $block_classes );
}

/**
 * Get data attributes as a string for a block template.
 *
 * @param array $block The block to parse.
 * @return string
 */
function fp_get_block_data_attributes( $block ) {
	if ( empty( $block['data'] ) ) {
		return '';
	}

	$data_attributes = [];

	foreach ( $block['data'] as $name => $value ) {
		if ( fp_starts_with( $name, 'data-' ) ) {
			$data_attributes[] = sanitize_title( $name ) . '="' . esc_attr( $value ) . '"';
		}
	}

	return implode( ' ', $data_attributes );
}

/**
 * Ensure that all block IDs used on the page use the correct cascade:
 *   1. anchor
 *   2. already unique ID
 *   3. ID with unique hex string appended
 *   3. Block name with unique hex string appended
 *
 * @param array   $block          The block details array.
 * @param boolean $format_as_attr Whether to return attribute value or full attribute string.
 * @return string
 */
function fp_get_block_id( $block = [], $format_as_attr = false ) {
	$output = $block['id'] ?? '';

	if ( ! empty( $block['supports'] ) && $block['supports']['anchor'] && ! empty( $block['anchor'] ) ) {
		$output = $block['anchor'];
	} elseif ( ! empty( $block['name'] ) ) {
		$block_name = preg_replace( '/^[^\/]+\//', '', $block['name'] );

		if ( empty( $block['id'] ) || $block['id'] === $block_name ) {
			$output = "${block_name}-" . bin2hex( random_bytes( 4 ) );
		} elseif ( ! fp_starts_with( $block['id'], "${block_name}-" ) ) {
			$output = "${block_name}-" . $block['id'];
		}
	}

	$output = esc_attr( $output );

	return $output && $format_as_attr ? "id=\"$output\"" : $output;
}

/**
 * Adds "html" field to $link_field array based on EditorControls.Link.
 *
 * @param array $link_field EditorControls.Link field content.
 * @param array $props Additional properties added to HTML. "className" is parsed to "class" - others are passed as is.
 * @return array
 */
function fp_generate_link_html( $link_field, $props = [] ) {
	if ( ! empty( $link_field ) && is_array( $link_field ) && ! empty( $link_field['title'] ) ) {
		foreach ( $props as $name => $value ) {
			if ( 'className' === $name ) {
				$name = 'class';
			}
			$node_attributes[] = "{$name}=\"{$value}\"";
		}

		if ( empty( $link_field['target'] ) || '_self' === $link_field['target'] || '_blank' === $link_field['target'] ) {
			$node_attributes[] = 'target="' . ( $link_field['target'] ?? '_self' ) . '"';
			$node_attributes[] = 'href="' . $link_field['url'] . '"';

			$node_attributes = join( ' ', $node_attributes );
			$link_field['html'] = <<< HTML
<a {$node_attributes}>{$link_field['title']}</a>
HTML;
		} else {
			$additional_html = '';

			if ( 'modal' === $link_field['target'] && '#' !== $link_field['url'] ) {
				$node_attributes[] = 'onclick="jQuery( \'' . $link_field['url'] . '\' ).modal( \'show\' );"';
			} else if ( 'drift' === $link_field['target'] ) {
				$node_attributes[] = 'onclick="drift.api.startInteraction({ interactionId: ' . ( $link_field['drift_interaction_id'] ?? 331999 ) . ' });"';
			} else if ( 'script' === $link_field['target'] ) {
				$random_function_name = 'fn_' . bin2hex( random_bytes( 8 ) );
				$node_attributes[] = 'onclick="' . $random_function_name . '()"';
				$additional_html = <<< HTML
<script>
    function {$random_function_name}() {
        {$link_field['script']}
    }
</script>
HTML;
			}

			$node_attributes = join( ' ', $node_attributes );
			$link_field['html'] = <<< HTML
{$additional_html}
<button {$node_attributes}>{$link_field['title']}</button>
HTML;
		}
	}

	return $link_field;
}
