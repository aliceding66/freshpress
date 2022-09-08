<?php
/**
 * ABlock class.
 *
 * @package FreshpressBlocks\ABlock
 * @subpackage ABlock
 */

namespace FreshpressBlocks;

use Error, Exception, Mustache_Engine, WP_Block_Type_Registry;

/**
 * Class ABlock.
 *
 * @package FreshpressBlocks
 */
abstract class ABlock {


	/**
	 * __DIR__ value for specific block.
	 *
	 * @var string
	 */
	protected $dir = '';

	/**
	 * Gutenberg's attributes that are passed to block.
	 *
	 * @var array
	 */
	protected $block_attributes = [];

	/**
	 * Flag that indicated if REST endpoint used by ServerSideRender must be enabled.
	 *
	 * @var bool
	 */
	protected $enable_rest_render_endpoint = false;

	/**
	 * Info fetched from build/index.assets.php.
	 *
	 * @var array
	 */
	private $assets_info = [];

	/**
	 * Info fetched from block.json.
	 *
	 * @var array
	 */
	private $block_json = [];

	/**
	 * Block name from block.json without prefix.
	 *
	 * @var string
	 */
	protected $block_name = '';

	/**
	 * Helper variable for registering block with enqueues assets only.
	 *
	 * @var array
	 */
	protected $enqueued_assets = [];

	/**
	 * Template data passed to Mustache template.
	 *
	 * @var array
	 */
	private $template_data = [];

	/**
	 * Template partials passed to Mustache template.
	 *
	 * @var array
	 */
	private $template_partials = [];

	/**
	 * ABlock constructor.
	 *
	 * @param string $dir Just pass __DIR__ here.
	 */
	public function __construct( $dir ) {
		$this->dir = $dir;

		$this->load_block_json();
		$this->assets_info = $this->get_asset_info();
		$this->set_default_block_attributes();
		$this->register_acf_definition_mock();
		$this->initiate_block_attributes();
		if ( $this->enable_rest_render_endpoint ) {
			$this->register_render_rest_endpoint();
		}
	}

	/**
	 * Function that is called inside "render_callback".
	 *
	 * @param array  $attributes Block's attributes.
	 * @param string $inner_blocks_content <InnerBlocks.Content /> passed from index.js.
	 *
	 * @return string
	 */
	abstract public function render( $attributes, $inner_blocks_content);

	/**
	 * Function passed to "render_callback".
	 *
	 * @param array  $attributes Block's attributes.
	 * @param string $inner_blocks_content <InnerBlocks.Content /> passed from index.js.
	 *
	 * @return string
	 */
	public function render_callback( $attributes, $inner_blocks_content ) {
		if ( ! is_admin() ) {
			foreach ( $this->enqueued_assets as $asset_key => $asset_names ) {
				if ( strpos( $asset_key, 'editor' ) === false ) {
					$asset_names = (array) $asset_names;
					foreach ( $asset_names as $asset_name ) {
						if ( strpos( $asset_name, 'style' ) !== false || strpos( $asset_name, '.css' ) !== false ) {
							wp_enqueue_style( $asset_name );
						} else {
							wp_enqueue_script( $asset_name );
						}
					}
				}
			}
		}

		$attributes = $this->filter_block_attributes( $attributes );

		return $this->render( $attributes, $inner_blocks_content );
	}

	/**
	 * Enqueue Editor scripts.
	 */
	public function enqueue_editor_script() {
		$asset_name = "blocks-fpbk-{$this->block_name}-index.js";

		wp_register_script(
			$asset_name,
			fp_get_asset( "scripts/{$asset_name}" ),
			$this->assets_info['dependencies'] ?? [],
			$this->assets_info['version'] ?? null,
		);

		wp_set_script_translations( $asset_name, $this->block_name );

		$this->enqueued_assets['editor_script'] = $asset_name;
	}

	/**
	 * Enqueue frontend scripts.
	 *
	 * @param string $script_name Name of the script.
	 */
	public function enqueue_script( $script_name ) {
		$asset_name = "blocks-fpbk-{$this->block_name}-{$script_name}.js";
		$info = $this->get_asset_info( $script_name );

		wp_register_script(
			$asset_name,
			fp_get_asset( "scripts/{$asset_name}" ),
			$info['dependencies'] ?? [],
			$info['version'] ?? null
		);

		wp_set_script_translations( $asset_name, $this->block_name );

		if ( empty( $this->enqueued_assets['script'] ) ) {
			$this->enqueued_assets['script'] = [];
		}
		$this->enqueued_assets['script'][] = $asset_name;
	}

