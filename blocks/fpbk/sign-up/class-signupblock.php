<?php
/**
 * SignUp class.
 *
 * @package FreshpressBlocks\SignUp
 * @subpackage SignUp
 */

namespace FreshpressBlocks;

/**
 * Class SignUp
 *
 * @package FreshpressBlocks
 */
class SignUpBlock extends ABlock {
	/**
	 * SignUpBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'sign-up-block' );
		$this->enqueue_style();
		$this->enqueue_editor_style();

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
				'partial__mobile_banner'     => 'templates/mobile_banner.partial.mustache',
				'partial__desktop_banner'    => 'templates/desktop_banner.partial.mustache',
				'partial__form_fullscreen'   => 'templates/form/fullscreen.partial.mustache',
				'partial__form_inline'       => 'templates/form/inline.partial.mustache',
				'partial__form_input_fields' => 'templates/form/input-fields.partial.mustache',
				'partial__form_submit'       => 'templates/form/submit.partial.mustache',
				'partial__form_sso'          => 'templates/form/sso.partial.mustache',
				'partial__form_tos'          => 'templates/form/tos.partial.mustache',
				'partial__fullscreen'        => 'templates/fullscreen.partial.mustache',
				'partial__inline'            => 'templates/inline.partial.mustache',
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
		ob_start();
		include_once get_stylesheet_directory() . '/includes/popups/cookies-popup.php';
		$additional_template_data['cookie_popup'] = ob_get_clean();

		$additional_template_data['show_mobile_banner'] = ! empty( $additional_template_data['include_sign_up_banner'] ) && ! empty( $additional_template_data['mobile_content'] );
		$additional_template_data['show_desktop_banner'] = ! empty( $additional_template_data['include_sign_up_banner'] ) && ! empty( $additional_template_data['desktop_content'] );

		$additional_template_data['is_inline_theme'] = ! empty( $additional_template_data['className'] ) && strpos( $additional_template_data['className'], 'is-style-inline' ) !== false;
		$additional_template_data['email_field_label'] = esc_attr( __( 'Email', 'freshpress-website' ) );
		$additional_template_data['password_field_label'] = esc_attr( __( 'Password', 'freshpress-website' ) );

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
		$campaign = $this->init_campaign();

		$additional_wrapper_properties = [
			'class' => 'sign-up py-4 px-3 p-md-3 d-flex flex-column align-items-center justify-content-center row',
		];
		if ( ! empty( $campaign['include_sign_up_banner'] ) ) {
			$additional_wrapper_properties['class'] .= ' pt-promo';
			$additional_wrapper_properties['data-promo'] = 'false';
			if ( ! empty( $campaign['campaign_end_date'] ) ) {
				$additional_wrapper_properties['data-promo-end'] = $campaign['campaign_end_date'];
			}
		}

		$template_data = $this->get_template_data( array_merge( $attributes, $campaign ) );

		$styles = '';
		if ( ! $template_data['is_inline_theme'] ) {
			$additional_wrapper_properties['class'] .= ' min-vh-100';
			$styles = <<< CSS
<style>
	html {
		margin: 0 !important;
	}

	body {
		background-color: #0d83dd !important;
	}
</style>
CSS;
		} else {
			$additional_wrapper_properties['class'] .= ' py-md-7 my-0';
		}

		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			$additional_wrapper_properties
		);

		$block_template = $this->load_template( 'templates/block.mustache', $template_data );

		return <<< HTML
<div {$wrapper_properties}>
	{$styles}
	{$block_template}
</div>
HTML;
	}

	/**
	 * Initiate template data.
	 */
	private function initiate_template_data() {
		$template_data = [
			'rating_desktop' => fp_render_blocks(
				[
					'name'  => 'fpbk/rating',
					'attrs' => [
						'className'   => 'my-0',
						'rating_wrap' => '1',
					],
				]
			),
			'rating_mobile'  => fp_render_blocks(
				[
					'name'  => 'fpbk/rating',
					'attrs' => [
						'className'   => 'my-0 is-style-light',
						'rating_wrap' => '2',
					],
				]
			),
			'labels'         => [
				'invalid_email'       => __( 'Email is invalid.', 'freshpress-website' ),
				'invalid_password'    => __( 'Password is invalid.', 'freshpress-website' ),
				'default_submit_text' => _x( 'Get Started', 'signup form', 'freshpress-website' ),
				'or'                  => __( 'OR', 'freshpress-website' ),
				'sign_up_apple'       => __( 'Sign up with Apple', 'freshpress-website' ),
				'sign_up_google'      => __( 'Sign up with Google', 'freshpress-website' ),
				'field_required'      => __( 'This field is required.', 'freshpress-website' ),
			],
		];

		if ( function_exists( 'fp_render_img' ) ) {
			$template_data['logos'] = [
				'sign_up'       => fp_render_img(
					'images/logos/freshbooks-logo.svg',
					[
						'class' => 'sign-up__logo-image d-none d-md-block mb-4',
						'alt'   => __(
							'Freshbooks Logo',
							'freshpress-website'
						),
					]
				),
				'sign_up_white' => fp_render_img(
					'images/logos/freshbooks-logo-white.svg',
					[
						'class' => 'sign-up__logo-image d-md-none mb-4',
						'alt'   => __(
							'Freshbooks Logo',
							'freshpress-website'
						),
					]
				),
				'apple'         => fp_render_img(
					'images/logos/apple-logo.svg',
					[
						'class' => 'position-absolute',
						'alt'   => __(
							'Apple Logo',
							'freshpress-website'
						),
					]
				),
				'google'        => fp_render_img(
					'images/logos/google-logo-icon.svg',
					[
						'class' => 'position-absolute',
						'alt'   => __(
							'Google Logo',
							'freshpress-website'
						),
					]
				),
				'lock'          => fp_render_img( 'images/icons/lock.svg', [ 'alt' => 'Lock icon' ] ),
			];
		}

		if ( function_exists( 'fp_get_fb_domain' ) ) {
			$template_data['domains'] = [
				'auth' => fp_get_fb_domain( 'auth' ),
				'api'  => fp_get_fb_domain( 'api' ),
			];
		}

		$this->set_static_template_data(
			$template_data,
			'signUpTemplateData'
		);

	}

	/**
	 * Init and format campaign data.
	 *
	 * @return array
	 */
	private function init_campaign() {
		$campaign_data = [];
		if ( function_exists( 'fp_init_campaign' ) ) {
			$campaign = fp_init_campaign();
			if ( $campaign ) {
				$campaign_data['mobile_content'] = $campaign['sign_up_mobile_content'];
				$campaign_data['desktop_content'] = $campaign['sign_up_desktop_content'];
				$campaign_data['campaign_end_date'] = $campaign['end_date'];
				$campaign_data['include_sign_up_banner'] = $campaign['include_sign_up_banner'];

				if ( isset( $campaign['sign_up_cta'] ) && ( '' !== $campaign['sign_up_cta'] ) ) {
					$campaign_data['cta_title'] = $campaign['sign_up_cta']['title'];
					$campaign_data['cta_url'] = $campaign['sign_up_cta']['url'];
					$campaign_data['cta_target'] = ( ! empty( $campaign['sign_up_cta']['target'] ) ) ? $campaign['sign_up_cta']['target'] : '_self';
				}
			}
		}

		return $campaign_data;
	}
}
