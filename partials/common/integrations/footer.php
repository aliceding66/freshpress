<?php
/**
 * Footer partial for Integrations.
 *
 * @package FreshPress\Website
 */

?>

<?php require_once get_template_directory() . '/partials/common/integrations/developers-banner.php'; ?>

<!-- Hero -->
<?= fp_render_blocks(
	[
		'name'  => 'hero',
		'attrs' => [
			'block_settings_tracking_section' => 'integrations-hero',
			'className'                       => 'mt-0',
			'hero_content_max_width'          => '480px',
			'headline'                        => 'Don’t Have FreshBooks?',
			'include_signup_form'             => true,
			'signup_form'                     => [
				'email_placeholder_text'           => 'Enter Your Email',
				'password_placeholder_text'        => 'Create a Password (min 8 characters)',
				'submit_button_text'               => 'Start My Free Trial',
				'include_default_terms_of_service' => true,
				'visibility'                       => [ 'sm', 'md', 'lg', 'xl', 'xxl' ],
			],
			'images'                          => [
				[
					'screen_size'         => 'xs',
					'display_image'       => false,
					'background_color'    => [ 'hex' => '#eff8fe' ],
					'background_size'     => 'cover',
					'background_position' => 'center',
				],
				[
					'screen_size'           => 'md',
					'display_image'         => true,
					'background_color'      => [ 'hex' => '#eff8fe' ],
					'background_size'       => 'cover',
					'background_position'   => 'center',
					'hero_content_position' => 'start',
				],
			],
		],
	],
); ?>
