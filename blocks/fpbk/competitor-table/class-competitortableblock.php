<?php
/**
 * CompetitorTable class.
 *
 * @package FreshpressBlocks\CompetitorTable
 * @subpackage CompetitorTable
 */

namespace FreshpressBlocks;

/**
 * Class CompetitorTable
 *
 * @package FreshpressBlocks
 */
class CompetitorTableBlock extends ABlock {

	/**
	 * Icon's HTMLs.
	 *
	 * @var string
	 */
	private $icons;

	/**
	 * CompetitorTableBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_editor_style();
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
				'partial__feature_row' => 'templates/feature_row.partial.mustache',
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
		$additional_template_data['text_product_comparison'] = _x( 'Product Comparison', 'Competitor Table Block', 'freshpress-website' );
		$additional_template_data['text_enlarge_image'] = _x( 'Enlarge', 'Competitor Table Block', 'freshpress-website' );
		$additional_template_data['text_product_screenshot'] = _x( 'Product Screenshot', 'Competitor Table Block', 'freshpress-website' );
		$additional_template_data['competitors_number'] = count( $additional_template_data['competitors'] );
		$block_id = '#' . $this->get_block_id( $additional_template_data );

		if ( ! empty( $additional_template_data['freshbooks_column_colour'] && ! empty( $additional_template_data['freshbooks_column_colour']['hex'] ) ) ) {
			$fb_col_bg = $additional_template_data['freshbooks_column_colour']['hex'];
			$additional_template_data['style_tag'] = <<<HTML
				<style>
				$block_id tr td:nth-child(2), $block_id tr th:nth-child(2) {
					background-color: $fb_col_bg;
				}
				</style>
			HTML;
		}

		if ( ! empty( $additional_template_data['competitors'] ) ) {
			foreach ( $additional_template_data['competitors'] as $index => $competitor ) {
				if ( ! empty( $competitor['logo'] ) ) {
					$additional_template_data['competitors'][ $index ]['logo'] = fp_render_img(
						$competitor['logo'],
						[
							'class' => 'competitor-table__competitor-logo',
						]
					);
				}

				if ( ! empty( $competitor['screenshot'] ) ) {
					$additional_template_data['competitors'][ $index ]['screenshot'] = fp_render_img(
						$competitor['screenshot'],
						[
							'class' => 'competitor-table__competitor-screenshot d-none d-md-block',
						],
						'full'
					);
					$additional_template_data['competitors'][ $index ]['screenshot_thumbnail'] = fp_render_img(
						$competitor['screenshot'],
						[
							'class' => 'competitor-table__competitor-screenshot d-none d-md-block',
						]
					);
				}

				if ( ! empty( $competitor['mobile_screenshot'] ) ) {
					$additional_template_data['competitors'][ $index ]['mobile_screenshot'] = fp_render_img(
						$competitor['mobile_screenshot'],
						[
							'class' => 'competitor-table__competitor-mobile-screenshot d-md-none',
						],
						'full'
					);
					$additional_template_data['competitors'][ $index ]['mobile_screenshot_thumbnail'] = fp_render_img(
						$competitor['mobile_screenshot'],
						[
							'class' => 'competitor-table__competitor-mobile-screenshot d-md-none',
						]
					);
				}
			}
		}

		if ( ! empty( $additional_template_data['competitors'] ) && ! empty( $additional_template_data['features'] ) ) {
			$additional_template_data['feature_rows'] = [];

			foreach ( $additional_template_data['features'] as $feature_index => $feature ) {
				$competitors_feature_rows = [];

				foreach ( $additional_template_data['competitors'] as $competitor ) {
					if ( ! empty( $competitor['features'][ $feature_index ] ) ) {
						$competitors_feature_rows[] = $competitor['features'][ $feature_index ];
					}
				}

				$additional_template_data['feature_rows'][ $feature_index ] = [
					'name'        => $feature['name'],
					'competitors' => $competitors_feature_rows,
				];
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
				'class' => 'competitor-table position-relative',
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
				'images/icons/checkmark-green-gradient.svg',
				[
					'class' => 'checkmark skip-lazy',
					'alt'   => 'Checkmark',
				]
			),
			'crossmark' => fp_render_img(
				'images/icons/crossmark-red-gradient.svg',
				[
					'class' => 'crossmark skip-lazy',
					'alt'   => 'Crossmark',
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
			'competitorTableTemplateData'
		);
	}

	/**
	 * Initiate block attributes.
	 *
	 * @param string $override_block_name Pass block name if in ACF file is different from in block.json.
	 */
	protected function initiate_block_attributes( $override_block_name = '' ) {
		parent::initiate_block_attributes();
		$freshbooks_logo = get_page_by_title( pathinfo( '/wp-content/uploads/freshbooks-logo.png' )['filename'], 'OBJECT', 'attachment' );

		$this->block_attributes['competitors']['default'][0] = [
			'key'      => 'initial-competitor-0',
			'has_logo' => true,
			'logo'     => [
				'id' => ! empty( $freshbooks_logo ) ? $freshbooks_logo->ID : '',
			],
			'features' => [
				0 => [
					'key'       => 'initial-competitor-0-feature-0',
					'text'      => '',
					'checkmark' => true,
					'crossmark' => false,
				],
			],
		];

		$this->block_attributes['competitors']['default'][1] = [
			'key'      => 'initial-competitor-1',
			'has_logo' => false,
			'text'     => '',
			'features' => [
				0 => [
					'key'       => 'initial-competitor-1-feature-0',
					'text'      => '',
					'checkmark' => false,
					'crossmark' => true,
				],
			],
		];

		$this->block_attributes['features']['default'][0] = [
			'key'  => 'initial-feature-0',
			'name' => '',
		];
	}
}
