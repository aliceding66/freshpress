<?php
/**
 * BlockParser class.
 *
 * @package FreshpressBlocks\Migrator\BlockParser
 * @subpackage Migrator\BlockParser
 */

namespace FreshpressBlocks\Migrator;

use Exception;

/**
 * Class BlockParser.
 *
 * @package FreshpressBlocks\Migrator
 */
class BlockParser {

	/**
	 * Definitions of fields that needs to be migrated as block's style picker.
	 *
	 * @var array
	 */
	private $style_select_fields = [
		'fpbk/button'       => 'button_style',
		'fpbk/faq'          => 'layout',
		'fpbk/logo-group'   => 'layout',
		'fpbk/tabbed-cards' => 'layout',
	];

	/**
	 * Groups of blocks that should be migrated at a same time.
	 *
	 * @var array
	 */
	private $related_blocks_groups = [
		[ 'acf/columns', 'acf/column' ],
	];

	/**
	 * Definitions of fields that needs to be moved to field with different name.
	 *
	 * @var array
	 */
	private $field_aliases = [
		'fpbk/column'        => [
			[
				'from'                   => 'className',
				'to'                     => 'bootstrap_class',
				'keep_from_field'        => true,
				'keep_from_field_filter' => '/(?:col(?:\-(?:\w\w\-)?\d\d?)?|offset-(?:\w\w-)?\d\d?)/',
			],
		],
		'fpbk/related-links' => [
			[
				'from'            => 'select_posts',
				'to'              => 'custom_links',
				'keep_from_field' => false,
			],
		],
	];

	/**
	 * Definitions of fields where value needs to replaced.
	 *
	 * @var array
	 */
	private $field_replacements = [
		'fpbk/related-links' => [
			[
				'field'        => 'links_type',
				'replace_if'   => 'custom_posts',
				'replace_with' => 'custom_links',
			],
		],
	];

	/**
	 * Flag that notifies if block was parsed.
	 *
	 * @var bool
	 */
	private $block_was_parsed = false;

	/**
	 * Already replaced blocks.
	 *
	 * @var array
	 */
	private $replaced_blocks_cache = [];

	/**
	 * Cache of parsed groups.
	 *
	 * @var array
	 */
	private $groups_cache = [];

	/**
	 * Block names to parse.
	 *
	 * @var array
	 */
	private $blocks_to_parse;

	/**
	 * Debug CLI option.
	 *
	 * @var bool
	 */
	private $debug;

	/**
	 * Currently parsed block.
	 *
	 * @var array
	 */
	private $parsed_block;

	/**
	 * BlockParser constructor.
	 *
	 * @param array  $block Block to be parsed.
	 * @param array  $blocks_to_parse Blocks to parse.
	 * @param array  $replaced_blocks_cache Already replaced blocks.
	 * @param string $debug Passed by CLI option that enabled debug mode.
	 */
	public function __construct( $block, $blocks_to_parse, $replaced_blocks_cache, $debug = false ) {
		$this->parsed_block = $block;
		$this->parsed_block['originalName'] = $block['blockName'];
		$this->blocks_to_parse = $blocks_to_parse;
		$this->replaced_blocks_cache = $replaced_blocks_cache;
		$this->debug = $debug;
	}