	/**
	 * Enqueue Editor styles.
	 */
	public function enqueue_editor_style() {
		$asset_name = "blocks-fpbk-{$this->block_name}-editor.css";

		wp_register_style(
			$asset_name,
			fp_get_asset( "styles/{$asset_name}" ),
			[],
			$this->assets_info['version'] ?? null
		);

		$this->enqueued_assets['editor_style'] = $asset_name;
	}

	/**
	 * Enqueue frontend styles.
	 */
	public function enqueue_style() {
		$asset_name = "blocks-fpbk-{$this->block_name}-index.css";

		wp_register_style(
			$asset_name,
			fp_get_asset( "styles/{$asset_name}" ),
			[],
			$this->assets_info['version'] ?? null
		);

		$this->enqueued_assets['style'] = $asset_name;
	}

	/**
	 * Adds block attributes.
	 *
	 * @param array $block_attributes Array of block's attributes to be added to already existing ones.
	 */
	public function set_block_attributes( $block_attributes ) {
		$this->block_attributes = array_merge(
			$this->block_attributes,
			$block_attributes
		);
	}

	/**
	 * Sets values to use in Mustache template.
	 *
	 * @param array  $template_data Static template data.
	 * @param string $template_data_name_in_js Variable name of those data in edit.js.
	 */
	public function set_static_template_data( $template_data, $template_data_name_in_js ) {
		$this->template_data = $template_data;

		wp_localize_script( "blocks-fpbk-{$this->block_name}-index.js", $template_data_name_in_js, $template_data );
	}

	/**
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function. Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		return $this->autop_wysiwyg_fields( $this->escape_empty_arrays( array_merge( $this->template_data, $additional_template_data ) ) );
	}

	/**
	 * Returns formatted wrapper properties.
	 *
	 * @param array $attributes Block's attributes.
	 * @param array $properties Custom properties.
	 *
	 * @return string
	 */
	public function get_wrapper_properties( $attributes, $properties = [] ) {
		$class_name = $attributes['className'] ?? '';
		$class_name .= " {$this->block_name} wp-block wp-block-fpbk-{$this->block_name} ";

		if ( ! empty( $attributes['align'] ) ) {
			$class_name .= " align{$attributes['align']} ";
		}

		if ( ! empty( $properties['class'] ) ) {
			$class_name = $class_name . $properties['class'] ?? '';
		}
		$properties['class'] = $this->get_block_classes( $attributes, $class_name );
		$properties['class'] = str_replace( '  ', ' ', $properties['class'] );

		$properties['data-prefix'] = 'fpbk';

		if ( ! empty( $attributes['anchor'] ) ) {
			$attributes['id'] = $attributes['anchor'];
		}

		$wrapper_properties = '';
		$attributes_to_insert = [ 'id' ];
		foreach ( $attributes_to_insert as $attribute_name ) {
			if ( ! empty( $attributes[ $attribute_name ] ) ) {
				$value = str_replace( '"', '\\\"', $attributes[ $attribute_name ] );
				$wrapper_properties .= " {$attribute_name}=\"{$value}\"";
			}
		}
		foreach ( $properties as $name => $value ) {
			$value = str_replace( '"', '\\\"', $value );
			$wrapper_properties .= " {$name}=\"{$value}\"";
		}

		return $wrapper_properties;
	}

	/**
	 * Sets template partials
	 *
	 * @param array $partials Array of Mustache partials.
	 */
	public function set_template_partials( $partials ) {
		if ( ! empty( $partials ) && is_array( $partials ) ) {
			foreach ( $partials as $partial_name => $partial_local_path ) {
				$partials[ $partial_name ] = file_get_contents( $this->dir . '/' . $partial_local_path );
			}

			$this->template_partials = $partials;
		}
	}

	/**
	 * Return evaluated Mustache template
	 *
	 * @param string $local_path Local path to template.
	 * @param array  $template_data Data to be passed to Mustache template.
	 *
	 * @return string
	 */
	public function load_template( $local_path, $template_data ) {
		$mustache = new Mustache_Engine(
			[
				'partials' => $this->template_partials,
			]
		);

		return $mustache->render(
			file_get_contents( $this->dir . '/' . $local_path ),
			$template_data
		);
	}

