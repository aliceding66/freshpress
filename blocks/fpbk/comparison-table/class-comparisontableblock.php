<?php
/**
 * ComparisonTable class.
 *
 * @package FreshpressBlocks\ComparisonTable
 * @subpackage ComparisonTable
 */

namespace FreshpressBlocks;

/**
 * Class ComparisonTable
 *
 * @package FreshpressBlocks
 */
class ComparisonTableBlock extends ABlock {

	/**
	 * Icon's HTMLs.
	 *
	 * @var string
	 */
	private $icons;

	/**
	 * ComparisonTableBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'comparison-table-block' );
		$this->enqueue_style();

		$this->load_icons();
		$this->initiate_template_data();
	}

	/**
	 * Return evaluated Mustache template
	 *
	 * @param string $local_path    Local path to template.
	 * @param array  $template_data Data to be passed to Mustache template.
	 *
	 * @return string
	 */
	public function load_template( $local_path, $template_data ) {
		$this->set_template_partials(
			[
				'partial__plan_header'      => 'templates/plan_header.partial.mustache',
				'partial__plan_cell'        => 'templates/plan_cell.partial.mustache',
				'partial__comparison_table' => 'templates/comparison_table.partial.mustache',
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
		if ( ! empty( $additional_template_data['plan_header_trial_cell_buy_cta'] ) ) {
			$additional_template_data['plan_header_trial_cell_buy_cta'] = fp_generate_link_html(
				$additional_template_data['plan_header_trial_cell_buy_cta'],
				[
					'className'             => 'btn btn-cta-green d-none d-md-inline-block d-xl-none mr-1',
					'data-cta-text-monthly' => 'buynow-monthly-' . $additional_template_data['plan_header_trial_cell_buy_cta']['title'],
					'data-cta-section'      => 'comparison-table',
				]
			);
		}

		if ( ! empty( $additional_template_data['plan_header_trial_cell_promo_buy_cta'] ) ) {
			$additional_template_data['plan_header_trial_cell_promo_buy_cta'] = fp_generate_link_html(
				$additional_template_data['plan_header_trial_cell_promo_buy_cta'],
				[
					'className'             => 'btn btn-cta-green d-none d-md-inline-block d-xl-none mr-1',
					'data-cta-text-monthly' => 'buynow-monthly-' . $additional_template_data['plan_header_trial_cell_promo_buy_cta']['title'],
					'data-cta-section'      => 'comparison-table',
				]
			);
		}

		if ( ! empty( $additional_template_data['plan_header_trial_cell_trial_cta'] ) ) {
			$additional_template_data['plan_header_trial_cell_trial_cta'] = fp_generate_link_html(
				$additional_template_data['plan_header_trial_cell_trial_cta'],
				[
					'className'             => 'btn btn-outline-grey ml-1',
					'data-cta-text-monthly' => 'tryitfree-' . $additional_template_data['plan_header_trial_cell_trial_cta']['title'],
					'data-cta-section'      => 'comparison-table',
				]
			);
		}

		foreach ( $additional_template_data['plan_header_plan_cells'] as $key => $plan ) {
			if ( stripos( $plan['title'], 'select' ) !== false ) {
				$additional_template_data['plan_header_plan_cells'][ $key ]['cta_text'] = 'requestademo';
				$additional_template_data['plan_header_plan_cells'][ $key ]['promo_cta_text'] = '';
			} else {
				if ( ! empty( $plan['cta'] ) ) {
					$additional_template_data['plan_header_plan_cells'][ $key ]['cta_text'] = strtolower( preg_replace( '/\s/', '', $plan['cta']['title'] ) );
				}
				if ( ! empty( $plan['promo_cta'] ) ) {
					$additional_template_data['plan_header_plan_cells'][ $key ]['promo_cta_text'] = strtolower( preg_replace( '/\s/', '', $plan['promo_cta']['title'] ) );
				}
			}

			$additional_template_data['plan_header_plan_cells'][ $key ]['plan_title'] = strtolower( wp_strip_all_tags( preg_replace( '~\x{00a0}~', '', $plan['title'] ) ) );

			if ( ! empty( $additional_template_data['plan_header_plan_cells'][ $key ]['cta'] ) ) {
				$additional_template_data['plan_header_plan_cells'][ $key ]['cta'] = fp_generate_link_html(
					$additional_template_data['plan_header_plan_cells'][ $key ]['cta'],
					[
						'className'             => 'comparison-table__header-row_cell-cta btn btn-cta-green d-none d-xl-block',
						'data-cta-text-monthly' => $additional_template_data['plan_header_plan_cells'][ $key ]['cta_text'] . '-monthly-' . $additional_template_data['plan_header_plan_cells'][ $key ]['plan_title'],
						'data-cta-section'      => 'comparison-table',
					]
				);
			}

			if ( ! empty( $additional_template_data['plan_header_plan_cells'][ $key ]['promo_cta'] ) ) {
				$additional_template_data['plan_header_plan_cells'][ $key ]['promo_cta'] = fp_generate_link_html(
					$additional_template_data['plan_header_plan_cells'][ $key ]['promo_cta'],
					[
						'className'             => 'comparison-table__header-row_cell-cta btn btn-cta-green d-none d-xl-block',
						'data-cta-text-monthly' => $additional_template_data['plan_header_plan_cells'][ $key ]['promo_cta_text'] . '-monthly-' . $additional_template_data['plan_header_plan_cells'][ $key ]['plan_title'],
						'data-cta-section'      => 'comparison-table',
					]
				);
			}
		}

		$previous_section_title = '';
		$comparison_table = $this->fp_format_comparison_data( $additional_template_data['base_comparison_info'] );
		$formatted_comparison_table = [];
		$comparison_table_key = 0;
		$last_section_title = array_key_last( $comparison_table );

		foreach ( $comparison_table as $section_title => $row ) {
			$formatted_comparison_table[ $comparison_table_key ] = [];

			$plan_column_keys = array_diff_key( $row[ array_key_first( $row ) ], array_flip( [ 'tooltip' ] ) );
			$first_col_id = esc_html( wp_strip_all_tags( fp_to_snake_case( $section_title ) ) );

			$formatted_comparison_table[ $comparison_table_key ]['first_col_id'] = $first_col_id;
			$formatted_comparison_table[ $comparison_table_key ]['not_last_section'] = $last_section_title !== $section_title;

			$formatted_comparison_table[ $comparison_table_key ]['feature_col_ids'] = [];
			foreach ( $plan_column_keys as $plan_column_key => $feature ) {
				$formatted_comparison_table[ $comparison_table_key ]['feature_col_ids'][] = $first_col_id . '_' . $plan_column_key;
			}

			if ( $section_title !== $previous_section_title ) {
				$previous_section_title = $section_title;
				$formatted_comparison_table[ $comparison_table_key ]['section_title'] = $section_title;
			}

			$formatted_comparison_table[ $comparison_table_key ]['rows'] = [];
			$row_key = 0;
			foreach ( $row as $features => $feature ) {
				$formatted_comparison_table[ $comparison_table_key ]['rows'][ $row_key ]['row_id'] = esc_html( wp_strip_all_tags( fp_to_snake_case( $features ) ) );
				$formatted_comparison_table[ $comparison_table_key ]['rows'][ $row_key ]['features'] = $features;
				if ( isset( $feature['tooltip'] ) && ! empty( $feature['tooltip'] ) ) {
					$formatted_comparison_table[ $comparison_table_key ]['rows'][ $row_key ]['info_tooltip_html'] = fp_render_block( 'info-tooltip', [ 'copy' => $feature['tooltip'] ] );
				}

				$formatted_comparison_table[ $comparison_table_key ]['rows'][ $row_key ]['feature_values'] = [];
				foreach ( $feature as $key => $option ) {
					if ( 'tooltip' !== $key ) {
						$formatted_comparison_table[ $comparison_table_key ]['rows'][ $row_key ]['feature_values'][] = [
							'feature_value' => ( true === $option ? fp_render_img(
								'images/icons/checkmark.svg',
								[
									'class' => 'checkmark w-auto skip-lazy',
									'alt'   => 'Checkmark',
								]
							) : $option ),
							'row_key'       => $key,
						];
					}
				}

				++ $row_key;
			}

			++ $comparison_table_key;
		}

		$additional_template_data['comparison_table'] = $formatted_comparison_table;
		unset( $additional_template_data['base_comparison_info'] );

		return parent::get_template_data( $additional_template_data );
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
		if ( ! empty( $attributes['enable_promo'] ) && $attributes['enable_promo'] ) {
			$properties['data-promo-exists'] = 'true';
		}

		return parent::get_wrapper_properties( $attributes, $properties );
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
				'class' => 'comparison-table position-relative px-0 px-xl-3 mx-lg-auto',
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
	 * Load icons used in multiple places in class.
	 */
	private function load_icons() {
		$this->icons = [
			'checkmark' => fp_render_img(
				'images/icons/checkmark.svg',
				[
					'class' => 'checkmark w-auto skip-lazy',
					'alt'   => 'Checkmark',
				]
			),
			'info'      => fp_render_img(
				'images/icons/icon-info-circle.svg',
				[
					'class' => 'info-tooltip__icon h-auto skip-lazy',
					'alt'   => 'Info Tooltip',
				]
			),
		];
	}

	/**
	 * Sets static template data.
	 */
	private function initiate_template_data() {
		$this->set_static_template_data(
			[
				'icons' => $this->icons,
			],
			'comparisonTableTemplateData'
		);
	}

	/**
	 * Format and return Pricing Table Info from parsed CSV string.
	 *
	 * @param string $csv_text CSV formatted comparison data from Google Sheet.
	 *
	 * @return array
	 */
	private function fp_format_comparison_data( $csv_text ) {
		if ( function_exists( 'fp_parse_csv' ) && function_exists( 'fp_format_vartype' ) ) {
			$csv = fp_parse_csv( $csv_text );
			$csv_data = $csv['data'];

			$data = [];
			foreach ( $csv_data as $row ) {
				$new_key = $row['category'];
				$bullet = $row['bullet'];
				$row = array_slice( $row, 2 );
				$formatted = [];
				foreach ( $row as $key => $value ) {
					$formatted[ $key ] = fp_format_vartype( $value );
				}
				$data[ $new_key ][ $bullet ] = $formatted;
			}

			return $data;
		} else {
			return [];
		}
	}
}
