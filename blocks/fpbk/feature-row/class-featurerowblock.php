<?php
/**
 * FeatureRowBlock class.
 *
 * @package FreshpressBlocks\FeatureRowBlock
 * @subpackage FeatureRowBlock
 */

namespace FreshpressBlocks;

/**
 * Class FeatureRowBlock
 *
 * @package FreshpressBlocks
 */
class FeatureRowBlock extends ABlock {
	/**
	 * FeatureRowBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'feature-row' );
		$this->enqueue_editor_style();
		$this->enqueue_style();
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
		$partials_by_column_type = [];

		if ( ! empty( $this->block_attributes['columns'] ) && ! empty( $this->block_attributes['columns']['sub_fields'] ) ) {
			foreach ( $this->block_attributes['columns']['sub_fields'] as $sub_field ) {
				if ( 'type' === $sub_field['name'] ) {
					foreach ( array_keys( $this->block_attributes['columns']['sub_fields'][0]['choices'] ) as $type ) {
						$partials_by_column_type[ $type ] = "templates/{$type}.partial.mustache";
					}
				}
			}
		}

		$this->set_template_partials( $partials_by_column_type );

		return parent::load_template( $local_path, $template_data );
	}

	/**
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		foreach ( $additional_template_data['columns'] as $col_index => $column ) {
			$type = $column['type'];

			// *Type.
			$additional_template_data['columns'][ $col_index ][ "{$type}Type" ] = true;

			// side.
			$additional_template_data['columns'][ $col_index ]['side'] = 0 === $col_index ? 'start' : 'end';

			// subtext.
			if ( 'content' === $type ) {
				if ( $column['include_subtext'] && ! empty( $column['subtext'] ) ) {
					$additional_template_data['columns'][ $col_index ]['subtext'] = wp_kses(
						$column['subtext'],
						[
							'a' => [
								'href'   => [],
								'title'  => [],
								'target' => [],
							],
						]
					);
				}

				if ( ! empty( $additional_template_data['columns'][ $col_index ]['cta'] ) ) {
					$additional_template_data['columns'][ $col_index ]['cta'] = fp_generate_link_html(
						$additional_template_data['columns'][ $col_index ]['cta'],
						[
							'className' => 'btn btn-cta-green px-4 px-lg-3',
						]
					);
				}
				if ( ! empty( $additional_template_data['columns'][ $col_index ]['secondary_cta'] ) ) {
					$additional_template_data['columns'][ $col_index ]['secondary_cta'] = fp_generate_link_html(
						$additional_template_data['columns'][ $col_index ]['secondary_cta'],
						[
							'className' => 'btn btn-white px-4 px-lg-3',
						]
					);
				}
			}

			// image_html.
			if ( 'image' === $type && ! empty( $column['image'] ) ) {
				$align_gutter = 'm-auto';
				if ( $column['align_to_gutter'] ) {
					if ( 'start' === $additional_template_data['columns'][ $col_index ]['side'] ) {
						$align_gutter = 'my-auto mr-auto ml-0 pl-0';
					} else {
						$align_gutter = 'my-auto ml-auto mr-0 pr-0';
					}
				}
				$additional_template_data['columns'][ $col_index ]['image'] = fp_render_img( $column['image'], [ 'class' => "feature-row__image img-fluid {$align_gutter}" ], 'large' );
			}
		}

		return parent::get_template_data( $additional_template_data );
	}


	/**
	 * Function passed to "render_callback".
	 *
	 * @param array  $attributes Block's attributes.
	 * @param string $inner_blocks_content <InnerBlocks.Content /> passed from index.js.
	 *
	 * @return string
	 */
	public function render( $attributes, $inner_blocks_content ) {
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => 'container-fluid px-0',
			]
		);

		$content_first = 'content' === ( ! empty( $attributes['columns'] ) && $attributes['columns'][0]['type'] );
		$reverse_wrap = $attributes['reverse_stack'];
		$sm_wrap_direction = ( $content_first && ! $reverse_wrap ) || ( ! $content_first && $reverse_wrap ) ? 'flex-column' : 'flex-column-reverse';

		foreach ( $attributes['columns'] as $col_index => $column ) {
			if ( 'tabs' === $column['type'] ) {
				if ( ! empty( $inner_blocks_content ) ) {
					$attributes['columns'][ $col_index ]['tabs_html'] = $inner_blocks_content;
				} else {
					$attributes['columns'][ $col_index ]['tabs_html'] = fp_render_blocks(
						[
							'name'  => 'fpbk/tabbed-cards',
							'attrs' => [ 'cards' => $column['cards'] ],
						]
					);
				}
			}
		}

		// Invoice Templates Exception - change h2 -> h1 in every first feature row block.
		$attributes['heading_tag'] = 'h2';
		$is_invoice_template = 'invoice_template' === get_post_type();

		if ( $is_invoice_template ) {
			$post = get_post();
			$post_blocks = parse_blocks( $post->post_content );

			$feature_row_blocks = array_filter(
				$post_blocks,
				function( $block ) {
					return 'fpbk/feature-row' === $block['blockName'];
				}
			);

			if ( $attributes['id'] === $feature_row_blocks[0]['attrs']['id'] ) {
				$attributes['heading_tag'] = 'h1';
			}
		}

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	<div class="row d-flex {$sm_wrap_direction} flex-wrap flex-lg-row flex-lg-nowrap">
		{$block_template}
	</div>
</div>
HTML;
	}

	/**
	 * Initiate block attributes.
	 *
	 * @param string $override_block_name Pass block name if in ACF file is different from in block.json.
	 */
	protected function initiate_block_attributes( $override_block_name = '' ) {
		parent::initiate_block_attributes();

		if ( ! empty( $this->block_attributes['columns'] ) ) {
			$default_column = [];
			foreach ( $this->block_attributes['columns']['sub_fields'] as $col_subfield ) {
				$first_value_if_has_choices = ! empty( $col_subfield['choices'] ) ? key( $col_subfield['choices'] ) : '';
				if ( ! empty( $first_value_if_has_choices ) && empty( $col_subfield['default_value'] ) ) {
					$default_column[ $col_subfield['name'] ] = $first_value_if_has_choices;
				} else {
					$default_column[ $col_subfield['name'] ] = isset( $col_subfield['default_value'] ) ? $col_subfield['default_value'] : '';
				}
			}

			$this->block_attributes['columns']['default'] = array_fill( 0, $this->block_attributes['columns']['max'], $default_column );
		}
	}
}
