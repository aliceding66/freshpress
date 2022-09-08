<?php
/**
 * MobileSegmentNavigation class.
 *
 * @package FreshpressBlocks\MobileSegmentNavigation
 * @subpackage MobileSegmentNavigation
 */

namespace FreshpressBlocks;

/**
 * Class MobileSegmentNavigation

 * @package FreshpressBlocks
 */
class MobileSegmentNavigationBlock extends ABlock {
	/**
	 * MobileSegmentNavigationBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
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
		$this->set_template_partials(
			[
				'partial__mobile_segment_navigation_link' => 'templates/mobile_segment_navigation_link.partial.mustache',
			]
		);

		return parent::load_template( $local_path, $template_data );
	}

	/**
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function. Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		if ( ! empty( $additional_template_data['mobile_segment_navigation_links'] ) ) {
			foreach ( $additional_template_data['mobile_segment_navigation_links'] as $key => $link ) {
				$additional_template_data['mobile_segment_navigation_links'][ $key ]['mobile_segment_navigation_link'] = fp_generate_link_html(
					$link['mobile_segment_navigation_link'],
					[
						'className' => 'mobile-segment-navigation__link rounded d-flex align-items-center p-3 pr-4 text-decoration-none',
						'title'     => $link['mobile_segment_navigation_link']['title'],
					]
				);
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
				'class' => 'd-flex flex-wrap w-100 d-lg-none justify-content-between',
			]
		);

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}
}
