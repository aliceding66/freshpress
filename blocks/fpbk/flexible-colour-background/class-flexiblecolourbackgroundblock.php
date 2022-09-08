<?php
/**
 * FlexibleColourBackgroundBlock class.
 *
 * @package FreshpressBlocks\FlexibleColourBackgroundBlock
 * @subpackage FlexibleColourBackgroundBlock
 */

namespace FreshpressBlocks;

/**
 * Class FlexibleColourBackgroundBlock
 *
 * @package FreshpressBlocks
 */
class FlexibleColourBackgroundBlock extends ABlock {

	/**
	 * FlexibleColourBackgroundBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_style();
	}

	/**
	 * Generate styles for the block, including background colour and images
	 *
	 * @param array $attributes Block's attributes.
	 *
	 * @return string
	 */
	private function get_styles( array $attributes ) {
		$style = '';
		if ( ! empty( $this->get_block_id( $attributes ) ) ) {
			$background_selector = '#' . $this->get_block_id( $attributes );
			$colour = 'transparent';
			if ( ! empty( $attributes['background_colour'] ) && ! empty( $attributes['background_colour']['hex'] ) ) {
				$colour = esc_html( $attributes['background_colour']['hex'] );
			}

			$visibility_classes = array_keys( $this->get_visibility_classes_for_background_images( $attributes['background_images'] ) );

			$breakpoint_styles = '';
			if ( is_array( $attributes['background_images'] ) ) {
				foreach ( $attributes['background_images'] as $background_image ) {
					$max_width_media_rule = '';
					$breakpoint = $background_image['screen_size'];
					$background_colour = ! empty( $background_image['background_colour'] ) && ! empty( $background_image['background_colour']['hex'] ) ? 'background-color: ' . esc_html( $background_image['background_colour']['hex'] ) . ';' : '';
					$max_width = ! empty( $background_image['max_width'] ) ? 'max-width: ' . esc_html( $background_image['max_width'] ) . '; margin-left: auto; margin-right: auto;' : '';
					$min_height = ! empty( $background_image['min_height'] ) ? 'min-height: ' . esc_html( $background_image['min_height'] ) . ';' : '';

					$padding_top = '';
					$padding_bottom = '';

					if ( isset( $background_image['content_responsive_padding'] ) && $background_image['content_responsive_padding'] > 0 ) {
						$padding_value = $background_image['content_responsive_padding'] . 'vw';
						$breakpoint_index = array_search( $breakpoint, $visibility_classes );
						if ( count( $visibility_classes ) > $breakpoint_index ) {
							$next_breakpoint = $visibility_classes[ $breakpoint_index + 1 ];
							$max_width_media_rule = " and ( max-width: {$next_breakpoint}px )";
						}

						$padding_top = "padding-top: $padding_value !important;";
						$padding_bottom = "padding-bottom: $padding_value !important;";
					}

					$breakpoint_styles .= <<< STYLE
@media screen and ( min-width: {$breakpoint}px ){$max_width_media_rule} {
	{$background_selector} {
		$background_colour
		$max_width
		$min_height
		$padding_top
		$padding_bottom
	}
}

STYLE;
				}
			}

			$style = <<< STYLE
<style>
	{$background_selector} .flexible-colour-background__background-wrapper,
	{$background_selector} .flexible-colour-background__background-wrapper::before,
	{$background_selector} .flexible-colour-background__background-wrapper::after {
		background-color: $colour;
	}

	{$breakpoint_styles}
</style>
STYLE;
		}

		return $style;
	}

