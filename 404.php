<?php
/**
 * Core post template for FreshPress Website theme.
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-page-404' );

get_header();

$first_row_pages = [
	'Freelancers'                 => '/for-freelancers',
	'Self-Employed Professionals' => '/self-employed-professionals',
	'Businesses With Contractors' => '/businesses-with-contractors',
	'Businesses With Employees'   => '/businesses-with-employees',
	'Accountants'                 => '/accountants',
	'Partners'                    => '/partner',
];

$second_row_pages = [
	'Invoicing'         => '/invoice',
	'Expense Tracking'  => '/expenses-and-receipts-tracking',
	'Time Tracking'     => '/timesheets-and-time-tracking',
	'Projects'          => '/projects-and-collaboration',
	'Estimates'         => '/estimating-software',
	'Payments'          => '/accept-payments',
	'Accounting'        => '/accounting',
	'Reports'           => '/financial-reporting',
	'Mobile Accounting' => '/mobile-apps',
	'Client Management' => '/client-management-software',
	'Mileage Tracking'  => '/mileage-tracking-app',
	'Proposal Software' => '/proposal-software',
	'App Store'         => '/integrations',
	'Pricing'           => '/pricing',
];
?>

<div class="page-404">
<h1>404</h1>
<p><?= esc_html( __( 'We couldn’t find your page, but take this moment to find some peace and take a breather. When you’re ready, choose from our options below.', 'freshpress-website' ) ) ?></p>
<div id="st-results-container"></div>

<!-- FAQ -->
<?= fp_render_blocks(
	[
		'name'  => 'fpbk/faq',
		'attrs' => [
			'questions_and_answers' => [
				[
					'question' => 'I want to learn more about improving my business',
					'answer'   => '<ul>' . fp_get_regionalized_links( $first_row_pages ) . '</ul>',
				],
				[
					'question' => 'I want to learn more about the FreshBooks product',
					'answer'   => '<ul>' . fp_get_regionalized_links( $second_row_pages ) . '</ul>',
				],
			],
		],
	]
); ?>
</div>

<?php
get_footer();