	/**
	 * Formats all ACF data into correct FreshpressBlocks format.
	 *
	 * @return self
	 */
	public function parse() {
		if ( $this->can_be_parsed( $this->parsed_block ) ) {
			$this->parsed_block['blockName'] = str_replace( 'acf/', 'fpbk/', $this->parsed_block['blockName'] );
			$this->parsed_block['attrs']['name'] = $this->parsed_block['blockName'];
			$block_data = isset( $this->parsed_block['attrs']['data'] ) ? $this->parsed_block['attrs']['data'] : $this->parsed_block['attrs'];
			$block_raw_name = str_replace( 'fpbk/', '', $this->parsed_block['blockName'] );
			$block_fields = fp_translate_block_acf_fields_to_fpbk_attributes( $block_raw_name );
			$block_data = $this->flatten_array_data( $block_data, $block_fields );
			unset( $this->parsed_block['attrs']['data'] );
			unset( $this->parsed_block['attrs']['mode'] );

			foreach ( $block_fields as $full_field_name => $block_field ) {
				if ( ! empty( $block_field['name'] ) ) {
					if ( $this->is_style_select_field( $this->parsed_block['blockName'], $block_field['name'] ) ) {
						$current_class_name = isset( $this->parsed_block['attrs']['className'] ) ? $this->parsed_block['attrs']['className'] : '';
						$this->handle_is_style_field( $current_class_name, $this->get_block_field_value( $block_data, $block_field, $full_field_name ) );
					} else if ( 'group' === $block_field['original_type'] ) {
						$this->groups_cache[ $block_field['key'] ] = $block_field['name'];
						$this->get_block_field_value( $block_data, $block_field, $full_field_name );
					} else {
						if ( isset( $this->groups_cache[ $block_field['parent'] ] ) ) {
							$this->get_block_field_value( $block_data, $block_field, $full_field_name );
						} else {
							$this->parsed_block['attrs'][ $full_field_name ] = $this->get_block_field_value( $block_data, $block_field, $full_field_name );
						}
					}
				}
			}
			$this->handle_field_aliases();
			$this->handle_field_replacements();

			$this->block_was_parsed = true;
		}

		if ( ! empty( $this->parsed_block['innerBlocks'] ) ) {
			$this->parsed_block = $this->replace_inner_blocks_from_cache( $this->parsed_block );
		}

		return $this;
	}

	/**
	 * Returns whether block was parsed.
	 *
	 * @return bool
	 */
	public function was_parsed() {
		return $this->block_was_parsed;
	}

	/**
	 * Returns parsed block.
	 *
	 * @return array
	 */
	public function get_parsed_block() {
		return $this->parsed_block;
	}

	/**
	 * Checks whether passed block can be parsed.
	 *
	 * @param array $block Block to be parsed.
	 *
	 * @return bool
	 */
	public function can_be_parsed( $block ) {
		$valid_blocks = $this->blocks_to_parse;
		foreach ( $this->related_blocks_groups as $related_blocks_group ) {
			if ( in_array( $this->blocks_to_parse, $related_blocks_group ) ) {
				$valid_blocks = array_merge( $valid_blocks, $related_blocks_group );
			}
		}
		$valid_blocks = array_unique( $valid_blocks );

		return (
			! empty( $block['blockName'] ) && in_array( $block['blockName'], $valid_blocks, true )
		);
	}

	/**
	 * Returns information about how many InnerBlocks were replaced from cache.
	 *
	 * @return int
	 */
	public function get_replaced_inner_blocks_count() {
		return $this->replaced_inner_blocks_count;
	}

