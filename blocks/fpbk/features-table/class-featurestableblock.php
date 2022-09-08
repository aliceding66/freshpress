<?php
/**
 * FeaturesTable class.
 *
 * @package FreshpressBlocks\FeaturesTable
 * @subpackage FeaturesTable
 */

namespace FreshpressBlocks;

/**
 * Class FeaturesTable
 *
 * @package FreshpressBlocks
 */
class FeaturesTableBlock extends ABlock {

	const MAX_COLUMNS_AMOUNT = 9;

	/**
	 * FeaturesTableBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_editor_style();
		$this->enqueue_style();

		$this->initiate_template_data();
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
		$this->set_template_partials(
			[
				'partials__column-header'   => 'templates/column/header.partial.mustache',
				'partials__column-row-item' => 'templates/column/row-item.partial.mustache',
			]
		);

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
		$additional_template_data['title_column_width'] = $additional_template_data['table_width_0'];
		$additional_template_data['row_titles'] = $additional_template_data['table_row_titles'];
		$additional_template_data['columns'] = [];
		$process_data = false;
		for ( $target_column_index = self::MAX_COLUMNS_AMOUNT - 1; $target_column_index >= 0; --$target_column_index ) {
			$source_column_index = $target_column_index + 1; // Due to title column that is always first.

			if ( $process_data
				|| (
					isset( $additional_template_data[ "table_heading_{$source_column_index}" ] )
					&& '' !== $additional_template_data[ "table_heading_{$source_column_index}" ]
				)
			) {
				if ( ! $process_data ) {
					$process_data = true;
				}

				$background_colour = $additional_template_data[ "table_background_colour_{$source_column_index}" ] ?? [];
				$width = $additional_template_data[ "table_width_{$source_column_index}" ] ?? '';

				$additional_template_data['columns'][ $target_column_index ] = [
					'heading'           => $additional_template_data[ "table_heading_{$source_column_index}" ],
					'background_colour' => $background_colour,
					'width'             => $width,
				];
				ksort( $additional_template_data['columns'] );

				foreach ( array_keys( $additional_template_data['row_titles'] ) as $row_index ) {
					if ( ! isset( $additional_template_data['row_titles'][ $row_index ]['row_columns'] ) ) {
						$additional_template_data['row_titles'][ $row_index ]['row_columns'] = [];
					}
						$additional_template_data['row_titles'][ $row_index ]['row_columns'][ $target_column_index ] = array_merge(
							$additional_template_data[ "table_column_{$source_column_index}_rows" ][ $row_index ],
							[
								'background_colour' => $background_colour,
								'list_exists'       => count( $additional_template_data[ "table_column_{$source_column_index}_rows" ][ $row_index ]['list'] ) > 0,
							]
						);

					ksort( $additional_template_data['row_titles'][ $row_index ]['row_columns'] );
				}
			}
		}

		$additional_template_data['mark_check_green_image'] = fp_render_img(
			'images/icons/checkmark.svg',
			[
				'class' => 'w-auto',
				'alt'   => __(
					'Available',
					'freshpress-website'
				),
			]
		);
		$additional_template_data['mark_check_grey_image'] = fp_render_img(
			'images/icons/checkmark-grey.svg',
			[
				'class' => 'w-auto',
				'alt'   => __(
					'Available',
					'freshpress-website'
				),
			]
		);
		$additional_template_data['mark_x_image'] = fp_render_img(
			'images/icons/crossmark.svg',
			[
				'class' => 'w-auto',
				'alt'   => __(
					'Not Available',
					'freshpress-website'
				),
			]
		);

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
				'class' => 'mx-auto position-relative',
			]
		);

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}

	/**
	 * Initiate template data.
	 */
	private function initiate_template_data() {
		$this->set_static_template_data(
			[
				'mark_check_green_src' => fp_get_asset(
					'images/icons/checkmark.svg',
				),
				'mark_check_grey_src'  => fp_get_asset(
					'images/icons/checkmark-grey.svg',
				),
				'mark_x_src'           => fp_get_asset(
					'images/icons/crossmark.svg',
				),
			],
			'featuresTableTemplateData'
		);
	}
}
