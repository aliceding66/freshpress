<?php
/**
 * Template Name: Podcast Center
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-page-podcast' );

get_header();

$global_podcast = get_field( 'global_podcast', 'options' );
$global_podcast_episode = get_field( 'global_podcast_episode', 'options' );

$signup_form = [
	'email_placeholder_text'    => __( 'Enter Your Email', 'freshpress-website' ),
	'password_placeholder_text' => __( 'Create a Password (min 8 characters)', 'freshpress-website' ),
	'submit_button_text'        => __( 'TRY IT FREE', 'freshpress-website' ),
];

$episodes_query_args = [
	'post_type'      => 'podcast',
	'posts_per_page' => -1,
];
$episodes_query = new WP_Query( $episodes_query_args );

$seasons = array_unique(
	array_map(
		function( $item ) {
			return get_field( 'nerdisode', $item->ID ) ? 'Nerdisodes' : get_field( 'season_number', $item->ID );
		},
		$episodes_query->posts
	)
);
sort( $seasons );
$seasons_newest_first = array_reverse( $seasons );
$newest_season = in_array( '4', $seasons ) ? '4' : '3';
?>
<style>
	@media screen and (min-width: 480px) {
		.hero {
			background-image: url("<?= esc_url( $global_podcast['hero']['tablet_background_image'] ); ?>");
		}
	}

	@media screen and (min-width: 1024px) {
		.hero {
			background-image: url("<?= esc_url( $global_podcast['hero']['desktop_small_background_image'] ); ?>");
		}
	}

	@media screen and (min-width: 1200px) {
		.hero {
			background-image: url("<?= esc_url( $global_podcast['hero']['desktop_background_image'] ); ?>");
		}
	}
</style>
<div class="hero row py-sm-5 position-relative">
	<?= fp_render_img(
		$global_podcast['hero']['mobile_background_image'],
		[
			'class' => 'd-sm-none w-100 h-auto',
			'alt'   => __( 'Podcast Background Image', 'freshpress-website' ),
		]
	) ?>
	<div class="hero__content mx-auto ml-sm-0 px-4 my-sm-4 my-xl-5 ml-md-3 ml-xl-4 pl-md-5 text-white text-center text-sm-left w-100">
		<h2 class="hero__heading mb-0 mb-lg-2 text-white"><?= esc_html( $global_podcast['hero']['title'] ); ?></h2>
		<h1 class="hero__subheading font-weight-normal px-3 px-sm-0"><?= esc_html( $global_podcast['hero']['subtitle'] ); ?></h1>
		<div class="hero__description">
			<?= fp_noesc( $global_podcast['hero']['description'] ); ?>
		</div>
		<div class="hero__links mt-3 d-flex flex-column flex-md-row flex-md-wrap">
			<a class="mb-2 mr-sm-3" href="<?= esc_url( $global_podcast['sidebar_links'][0]['url'] ); ?>">
				<?= fp_render_img(
					$global_podcast['sidebar_links'][0]['image'],
					[
						'class' => 'h-auto',
					]
				) ?>
			</a>
			<a href="<?= esc_url( $global_podcast['sidebar_links'][2]['url'] ); ?>">
				<?= fp_render_img(
					$global_podcast['sidebar_links'][2]['image'],
					[
						'class' => 'h-auto',
					]
				) ?>
			</a>
		</div>
	</div>
</div>

<h2 class="text-center text-primary font-weight-normal mt-5 pt-4"><?= esc_html( __( 'Listen to Our Episodes Here:', 'freshpress-website' ) ); ?></h2>
<div class="episodes-nav d-flex justify-content-center mt-4">
	<div class="episodes-nav__links d-flex justify-content-center">
		<?php foreach ( $seasons as $season ) : ?>
			<?php if ( 'Nerdisodes' === $season ) : ?>
				<a href="#0" class="py-1 px-3 d-none d-md-inline" data-sort="<?= esc_attr( __( 'nerdisodes', 'freshpress-website' ) ); ?>"><?= esc_html( __( 'Nerdisodes', 'freshpress-website' ) ); ?></a>
			<?php else : ?>
				<a href="#0" class="py-1 px-3 d-none d-md-inline <?= esc_attr( $newest_season === $season ? 'active' : '' ); ?>" data-sort="<?= esc_attr( $season ); ?>">

					<?=
						/* translators: %s is replaced with season number */
						esc_html( sprintf( __( 'Season %s', 'freshpress-website' ), $season ) );
					?>
				</a>
			<?php endif; ?>
		<?php endforeach ?>
	</div>

	<div class="episodes-nav__select-wrapper position-relative d-md-none">
		<select name="" id="" class="episodes-nav__select w-100 overflow-hidden">
			<?php foreach ( $seasons_newest_first as $season ) : ?>
				<?php if ( 'Nerdisodes' === $season ) : ?>
					<option value="<?= esc_attr( __( 'nerdisodes', 'freshpress-website' ) ); ?>"><?= esc_html( __( 'Nerdisodes', 'freshpress-website' ) ); ?></option>
				<?php else : ?>
					<option value="<?= esc_attr( $season ); ?>" <?= esc_attr( $newest_season === $season ? 'selected' : '' ); ?>>
						<?=
							/* translators: %s is replaced with season number */
							esc_html( sprintf( __( 'Season %s', 'freshpress-website' ), $season ) );
						?>
					</option>
				<?php endif; ?>
			<?php endforeach ?>
		</select>
	</div>