	/**
	 * Fetches proper value for block field.
	 *
	 * @param array  $block_data Block's data.
	 * @param array  $block_field Block's field.
	 * @param string $block_field_name Block's field name that can be "nested" one.
	 *
	 * @return mixed Returned value.
	 */
	private function get_block_field_value( $block_data, $block_field, $block_field_name = '' ) {
		if ( empty( $block_field_name ) ) {
			$block_field_name = $block_field['name'];
		}

		$type = isset( $block_field['original_type'] ) ? $block_field['original_type'] : $block_field['type'];

		switch ( $type ) {
			case 'number':
			case 'url':
			case 'radio':
			case 'select':
			case 'text':
			case 'textarea':
			case 'wysiwyg':
				if ( isset( $block_data[ $block_field_name ] ) ) {
					return $block_data[ $block_field_name ];
				}

				return $this->get_default_block_field_value( $block_field, '' );
			case 'true_false':
				if ( isset( $block_data[ $block_field_name ] ) ) {
					return (bool) $block_data[ $block_field_name ];
				}

				return $this->get_default_block_field_value( $block_field, false );
			case 'color_picker':
				if ( isset( $block_data[ $block_field_name ] ) ) {
					return [
						'hex'    => $block_data[ $block_field_name ],
						'source' => 'hex',
					];
				}

				return [
					'hex'    => $this->get_default_block_field_value( $block_field ),
					'source' => 'hex',
				];
			case 'image':
				if ( ! empty( $block_data[ $block_field_name ] ) ) {
					if ( is_numeric( $block_data[ $block_field_name ] ) ) {
						$image_meta = wp_get_attachment_metadata( $block_data[ $block_field_name ] );

						return [
							'id'     => $block_data[ $block_field_name ],
							'url'    => wp_get_attachment_url( $block_data[ $block_field_name ] ),
							'alt'    => get_post_meta( $block_data[ $block_field_name ], '_wp_attachment_image_alt', true ),
							'sizes'  => is_array( $image_meta ) && $image_meta['sizes'] ?: [],
							'width'  => strval( $image_meta['width'] ?? '0' ),
							'height' => strval( $image_meta['height'] ?? '0' ),
						];
					} else {
						$asset = ! empty( $block_data[ $block_field_name ]['url'] ) ? fp_get_asset_with_meta( $block_data[ $block_field_name ]['url'] ) : fp_get_asset_with_meta( $block_data[ $block_field_name ] );
						if ( ! empty( $asset ) ) {
							return [
								'id'     => null,
								'url'    => $asset['url'],
								'alt'    => '',
								'sizes'  => [],
								'width'  => $asset['width'],
								'height' => $asset['width'],
							];
						}
					}
				}

				return [
					'id'  => $this->get_default_block_field_value( $block_field ),
					'url' => '',
				];
			case 'link':
				if ( ! empty( $block_data[ $block_field_name ] ) ) {
					$block_data[ $block_field_name ]['opensInNewTab'] = ! empty( $block_data[ $block_field_name ]['target'] ) && '_blank' === $block_data[ $block_field_name ]['target'] ? true : false;

					return $block_data[ $block_field_name ];
				}

				return [
					'id'  => $this->get_default_block_field_value( $block_field ),
					'url' => '',
				];
			case 'file':
				if ( ! empty( $block_data[ $block_field_name ] ) ) {
					return [
						'id'       => $block_data[ $block_field_name ],
						'url'      => wp_get_attachment_url( $block_data[ $block_field_name ] ),
						'filename' => pathinfo( get_post_meta( $block_data[ $block_field_name ], '_wp_attached_file', true ), PATHINFO_FILENAME ),
						'subtype'  => pathinfo( get_post_meta( $block_data[ $block_field_name ], '_wp_attached_file', true ), PATHINFO_EXTENSION ),
					];
				}

				return [
					'id'  => $this->get_default_block_field_value( $block_field ),
					'url' => '',
				];
			case 'checkbox':
				if ( ! empty( $block_data[ $block_field_name ] ) ) {
					return (array) $block_data[ $block_field_name ];
				}

				return $this->get_default_block_field_value( $block_field, [] );
			case 'gallery':
				if ( ! empty( $block_data[ $block_field_name ] ) ) {
					return array_map(
						function( $image_id ) {
							return [
								'id'  => $image_id,
								'url' => wp_get_attachment_url( $image_id ),
							];
						},
						(array) $block_data[ $block_field_name ]
					);
				}

				return $this->get_default_block_field_value( $block_field, [] );
			case 'post_object':
				if ( ! empty( $block_data[ $block_field_name ] ) ) {
					return array_map(
						function( $post_id ) {
							return [
								'link' => [
									'id'            => $post_id,
									'title'         => get_the_title( $post_id ),
									'url'           => get_permalink( $post_id ),
									'target'        => '_blank',
									'opensInNewTab' => true,
								],
							];
						},
						(array) $block_data[ $block_field_name ]
					);
				}

				return $this->get_default_block_field_value( $block_field, [] );
			case 'range':
				if ( ! empty( $block_data[ $block_field_name ] ) ) {
					return (int) $block_data[ $block_field_name ];
				}

				return 0;
			case 'repeater':
				$block_field_values = [];

				if ( ! empty( $block_data[ $block_field_name ] ) && $block_data[ $block_field_name ] > 0 ) {
					for ( $i = 0; $i < $block_data[ $block_field_name ]; ++$i ) {
						$block_field_values[ $i ] = [
							'key' => $this->generate_key( $block_field_name ),
						];
						foreach ( $block_field['sub_fields'] as $sub_field ) {
							$sub_field_key = "{$block_field_name}_{$i}_{$sub_field['name']}";
							$block_field_values[ $i ][ $sub_field['name'] ] = $this->get_block_field_value( $block_data, $sub_field, $sub_field_key );
						}
					}
				}

				return $block_field_values;
			case 'group':
				foreach ( $block_field['sub_fields'] as $sub_field ) {
					$grouped_name = $block_field_name . '_' . $sub_field['name'];

					if ( 'group' === $sub_field['type'] ) {
						$this->get_block_field_value( $block_data, $sub_field, $grouped_name );
					} else {
						$this->parsed_block['attrs'][ $grouped_name ] = $this->get_block_field_value( $block_data, $sub_field, $grouped_name );
					}
				}

				break;
			default:
				// Do nothing.
		}
	}

