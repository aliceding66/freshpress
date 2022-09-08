<?php
/**
 * Single template for Glossary Term.
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-single-glossary-term' );
the_post();

$category = '';
$term_obj = get_the_terms( $post->ID, 'glossary_category' )[0];
$category_url = get_term_link( $term_obj->name, 'glossary_category' );

$sidebar_args = [
	'post_type' => 'glossary',
	'tax_query' => [
		[
			'taxonomy' => 'glossary_category',
			'field'    => 'term_id',
			'terms'    => $term_obj->term_id,
		],
	],
];
$sidebar_posts = get_posts( $sidebar_args );
$first_letter = get_the_title()[0];
$glossary_guide = get_field( 'glossary_guide' );
?>

<div class="row my-0 fp-block trackingSection-glossary-term">
	<div class="glossary-term__left-column col-4 pt-5 pr-0">
		<div class="sticky-top">
			<?php if ( ! empty( $glossary_guide ) ) : ?>
			<p class="glossary-term__sidebar-heading text-uppercase mb-3"><?= esc_html( $glossary_guide->post_title ); ?></p>
				<?php $glossary_guide_posts = get_field( 'glossary_terms', $glossary_guide->ID ); ?>
				<?php if ( ! empty( $glossary_guide_posts ) ) : ?>
					<ol class="glossary-term__sidebar-list mb-4">
						<?php foreach ( $glossary_guide_posts as $sidebar_post ) : ?>
							<?php
							$title_override = get_field( 'guide_title_override', $sidebar_post->ID );
							$term_title = ! empty( $title_override ) ? $title_override : $sidebar_post->post_title;
							?>
							<li class="<?= esc_attr( get_the_ID() === $sidebar_post->ID ? 'active' : '' ); ?>">
								<?php if ( get_the_ID() === $sidebar_post->ID ) : ?>
									<span><?= esc_html( $term_title ); ?></span>
								<?php else : ?>
									<a href="<?= esc_url( get_permalink( $sidebar_post->ID ) ); ?>"><?= esc_html( $term_title ); ?></a>
								<?php endif; ?>
							</li>
						<?php endforeach; ?>
					</ol>
				<?php endif; ?>
			<?php endif; ?>

			<div class="glossary-term__sidebar-tif py-4">
				<p class="font-weight-medium mb-2 pr-4 pr-lg-5 pr-xl-8">
					<?= esc_html( _x( 'Save Time Billing and Get Paid 2x Faster With FreshBooks', 'Glossary', 'freshpress-website' ) ); ?>
				</p>
				<a class="font-weight-medium" href="<?= esc_url( home_url( '/signup' ) ); ?>">Try It Free ➝</a>
			</div>
		</div>
	</div>

	<div class="glossary-term__content-column col pt-4 px-md-5">
		<ul class="glossary-term__breadcrumbs d-none d-md-flex pl-0">
			<li>
				<a href="<?= esc_url( home_url( '/glossary/' ) ) ?>">
					<?php require get_template_directory() . '/partials/common/glossary/icon-home.php'; ?>
				</a>
			</li>
			<li>
				<a href="<?= esc_url( $category_url ) ?>">
					<?= esc_html( $term_obj->name ); ?>
				</a>
			</li>
			<li>
				<a href="<?= esc_url( home_url( '/glossary/' . strtolower( $first_letter ) ) ); ?>">
					<?= esc_html( _x( 'Beginning With', 'Glossary', 'freshpress-website' ) . ' ' . strtoupper( $first_letter ) ); ?>
				</a>
			</li>
			<li>
				<?= esc_html( get_the_title() ); ?>
			</li>
		</ul>
		<h1 class="glossary-term__title mb-3"><?= esc_html( get_the_title() ); ?></h1>
		<?php if ( ! empty( get_the_post_thumbnail_url() ) ) : ?>
			<img class="mw-100 h-auto" src="<?= esc_url( get_the_post_thumbnail_url() ); ?>" alt="<?= esc_attr( get_the_title() . ' Featured Image' ); ?>">
		<?php endif; ?>
		<div class="glossary-term__data d-flex justify-content-between py-3">
			<div class="glossary-term__date d-flex align-items-center mr-3">
				<?= esc_html( _x( 'Updated:', 'Glossary', 'freshpress-website' ) ); ?> <?= esc_html( get_the_modified_date() ); ?>
			</div>
			<?= fp_render_blocks(
				[
					'name'  => 'fpbk/social-share',
					'attrs' => [
						'className' => 'glossary-term__share d-flex ml-3 my-0 mr-0 text-right',
					],
				]
			); ?>
		</div>

		<div class="glossary-term__excerpt my-4 py-2">
			<?= esc_html( get_the_excerpt() ); ?>
		</div>

		<div class="glossary-term__toc mb-5 sticky-top" data-nosnippet>
			<p class="m-0 p-3 text-uppercase"><?= esc_html( _x( 'Table of Contents', 'Glossary', 'freshpress-website' ) ); ?></p>
			<ol class="m-0 pb-4"></ol>
		</div>

		<div class="glossary-term__content pb-5">
			<?php get_template_part( 'partials/content' ); ?>
		</div>
		<?php if ( ! empty( $glossary_guide ) ) : ?>
			<div class="glossary-term__guide-bottom mt-n3 mb-5">
				<p class="glossary-term__sidebar-heading text-uppercase mb-3"><?= esc_html( $glossary_guide->post_title ); ?></p>
				<?php $glossary_guide_posts = get_field( 'glossary_terms', $glossary_guide->ID ); ?>
				<?php if ( ! empty( $glossary_guide_posts ) ) : ?>
					<ol class="glossary-term__sidebar-list mb-4">
						<?php foreach ( $glossary_guide_posts as $sidebar_post ) : ?>
							<?php
							$title_override = get_field( 'guide_title_override', $sidebar_post->ID );
							$term_title = ! empty( $title_override ) ? $title_override : $sidebar_post->post_title;
							?>
							<li class="<?= esc_attr( get_the_ID() === $sidebar_post->ID ? 'active' : '' ); ?>">
								<?php if ( get_the_ID() === $sidebar_post->ID ) : ?>
									<span><?= esc_html( $term_title ); ?></span>
								<?php else : ?>
									<a href="<?= esc_url( get_permalink( $sidebar_post->ID ) ); ?>"><?= esc_html( $term_title ); ?></a>
								<?php endif; ?>
							</li>
						<?php endforeach; ?>
					</ol>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>
</div>

<?php require_once get_template_directory() . '/partials/common/glossary/alphabetical-nav.php'; ?>
<?= fp_render_blocks(
	[
		'name'    => 'fpbk/new-cta-bar',
		'attrs'   => [
			'cta_link'         => [
				'url'   => home_url( '/signup' ),
				'title' => _x( 'Try It Free', 'Glossary Term Footer', 'freshpress-website' ),
			],
			'cta_after'        => _x( "Try It Free for 30 Days. No credit card required.\nCancel anytime.", 'Glossary Term Footer', 'freshpress-website' ),
			'images_left'      => [
				'url' => 'https://www.freshbooks.com/wp-content/uploads/product-tour-logo.svg',
			],
			'images_top_right' => [
				'url' => 'https://www.freshbooks.com/wp-content/uploads/product-tour-logo.svg',
			],
		],
		'content' => [
			fp_render_blocks(
				[
					'name'  => 'acf/stats',
					'attrs' => [
						'stats_description' => _x( 'WHY BUSINESS OWNERS LOVE FRESHBOOKS', 'Glossary Term Footer', 'freshpress-website' ),
						'stats'             => [
							[
								'value'          => 553,
								'unit'           => _x( 'HRS', 'Glossary Term Footer', 'freshpress-website' ),
								'unit_placement' => 'right',
								'description'    => _x( 'SAVE UP TO 553 HOURS EACH YEAR BY USING FRESHBOOKS', 'Glossary Term Footer', 'freshpress-website' ),
							],
							[
								'value'          => 7000,
								'unit'           => _x( '$', 'Glossary Term Footer', 'freshpress-website' ),
								'unit_placement' => 'left',
								'description'    => _x( 'SAVE UP TO $7000 IN BILLABLE HOURS EVERY YEAR', 'Glossary Term Footer', 'freshpress-website' ),
							],
							[
								'value'          => '30M+',
								'unit'           => '',
								'unit_placement' => 'right',
								'description'    => _x( 'OVER 30 MILLION PEOPLE HAVE USED FRESHBOOKS WORLDWIDE', 'Glossary Term Footer', 'freshpress-website' ),
							],
						],
						'typography'        => [
							'text_colour' => 'stats--all-white',
							'layout'      => 'stats--layout-big',
						],
					],

				]
			),
		],
	]
);