	/**
	 * Generate background images HTML.
	 *
	 * @param array $attributes Block attributes.
	 * @return string
	 */
	private function get_background_images( $attributes ) {
		if ( is_array( $attributes['background_images'] ) ) {
			$visibility_classes = $this->get_visibility_classes_for_background_images( $attributes['background_images'] );

			return join(
				'',
				array_map(
					function( $background_image ) use ( $visibility_classes ) {
						if ( ! empty( $background_image['background_image'] ) && ! empty( $background_image['background_image']['url'] ) ) {
							$visibility_class = $visibility_classes[ $background_image['screen_size'] ] ?? 'd-none';

							$styles = [
								'background-image' => ( 'url(' . $background_image['background_image']['url'] . ')' ),
							];

							if ( 'custom' !== $background_image['background_position'] ) {
								$styles['background-position'] = $background_image['background_position'];
							}

							if ( 'custom' === esc_html( $background_image['background_size'] ) ) {
								$styles['background-size'] = esc_html( $background_image['custom_background_size'] );
							} else {
								$styles['background-size'] = esc_html( $background_image['background_size'] );
							}

							$offset = isset( $background_image['offset'] ) ? intval( $background_image['offset'] ) : 0;
							if ( 0 !== $offset ) {
								$direction = $offset > 0 ? 'bottom' : 'top';
								$offset = abs( $offset );
								$offset_doubled = $offset * 2;
								$styles['height'] = "calc(100% + {$offset_doubled}px)";
								$styles[ $direction ] = "-{$offset}px";
							}

							$styles = $this->format_styles( $styles );

							return '<div class="flexible-colour-background__background-image position-absolute ' . $visibility_class . '" style="' . $styles . '"></div>';
						}

						return '';
					},
					$attributes['background_images']
				)
			);
		}

		return '';
	}

	/**
	 * Generate reversed corners HTML.
	 *
	 * @param array $attributes Block's attributes.
	 *
	 * @return string
	 */
	private function get_reversed_corners( $attributes ) {
		if ( is_array( $attributes['reversed_corners'] ) ) {
			return join(
				'',
				array_map(
					function( $corner ) {
						$placement = $corner['placement'] ?? 'up-left';
						$colour = $corner['colour'] ?? 'white';

						return "<div class='d-none d-md-block reversed-corner reversed-corner_{$placement} reversed-corner_{$colour}'><div></div></div>";
					},
					$attributes['reversed_corners']
				)
			);
		}

		return '';
	}

	/**
	 * Fix screen_sizes to match breakpoints values.
	 *
	 * @param array $background_images Background images.
	 * @return array
	 */
	private function fix_background_images_screen_sizes( $background_images ) {
		return array_map(
			function( $background_image ) {
				if ( 1200 == $background_image['screen_size'] ) {
					$background_image['screen_size'] = 1280;
				}

				return $background_image;
			},
			$background_images
		);
	}

	/**
	 * Return array of display classes per screen size.
	 *
	 * @param array $background_images Background images.
	 * @return array
	 */
	private function get_visibility_classes_for_background_images( $background_images ) {
		$visibility_classes = [];

		$visibility_breakpoints = array_unique( array_column( $background_images, 'screen_size' ) );
		sort( $visibility_breakpoints );
		$breakpoints = array_flip( fp_get_breakpoints() );

		foreach ( $visibility_breakpoints as $index => $screen_size ) {
			if ( 0 === $index ) {
				$new_visibility_class = 'd-block ';

				if ( isset( $visibility_breakpoints[ $index + 1 ] ) ) {
					$new_visibility_class .= ( 'd-' . $breakpoints[ $visibility_breakpoints[ $index + 1 ] ] . '-none ' );
				}
			} else {
				$new_visibility_class = 'd-none d-' . $breakpoints[ $visibility_breakpoints[ $index ] ] . '-block ';

				if ( isset( $visibility_breakpoints[ $index + 1 ] ) ) {
					$new_visibility_class .= ( 'd-' . $breakpoints[ $visibility_breakpoints[ $index + 1 ] ] . '-none ' );
				}
			}

			$visibility_classes[ $screen_size ] = $new_visibility_class;
		}

		return $visibility_classes;
	}

	/**
	 * Format styles array to string.
	 *
	 * @param array $styles Array of styles.
	 * @return string
	 */
	private function format_styles( $styles ) {
		return join(
			';',
			array_map(
				function( $value, $property ) {
					return "{$property}:{$value}";
				},
				$styles,
				array_keys( $styles )
			)
		);
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
				'class' => 'no-gutters px-3 position-relative w-auto',
			]
		);
		if ( is_array( $attributes['background_images'] ) ) {
			$attributes['background_images'] = $this->fix_background_images_screen_sizes( $attributes['background_images'] );
		}
		$style = $this->get_styles( $attributes );
		$background_images = $this->get_background_images( $attributes );
		$reversed_corners = $this->get_reversed_corners( $attributes );

		return <<< HTML
{$style}
<div {$wrapper_properties}>
	<div class="position-absolute flexible-colour-background__background-wrapper">
		{$reversed_corners}
		{$background_images}
	</div>
	{$inner_blocks_content}
</div>
HTML;
	}
}
