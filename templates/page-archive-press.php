<?php
/**
 * Template Name: Page Archive - Press
 *
 * @package FreshPress\Website
 */

get_header();

$press_page = get_posts(
	[
		'name'      => 'press',
		'post_type' => 'page',
	]
);

$hero_image = 'images/about/press-hero.jpg';

$about_submenu_obj = wp_get_nav_menu_object( 'about-subnav-menu' );
$about_submenu = $about_submenu_obj->slug;

$press_categories = [
	'news-coverage' => [
		'title'     => __( 'News Coverage', 'freshpress-website' ),
		'btn_title' => __( 'See More News About FreshBooks', 'freshpress-website' ),
	],
	'releases'      => [
		'title'     => __( 'Press Releases', 'freshpress-website' ),
		'btn_title' => __( 'See More FreshBooks Press Releases', 'freshpress-website' ),
	],
	'data-research' => [
		'title'     => __( 'Data and Research', 'freshpress-website' ),
		'btn_title' => __( 'See More Data and Research from FreshBooks', 'freshpress-website' ),
	],
];

$links = array_merge(
	$press_categories,
	[
		'resources'     => [
			'title' => __( 'Resources', 'freshpress-website' ),
		],
		'annual-report' => [
			'title' => __( 'Annual Report', 'freshpress-website' ),
		],
	]
);

$icons = [
	'email' => fp_get_asset_with_meta( 'images/icons/email.svg' ),
	'phone' => fp_get_asset_with_meta( 'images/icons/phone.svg' ),
];
?>
<style>
	.fp-block.columns:not(.five-columns) img {
		height: auto !important;
		width: 100%;
		max-height: 380px;
		max-width: 475px;
	}

	.fp-block.columns:not(.five-columns) .stretched img {
		width: auto;
		max-width: 305px;
		max-height: 300px;
	}

	#resources + .columns img {
		width: 100%;
	}

	.toggle-arrow {
		cursor: pointer;
	}
	.toggle-arrow::after {
		content: '';
		transform: rotate(45deg);
		border-right: 3px solid #0d83dd;
		border-bottom: 3px solid #0d83dd;
		width: 9px;
		height: 9px;
		display: inline-block;
		border-radius: 1px;
		margin: 0 0 3px 8px;
	}

	.wp-block-image.toggle-images {
		cursor:pointer;
		position: absolute;
		top: 20px;
		right: 20px;
		width: 17px;
		height: 17px;
	}

	.wp-block-image.toggle-images img {
		width: 100%;
		height: 100%;
	}

	.flexible-colour-background.with-columns {
		max-height: 2000px;
		transition: 0.3s;
	}

	.flexible-colour-background.with-columns img {
		opacity: 1;
		transition: 0.3s ease-out;
	}

	.flexible-colour-background.with-columns.hide {
		max-height: 0;
		overflow: hidden;
		margin-top: 0 !important;
		margin-bottom: 0 !important;
	}

	.flexible-colour-background.with-columns.hide img {
		opacity: 0;
	}

	.flexible-colour-background.with-columns .columns {
		justify-content: center;
	}

	.flexible-colour-background.with-columns .columns img {
		max-width: 100%;
		height: auto;
		max-height: 105px;
		width: auto;
	}

	@media screen and (min-width: 1024px) {
		.flexible-colour-background.with-columns .column {
			flex: 0 0 20%;
			width: 20%;
		}
	}
</style>
<div class="hero row py-5 px-3 px-sm-5 flex-column align-items-center text-center" style="background: url('<?= esc_url( fp_get_asset( $hero_image ) ); ?>') no-repeat center; background-size: cover;">
	<h1 class="text-primary mb-4"><?= esc_html( __( 'Press Center', 'freshpress-website' ) ); ?></h1>
	<p class="mb-4"><?= esc_html( __( 'All the resources you might need to learn more about goings on at FreshBooks.', 'freshpress-website' ) ); ?></p>
	<p><?= esc_html( __( 'Have a question? Contact our PR team:', 'freshpress-website' ) ); ?></p>
	<?php
		echo fp_sprintf(
		/* translators: %s is replaced with phone an mail icon metadata */
			__(
				'<a class="mb-3" href="mailto:pr@freshbooks.com"><img class="mr-2" src="%1$s" width="%2$s" height="%3$s" alt="Mail Icon">pr@freshbooks.com</a>',
				'freshpress-website'
			),
			[ $icons['email']['url'], $icons['email']['width'], $icons['email']['height'] ]
		);
		echo fp_sprintf(
		/* translators: %s is replaced with phone an mail icon metadata */
			__(
				'<a class="text-decoration-none" href="tel:1.888.705.1218"><img class="mr-2" src="%1$s" width="%2$s" height="%3$s" alt="Phone Icon">1.888.705.1218</a>',
				'freshpress-website'
			),
			[ $icons['phone']['url'], $icons['phone']['width'], $icons['phone']['height'] ]
		);
		?>
