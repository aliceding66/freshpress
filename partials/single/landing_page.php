<?php
/**
 * Single template for Landing Pages.
 *
 * @package FreshPress\Website
 */

$custom_cta = get_field( 'custom_ctas' );
$custom_cta_target = $custom_cta['target'] ?? '_self';

?>

<div class="m-0">

	<!-- Partner Feature -->
	<div class="mb-5">
		<?php the_content(); ?>
	</div>

	<!-- Title and Columns -->
	<div class="trackingSection-3-columns">
		<h2 class="text-center mb-5"><?= esc_html( __( 'Why FreshBooks Will Revolutionize Your Business', 'freshpress-website' ) ); ?></h2>
		<div class="row my-0 col-12 mx-auto mb-5">
			<div class="col col-12 col-md-9 col-lg-4 text-center m-auto">
				<h3><?= esc_html( __( 'Ridiculously Easy To Use', 'freshpress-website' ) ); ?></h3>
				<p><?= esc_html( __( 'FreshBooks is simple and intuitive, so you’ll spend less time on paperwork and wow your clients with how professional your invoices look.', 'freshpress-website' ) ); ?></p>
			</div>
			<div class="col col-12 col-md-9 col-lg-4 text-center m-auto">
				<h3><?= esc_html( __( 'Powerful Features', 'freshpress-website' ) ); ?></h3>
				<p><?= esc_html( __( 'Automate tasks like invoicing, organizing expenses, tracking your time and following up with clients in just a few clicks.', 'freshpress-website' ) ); ?></p>
			</div>
			<div class="col col-12 col-md-9 col-lg-4 text-center m-auto">
				<h3><?= esc_html( __( 'Organized in the Cloud', 'freshpress-website' ) ); ?></h3>
				<p><?= esc_html( __( 'FreshBooks lives in the cloud so you can securely access it from your desktop, phone and tablet wherever you are.', 'freshpress-website' ) ); ?></p>
			</div>
		</div>
	</div>

	<!-- GetApp -->
	<?= fp_render_blocks(
		[
			'name'  => 'rating',
			'attrs' => [
				'block_settings_tracking_section' => 'rating',
			],
		]
	); ?>

	<!-- Product Tour -->
	<?= fp_render_blocks(
		[
			'name'  => 'product-tour',
			'attrs' => [
				'product_tour_items'              => [
					[
						'product_tour_item_nav_title'   => __( 'Invoicing', 'freshpress-website' ),
						'product_tour_item_title'       => __( 'Easy Invoicing', 'freshpress-website' ),
						'product_tour_item_description' => __( 'Wow your clients with professional looking invoices that take only seconds to create. The best part? You’ll get paid faster, too.', 'freshpress-website' ),
						'product_tour_item_link'        => [
							'url'       => $custom_cta['url'] ?? home_url( '/invoice' ),
							'title'     => $custom_cta['title'] ?? __( 'Learn More about Invoicing', 'freshpress-website' ),
							'target'    => $custom_cta_target,
							'className' => ! empty( $custom_cta ) ? 'd-none d-lg-inline-block' : '',
						],
						'product_tour_item_image'       => [
							'url' => __( '/wp-content/uploads/carousel-invoices.png', 'freshpress-website' ),
						],
					],
					[
						'product_tour_item_nav_title'   => __( 'Expenses', 'freshpress-website' ),
						'product_tour_item_title'       => __( 'Organize Expenses Effortlessly', 'freshpress-website' ),
						'product_tour_item_description' => __( 'Wave goodbye to that shoebox of receipts. Easily log and organize expenses in FreshBooks to track every dollar spent so you	&apos;re always ready for tax time.', 'freshpress-website' ),
						'product_tour_item_link'        => [
							'url'       => $custom_cta['url'] ?? home_url( '/expenses-and-receipts-tracking' ),
							'title'     => $custom_cta['title'] ?? __( 'Learn More about Expenses', 'freshpress-website' ),
							'target'    => $custom_cta_target,
							'className' => ! empty( $custom_cta ) ? 'd-none d-lg-inline-block' : '',
						],
						'product_tour_item_image'       => [
							'url' => __( '/wp-content/uploads/carousel-expenses.png', 'freshpress-website' ),
						],
					],
					[
						'product_tour_item_nav_title'   => __( 'Time Tracking', 'freshpress-website' ),
						'product_tour_item_title'       => __( 'Insightful Time Tracking', 'freshpress-website' ),
						'product_tour_item_description' => __( 'You’ll always invoice for exactly what you’re worth when you track time using FreshBooks. You and your team can log your hours and then automatically put them onto an invoice.', 'freshpress-website' ),
						'product_tour_item_link'        => [
							'url'       => $custom_cta['url'] ?? home_url( '/timesheets-and-time-tracking' ),
							'title'     => $custom_cta['title'] ?? __( 'Learn More about Time Tracking', 'freshpress-website' ),
							'target'    => $custom_cta_target,
							'className' => ! empty( $custom_cta ) ? 'd-none d-lg-inline-block' : '',
						],
						'product_tour_item_image'       => [
							'url' => __( '/wp-content/uploads/carousel-time-tracking.png', 'freshpress-website' ),
						],
					],
					[
						'product_tour_item_nav_title'   => __( 'Projects', 'freshpress-website' ),
						'product_tour_item_title'       => __( 'Seamlessly Collaborate on Projects', 'freshpress-website' ),
						'product_tour_item_description' => __( 'Keep all your conversations, files and feedback in one place. You’ll keep your team in sync and your projects on schedule.', 'freshpress-website' ),
						'product_tour_item_link'        => [
							'url'       => $custom_cta['url'] ?? home_url( '/projects-and-collaboration' ),
							'title'     => $custom_cta['title'] ?? __( 'Learn More about Projects', 'freshpress-website' ),
							'target'    => $custom_cta_target,
							'className' => ! empty( $custom_cta ) ? 'd-none d-lg-inline-block' : '',
						],
						'product_tour_item_image'       => [
							'url' => __( '/wp-content/uploads/carousel-projects.png', 'freshpress-website' ),
						],
					],
					[
						'product_tour_item_nav_title'   => __( 'Payments', 'freshpress-website' ),
						'product_tour_item_title'       => __( 'Get Paid Faster', 'freshpress-website' ),
						'product_tour_item_description' => __( 'Get paid up to 11 days faster when you accept credit cards online in FreshBooks. Say hello to automatic deposits, and goodbye to chasing clients for checks.', 'freshpress-website' ),
						'product_tour_item_link'        => [
							'url'       => $custom_cta['url'] ?? home_url( '/accept-payments' ),
							'title'     => $custom_cta['title'] ?? __( 'Learn More about Payments', 'freshpress-website' ),
							'target'    => $custom_cta_target,
							'className' => ! empty( $custom_cta ) ? 'd-none d-lg-inline-block' : '',
						],
						'product_tour_item_image'       => [
							'url' => __( '/wp-content/uploads/carousel-payments.png', 'freshpress-website' ),
						],
					],
					[
						'product_tour_item_nav_title'   => __( 'Reporting', 'freshpress-website' ),
						'product_tour_item_title'       => __( 'Easy To Understand Reports', 'freshpress-website' ),
						'product_tour_item_description' => __( 'Reports in FreshBooks are simple enough for you to understand but powerful enough for your accountant to love. It’s a win-win.', 'freshpress-website' ),
						'product_tour_item_link'        => [
							'url'       => $custom_cta['url'] ?? home_url( '/financial-reporting' ),
							'title'     => $custom_cta['title'] ?? __( 'Learn More about Reporting', 'freshpress-website' ),
							'target'    => $custom_cta_target,
							'className' => ! empty( $custom_cta ) ? 'd-none d-lg-inline-block' : '',
						],
						'product_tour_item_image'       => [
							'url' => __( '/wp-content/uploads/carousel-reports.png', 'freshpress-website' ),
						],
					],
					[
						'product_tour_item_nav_title'   => __( 'Accounting', 'freshpress-website' ),
						'product_tour_item_title'       => __( 'Easy-To-Use Double-Entry Accounting', 'freshpress-website' ),
						'product_tour_item_description' => __( 'Use automatic checks and balances to ensure accuracy and compliance, while financial info helps you make smart business decisions and working with your accountant even easier.', 'freshpress-website' ),
						'product_tour_item_link'        => [
							'url'       => $custom_cta['url'] ?? home_url( '/accounting' ),
							'title'     => $custom_cta['title'] ?? __( 'Learn More about Accounting', 'freshpress-website' ),
							'target'    => $custom_cta_target,
							'className' => ! empty( $custom_cta ) ? 'd-none d-lg-inline-block' : '',
						],
						'product_tour_item_image'       => [
							'url' => __( '/wp-content/uploads/accounting-images1x.png', 'freshpress-website' ),
						],
					],
					[
						'product_tour_item_nav_title'   => __( 'Mobile', 'freshpress-website' ),
						'product_tour_item_title'       => __( 'Work Anywhere with the FreshBooks Mobile App', 'freshpress-website' ),
						'product_tour_item_description' => __( 'With the FreshBooks mobile app you will easily stay connected with your clients and be able to take care of your accounting anywhere.', 'freshpress-website' ),
						'product_tour_item_link'        => [
							'url'       => $custom_cta['url'] ?? home_url( '/mobile-apps' ),
							'title'     => $custom_cta['title'] ?? __( 'Learn More about Mobile', 'freshpress-website' ),
							'target'    => $custom_cta_target,
							'className' => ! empty( $custom_cta ) ? 'd-none d-lg-inline-block' : '',
						],
						'product_tour_item_image'       => [
							'url' => __( '/wp-content/uploads/carousel-mobile.png', 'freshpress-website' ),
						],
					],
				],
				'block_settings_tracking_section' => 'product-tour',
			],
		],
	);

