<?php
/**
 * Single template for Podcast.
 *
 * @package FreshPress\Website
 */

the_post();

$global_podcast = get_field( 'global_podcast', 'options' );
$global_podcast_episode = get_field( 'global_podcast_episode', 'options' );

$prev_post = get_previous_post();
$prev_post_link_url = ! empty( $prev_post ) ? get_permalink( $prev_post->ID ) : '';
$next_post = get_next_post();
$next_post_link_url = ! empty( $next_post ) ? get_permalink( $next_post->ID ) : '';

$season_number = get_field( 'season_number' );
$episode_number = get_field( 'episode_number' );
$is_nerdisode = get_field( 'nerdisode' );
$pre_title = __( 'Season', 'freshpress-website' ) . " $season_number" . ( $is_nerdisode ? '' : ' - ' . __( 'Episode', 'freshpress-website' ) . " $episode_number" ) . ':';

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

$signup_form = [
	'email_placeholder_text'    => __( 'Enter Your Email', 'freshpress-website' ),
	'password_placeholder_text' => __( 'Create a Password (min 8 characters)', 'freshpress-website' ),
	'submit_button_text'        => __( 'TRY IT FREE', 'freshpress-website' ),
];

$related_links_sidebar = fp_render_blocks(
	[
		'name'  => 'related-links',
		'attrs' => [
			'links_type'       => 'current_posts',
			'number_of_posts'  => 5,
			'layout'           => 'simple-list',
			'links_colour'     => '#8495a2',
			'posts_visibility' => 'before',
		],
	],
);
?>
<style>
.hero {
	background-image: url("<?= esc_url( $global_podcast_episode['mobile_background_image'] ); ?>");
	background-position: center;
	background-size: cover;
	height: 105vw;
	padding-top: 46%;
}

.hero .content img {
	width: 100%;
	max-width: 166px;
}

@media screen and (min-width: 480px) {
	.hero {
		background-image: url("<?= esc_url( $global_podcast_episode['tablet_background_image'] ); ?>");
		height: auto;
	}

	.hero .content {
		max-width: 60%;
	}
}

@media screen and (min-width: 768px) {
	.hero .content img {
		max-width: 186px;
	}
}

@media screen and (min-width: 1024px) {
	.hero {
		background-image: url("<?= esc_url( $global_podcast_episode['desktop_small_background_image'] ); ?>");
	}

	.hero .content {
		max-width: 50%;
	}
}
@media screen and (min-width: 1200px) {
	.hero {
		background-image: url("<?= esc_url( $global_podcast_episode['desktop_background_image'] ); ?>");
	}
}
</style>
<div class="hero row py-sm-5">
	<div class="content px-4 my-sm-4 ml-md-3 pl-md-5">
		<h2 class="h3 mb-0 mb-lg-2 text-white"><?= esc_html( $pre_title ); ?></h2>
		<h2 class="h1 text-white font-weight-normal"><?= esc_html( get_the_title() ); ?></h2>
		<div class="hero-links mt-3 d-flex flex-column flex-md-row flex-md-wrap">
			<a class="mb-2 mr-3" href="<?= esc_url( $global_podcast['sidebar_links'][0]['url'] ); ?>">
				<?= fp_render_img( $global_podcast['sidebar_links'][0]['image'], [ 'class' => 'h-auto w-auto' ] ) ?>
			</a>
			<a href="<?= esc_url( $global_podcast['sidebar_links'][2]['url'] ); ?>">
				<?= fp_render_img( $global_podcast['sidebar_links'][2]['image'], [ 'class' => 'h-auto w-auto' ] ) ?>
			</a>
		</div>
	</div>
</div>
<style>
	.nav-block {
		background-color: #fafafb;
		color: #001b40;
	}

	.nav-block.not-visible {
		opacity: 0;
		pointer-events: none;
		visibility: hidden;
	}

	.nav-block:hover {
		color: #001b40;
	}

	@media screen and (min-width: 768px) {
		.nav-block {
			font-size: 1.4rem;
		}
	}
</style>
<div class="sticky-top row flex-nowrap">
	<a class="nav-block d-block h5 px-3 py-3 text-decoration-none mr-1 w-100 <?= esc_html( empty( $prev_post_link_url ) ? 'not-visible' : '' ); ?>" href="<?= esc_html( $prev_post_link_url ); ?>"><?= esc_html( __( '<&nbsp;&nbsp;Previous Episode', 'freshpress-website' ) ); ?></a>
	<a class="nav-block d-block h5 px-3 py-3 text-decoration-none text-right ml-1 w-100 <?= esc_html( empty( $next_post_link_url ) ? 'not-visible' : '' ); ?>" href="<?= esc_html( $next_post_link_url ); ?>"><?= esc_html( __( 'Next Episode&nbsp;&nbsp;>', 'freshpress-website' ) ); ?></a>