</div>
<?= fp_render_blocks(
	[
		'name'  => 'subnav',
		'attrs' => [
			'subnav_menu' => $about_submenu,
			'attr'        => [
				'className' => 'px-3 px-md-0',
			],
		],
	]
); ?>
<div class="page-links d-flex flex-wrap justify-content-center mt-5 py-3">
	<?php
	$index = 0;
	foreach ( $links as $link_key => $link_val ) {
		$class_attr = 'px-2';
		if ( $index > 0 && $index <= $links ) {
			$class_attr .= ' border-left';
		}
		echo '<a class="' . esc_attr( $class_attr ) . '" href="#' . esc_attr( $link_key ) . '">' . esc_html( $link_val['title'] ) . '</a>';
		$index++;
	}
	?>
</div>
<?php
foreach ( $press_categories as $cat_key => $press_category ) :
	$section_inline_styles = 'releases' === $cat_key ? 'style="background: #e5f4fe;"' : '';
	?>
	<section id="<?= esc_attr( $cat_key ); ?>" class="text-center row justify-content-center px-3 px-sm-5" <?= fp_noesc( $section_inline_styles ); ?>>
		<h2 class="text-primary pt-5 pb-2 mb-4"><?= esc_html( $press_category['title'] ); ?></h2>
		<div class="post-listing d-flex flex-wrap justify-content-center w-100">
			<?php
			$posts_obj = 'news-coverage' === $cat_key ? array_slice( get_field( 'news_coverage_posts', 'options' ) ?? [], 0, 3 ) : get_posts(
				[
					'post_type'      => 'press_article',
					'posts_per_page' => 3,
					'tax_query'      => [
						[
							'taxonomy' => 'press_category',
							'field'    => 'slug',
							'terms'    => $cat_key,
						],
					],
				],
			);
			foreach ( $posts_obj as $post_obj ) :
				$muted_text = 'news-coverage' === $cat_key ? $post_obj['publication_name'] : gmdate( 'd/m/Y', strtotime( $post_obj->post_date_gmt ) );
				$post_title = 'news-coverage' === $cat_key ? $post_obj['article_headline'] : $post_obj->post_title;
				$post_title = strlen( $post_title ) > 85 ? substr( $post_title, 0, 85 ) . '...' : $post_title;
				$post_link = 'news-coverage' === $cat_key ? $post_obj['article_url'] : get_permalink( $post_obj->ID );
				?>
				<div class="d-flex col-12 col-md-6 col-lg-4 mb-4 px-0 px-md-3">
					<a class="bg-white d-flex flex-column w-100 p-5 text-left text-decoration-none rounded border text-secondary" href="<?= esc_url( $post_link ); ?>" style="min-height: 260px;">
						<?php if ( 'data-research' !== $cat_key ) : ?>
							<span class="date text-muted mb-4"><?= esc_html( $muted_text ); ?></span>
						<?php endif ?>
						<h3><?= esc_html( $post_title ); ?></h3>
					</a>
				</div>
				<?php
			endforeach;
			?>
		</div>
		<a class="btn-white btn btn px-4 py-2 mw-100 mb-5 mt-3 bg-transparent" href="<?= esc_url( home_url( "press/$cat_key" ) ); ?>"><?= esc_html( $press_category['btn_title'] ); ?></a>
	</section>

	<?php
	if ( 'news-coverage' === $cat_key ) :
		?>
		<section id="awards" class="awards text-center mb-5">
			<style>
				.awards img {
					max-width: 140px;
					max-height: 52px;
				}
				.awards img:nth-of-type(1),
				.awards img:nth-of-type(2) {
					max-height: 70px;
				}

				@media screen and (min-width: 1024px) {
					.awards img {
						padding: 0 10px;
					}
				}
			</style>
			<h3 class="mt-4"><?= esc_html( __( 'FreshBooks Awards', 'freshpress-website' ) ); ?></h3>
			<?php
			for ( $i = 1; $i <= 6; $i++ ) {
				echo fp_render_img(
					"images/press/award-$i.png",
					[
						'class' => 'my-3 mx-4 w-auto h-auto',
					]
				);
			}
			?>
		</section>
		<?php
	endif;
endforeach;
?>
<?php // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound ?>
<?= fp_noesc( apply_filters( 'the_content', get_post_field( 'post_content', $press_page[0]->ID ) ) ); ?>
<div class="text-center bottom-text pt-5 border-top">
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
		'name'  => 'blue-cta-bar',
		'attrs' => [
			'className' => 'trackingSection-blue-cta-bar-footer mt-5',
		],
	]
); ?>
<script>
  const imagesOpeners = document.querySelectorAll('.toggle-images');
  const images = document.querySelector('.flexible-colour-background.with-columns');
  if (imagesOpeners && images) {
	imagesOpeners.forEach((opener) => {
	  opener.addEventListener('click', (e) => {
		e.preventDefault();
		images.classList.toggle('hide');
	  })
	})
  }
</script>

<?php get_footer(); ?>
