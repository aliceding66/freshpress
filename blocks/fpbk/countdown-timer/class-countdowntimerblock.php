<?php
/**
 * CountdownTimer class.
 *
 * @package FreshpressBlocks\CountdownTimer
 * @subpackage CountdownTimer
 */

namespace FreshpressBlocks;

/**
 * Class CountdownTimer

 * @package FreshpressBlocks
 */
class CountdownTimerBlock extends ABlock {

	/**
	 * Direct Buy campaign.
	 *
	 * @var array|bool
	 */
	private $campaign;

	/**
	 * CountdownTimerBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'countdown-timer-block' );
		$this->enqueue_editor_style();
		$this->enqueue_style();
		$this->campaign = fp_init_campaign();
	}

	/**
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function. Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		$template_data = parent::get_template_data( $additional_template_data );

		if ( $this->active_campaign_with_dates_exists() ) {
			$template_data['campaign_exists'] = true;

			// Countdown time.
			$active_campaign = $this->campaign;
			$now = fp_get_date( 'now', 'U' );
			$end_date = fp_get_date( $active_campaign['end_date'], 'U' );
			$countdown_date_diff = date_diff( $now, $end_date );
			$template_data['countdown_time'] = $countdown_date_diff->format( '%d Days %h Hours %i Minutes' );

			$lto_styles = '';

			if ( ! empty( $template_data['lto_label_background_image'] ) ) {
				$lto_bg_url = isset( $template_data['lto_label_background_image']['url'] ) ? $template_data['lto_label_background_image']['url'] : $template_data['lto_label_background_image'];
				$lto_styles .= 'background-image: url("' . $lto_bg_url . '");';
			}

			if ( ! empty( $template_data['lto_label_colour'] ) ) {
				$lto_styles .= ' color: ' . $template_data['lto_label_colour'] . ';';
			}

			if ( ! empty( $lto_styles ) ) {
				$template_data['lto_style'] = "style='$lto_styles'";
			}

			if ( ! empty( $template_data['lto_label_background_image'] ) && empty( $template_data['lto_label'] ) ) {
				$template_data['no-text-lto'] = true;
				$template_data['lto_image'] = fp_render_img(
					$template_data['lto_label_background_image'],
					[
						'class' => 'countdown-timer__lto is-img mb-3',
						'alt'   => __( 'Campaign Label', 'freshpress-website' ),
					]
				);
			}
		}

		return $template_data;
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
		if ( ! empty( $attributes['styled'] ) && $attributes['styled'] ) {
			$properties['class'] .= ' themed mx-auto ml-sm-0';
		}

		if ( $this->active_campaign_with_dates_exists() ) {
			$properties['data-countdown-start'] = $this->campaign['countdown_start_date'];
			$properties['data-countdown-end'] = $this->campaign['end_date'];
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
		$additional_wrapper_properties = [
			'class' => 'countdown-timer',
		];

		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			$additional_wrapper_properties
		);

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
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

		$this->set_block_attributes(
			[
				'styled' => [
					'label'   => 'Styled',
					'name'    => 'styled',
					'type'    => 'boolean',
					'default' => false,
				],
			]
		);
	}

	/**
	 * Checks campaign conditions.
	 *
	 * @return bool
	 */
	private function active_campaign_with_dates_exists() {
		return ! empty( $this->campaign ) && ! empty( $this->campaign['countdown_start_date'] ) && ! empty( $this->campaign['end_date'] );
	}
}
