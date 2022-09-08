<?php
/**
 * PricingTable class.
 *
 * @package FreshpressBlocks\PricingTable
 * @subpackage PricingTable
 */

namespace FreshpressBlocks;

/**
 * Class PricingTable
 *
 * @package FreshpressBlocks
 */
class PricingTableBlock extends ABlock {
	const PLANS = [ 'lite', 'plus', 'premium', 'select' ];
	const PRICE_PERIODS = [ 'monthly', 'yearly' ];

	/**
	 * PricingTableBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'pricing-table-block' );
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
				'partial__switch'              => 'templates/switch.partial.mustache',
				'partial__column'              => 'templates/column/index.partial.mustache',
				'partial__column-heading'      => 'templates/column/heading.partial.mustache',
				'partial__column-pricing'      => 'templates/column/pricing.partial.mustache',
				'partial__column-top-features' => 'templates/column/top-features.partial.mustache',
				'partial__column-add-ons'      => 'templates/column/add-ons.partial.mustache',
				'partial__column-links'        => 'templates/column/links.partial.mustache',
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
		$additional_template_data = parent::get_template_data( $additional_template_data );
		$additional_template_data['plans'] = [];
		$most_popular_plan = $additional_template_data['most_popular_plan'] ?? 'plus';
		if ( ! empty( $additional_template_data['base_pricing_info'] ) ) {
			$additional_template_data['plans'] = $this->format_pricing_data( $additional_template_data['base_pricing_info'], $most_popular_plan );
		}

		$per_month_suffix = esc_html_x( '/mo', 'Per Month', 'freshpress-website' );
		$per_year_suffix = esc_html_x( '/yr', 'Per Year', 'freshpress-website' );
		$terms = [ 'monthly', 'yearly' ];
		$additional_template_data['price_disclaimer_left'] = 'left' === $additional_template_data['price_disclaimer_align'];

		foreach ( $terms as $term ) {
			$additional_template_data[ "price_{$term}_suffix" ] = 'mo' === $additional_template_data[ "pricing_term_suffix_{$term}_plan" ] ? $per_month_suffix : $per_year_suffix;
			$additional_template_data[ "promo_price_{$term}_suffix" ] = 'mo' === $additional_template_data[ "pricing_term_suffix_promo_{$term}_plan" ] ? $per_month_suffix : $per_year_suffix;
		}

		$first_plan_name = array_keys( $additional_template_data['plans'] )[0];
		$last_plan_name = array_keys( $additional_template_data['plans'] )[ count( $additional_template_data['plans'] ) - 1 ];

		if ( ! empty( $additional_template_data['plans'] && is_array( $additional_template_data['plans'] ) ) ) {
			foreach ( $additional_template_data['plans'] as $plan_name => $plan ) {
				$additional_template_data['plans'][ $plan_name ]['name'] = ucfirst( $plan_name );
				$additional_template_data['plans'][ $plan_name ]['plan_name'] = $plan_name;
				$additional_template_data['plans'][ $plan_name ]['show_column_price_disclaimer'] = ( $additional_template_data['price_disclaimer_left'] && $plan_name === $first_plan_name ) || ( ! $additional_template_data['price_disclaimer_left'] && $plan_name === $last_plan_name );

				foreach ( $terms as $term ) {
					if ( $additional_template_data[ "promo_{$plan_name}_{$term}_price" ] ) {
						$additional_template_data['plans'][ $plan_name ][ "promo_price_{$term}" ] = $this->price_disassembler( $additional_template_data[ "promo_{$plan_name}_{$term}_price" ] );
					} else {
						$additional_template_data['plans'][ $plan_name ][ "promo_price_{$term}" ] = $additional_template_data['plans'][ $plan_name ][ "price_{$term}" ];
					}
					if ( ! empty( $additional_template_data[ "promo_{$plan_name}_{$term}_banner_image" ] ) ) {
						$additional_template_data['plans'][ $plan_name ][ "{$term}_banner_image" ] = fp_render_img(
							$additional_template_data[ "promo_{$plan_name}_{$term}_banner_image" ],
							[
								'class' => "pricing-table_column-promo__ribbon-image m-auto {$term}",
								'alt'   => $this->get_most_popular_label(),
							]
						);
					}
					if ( ! empty( $additional_template_data[ "standard_{$plan_name}_{$term}_banner_subtext" ] ) ) {
						$additional_template_data['plans'][ $plan_name ][ "standard_{$term}_banner_subtext" ] = $additional_template_data[ "standard_{$plan_name}_{$term}_banner_subtext" ];
					}
					if ( ! empty( $additional_template_data[ "promo_{$plan_name}_{$term}_banner_subtext" ] ) ) {
						$additional_template_data['plans'][ $plan_name ][ "promo_{$term}_banner_subtext" ] = $additional_template_data[ "promo_{$plan_name}_{$term}_banner_subtext" ];
					}
					if ( ! empty( $additional_template_data[ "promo_{$plan_name}_{$term}_price_subtext" ] ) ) {
						$additional_template_data['plans'][ $plan_name ][ "promo_price_{$term}_subtext" ] = $additional_template_data[ "promo_{$plan_name}_{$term}_price_subtext" ];
					}
				}

				$additional_template_data['plans'][ $plan_name ]['align_items'] = /*! $this_promo && */
					$plan['custom_pricing'] ? 'align-items-center' : 'align-items-end align-items-md-center';

