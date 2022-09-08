<?php
/**
 * Hero class.
 *
 * @package FreshpressBlocks\Hero
 * @subpackage Hero
 */

namespace FreshpressBlocks;

use FP_Site_Options;

/**
 * Class Hero
 *
 * @package FreshpressBlocks
 */
class HeroBlock extends ABlock {
	/**
	 * HeroBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_editor_style();

		$this->enqueue_script( 'hero-block' );
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
				'hero_signup_form' => 'templates/hero-signup-form.mustache',
				'hero_ctas'        => 'templates/hero-ctas.mustache',
				'hero_image_label' => 'templates/hero-image-label.mustache',
				'hero_search'      => 'templates/hero-search.mustache',
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
		$additional_template_data['is_centered_with_sso_theme'] = ! empty( $additional_template_data['className'] ) && strpos( $additional_template_data['className'], 'is-style-centered-with-sso' ) !== false;

		if ( ! empty( $additional_template_data['hero_labels_with_icons'] ) ) {
			foreach ( $additional_template_data['hero_labels_with_icons'] as $index => $image_label ) {
				$additional_template_data['hero_labels_with_icons'][ $index ]['hide_on_mobile_class'] = esc_attr( ! empty( $image_label['hide_on_mobile'] ) ? 'd-none d-sm-flex' : 'd-flex' );
				$additional_template_data['hero_labels_with_icons'][ $index ]['image_label_inline_styles'] = ! empty( $image_label['label_colour'] ) ? "style='color: " . esc_attr( $image_label['label_colour']['hex'] ) . ";'" : '';

				if ( ! empty( $image_label['icon'] ) ) {
					$additional_template_data['hero_labels_with_icons'][ $index ]['icon'] = fp_render_img( $image_label['icon'], [ 'class' => 'mr-1 w-auto' ], 'full' );
				}
			}
		}

		$headline_mobile_size = 'mobile-' . $additional_template_data['headline_mobile_size'];
		$headline_tablet_size = 'tablet-' . $additional_template_data['headline_tablet_size'];
		$headline_desktop_size = 'desktop-' . $additional_template_data['headline_desktop_size'];

		if ( $additional_template_data['include_signup_form'] ) {
			$additional_template_data['signup_form'] = [
				'email_placeholder_text'           => $additional_template_data['signup_form_email_placeholder_text'],
				'password_placeholder_text'        => $additional_template_data['signup_form_password_placeholder_text'],
				'submit_button_text'               => $additional_template_data['signup_form_submit_button_text'],
				'include_default_terms_of_service' => $additional_template_data['signup_form_include_default_terms_of_service'],
				'custom_terms_of_service'          => fp_noesc( $additional_template_data['signup_form_custom_terms_of_service'] ),
				'default_terms'                    => fp_noesc( FP_Site_Options::get_option( 'default_terms_of_service' ) ),
				'hero_terms_of_service_colour'     => $additional_template_data['signup_form_hero_terms_of_service_colour'],
				'visibility'                       => $additional_template_data['signup_form_visibility'],
				'action'                           => 'https://' . esc_attr( fp_get_fb_domain( 'api' ) ) . '/auth/api/v1/smux/registrations',
				'terms_of_service_inline_styles'   => ! empty( $additional_template_data['signup_form_hero_terms_of_service_colour'] ) ? "style='color: " . $additional_template_data['signup_form_hero_terms_of_service_colour']['hex'] . ";'" : '',
				'invalid_email'                    => esc_html( __( 'Email is invalid.', 'freshpress-website' ) ),
				'invalid_password'                 => esc_html( __( 'Password is invalid.', 'freshpress-website' ) ),
				'field_required'                   => esc_html( __( 'This field is required.', 'freshpress-website' ) ),
			];
			$signup_form = $additional_template_data['signup_form'];
		}

		if ( function_exists( 'fp_render_blocks' ) && isset( $additional_template_data['hero_include_pardot_form'] ) && $additional_template_data['hero_include_pardot_form'] ) {
			$additional_template_data['pardot_form'] = fp_render_blocks(
				[
					'name'  => 'fpbk/pardot-form',
					'attrs' => [
						'pardot_form_url'                => $additional_template_data['pardot_form_url'],
						'pardot_form_iframe_width'       => $additional_template_data['pardot_form_iframe_width'],
						'pardot_form_form_name'          => $additional_template_data['pardot_form_form_name'],
						'pardot_form_thank_you_modal_id' => $additional_template_data['pardot_form_thank_you_modal_id'],
					],
				]
			);
		}

		$breakpoint_keys = fp_get_breakpoint_keys();

		if ( $additional_template_data['include_signup_form'] ) {
			$form_visibility = [];

			if ( ! empty( $breakpoint_keys ) ) {
				foreach ( $breakpoint_keys as $key ) {
					if ( 'sm' === $key ) {
						$form_visibility[ $key ] = in_array( $key, $signup_form['visibility'], true ) ? 'd-flex' : 'd-none';
					} else {
						$form_visibility[ $key ] = in_array( $key, $signup_form['visibility'], true ) ? "d-$key-flex" : "d-$key-none";
					}
				}
			}

			$additional_template_data['signup_form']['visibility'] = esc_attr( implode( ' ', $form_visibility ) );
		}

		if ( $additional_template_data['include_cta_button'] ) {
			$cta_visibility = [];
			if ( ! empty( $breakpoint_keys ) ) {
				foreach ( $breakpoint_keys as $key ) {
					if ( 'sm' === $key ) {
						$cta_visibility[ $key ] = in_array( $key, $additional_template_data['cta_button_visibility'], true ) ? 'd-flex' : 'd-none';
					} else {
						$cta_visibility[ $key ] = in_array( $key, $additional_template_data['cta_button_visibility'], true ) ? "d-$key-flex" : "d-$key-none";
					}
				}
			}
		}

		if ( $additional_template_data['hero_include_second_cta'] ) {
			$second_cta_visibility = [];
			if ( ! empty( $breakpoint_keys ) ) {
				foreach ( $breakpoint_keys as $key ) {
					if ( 'sm' === $key ) {
						$second_cta_visibility[ $key ] = in_array( $key, $additional_template_data['hero_second_cta_visibility'], true ) ? 'd-flex' : 'd-none';
					} else {
						$second_cta_visibility[ $key ] = in_array( $key, $additional_template_data['hero_second_cta_visibility'], true ) ? "d-$key-flex" : "d-$key-none";
					}
				}
			}
		}

		$breakpoint_uses_image = [];
		$cols = [];
		$content_position = 'justify-content-center';
		$content_column_position = 'align-items-center';
		$text_align = 'text-center';
		$main_section_paddings = '';
		$content_paddings = '';
		$images_by_breakpoint = [];
		$has_images = ! empty( $additional_template_data['images'] );

		if ( $has_images ) {
			foreach ( $additional_template_data['images'] as $img ) {
				$images_by_breakpoint[ $img['screen_size'] ] = $img;
			}
		}

		if ( $has_images ) {
			$imgs = [];
			$selector = '#' . $this->get_block_id( $additional_template_data );
			foreach ( $breakpoint_keys as $bp ) {
				if ( isset( $images_by_breakpoint[ $bp ] ) ) {
					$bp_img = empty( $images_by_breakpoint[ $bp ]['image']['url'] ) ? null : $images_by_breakpoint[ $bp ]['image']['url'];
					$display_image = $images_by_breakpoint[ $bp ]['display_image'] && ! empty( $bp_img );
					$bp_bg = isset( $images_by_breakpoint[ $bp ]['background_color']['hex'] ) ? $images_by_breakpoint[ $bp ]['background_color']['hex'] : $images_by_breakpoint[ $bp ]['background_color'];
					$bp_bottom_padding = isset( $images_by_breakpoint[ $bp ]['bottom_padding'] ) ? $images_by_breakpoint[ $bp ]['bottom_padding'] : null;
					$has_bp_img = ! empty( $bp_img );
					$has_bp_bg = ! empty( $bp_bg );
					$has_bp_bottom_padding = ! empty( $bp_bottom_padding ) || '0' === $bp_bottom_padding;

					if ( ! empty( $images_by_breakpoint[ $bp ]['hero_content_position'] ) ) {
						$content_position .= " justify-content-$bp-" . $images_by_breakpoint[ $bp ]['hero_content_position'];
						$content_column_position .= " align-items-$bp-" . $images_by_breakpoint[ $bp ]['hero_content_position'];

						if ( 'start' === $images_by_breakpoint[ $bp ]['hero_content_position'] ) {
							$text_align .= " text-$bp-left";
							$main_section_paddings .= ' pl-lg-3';
							$content_paddings .= ' pl-lg-5 pr-lg-0';
						} elseif ( 'end' === $images_by_breakpoint[ $bp ]['hero_content_position'] ) {
							$text_align .= " text-$bp-right";
							$main_section_paddings .= ' pr-lg-3';
							$content_paddings .= ' pr-lg-5 pl-lg-0';
						} else {
							$text_align .= " text-$bp-center";
						}
					}

					// Set a value of true, false or NULL for the use on an image per breakpoint.
					if ( $has_bp_img ) {
						// Image present. Force breakpoint to use image.
						$breakpoint_uses_image[ $bp ] = true;
					} elseif ( $has_bp_bg && ! $has_bp_img ) {
						// Image absent while color present. Force image to none and show Background Colour.
						$breakpoint_uses_image[ $bp ] = false;
					} else {
						// no image or bg color present.  Skip this breakpoint and let the responsive first cascade handle it.
						$breakpoint_uses_image[ $bp ] = null;
					}
					// Set the column count for the breakpoints based on images.
					if ( 'xs' === $bp ) {
						// xs is always full width.
						$cols[] = 'col';
					} elseif ( $has_bp_img && 'center bottom' !== $images_by_breakpoint[ $bp ]['background_position'] ) {
						// Image present. Force breakpoint to half width.
						$cols[] = "col-$bp-6";
					} elseif ( $has_bp_img && 'center bottom' === $images_by_breakpoint[ $bp ]['background_position'] ) {
						// Image present. Force breakpoint to half width.
						$cols[] = "col-$bp-12";
					} elseif ( $has_bp_bg && ! $has_bp_img ) {
						// Image absent while color present. Force Breakpoint to full width.
						$cols[] = "col-$bp-12";
					}
					// If no image or bg color present.  Skip this breakpoint and let the responsive first cascade handle it.

					$breakpoints = fp_get_breakpoints();
					$bp_px_width = $breakpoints[ $bp ] . 'px';
					$bp_css = $has_bp_bottom_padding ? "padding-bottom: $bp_bottom_padding; " : '';
					if ( ! empty( $images_by_breakpoint[ $bp ] ) ) {
						$bp_bg_size = 'background-size: ';

						if ( 'cover' === $images_by_breakpoint[ $bp ]['background_size'] ) {
							$bp_bg_size .= 'cover; ';
						} elseif ( 'normal' === $images_by_breakpoint[ $bp ]['background_size'] ) {
							$bp_bg_size .= 'auto 100%; ';
						} elseif ( 'custom' === $images_by_breakpoint[ $bp ]['background_size'] ) {
							$bp_bg_size .= $images_by_breakpoint[ $bp ]['hero_custom_background_size'] . '; ';
						}

						$bp_bg_pos = 'background-position: ' . ( 'normal' === $images_by_breakpoint[ $bp ]['background_position'] ? '100% 100%; ' : $images_by_breakpoint[ $bp ]['background_position'] . '; ' );
						$bp_css .= $bp_bg_size . $bp_bg_pos;
					}

					if ( ! empty( $bp_img ) && $display_image ) {
						$url = $bp_img;
						$bp_css .= "background-image: url(\"$url\");";
					}

					if ( ! empty( $bp_bg ) ) {
						$bp_css .= "background-color: $bp_bg;";
					}

					$imgs[] = "@media (min-width: $bp_px_width) { $selector { $bp_css } }";

					if ( ! empty( $bp_bg ) ) {
						$bp_reversed_corner_css = "box-shadow: -100px -100px 0 0 $bp_bg;";
						$imgs[] = "@media (min-width: $bp_px_width) { $selector .reversed-corner div::before { $bp_reversed_corner_css } }";
					}
				}
			}

			$images_styles = fp_noesc( implode( "\n", $imgs ) );
			$additional_template_data['images_style_tag'] = ! empty( $imgs ) ? <<<STYLE
<style>
{$images_styles}
</style>
STYLE : '';
		}

		$content_inline_styles = "style='";
		if ( ! empty( $additional_template_data['hero_content_max_width'] ) ) {
			$content_inline_styles .= 'max-width: ' . $additional_template_data['hero_content_max_width'] . ';';
		}
		if ( ! empty( $additional_template_data['hero_content_background_color'] ) && $additional_template_data['is_centered_with_sso_theme'] ) {
			$content_inline_styles .= 'background-color: ' . $additional_template_data['hero_content_background_color']['hex'] . ';';
		}
		$content_inline_styles .= "'";

		$additional_template_data += [
			'content_position'                => $content_position,
			'content_inline_styles'           => $content_inline_styles,
			'main_section_classes'            => $additional_template_data['is_centered_with_sso_theme'] ? '' : esc_attr( implode( ' ', $cols ) . $main_section_paddings ),
			'wrapper_child_classes'           => $additional_template_data['is_centered_with_sso_theme'] ? '' : 'py-3',
			'headline_classes'                => $additional_template_data['is_centered_with_sso_theme'] ? 'mx-auto px-0 px-sm-3' : 'h2 mx-auto mx-lg-0 py-2 py-lg-0',
			'email_group_classes'             => $additional_template_data['is_centered_with_sso_theme'] ? 'px-2 px-md-4 hero__signup-form-email' : '',
			'terms_group_classes'             => $additional_template_data['is_centered_with_sso_theme'] ? 'hero__signup-form__terms text-left position-relative pb-3' : 'text-center',
			'label_inline_styles'             => ! empty( $additional_template_data['hero_label_colour'] ) ? "style='color: " . $additional_template_data['hero_label_colour']['hex'] . ";'" : '',
			'headline_inline_styles'          => ! empty( $additional_template_data['headline_colour'] ) ? "style='color: " . $additional_template_data['headline_colour']['hex'] . ";'" : '',
			'headline_font_sizes'             => implode( ' ', [ $headline_mobile_size, $headline_tablet_size, $headline_desktop_size ] ),
			'text_inline_styles'              => ! empty( $additional_template_data['text_colour'] ) ? "style='color: " . $additional_template_data['text_colour']['hex'] . ";'" : '',
			'text_align'                      => $text_align,
			'text_display_class'              => ! $additional_template_data['text_mobile_visibility'] ? '' : ' d-none d-md-block',
			'content_paddings'                => $additional_template_data['is_centered_with_sso_theme'] ? 'pt-5 px-4 p-md-5' : 'mx-lg-0 p-3 pt-lg-5 ' . $content_paddings,
			'cta_button_inline_style'         => ! empty( $additional_template_data['cta_button_max_width'] ) ? "style='max-width: " . $additional_template_data['cta_button_max_width'] . ";'" : '',
			'cta_button_wrapper_classname'    => $additional_template_data['hero_include_second_cta'] ? 'flex-column flex-lg-row ' . $content_column_position : '',
			'cta_button_visibility_classname' => isset( $cta_visibility ) ? esc_attr( implode( ' ', $cta_visibility ) ) : '',
			'cta_button_offer_terms_text'     => fp_sprintf( _x( 'Offer terms:', 'Offer Terms', 'freshpress-website' ) ),
			'cta_button_subtext_classname'    => esc_attr( ! empty( $additional_template_data['cta_button_offer_details_text'] ) ? 'underline' : '' ),
			'cta_button_mice_inline_styles'   => ! empty( $additional_template_data['cta_button_hero_mice_type_colour'] ) ? "style='color: " . $additional_template_data['cta_button_hero_mice_type_colour']['hex'] . ";'" : '',
			'second_cta_inline_style'         => ! empty( $additional_template_data['hero_second_cta_max_width'] ) ? "style='max-width: " . $additional_template_data['hero_second_cta_max_width'] . ";'" : '',
			'second_cta_visibility_classname' => isset( $second_cta_visibility ) ? esc_attr( implode( ' ', $second_cta_visibility ) ) : '',
			'second_cta_subtext_classname'    => esc_attr( ! empty( $additional_template_data['hero_second_cta_offer_details_text'] ) ? 'underline' : '' ),
			'second_cta_mice_inline_styles'   => ! empty( $additional_template_data['hero_second_cta_hero_mice_type_colour'] ) ? "style='color: " . $additional_template_data['hero_second_cta_hero_mice_type_colour']['hex'] . ";'" : '',
		];

		if ( ! empty( $additional_template_data['cta_button_text'] ) ) {
			$additional_template_data['cta_button_link']['title'] = $additional_template_data['cta_button_text'];
		}
		if ( ! empty( $additional_template_data['cta_button_link'] ) ) {
			$additional_template_data['cta_button_link'] = fp_generate_link_html(
				$additional_template_data['cta_button_link'],
				[
					'className' => 'btn btn-cta-green btn-block btn-lg text-nowrap',
				]
			);
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
		$content = '';
		$promo_hero = $this->get_promo_hero();

		$wrapper_properties = $this->get_wrapper_properties( $attributes );
		$content = "<div $wrapper_properties>" . $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) ) . '</div>';
		return $promo_hero . $content;
	}

	/**
	 * Initiate template data.
	 */
	private function initiate_template_data() {
		$reviews_number = number_format_i18n( FP_Site_Options::get_option( 'getapp_reviews' ) );
		// translators: ratings widget.
		$rating_link = fp_noesc( fp_sprintf( __( '(Based on <a href="https://www.getapp.com/finance-accounting-software/a/freshbooks/" target="_blank" >%1$s GetApp reviews</a>)', 'freshpress-website' ), [ $reviews_number ] ) );

		$this->set_static_template_data(
			[
				'default_terms_of_service' => FP_Site_Options::get_option( 'default_terms_of_service' ),
				'breakpoint_keys'          => fp_get_breakpoint_keys(),
				'breakpoints'              => fp_get_breakpoints(),
				'signup_form_action'       => 'https://' . esc_attr( fp_get_fb_domain( 'api' ) ) . '/auth/api/v1/smux/registrations',
				'get_app_rating_text'      => esc_html_x( 'Excellent', 'GetApp rating text', 'freshpress-website' ),
				'rating_image1'            => fp_render_img(
					'images/rating/yellow.svg',
					[
						'class' => 'hero__rating1-stars',
						'alt'   => esc_html_x( '4.5 stars', 'GetApp rating', 'freshpress-website' ),
					]
				),
				'rating_image2'            => fp_render_img(
					'images/rating/white-yellow.svg',
					[
						'class' => 'hero__rating2-stars',
						'alt'   => esc_html_x( '4.5 stars', 'GetApp rating', 'freshpress-website' ),
					]
				),
				'rating_link'              => $rating_link,
				'apple_login_link'         => 'https://' . fp_get_fb_domain( 'auth' ) . '/service/auth/auth/apple?intent=sign_up',
				'apple_logo'               => fp_render_img(
					'images/logos/apple-logo.svg',
					[
						'class' => 'position-absolute',
						'alt'   => __(
							'Apple Logo',
							'freshpress-website'
						),
					]
				),
				'apple_button_text'        => __( 'Sign up with Apple', 'freshpress-website' ),
				'google_login_link'        => 'https://' . fp_get_fb_domain( 'auth' ) . '/service/auth/auth/google_oauth2_central_sso?intent=sign_up',
				'google_logo'              => fp_render_img(
					'images/logos/google-logo-icon.svg',
					[
						'class' => 'position-absolute',
						'alt'   => __(
							'Google Logo',
							'freshpress-website'
						),
					]
				),
				'google_button_text'       => __( 'Sign up with Google', 'freshpress-website' ),
				'close_form_text'          => __( 'Close', 'freshpress-website' ),
				'try_it_free_text'         => __( 'Try It Free for 30 Days. No credit card required. Cancel anytime.', 'freshpress-website' ),
			],
			'heroTemplateData'
		);
	}