	/**
	 * Register block using all passed data.
	 */
	public function register() {
		$registration_attributes = [
			'attributes'      => $this->block_attributes,
			'render_callback' => [ $this, 'render_callback' ],
		];

		if ( is_admin() ) {
			$registration_attributes = array_merge(
				$this->enqueued_assets,
				$registration_attributes
			);

			if ( ! empty( $registration_attributes['script'] ) ) {
				$registration_attributes['script'] = $registration_attributes['script'][0];
			}
		}

		register_block_type(
			$this->block_json['name'],
			$registration_attributes
		);
	}

	/**
	 * Unsets attributes that do not passes ACF Conditional Logic rules.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return array
	 */
	public function filter_block_attributes( $attributes ) {
		$attributes_cache = $attributes;

		foreach ( array_keys( $attributes ) as $attribute_name ) {
			if (
				! empty( $this->block_attributes[ $attribute_name ]['conditional_logic'] )
				&& count( $this->block_attributes[ $attribute_name ]['conditional_logic'] ) > 0
			) {
				$validated = false;
				foreach ( $this->block_attributes[ $attribute_name ]['conditional_logic'] as $conditional_logic_groups ) {
					$validated_conditional_logic_group = array_filter(
						$conditional_logic_groups,
						function( $conditional_logic_to_check ) use ( $attributes_cache ) {
							$value_to_check = $attributes_cache[ array_search( $conditional_logic_to_check['field'], array_column( $this->block_attributes, 'key', 'name' ) ) ] ?? null;
							if ( ! is_null( $value_to_check ) ) {
								$conditional_logic_value_to_check = $conditional_logic_to_check['value'];
								$conditional_logic_operator = $conditional_logic_to_check['operator'];

								switch ( $conditional_logic_operator ) {
									case '==':
										return $value_to_check == $conditional_logic_value_to_check;
									case '!=':
										return $value_to_check != $conditional_logic_value_to_check;
									case '<':
										return $value_to_check < $conditional_logic_value_to_check;
									case '>':
										return $value_to_check > $conditional_logic_value_to_check;
									default:
										return true;
								}
							}

							return true;
						}
					);

					if ( count( $validated_conditional_logic_group ) === count( $conditional_logic_groups ) ) {
						$validated = true;
					}
				}

				if ( false === $validated ) {
					unset( $attributes[ $attribute_name ] );
				}
			}
		}

		return $attributes;
	}

	/**
	 * Initiate block attributes.
	 *
	 * @param string $override_block_name Pass block name if in ACF file is different from in block.json.
	 */
	protected function initiate_block_attributes( $override_block_name = '' ) {
		$acf_fields = [];
		if ( function_exists( 'fp_translate_block_acf_fields_to_fpbk_attributes' ) ) {
			$name = ! empty( $override_block_name ) ? $override_block_name : $this->block_name;

			$acf_fields = fp_translate_block_acf_fields_to_fpbk_attributes( $name );
		}
		$this->set_block_attributes( $acf_fields );
	}

	/**
	 * Return proper block id based on priority of anchor and id attributes.
	 *
	 * @param array $attributes Block's attributes.
	 *
	 * @return string
	 */
	protected function get_block_id( $attributes ) {
		return ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : $attributes['id'];
	}

	/**
	 * Load data from block.json.
	 *
	 * @throws Error If block.json is not found.
	 */
	private function load_block_json() {
		$block_json_path = $this->dir . '/block.json';
		if ( ! file_exists( $block_json_path ) ) {
			throw new Error(
				'block.json is missing for ' . static::class
			);
		}

		try {
			$this->block_json = json_decode( file_get_contents( $block_json_path ), true );
			$this->block_name = str_replace( 'fpbk/', '', $this->block_json['name'] );
		} catch ( Exception $e ) {
			$this->block_json = [];
		}
	}

	/**
	 * Load data from *.assets.php file.
	 *
	 * @param string $name [name].asset.php.
	 *
	 * @return array
	 * @throws Error If *.asset.php is not found.
	 */
	private function get_asset_info( $name = 'index' ) {
		$asset_path = fp_get_asset( 'blocks-fpbk-' . $this->block_name . '-' . $name . '.php' );
		$asset_path = str_replace( '//', '/', str_replace( get_site_url(), get_template_directory(), str_replace( 'wp-content/themes/freshpress', '', $asset_path ) ) );

		if ( ! file_exists( $asset_path ) ) {
			throw new Error(
				'You need to run `npm start` or `npm run build` for the "fpbk/' . $this->block_name . '" block first.'
			);
		}

		$asset_info = require( $asset_path );

		$asset_script_dependencies = $this->get_asset_script_dependencies( $name );
		if ( ! empty( $asset_script_dependencies ) ) {
			$asset_info['dependencies'] = array_merge(
				$asset_info['dependencies'],
				$asset_script_dependencies
			);
		}

		return (array) $asset_info;
	}