	/**
	 * Helper function to make recurrence in "clear_nested_groups".
	 *
	 * @param &array $block_fields Block fields.
	 * @param array $sub_fields Subfields from Group.
	 */
	private function remove_nested_groups( &$block_fields, $sub_fields ) {
		foreach ( $sub_fields as $sub_field ) {
			if ( 'group' === $sub_field['type'] ) {
				$this->remove_nested_groups( $block_fields, $sub_field['sub_fields'] );
			}
			unset( $block_fields[ $sub_field['name'] ] );
		}
	}

	/**
	 * Replace recursively InnerBlocks found in cache.
	 *
	 * @param array $parsed_block Parsed block.
	 * @return array
	 */
	private function replace_inner_blocks_from_cache( $parsed_block ) {
		if ( ! empty( $parsed_block['innerBlocks'] ) ) {
			foreach ( $parsed_block['innerBlocks'] as $inner_block_key => $inner_block ) {
				if ( ! empty( $inner_block['attrs']['id'] ) && ! empty( $this->replaced_blocks_cache[ $inner_block['attrs']['id'] ] ) ) {
					$parsed_block['innerBlocks'][ $inner_block_key ] = $this->replaced_blocks_cache[ $inner_block['attrs']['id'] ];
				}

				$parsed_block['innerBlocks'][ $inner_block_key ] = $this->replace_inner_blocks_from_cache( $parsed_block['innerBlocks'][ $inner_block_key ] );
			}
		}

		return $parsed_block;
	}

	/**
	 * Checks if that field was changed into style-select field.
	 *
	 * @param string $block_name Block's name.
	 * @param string $block_field_name Block's field name.
	 *
	 * @return bool Whether field is style-select field.
	 */
	private function is_style_select_field( $block_name, $block_field_name ) {
		return isset( $this->style_select_fields[ $block_name ] ) && $this->style_select_fields[ $block_name ] === $block_field_name;
	}

	/**
	 * Outputs debug message in CLI.
	 *
	 * @param string $message Message to output.
	 */
	private function write_debug( $message ) {
		if ( $this->debug ) {
            // @codingStandardsIgnoreStart
            echo 'D: ' . $message . PHP_EOL;
            // @codingStandardsIgnoreEnd
		}
	}

	/**
	 * Returns random string.
	 *
	 * @param string $prefix Key prefix.
	 *
	 * @return string
	 */
	private function generate_key( $prefix = '' ) {
		try {
			$key = bin2hex( random_bytes( 16 ) );
		} catch ( Exception $e ) {
			$key = md5( microtime() . rand() );
		}

		if ( $prefix ) {
			$key = "{$prefix}_{$key}";
		}

		return $key;
	}

	/**
	 * Makes sure that all input data has flattened arrays.
	 *
	 * @param array $block_data Block data.
	 * @param array $block_fields Block fields.
	 * @return array
	 */
	private function flatten_array_data( $block_data, $block_fields ) {
		foreach ( $block_data as $key => $array_to_flatten ) {
			$fallback_type = isset( $block_fields[ $key ]['type'] ) ? $block_fields[ $key ]['type'] : '';
			$type = isset( $block_fields[ $key ]['original_type'] ) ? $block_fields[ $key ]['original_type'] : $fallback_type;

			if ( ! empty( $type ) && 'repeater' === $type && is_array( $array_to_flatten ) ) {
				foreach ( $array_to_flatten as $array_index => $fields ) {
					foreach ( $fields as $field_name => $value ) {
						$flatten_key = "{$key}_{$array_index}_{$field_name}";
						$block_data[ $flatten_key ] = $value;
					}
				}

				$block_data[ $key ] = count( $array_to_flatten );
			}
		}

		return $block_data;
	}

