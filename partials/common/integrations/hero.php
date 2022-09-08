<!-- Hero -->
<?= fp_render_blocks(
	[
		'name'  => 'hero',
		'attrs' => [
			'className'                 => 'mt-0 mb-3 py-0 trackingSection-integrations-hero',
			'decrease_vertical_padding' => true,
			'hero_content_max_width'    => '480px',
			'hero_label'                => 'Freshbooks Integrations',
			'headline'                  => 'Make Running Your Business Even Easier With Integrations',
			'include_cta_button'        => true,
			'cta_button'                => [
				'link'       => [
					'url' => '#integrations-taxonomy__main-content',
				],
				'text'       => 'See the Apps',
				'visibility' => [ 'md', 'lg', 'xl', 'xxl' ],
				'mice_type'  => false,
			],
			'images'                    => [
				[
					'screen_size'         => 'xs',
					'display_image'       => false,
					'background_color'    => [ 'hex' => '#eff8fe' ],
					'background_size'     => 'cover',
					'background_position' => 'center',
				],
				[
					'screen_size'           => 'md',
					'image'                 => [
						'url' => fp_get_asset( 'images/taxonomy/integrations/Integrations_Hero-main_partners.jpg' ),
					],
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