	/**
	 * Sets default attributes used in all blocks.
	 */
	private function set_default_block_attributes() {
		$this->block_attributes = [
			'anchor' => [ 'type' => 'string' ],
			'id'     => [ 'type' => 'string' ],
		];
	}

	/**
	 * Adds ACF block mock to preserve ACF group fields that can be attached to blocks.
	 */
	private function register_acf_definition_mock() {
		if (
			function_exists( 'acf_register_block_type' )
			&& ! WP_Block_Type_Registry::get_instance()->is_registered( 'acf/' . $this->block_name )
		) {
			$attr['name'] = $this->block_name;
			$attr['title'] = $this->block_json['title'];
			$attr['icon'] = fp_inline_asset( 'images/logos/freshbooks-logomark.svg' );
			$attr['mode'] = 'preview';
			$attr['render_callback'] = function( $block ) {
				if ( is_admin() ) {
					$new_block_name = str_replace( 'acf/', 'fpbk/', $block['name'] );
					echo fp_noesc( "<div class=\"d-none alert alert-warning\">Block don't exist anymore. Please use {$new_block_name} instead.</div>" );
				}
			};
			$attr['supports'] = [
				'inserter' => false,
			];

			acf_register_block_type( $attr );
		}
	}

	/**
	 * Get Classes for the block.  Especially useful if you have cloned in the BLock Settings ACF field
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $class_names Other existing class names for a given element.
	 *
	 * @return string HTML classes for the block
	 */
	private function get_block_classes( $attributes, $class_names = '' ) {
		$default_class = 'fp-block';
		$block_classes = [ $default_class ];

		if ( ! empty( $class_names ) ) {
			$block_classes[] = $class_names;
		}

		if ( ! empty( $attributes['style_overrides'] ) ) {
			foreach ( $attributes['style_overrides'] as $override ) {
				if ( empty( $override['breakpoint'] ) ) {
					$override['breakpoint'] = '';
				}
				$block_classes[] = $override['property'] . $override['direction'] . str_replace( 'null', '', $override['breakpoint'] ) . '-' . $override['amount'];
			}
		}

		if ( ! empty( $attributes['block_settings_tracking_section'] ) ) {
			$tracking_section = $attributes['block_settings_tracking_section'];
		} else {
			$tracking_section = $this->block_name;
		}

		$block_classes[] = 'trackingSection-' . $tracking_section;

		// Wide block settings.
		if ( ! empty( $attributes['block_settings_wide_block'] ) ) {
			$block_classes[] = 'wide-block';
		}

		// Narrow content within wide block settings.
		if ( ! empty( $attributes['block_settings_narrow_content_within_wide_block'] ) && $attributes['block_settings_narrow_content_within_wide_block'] ) {
			$block_classes[] = 'wide-block--padded';
		}

		return implode( ' ', $block_classes );
	}

	/**
	 * Registers rest endpoint for ServerSideRender.
	 */
	private function register_render_rest_endpoint() {
		add_action(
			'rest_api_init',
			function() {
				register_rest_route(
					'wp/v2',
					'/block-renderer/fpbk/' . $this->block_name,
					[
						'methods'             => 'GET',
						'callback'            => [ $this, 'handle_render_rest_endpoint' ],
						'permission_callback' => '__return_true',
					]
				);
			}
		);
	}

	/**
	 * Adds endpoint for ServerSideRender.
	 *
	 * @return array
	 */
	public function handle_render_rest_endpoint() {
		 $block_html = '';

		if ( ! empty( $_GET['attributes'] ) && is_array( $_GET['attributes'] ) ) {
			// @codingStandardsIgnoreStart
			$attributes = array_map(function ($attribute) {
				if (is_array($attribute)) {
					return $attribute;
				} else {
					return esc_attr($attribute);
				}
			}, wp_unslash($_GET['attributes']));

			// @codingStandardsIgnoreEnd
			return [ 'rendered' => $this->render( $attributes, '' ) ];
		}

		return [ 'rendered' => $block_html ];
	}

