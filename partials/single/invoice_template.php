<?php
/**
 * Single template for Invoice Templates.
 *
 * @package FreshPress\Website
 */

the_post();

fp_enqueue_template_assets( 'templates-single-invoice-template' );

?>

<div class="mt-5">

	<!-- Partner Feature -->
	<div class="mb-5 mt-3 d-flex flex-column">
		<?php
			$content = fp_render_blocks( get_the_content() );
			echo fp_noesc( $content );
			preg_match( '/<img[^>]+src=[\'"](?P<src>.+?)[\'"]/i', $content, $image );
		if ( isset( $image['src'] ) ) {
			global $combined_file_locations;
			$combined_file_locations['_md5']['footer']['image'] = $image['src'];
		}
		?>
	</div>

	<!-- Logo Group -->
	<?= fp_render_blocks(
		[
			'name'  => 'logo-group',
			'attrs' => [
				'layout'                    => '1',
				'logo_group_hide_lines'     => '0',
				'headline'                  => 'Featured In',
				'logos'                     => [
					[
						'logo_type'          => 'svg',
						'logo_svg'           => [
							'url' => '/wp-content/uploads/CNET.svg',
						],
						'adjust_logo_size'   => '-1',
						'decrease_logo_size' => '20',
						'increase_logo_size' => '',
					],
					[
						'logo_type'          => 'svg',
						'logo_svg'           => [
							'url' => '/wp-content/uploads/forbes-1.svg',
						],
						'adjust_logo_size'   => '-1',
						'decrease_logo_size' => '20',
						'increase_logo_size' => '',
					],
					[
						'logo_type'          => 'svg',
						'logo_svg'           => [
							'url' => '/wp-content/uploads/the-new-york-times.svg',
						],
						'adjust_logo_size'   => '-1',
						'decrease_logo_size' => '20',
						'increase_logo_size' => '',
					],
					[
						'logo_type'          => 'svg',
						'logo_svg'           => [
							'url' => '/wp-content/uploads/Bloomberg.svg',
						],
						'adjust_logo_size'   => '-1',
						'decrease_logo_size' => '20',
						'increase_logo_size' => '',
					],
				],
				'block_settings_wide_block' => '0',
			],
		],
	); ?>

	<div class="invoice-template__comms">
		<h2><?= esc_html__( 'Want More Helpful Articles About Running a Business?', 'freshpress-website' ); ?></h2>
		<p><?= esc_html__( 'Get more great content in your Inbox.', 'freshpress-website' ); ?></p>

		<!-- Pardot Form -->
		<?= fp_render_blocks(
			[
				'name'  => 'pardot-form',
				'attrs' => [
					'pardot_form_url'  => 'https://www2.freshbooks.com/l/490351/2020-06-17/234sfbn',
					'pardot_form_name' => 'newsletter-signup',
				],
			],
		); ?>

		<!-- Confirmation Modal -->
		<?= fp_render_blocks(
			[
				'name'  => 'modal',
				'attrs' => [
					'className'                 => 'trackingSection-pardot-modal pardot-modal',
					'modal_title'               => __( 'Thanks for subscribing to the FreshBooks Blog Newsletter.', 'freshpress-website' ),
					'modal_description'         => __( 'Expect the first one to arrive in your inbox in the next two weeks. Happy reading!', 'freshpress-website' ),
					'modal_close_button_colour' => [ 'hex' => '#ffffff' ],
				],
			],
		); ?>

		<p><?= esc_html__( 'By subscribing, you agree to receive communications from FreshBooks and acknowledge and agree to FreshBook’s Privacy Policy. You can unsubscribe at any time by contacting us at help@freshbooks.com.', 'freshpress-website' ); ?></p>

	</div>

</div>