	/**
	 * Return default value from ACF group definition.
	 *
	 * @param array $block_field Block field.
	 * @param mixed $fallback_value Value to return if no default value was found.
	 * @return mixed
	 */
	private function get_default_block_field_value( $block_field, $fallback_value = '' ) {
		if ( ! empty( $block_field['default'] ) ) {
			return $block_field['default'];
		} else if ( ! empty( $block_field['default_value'] ) ) {
			return $block_field['default_value'];
		} else {
			return $fallback_value;
		}
	}

	/**
	 * Handles exceptions for style picker fields.
	 *
	 * @param string $current_class_name Additional classes field value.
	 * @param string $block_field_value Select picker field value.
	 */
	private function handle_is_style_field( $current_class_name, $block_field_value ) {
		switch ( $this->parsed_block['blockName'] ) {
			case 'fpbk/button':
				$this->parsed_block['attrs']['className'] = "{$current_class_name} is-style-btn-{$block_field_value}";
				break;
			case 'fpbk/logo-group':
				$logo_group_layouts_map = [
					1 => 'single-line',
					2 => 'multiline',
					3 => 'above-the-fold',
				];

				$logo_group_layout = $block_field_value > 0 ? $logo_group_layouts_map[ $block_field_value ] : $logo_group_layouts_map[1];
				$this->parsed_block['attrs']['className'] = "{$current_class_name} is-style-logo-group_{$logo_group_layout}";
				break;
			default:
				$this->parsed_block['attrs']['className'] = "{$current_class_name} is-style-{$block_field_value}";
				break;
		}
	}

	/**
	 * Handle field aliases - what fields needs to be on other fields and if keep the original ones.
	 */
	private function handle_field_aliases() {
		$this->write_debug( 'Try to handle field aliases: ' . $this->parsed_block['blockName'] );

		if ( ! empty( $this->field_aliases[ $this->parsed_block['blockName'] ] ) ) {
			foreach ( $this->field_aliases[ $this->parsed_block['blockName'] ] as $field_alias ) {
				if ( isset( $this->parsed_block['attrs'][ $field_alias['from'] ] ) ) {
					if ( empty( $this->parsed_block['attrs'][ $field_alias['to'] ] ) ) {
						$this->write_debug( 'Found field alias: ' . $field_alias['from'] . ' -> ' . $field_alias['to'] );
						$this->parsed_block['attrs'][ $field_alias['to'] ] = $this->parsed_block['attrs'][ $field_alias['from'] ];

						if ( empty( $field_alias['keep_from_field'] ) || false === $field_alias['keep_from_field'] ) {
							unset( $this->parsed_block['attrs'][ $field_alias['from'] ] );
						} else {
							if ( ! empty( $field_alias['keep_from_field_filter'] ) ) {
								$this->parsed_block['attrs'][ $field_alias['from'] ] = trim(
									preg_replace(
										$field_alias['keep_from_field_filter'],
										'',
										$this->parsed_block['attrs'][ $field_alias['from'] ]
									)
								);
							}
						}
					}
				} else if ( ! isset( $this->parsed_block['attrs'][ $field_alias['to'] ] ) ) {
					$this->parsed_block['attrs'][ $field_alias['to'] ] = '';
				}
			}
		}
	}

	/**
	 * Handle field replacements - replace field values when condition is valid.
	 */
	private function handle_field_replacements() {
		$this->write_debug( 'Try to handle field replacements: ' . $this->parsed_block['blockName'] );

		if ( ! empty( $this->field_replacements[ $this->parsed_block['blockName'] ] ) ) {
			foreach ( $this->field_replacements[ $this->parsed_block['blockName'] ] as $field_replacement ) {
				if (
					isset( $this->parsed_block['attrs'][ $field_replacement['field'] ] )
					&& $this->parsed_block['attrs'][ $field_replacement['field'] ] === $field_replacement['replace_if']
				) {
					$this->write_debug( 'Found field replacement: ' . $field_replacement['field'] );
					$this->parsed_block['attrs'][ $field_replacement['field'] ] = $field_replacement['replace_with'];
				}
			}
		}
	}
}