	/**
	 * Remove empty arrays that could be shown in Mustache (which results in "Array" string being rendered).
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return array
	 */
	private function escape_empty_arrays( $attributes ) {
		if ( is_array( $attributes ) ) {
			foreach ( $attributes as $key => $value ) {
				if ( is_array( $value ) ) {
					if ( isset( $value['url'] ) && empty( $value['url'] ) ) {
						$attributes[ $key ] = '';
					} else {
						$attributes[ $key ] = $this->escape_empty_arrays( $value );
					}
				}
			}
		}

		return $attributes;
	}

	/**
	 * Use wpautop on all WYSIWYG block attributes.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return array
	 */
	private function autop_wysiwyg_fields( $attributes ) {
		if ( function_exists( 'wpautop' ) ) {
			foreach ( $this->block_attributes as $block_attribute_name => $block_attribute ) {
				if ( ! empty( $block_attribute['original_type'] ) && ! empty( $attributes[ $block_attribute_name ] ) ) {
					if ( 'wysiwyg' === $block_attribute['original_type'] ) {
						$attributes[ $block_attribute_name ] = $this->wpautop( $attributes[ $block_attribute_name ] );
					} else if ( 'repeater' === $block_attribute['original_type'] && ! empty( $block_attribute['sub_fields'] ) ) {
						$attributes[ $block_attribute_name ] = $this->autop_wysiwyg_in_repeater( $block_attribute['sub_fields'], $attributes, $block_attribute_name );
					}
				}
			}
		}

		return $attributes;
	}

	/**
	 * Use wpautop on all WYSIWYG block attributes inside Repeater.
	 *
	 * @param array  $sub_fields_definitions Repeater sub fields definitions.
	 * @param array  $attributes Block attributes.
	 * @param string $repeater_attribute_name Block attribute name.
	 *
	 * @return array
	 */
	private function autop_wysiwyg_in_repeater( $sub_fields_definitions, $attributes, $repeater_attribute_name ) {
		if ( ! empty( $attributes[ $repeater_attribute_name ] ) ) {
			$repeater_attributes = $attributes[ $repeater_attribute_name ];
			foreach ( $sub_fields_definitions as $sub_field_definition ) {
				if ( ! empty( $sub_field_definition['type'] ) ) {
					if ( 'wysiwyg' === $sub_field_definition['type'] ) {
						foreach ( $repeater_attributes as $key => $value ) {
							if ( ! empty( $value[ $sub_field_definition['name'] ] ) ) {
								$repeater_attributes[ $key ][ $sub_field_definition['name'] ] = $this->wpautop( $value[ $sub_field_definition['name'] ] );
							}
						}
					} else if ( 'repeater' === $sub_field_definition['type'] && ! empty( $sub_field_definition['sub_fields'] ) ) {
						foreach ( $repeater_attributes as $key => $value ) {
							if ( ! empty( $value[ $sub_field_definition['name'] ] ) ) {
								$repeater_attributes[ $key ][ $sub_field_definition['name'] ] = $this->autop_wysiwyg_in_repeater( $sub_field_definition['sub_fields'], $attributes, $sub_field_definition['name'] );
							}
						}
					}
				}
			}

			return $repeater_attributes;
		} else {
			return $attributes;
		}
	}

	/**
	 * Wrapper for wpautop to replace <br> with <p> node.
	 *
	 * @param string $string String to wpautop.
	 *
	 * @return string
	 */
	private function wpautop( $string ) {
		return html_entity_decode( str_replace( '&lt;br /&gt;', '&lt;/p&gt;&lt;p&gt;', htmlentities( wpautop( $string, true ) ) ) );
	}

	/**
	 * Returns proper script dependencies for asset.
	 *
	 * @param string $asset_name Asset name.
	 * @return array
	 */
	private function get_asset_script_dependencies( $asset_name ) {
		$asset_script_dependencies = [];
		$script_dependencies = fp_get_script_dependencies();
		$asset_script_dependencies_key = 'fpbk-' . $this->block_name . '-' . $asset_name;

		if ( isset( $script_dependencies[ $asset_script_dependencies_key ] ) ) {
			$asset_script_dependencies = $script_dependencies[ $asset_script_dependencies_key ];
		}

		return $asset_script_dependencies;
	}
}