				$link_prefixes = [
					''       => "links_{$plan_name}",
					'promo_' => "promo_{$plan_name}_links",
				];

				$link_types = [
					'cta'             => [
						'has_styles' => true,
						'is_array'   => true,
					],
					'secondary_links' => [
						'has_styles' => false,
						'is_array'   => false,
					],
				];

				foreach ( $link_prefixes as $link_prefix_type => $link_prefix ) {
					foreach ( $link_types as $link_type => $link_type_data ) {
						if (
							! empty( $additional_template_data[ "{$link_prefix}_{$link_type}" ] )
							&& (
								! $link_type_data['is_array']
								|| ! empty( $additional_template_data[ "{$link_prefix}_{$link_type}" ]['url'] )
							)
						) {
							$additional_template_data['plans'][ $plan_name ][ "{$link_prefix_type}{$link_type}" ] = $additional_template_data[ "{$link_prefix}_{$link_type}" ];
							$additional_template_data['plans'][ $plan_name ][ "{$link_prefix_type}data_{$link_type}_text" ] = $this->format_cta_text( $additional_template_data['plans'][ $plan_name ][ "{$link_prefix_type}{$link_type}" ] );

							if ( $link_type_data['has_styles'] && ! empty( $additional_template_data[ "{$link_prefix}_{$link_type}_style" ] ) ) {
								$additional_template_data['plans'][ $plan_name ][ "{$link_prefix_type}{$link_type}_class" ] = 'ghost' === $additional_template_data[ "{$link_prefix}_{$link_type}_style" ] ? 'btn-outline-grey' : 'btn-cta-green';
							}
						}

						if ( ! empty( $additional_template_data['plans'][ $plan_name ][ "{$link_prefix_type}{$link_type}" ] ) ) {
							$standard_promo_class = empty( $link_prefix_type ) ? 'standard' : 'promo';
							$additional_template_data['plans'][ $plan_name ][ "{$link_prefix_type}{$link_type}" ] = fp_generate_link_html(
								$additional_template_data['plans'][ $plan_name ][ "{$link_prefix_type}{$link_type}" ],
								[
									'className' => 'btn mb-2 px-1 ' . $standard_promo_class . ' ' . ( $additional_template_data['plans'][ $plan_name ][ "{$link_prefix_type}{$link_type}_class" ] ?? '' ),
								]
							);
						}
					}
				}
			}
		}

		if ( ! empty( $additional_template_data['plans'] ) ) {
			$additional_template_data['plans'] = array_values( $additional_template_data['plans'] );
		}

		return $additional_template_data;
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
		$wrapper_properties = $this->get_wrapper_properties( $attributes );
		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
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
		$properties['class'] = 'position-relative mx-auto';
		$properties['data-term'] = $attributes['default_to_yearly'] ? 'yearly' : 'monthly';
		if ( ! empty( $attributes['enable_promo'] ) && $attributes['enable_promo'] ) {
			$properties['data-promo-exists'] = 'true';
		}
		if ( ! empty( $attributes['force_promo'] ) && $attributes['force_promo'] ) {
			$properties['data-promo-show'] = 'true';
		}
		if ( ! empty( $attributes['mobile_carousel'] ) && $attributes['mobile_carousel'] ) {
			$properties['data-mobile-carousel'] = 'true';
		}

		return parent::get_wrapper_properties( $attributes, $properties );
	}

	/**
	 * Initiate template data.
	 */
	private function initiate_template_data() {
		$current_lang_code = fp_parse_language_code( fp_get_current_language() )['lang'];

		$this->set_static_template_data(
			[
				'images' => [
					'most_popular' => fp_render_img(
						'images/pricing/most-popular-blue-' . $current_lang_code . '.svg',
						[
							'class' => 'pricing-table_column-badge__image',
							'alt'   => $this->get_most_popular_label(),
						]
					),
				],
				'labels' => [
					'add_ons'                 => esc_html( __( 'Add-Ons', 'freshpress-website' ) ),
					'asterisk'                => esc_html_x( '*', 'Asterisk', 'freshpress-website' ),
					'custom_pricing'          => esc_html( __( 'Custom Pricing', 'freshpress-website' ) ),
					'currency_symbol'         => esc_html_x( '$', 'Currency Symbol', 'freshpress-website' ),
					'decimal_separator'       => esc_html_x( '.', 'Decimal Separator', 'freshpress-website' ),
					'pricing_grid_disclaimer' => esc_html_x( 'Prices in USD', 'Pricing grid disclaimer', 'freshpress-website' ),
					'see_full_details'        => esc_html( __( 'See Full Plan Details', 'freshpress-website' ) ),
					'top_features'            => esc_html( __( 'Top Features', 'freshpress-website' ) ),
					'random'                  => md5( time() ),
				],
			],
			'pricingTableTemplateData'
		);
	}

	/**
	 * Initiate block attributes.
	 *
	 * @param string $override_block_name Pass block name if in ACF file is different from in block.json.
	 */
	protected function initiate_block_attributes( $override_block_name = '' ) {
		parent::initiate_block_attributes();

		foreach ( self::PLANS as $plan ) {
			foreach ( self::PRICE_PERIODS as $price_period ) {
				$this->block_attributes['blue_cta_bar_title'][ "promo_{$plan}_{$price_period}_price" ]['type'] = 'string';
			}
		}

		$this->block_attributes['enable_term_switch']['default'] = true;
	}

	/**
	 * Format and return Pricing Table Info from parsed CSV string.
	 *
	 * @param string $csv_text CSV formatted pricing data from Google Sheet.
	 * @param string $most_popular_plan Most popular plan key.
	 *
	 * @return array
	 */
	private function format_pricing_data( $csv_text, $most_popular_plan = 'plus' ) {
		$csv = fp_parse_csv( $csv_text );
		$plans_export = [];
		$plan_data = $csv['data'];

		// Iterate through all data arrays.
		foreach ( $plan_data as $row ) {
			$category = $row['category'];
			array_shift( $row );

			// Associate data with specific category in each plan.
			foreach ( $row as $key => $value ) {
				$plans_export[ $key ]['name'] = $key;
				$plans_export[ $key ]['most_popular'] = $most_popular_plan === $key;
				if ( 'top_features' === $category || 'addons' === $category ) {
					// Break list into arrays per bullet point.
					$features = preg_split( '/(?:\r?\n){2}/', $value );

					// Loop through each newly separated group of feature text.
					foreach ( $features as $feature ) {

						// Break feature text group into its own array.
						$feature = explode( "\n", $feature );
						$output = [
							'feature' => '',
							'bold'    => false,
							'tooltip' => false,
						];

						// Loop through the data for this bullet point.
						foreach ( $feature as $line ) {
							if ( fp_starts_with( $line, 'bold: ' ) ) {
								// Get bold.
								$bold = fp_format_vartype( explode( 'bold: ', $line )[1] );
								$output['bold'] = $bold;
							} elseif ( fp_starts_with( $line, 'tooltip: ' ) ) {
								// Get tooltip.
								$tooltip = fp_format_vartype( explode( 'tooltip: ', $line )[1] );
								$output['tooltip'] = fp_render_block( 'info-tooltip', [ 'copy' => $tooltip ] );
							} elseif ( ! empty( $line ) ) {
								// Get feature text.
								$output['feature'] = $line;
							}
						}
						$plans_export[ $key ][ $category ][] = $output;
					}
				} elseif ( 'price_monthly' === $category || 'price_yearly' === $category ) {
					$plans_export[ $key ][ $category ] = $this->price_disassembler( $value );
				} else {
					// All other feature/addon points assigned as a simple key-value pair.
					$plans_export[ $key ][ $category ] = fp_format_vartype( $value );
				}
			}
		}

		return $plans_export;
	}

	/**
	 * Break apart a price value into sections required for use in the pricing table.
	 *
	 * @param  float $price  Float value of price to be converted.
	 * @return array
	 */
	private function price_disassembler( $price ) {
		if ( empty( $price ) ) {
			return [
				'whole'   => '0',
				'decimal' => '00',
			];
		}

		$float = number_format( $price, 2, '.', '' );
		$parts = explode( '.', (string) $float );
		return [
			'whole'   => $parts[0],
			'decimal' => $parts[1],
		];
	}

	/**
	 * Format cta text.
	 *
	 * @param array|string $link EditorControls.Link output.
	 *
	 * @return string
	 */
	private function format_cta_text( $link ) {
		$title = '';
		if ( is_array( $link ) && ! empty( $link['title'] ) ) {
			$title = $link['title'];
		} else if ( is_string( $link ) ) {
			$title = $link;
		}

		if ( ! empty( $title ) ) {
			$cta_text = wp_strip_all_tags( strtolower( $title ) );
			$cta_text = preg_replace( '/[^a-z0-9_\s-]/', '', $cta_text );

			return preg_replace( '/[\s-]+/', '', $cta_text );
		}

		return $title;
	}

	/**
	 * Returns "Most Popular" label.
	 *
	 * @return string
	 */
	private function get_most_popular_label() {
		return 'Most Popular';
	}
}
