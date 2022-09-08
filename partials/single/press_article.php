<?php
/**
 * Single template for Press Articles.
 *
 * @package FreshPress\Website
 */

the_post();

$social_share_options = [
	'share_text'              => __( 'Share:', 'freshpress-website' ),
	'share_text_colour'       => '#8495a2',
	'share_icons_order'       => [
		[
			'value' => 'facebook',
			'label' => 'Facebook',
		],
		[
			'value' => 'twitter',
			'label' => 'Twitter',
		],
		[
			'value' => 'linkedin',
			'label' => 'LinkedIn',
		],
	],
	'share_on_facebook_group' => [
		'share_custom_page' => false,
	],
	'share_on_twitter_group'  => [
		'share_custom_page' => false,
		'sharing_title'     => __( 'Tweet', 'freshpress-website' ),
	],
	'share_on_linkedin_group' => [
		'share_custom_page' => false,
	],
];
$category = fp_get_primary_term( 'press_category' );
?>
<style>
.main img {
	height: auto;
	max-width: 100%;
}
</style>

<div class="row my-4 my-md-5 mx-0">
	<div class="col-md-9 px-0 pr-md-5">
		<?php if ( empty( $category->slug ) || 'data-research' !== $category->slug ) : ?>
		<div class="date text-muted mb-4"><?php the_date( 'd/m/Y' ); ?></div>
		<?php endif; ?>
		<h2 class="title text-primary"><?php the_title(); ?></h2>
	</div>
	<div class="col-md-3 px-0 mt-4 mt-md-0 text-left text-md-right d-flex justify-content-start justify-content-md-end">
		<?= fp_render_blocks(
			[
				'name'  => 'social-share',
				'attrs' => array_merge( [ 'className' => 'my-0 trackingSection-social-share-top' ], $social_share_options ),
			]
		); ?>
	</div>
</div>
<div class="row mx-0 mt-3 mt-md-5 mb-3">
	<div class="col-md-9 pt-4 px-0 pr-md-4 border-top border-md-right border-bottom">
		<?= fp_noesc( get_the_content() ); ?>
		<div class="my-5 d-flex flex-column align-items-center text-center">
			<?= fp_render_blocks(
				[
					'name'  => 'social-share',
					'attrs' => array_merge( [ 'className' => 'my-0 trackingSection-social-share-bottom' ], $social_share_options ),
				]
			); ?>
			<?php /* translators: %s is replaced with the name of the press article category */ ?>
			<a class="mt-4" href="<?= esc_url( get_term_link( $category ) ); ?>"><?= fp_sprintf( __( 'Back to %s', 'freshpress-website' ), [ $category->name ] ); ?></a>
		</div>
	</div>
	<div class="col-md-3 d-flex flex-column px-0 pt-4 pl-md-4 border-md-top border-bottom">
		<h2 class="mb-4 h3 text-primary"><?= esc_html( __( 'Most Recent', 'freshpress-website' ) ); ?></h2>
		<?= fp_render_blocks(
			[
				'name'  => 'related-links',
				'attrs' => [
					'links_type'      => 'current_posts',
					'number_of_posts' => 5,
					'layout'          => 'simple-list',
					'links_colour'    => '#8495a2',
					'post_category'   => $category->slug,
				],
			],
		); ?>
	</div>
</div>
<div class="text-center bottom-text pt-5">
	<?php
	echo fp_sprintf(
		/* translators: %s is replaced with links for invoice and signup pages */
		__(
			'Check out how FreshBooks’ <a href="%1$s">invoice software</a> works, or <a href="%2$s">Try It for Free today</a>',
			'freshpress-website'
		),
		[ home_url( '/invoice' ), home_url( '/signup' ) ]
	);
	?>
</div>
<?= fp_render_blocks(
	[
		'name' => 'blue-cta-bar',
	],
); ?>
