<?php
/**
 * ProductTour class.
 *
 * @package FreshpressBlocks\ProductTour
 * @subpackage ProductTour
 */

namespace FreshpressBlocks;

/**
 * Class ProductTour
 *
 * @package FreshpressBlocks
 */
class ProductTourBlock extends ABlock {
	/**
	 * ProductTourBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'product-tour-block' );
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
				'partials__nav'                       => 'templates/nav.partial.mustache',
				'partials__carousel'                  => 'templates/carousel.partial.mustache',
				'partials__carousel-item--default'    => 'templates/carousel-item/default.partial.mustache',
				'partials__carousel-item--with-video' => 'templates/carousel-item/with-video.partial.mustache',
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
		$additional_template_data['is_with_video_theme'] = ! empty( $additional_template_data['className'] ) && strpos( $additional_template_data['className'], 'is-style-with-video' ) !== false;

		foreach ( $additional_template_data['product_tour_items'] as $item_key => $item ) {
			$is_active = ( 0 === $item_key );
			$has_mobile_image = ! empty( $item['product_tour_item_mobile_image'] );
			$additional_template_data['product_tour_items'][ $item_key ]['product_tour_item_index'] = $item_key;
			$additional_template_data['product_tour_items'][ $item_key ]['nav_active_class'] = $is_active ? 'product-tour__nav-link_active' : '';
			$additional_template_data['product_tour_items'][ $item_key ]['item_active_class'] = $is_active ? 'product-tour__item_active' : '';
			$additional_template_data['product_tour_items'][ $item_key ]['nav_title_id'] = strtolower( str_replace( ' ', '-', $item['product_tour_item_nav_title'] ) );
			$additional_template_data['product_tour_items'][ $item_key ]['has_mobile_image'] = $has_mobile_image;

			if ( ! empty( $item['product_tour_item_image'] ) ) {
				$additional_template_data['product_tour_items'][ $item_key ]['product_tour_item_image'] = fp_render_img(
					$item['product_tour_item_image'],
					[
						'class' => 'product-tour__item-image w-auto h-auto' . ( $additional_template_data['mobile_carousel'] ? ' skip-lazy' : '' ) . ( $has_mobile_image ? ' d-none d-lg-inline-block' : 'd-inline-block' ),
					],
					'large'
				);
			}

			if ( $has_mobile_image ) {
				$additional_template_data['product_tour_items'][ $item_key ]['product_tour_item_mobile_image'] = fp_render_img(
					$item['product_tour_item_mobile_image'],
					[
						'class' => 'product-tour__item-image w-auto h-auto d-inline-block d-lg-none' . ( $additional_template_data['mobile_carousel'] ? ' skip-lazy' : '' ),
					],
					'large'
				);
			}

			if ( ! empty( $item['product_tour_item_link'] ) ) {
				if ( $additional_template_data['is_with_video_theme'] ) {
					$class_name = 'product-tour__item-cta py-2 d-inline-block';
				} else {
					$class_name = 'product-tour__item-cta btn btn-outline-grey py-2 px-4 mx-auto' . ( ! empty( $link['className'] ) ? 'd-inline-block' : '' );
				}

				$additional_template_data['product_tour_items'][ $item_key ]['product_tour_item_link'] = fp_generate_link_html(
					$item['product_tour_item_link'],
					[
						'className' => $class_name,
						'title'     => $item['product_tour_item_link']['title'],
					]
				);
			}

			if ( ! empty( $item['product_tour_item_cta'] ) ) {
				$additional_template_data['product_tour_items'][ $item_key ]['product_tour_item_cta'] = fp_generate_link_html(
					$item['product_tour_item_cta'],
					[
						'className' => 'py-2 px-3 btn btn-cta-green cta__button',
						'title'     => $item['product_tour_item_cta']['title'],
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
		$additional_wrapper_properties = [
			'class' => 'pb-5 pb-xl-0 position-relative',
		];
		if ( $attributes['mobile_carousel'] ) {
			$additional_wrapper_properties['data-mobile-carousel'] = 'true';
		} else {
			$additional_wrapper_properties['class'] .= ' no-gutters';
		}

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
}
