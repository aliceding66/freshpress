<?php
/**
 * Developers banner partial for Integrations.
 *
 * @package FreshPress\Website
 */

$margin_bottom_class = is_archive() || 'page-archive-integrations.php' === basename( get_page_template() ) ? 'mb-0' : '';
?>

<?= fp_render_blocks(
	[
		'name'    => 'flexible-colour-background',
		'attrs'   => [
			'background_colour'         => [ 'hex' => '#062942' ],
			'block_settings_wide_block' => '0',
			'className'                 => "trackingSection-developers-banner text-center px-5 {$margin_bottom_class}",
		],
		'content' => [
			[
				'<h2 class="integrations__developers-banner-title mb-5">Don’t See What You’re Looking For?</h2>',
			],
			[
				'name'    => 'columns',
				'attrs'   => [
					'className' => 'columns row my-0',
				],
				'content' => [
					[
						'name'    => 'column',
						'attrs'   => [
							'bootstrap_class' => 'col-12 col-md-4',
							'className'       => 'column mb-5 mb-md-0',
						],
						'content' => [
							'<div class="wp-block-image"><figure class="aligncenter size-large"><img width="85" height="85" src="/wp-content/themes/freshpress/assets/images/single/integrations/bottom-internet.svg" alt="" class="wp-image-270"></figure></div>',
							'<h2 class="integrations__developers-banner-subtitle has-text-align-center mb-4 mw-300 has-white-color has-text-color">ARE YOU A DEVELOPER?</h2>',
							'<p class="integrations__developers-banner-text mb-4 px-4 has-text-align-center mw-300 has-white-color has-text-color">Check out the FreshBooks API to see what’s possible or to create an integration.</p>',
							'<div class="fp-block button mt-2 mb-0 aligncenter trackingSection-API-button"><a class="btn-white btn mt-auto" href="https://www.freshbooks.com/api/start">API Documentation</a></div>',
						],
					],
					[
						'name'    => 'column',
						'attrs'   => [
							'bootstrap_class' => 'col-12 col-md-4',
							'className'       => 'column mb-5 mb-md-0 mt-4 mt-md-0',
						],
						'content' => [
							'<div class="wp-block-image"><figure class="aligncenter size-large"><img width="85" height="85" src="/wp-content/themes/freshpress/assets/images/single/integrations/bottom-leaf.svg" alt="" class="wp-image-270"></figure></div>',
							'<h2 class="integrations__developers-banner-subtitle has-text-align-center mb-4 mw-300 has-white-color has-text-color">HAVE AN APP SUGGESTION?</h2>',
							'<p class="integrations__developers-banner-text has-text-align-center mw-300 mb-4 px-4 has-white-color has-text-color">Suggest complementary integrations that could support your business.</p>',
							'<div class="fp-block button mt-2 mb-0 aligncenter trackingSection-API-button"><a class="btn-white btn mt-auto" href="https://freshbooks.wufoo.eu/forms/ppo5t4u0y5cija" target="_blank">Suggest an App</a></div>',
						],
					],
					[
						'name'    => 'column',
						'attrs'   => [
							'bootstrap_class' => 'col-12 col-md-4',
							'className'       => 'column mt-4 mt-md-0',
						],
						'content' => [
							'<div class="wp-block-image"><figure class="aligncenter size-large"><img width="85" height="85" src="/wp-content/themes/freshpress/assets/images/single/integrations/bottom-puzzle.svg" alt="" class="wp-image-270"></figure></div>',
							'<h2 class="integrations__developers-banner-subtitle has-text-align-center mb-4 mw-300 has-white-color has-text-color">HAVE AN APP?</h2>',
							'<p class="integrations__developers-banner-text has-text-align-center mw-300 mb-4 px-4 has-white-color has-text-color">Connect your app with FreshBooks to provide your customers with additional functionality.</p>',
							'<div class="fp-block button mt-2 mb-0 aligncenter trackingSection-API-button"><a class="btn-white btn mt-auto" href="https://freshbooks.wufoo.eu/forms/pqvf6660rqsqo7" target="_blank">Submit an App</a></div>',
						],
					],
				],
			],
		],
	],
);