	/**
	 * Check if there is an active campaign, if so render promo hero below the hero.
	 *
	 * @return string
	 */
	private function get_promo_hero() {
		$campaign = fp_init_campaign();
		if ( ! empty( $campaign ) ) {
			$has_promo_hero = ( is_front_page() && $campaign['include_homepage_promo_hero'] ) || ( is_page( 'pricing' ) && $campaign['include_pricing_promo_hero'] );
			if ( $has_promo_hero ) {
				return fp_render_blocks(
					[
						'name' => 'acf/promo-hero',
					]
				);
			}
		}

		return '';
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
		$breakpoint_keys = fp_get_breakpoint_keys();
		$breakpoint_uses_image = [];
		$images_by_breakpoint = [];
		$has_images = ! empty( $attributes['images'] );

		if ( $has_images ) {
			foreach ( $attributes['images'] as $img ) {
				$images_by_breakpoint[ $img['screen_size'] ] = $img;
			}
		}

		if ( $has_images ) {
			foreach ( $breakpoint_keys as $bp ) {
				if ( isset( $images_by_breakpoint[ $bp ] ) ) {
					$bp_img = empty( $images_by_breakpoint[ $bp ]['image'] ) ? null : $images_by_breakpoint[ $bp ]['image'];
					$bp_bg = ! empty( $images_by_breakpoint[ $bp ]['background_color']['hex'] ) ? $images_by_breakpoint[ $bp ]['background_color']['hex'] : $images_by_breakpoint[ $bp ]['background_color'];
					$has_bp_img = ! empty( $bp_img );
					$has_bp_bg = ! empty( $bp_bg );
					if ( $has_bp_img ) {
						$breakpoint_uses_image[ $bp ] = true;
					} elseif ( $has_bp_bg && ! $has_bp_img ) {
						$breakpoint_uses_image[ $bp ] = false;
					} else {
						$breakpoint_uses_image[ $bp ] = null;
					}
				}
			}
		}

		$bp_img_classes = [];
		$prev_set_state = false;
		foreach ( $breakpoint_uses_image as $breakpoint => $has_img ) {
			if ( true === $has_img ) {
				$state = 'has';
				$prev_set_state = true;
			} elseif ( false === $has_img ) {
				$state = 'no';
				$prev_set_state = false;
			} elseif ( true === $prev_set_state ) {
				$state = 'has';
			} else {
				$state = 'no';
			}
			$bp_img_classes[] = "hero_$state-$breakpoint-img";
		}

		$is_centered_with_sso_theme = ! empty( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-centered-with-sso' ) !== false;
		$decrease_vertical_padding = $attributes['decrease_vertical_padding'] ? 'py-0' : 'pt-2 pt-lg-4 pb-lg-5';
		$wrapper_classes = $is_centered_with_sso_theme ? '' : $decrease_vertical_padding;
		$properties['class'] = "hero no-gutters {$wrapper_classes} " . implode( ' ', $bp_img_classes );

		return parent::get_wrapper_properties( $attributes, $properties );
	}
}