?>

	<!-- testimonial columns -->
	<?= fp_render_blocks(
		[
			'name'  => 'testimonial-columns',
			'attrs' => [
				'include_header' => true,
				'header'         => __( 'Why Small Business Owners Love FreshBooks', 'freshpress-website' ),
				'columns'        => [
					[
						'author_photo'      => [
							'url' => fp_get_asset( 'images/invoice-templates/pat-flynn_rev.jpg' ),
						],
						'author_name'       => 'PAT FLYNN',
						'author_title'      => __( 'OWNER OF FLYNN INDUSTRIES', 'freshpress-website' ),
						'testimonial_quote' => __( 'It makes my life so much easier. I wish I had this when I first started my business!', 'freshpress-website' ),
					],
					[
						'author_photo'      => [
							'url' => fp_get_asset( 'images/invoice-templates/roman-mars.jpg' ),
						],
						'author_name'       => 'ROMAN MARS',
						'author_title'      => __( 'CREATOR & HOST OF 99% INVISIBLE', 'freshpress-website' ),
						'testimonial_quote' => __( 'It’s beautiful and really well designed. The invoicing, accepting online payments and keeping track of expenses couldn’t be simpler.', 'freshpress-website' ),
					],
					[
						'author_photo'      => [
							'url' => fp_get_asset( 'images/invoice-templates/kathleen-shannon.jpg' ),
						],
						'author_name'       => 'KATHLEEN SHANNON',
						'author_title'      => __( 'CO-HOST OF BEING BOSS', 'freshpress-website' ),
						'testimonial_quote' => __( 'I’ve been using FreshBooks for 6 years and love how the design, functionality, and platform has grown with me – from freelance designer to the owner of a branding agency!', 'freshpress-website' ),
					],
				],
			],
		],
	); ?>

	<!-- CTA Banner -->	
	<?= fp_render_blocks(
		[
			'name'  => 'cta-banner',
			'attrs' => [
				'align'   => 'center',
				'heading' => __( 'Want Exclusive Access to Growth Driven Content?', 'freshpress-website' ),
			],
		]
	); ?>

	<!-- FAQ -->
	<?= fp_render_blocks(
		[
			'name'  => 'faq',
			'attrs' => [
				'headline'              => __( 'Frequently Asked Questions', 'freshpress-website' ),
				'questions_and_answers' => [
					[
						'question' => __( 'Does FreshBooks automate my accounting tasks?', 'freshpress-website' ),
						'answer'   => __( '<strong>FreshBooks</strong> automates lots of your accounting so you can spend more time focusing on your work and your clients. You can have invoices <u>automatically</u> generate and send, expenses automatically tracked and even have your payments automatically recorded, all without you lifting a finger.', 'freshpress-website' ),
					],
					[
						'question' => __( 'Can I use FreshBooks while away from my office?', 'freshpress-website' ),
						'answer'   => __( 'You sure can. <strong>FreshBooks</strong>’ iOS and Android apps let you painlessly invoice your clients and track expenses wherever and whenever you need to.', 'freshpress-website' ),
					],
					[
						'question' => __( 'Can I accept credit card payments through FreshBooks?', 'freshpress-website' ),
						'answer'   => __( 'Absolutely. With <strong>FreshBooks</strong> Payments you can start accepting credit card payments online right away, with zero set up required.', 'freshpress-website' ),
					],
					[
						'question' => __( 'Is my data safe in the cloud?', 'freshpress-website' ),
						'answer'   => __( 'The safety of your private data is our top priority, that’s why it’s protected by 256-bit SSL encryption — the gold standard in Internet security. <strong>FreshBooks</strong> is cloud based and uses industry – leading secure servers.', 'freshpress-website' ),
					],
					[
						'question' => __( 'Does Freshbooks allow for teams to collaborate?', 'freshpress-website' ),
						'answer'   => __( 'Yup. With <strong>FreshBooks</strong> both you and your team can collaborate on and track time towards the same projects and clients. Your team members can also help you with your accounting by creating invoices and tracking their expenses.', 'freshpress-website' ),
					],
					[
						'question' => __( 'Is FreshBooks compatible with a Mac?', 'freshpress-website' ),
						'answer'   => __( 'Great news: <strong>FreshBooks</strong> is available on any device — desktop, mobile or tablet and plays nicely with both Mac and PC.', 'freshpress-website' ),
					],
				],
			],

		]
	); ?>
	<!-- Blue CTA bar -->
	<?= ! empty( $custom_cta ) && ! empty( $custom_cta['url'] ) ? fp_render_blocks(
		[
			'name'  => 'blue-cta-bar',
			'attrs' => [
				'blue_cta_bar_cta' => [
					'title' => $custom_cta['title'],
					'url'   => $custom_cta['url'],
				],
			],
		],
	) : ''; ?>

</div>