</div>

<div class="episodes py-4 px-2 px-sm-4 mx-md-5 position-relative">
	<div class="swiper-button-prev"></div>
	<div class="swiper-button-next"></div>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<?php if ( $episodes_query->have_posts() ) : ?>
				<?php
				while ( $episodes_query->have_posts() ) :
					$episodes_query->the_post();
					$season_number = get_field( 'season_number' );
					$episode_number = get_field( 'episode_number' );
					$is_nerdisode = get_field( 'nerdisode' );
					$pre_title = __( 'Season', 'freshpress-website' ) . " $season_number" . ( $is_nerdisode || empty( $episode_number ) ? '' : ' - ' . __( 'Episode', 'freshpress-website' ) . " $episode_number" ) . ':';
					$image = ! empty( get_the_post_thumbnail_url() ) ? get_the_post_thumbnail_url() : $global_podcast_episode['default_thumbnail'];
					$now = time();
					$episode_date = strtotime( get_the_date( 'Y-m-d' ) );
					$days_diff = round( ( $now - $episode_date ) / ( 60 * 60 * 24 ) );
					?>
					<div class="episode-card swiper-slide p-4 p-sm-3" data-season="<?= esc_attr( $season_number ); ?>" data-episode="<?= esc_attr( $episode_number ); ?>" data-nerdisode="<?= esc_attr( $is_nerdisode ? 'true' : 'false' ); ?>">
						<a class="py-5 py-md-4 px-4 text-decoration-none w-100 d-flex justify-content-between align-items-center" href="<?= esc_url( get_permalink() ); ?>">
							<div class="episode-card__text d-flex flex-column align-items-start position-relative">
								<?php if ( $days_diff <= 7 ) : ?>
									<span class="episode-card__new d-flex align-items-center justify-content-center position-absolute"><?= esc_html( __( 'New', 'freshpress-website' ) ); ?></span>
								<?php endif; ?>
								<h5 class="episode-card__pretitle mb-0 font-weight-medium"><?= esc_html( $pre_title ); ?></h5>
								<h4 class="episode-card__title font-weight-normal"><?= esc_html( get_the_title() ); ?></h4>
								<span class="episode-card__play text-primary font-weight-medium d-flex align-items-center"><?= esc_html( 'Listen Now', 'freshpress-website' ); ?></span>
							</div>
							<div class="episode-card__image d-none d-sm-block ml-4" style="background-image: url('<?= esc_url( $image ); ?>')"></div>
						</a>
					</div>
				<?php endwhile; ?>
			<?php endif ?>
		</div>
	</div>
</div>
<p class="text-center text-muted mt-n3 mb-5"><?= esc_html( __( 'Swipe for More Episodes', 'freshpress-website' ) ); ?></p>


<?php get_template_part( 'partials/content' ); ?>

<style>
	@media screen and (min-width: 1024px) {
		.footer-hero {
			background-image: url("<?= esc_url( $global_podcast['footer_hero']['background_image'] ); ?>");
		}
	}
</style>
<?php
require_once get_template_directory() . '/partials/common/podcast/footer.php';
get_footer();
?>