</div>
<div class="row my-4 mx-0">
	<div class="col-12 text-center mb-4">
		<a class="mt-4" href="<?= esc_url( home_url( '/podcast' ) ); ?>"><?= esc_html( __( 'Back to Podcast Home', 'freshpress-website' ) ); ?></a>
	</div>
	<div class="col-md-9 px-0 pr-md-5 d-flex align-items-end">
		<h1 class="h2 title text-primary mb-0"><?php the_title(); ?></h1>
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
<div class="row mx-0">
	<div class="col-lg-9 pt-4 px-0 pr-md-4 border-top border-top border-lg-right">
		<?php // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound ?>
		<?= fp_noesc( apply_filters( 'the_content', get_post_field( 'post_content' ) ) ); ?>
		<div class="my-5 d-flex flex-column align-items-center text-center">
			<?= fp_render_blocks(
				[
					'name'  => 'social-share',
					'attrs' => array_merge( [ 'className' => 'my-0 trackingSection-social-share-bottom' ], $social_share_options ),
				]
			); ?>
			<a class="mt-4" href="<?= esc_url( home_url( '/podcast' ) ); ?>"><?= esc_html( __( 'Back to Home', 'freshpress-website' ) ); ?></a>
		</div>
	</div>
	<div class="col-lg-3 d-flex flex-column px-0 border-md-top">
		<?php if ( ! empty( $related_links_sidebar ) ) : ?>
			<div class="pt-4 pb-5 pl-md-4 border-top border-lg-top-0 border-lg-0 text-center text-lg-left">
				<h2 class="my-3 h3 text-primary"><?= esc_html( __( 'Other Episodes', 'freshpress-website' ) ); ?></h2>
				<?= fp_noesc( $related_links_sidebar ); ?>
			</div>
		<?php endif; ?>
		<?php if ( ! empty( $global_podcast['sidebar_links'] ) ) : ?>
			<style>
				.subscribe-now-image {
					max-width: 240px;
					width: 100%;
				}
			</style>
			<div class="pt-4 pl-md-4 border-md-top border-top border-lg-none text-center text-lg-left">
				<h2 class="mt-3 mb-2 h3 text-primary"><?= esc_html( __( 'Subscribe Now', 'freshpress-website' ) ); ?></h2>
				<p class="text-muted mb-4"><?= esc_html( $global_podcast['subscribe_now_text'] ); ?></p>
				<div class="d-flex flex-column pt-3 pb-5">
					<?php foreach ( $global_podcast['sidebar_links'] as $sidebar_link ) : ?>
						<a href="<?= esc_url( $sidebar_link['url'] ) ?>">
							<?php if ( ! empty( $sidebar_link['image'] ) ) : ?>
								<?= fp_render_img( $sidebar_link['image'], [ 'class' => 'subscribe-now-image mb-3 h-auto w-auto' ] ) ?>
							<?php else : ?>
								<?= esc_html( $sidebar_link['title'] ); ?>
							<?php endif; ?>
						</a>
					<?php endforeach; ?>
				</div>
			</div>
		<?php endif; ?>
	</div>
</div>
<style>
	.footer-hero {
		background-color: #174b9f;
	}

	@media screen and (min-width: 1024px) {
		.footer-hero {
			background-image: url("<?= esc_url( $global_podcast['footer_hero']['background_image'] ); ?>");
			background-position: 100%;
			background-repeat: no-repeat;
			background-size: contain;
		}
	}

	.offer-details {
		top: 100%;
		left: 50%;
		z-index: 5;
		width: 100vw;
		max-width: calc( 100vw - 2rem );
		padding: 1.4rem;
		font-size: 16px;
		background-color: #fff;
		border: 1px solid #c5c7ce;
		border-radius: 8px;
		box-shadow: 4px 4px 0 0 rgba( 6, 41, 66, 0.1 );
		transform: translateX( -50% );
		visibility: hidden;
		opacity: 0;
		pointer-events: none;
		transition: visibility 0s, opacity 0.5s;
	}

	.offer-details::before {
		position: absolute;
		bottom: calc( 100% - 10px );
		left: calc( 50% - 10px );
		display: block;
		width: 20px;
		height: 20px;
		background: #fff;
		border-top: 1px solid #c5c7ce;
		border-right: 1px solid #c5c7ce;
		transform: rotate( -45deg );
		transition: visibility 0s, opacity 0.5s;
		content: '';
	}

	@media screen and (min-width: 768px) {
		.offer-details {
			max-width: 420px;
			padding: 2.5rem;
		}
	}

	@media screen and (min-width: 1024px) {
		.offer-details {
			max-width: 550px;
			left: -50px;
			transform: none;
		}

		.offer-details::before {
			left: 100px;
		}
	}


	.see-offer span {
		text-decoration: underline;
		cursor: pointer;
	}

	.see-offer span:hover {
		text-decoration: none;
	}

	.see-offer:hover > .offer-details {
		visibility: visible;
		pointer-events: auto;
		opacity: 1;
	}

	.terms a {
		color: #fff;
		text-decoration: underline;
	}
	.terms a:hover {
		text-decoration: none;
	}
</style>
<?php require_once get_template_directory() . '/partials/common/podcast/footer.php'; ?>
