<?php
/**
 * GalleryCarousel class.
 *
 * @package FreshpressBlocks\GalleryCarousel
 * @subpackage GalleryCarousel
 */

namespace FreshpressBlocks;

/**
 * Class GalleryCarousel

 * @package FreshpressBlocks
 */
class GalleryCarouselBlock extends ABlock {
	/**
	 * GalleryCarouselBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'gallery-carousel-block' );
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
				'slide' => 'templates/slide.mustache',
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
		$slide_class = 'skip-lazyload h-auto';

		if ( ! empty( $additional_template_data['border'] ) && $additional_template_data['border'] ) {
			$slide_class .= ' border rounded';
		}

		if ( ! empty( $additional_template_data['shadow'] ) && $additional_template_data['shadow'] ) {
			$slide_class .= ' with-shadow';
		}

		if ( function_exists( 'fp_render_img' ) && ! empty( $additional_template_data['gallery'] ) ) {
			foreach ( $additional_template_data['gallery'] as $index => $gallery_image ) {
				if ( ! empty( $gallery_image ) ) {
					$additional_template_data['gallery'][ $index ] = fp_render_img(
						$gallery_image,
						[ 'class' => $slide_class ],
						'full'
					);
				} else {
					$additional_template_data['gallery'][ $index ] = '';
				}
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
				'class' => 'swiper-container w-100',
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
