<?php
/**
 * Carousel class.
 *
 * @package FreshpressBlocks\Carousel
 * @subpackage Carousel
 */

namespace FreshpressBlocks;

/**
 * Class Carousel

 * @package FreshpressBlocks
 */
class CarouselBlock extends ABlock {
	/**
	 * CarouselBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'carousel-block' );
		$this->enqueue_editor_style();
		$this->enqueue_style();
	}

	/**
	 * Generate styles for the block.
	 *
	 * @param array $attributes Block's attributes.
	 *
	 * @return string
	 */
	private function get_styles( array $attributes ) {
		$style = '';

		if ( ! empty( $this->get_block_id( $attributes ) ) ) {
			$block_selector = '#' . esc_html( $this->get_block_id( $attributes ) );
			$max_width = ! empty( $attributes['max_width'] ) ? 'max-width: ' . esc_html( $attributes['max_width'] ) . ';' : '';

			if ( ! empty( $max_width ) ) {
				$style = <<<STYLE
<style>
	$block_selector .swiper-container {
		$max_width
		margin: 0 auto;
	}
</style>
STYLE;
			}
		}

		return $style;
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
		$has_pagination = isset( $attributes['pagination'] ) ? $attributes['pagination'] : false;
		$has_navigation = isset( $attributes['navigation'] ) ? $attributes['navigation'] : false;
		$autoheight = isset( $attributes['swiper_settings_autoheight'] ) ? $attributes['swiper_settings_autoheight'] : false;

		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class'           => 'position-relative overflow-hidden',
				'data-pagination' => $has_pagination ? 'true' : 'false',
				'data-navigation' => $has_navigation ? 'true' : 'false',
				'data-autoheight' => $autoheight ? 'true' : 'false',
			]
		);

		$style = $this->get_styles( $attributes );
		$pagination = $has_pagination ? <<<HTML
<div class="carousel__swiper-pagination swiper-pagination position-relative"></div>
HTML : '';
		$navigation = $has_navigation ? <<<HTML
<div class="carousel__swiper-button carousel__swiper-button--prev swiper-button-prev"></div>
<div class="carousel__swiper-button carousel__swiper-button--next swiper-button-next"></div>
HTML : '';

		return <<< HTML
{$style}
<div {$wrapper_properties}>
	<div class="carousel__swiper-container swiper-container">
		<div class="carousel__swiper-wrapper swiper-wrapper">
			{$inner_blocks_content}
		</div>
	</div>
	{$pagination}
	{$navigation}
</div>
HTML;
	}
}
