<?php
/**
 * Taxonomy template for Press Categories.
 *
 * @package FreshPress\Website
 */

$queried_object = get_queried_object();
$is_news_coverage = get_query_var( 'news_coverage' ) === 'true';

if ( is_tax( 'press_category' ) && $queried_object instanceof WP_Term ) {
	$category = $queried_object;
}

$hero_image = empty( $category->slug ) ? 'images/about/press-hero.jpg' : 'images/about/press-' . $category->slug . '-hero.jpg';

if ( $is_news_coverage ) {
	$news_coverage_posts = get_field( 'news_coverage_posts', 'options' );
	$hero_image = 'images/about/press-data-research-hero.jpg';
	$hero_title = __( 'In the News', 'freshpress-website' );
}

$about_submenu_obj = wp_get_nav_menu_object( 'about-subnav-menu' );
$about_submenu = $about_submenu_obj->slug;

$all_posts_args = [
	'post_type'   => 'press_article',
	'post_status' => 'publish',
	'numberposts' => -1,
];

if ( ! empty( $category->slug ) ) {
	$all_posts_args['tax_query'] = [
		[
			'taxonomy' => 'press_category',
			'field'    => 'slug',
			'terms'    => $category->slug,
		],
	];
}

$published_years = array_values(
	array_unique(
		array_map(
			function( $single_post ) {
				return gmdate( 'Y', strtotime( is_array( $single_post ) ? str_replace( '/', '-', $single_post['article_date'] ) : $single_post->post_date_gmt ) );
			},
			$news_coverage_posts ?? get_posts( $all_posts_args ) ?? []
		)
	)
);

$selected_year = ! empty( get_query_var( 'year_filter' ) ) ? get_query_var( 'year_filter' ) : $published_years[0];

$icons = [
	'email' => fp_get_asset_with_meta( 'images/icons/email.svg' ),
	'phone' => fp_get_asset_with_meta( 'images/icons/phone.svg' ),
];
?>
<div class="hero row py-5 px-3 px-sm-5 flex-column align-items-center text-center" style="background: url('<?= esc_url( fp_get_asset( $hero_image ) ); ?>') no-repeat center; background-size: cover;">
	<h1 class="text-primary mb-4"><?= esc_html( $hero_title ?? $category->name ?? __( 'Press Center', 'freshpress-website' ) ); ?></h1>
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
		],
	]
); ?>
<div class="post-listing-container py-5 text-center">
	<?php if ( ! empty( $category ) && 'releases' === $category->slug ) : ?>
	<div class="post-years d-flex justify-content-center flex-wrap">
		<?php
		$years = count( $published_years );
		for ( $i = 0; $i < $years; $i++ ) {
			$published_year = $published_years[ $i ];
			$class_attr = 'px-2';
			if ( $i > 0 ) {
				$class_attr .= ' border-left';
			}
			if ( (int) $selected_year === (int) $published_year ) {
				echo '<span class="' . esc_attr( $class_attr ) . '">' . esc_html( $published_year ) . '</span>';
			} else {
				echo '<a class="' . esc_attr( $class_attr ) . '" href="' . esc_url( trailingslashit( $is_news_coverage ? home_url( 'press/news-coverage/' ) : get_term_link( $category ) ) . $published_years[ $i ] ) . '">' . esc_html( $published_year ) . '</a>';
			}
		}
		?>
	</div>
	<?php endif ?>
	<div class="post-listing row pt-5 pb-4 d-flex flex-wrap">
		<?php
		if ( ! empty( $news_coverage_posts ) ) {
			foreach ( $news_coverage_posts as $news_coverage_post ) :
				$article_date = gmdate( 'Y', strtotime( str_replace( '/', '-', $news_coverage_post['article_date'] ) ) );
				if ( $article_date === $selected_year ) :
					?>
					<div class="d-flex col-12 col-md-6 col-lg-4 mb-4">
						<a class="d-flex flex-column w-100 p-4 p-sm-5 text-left text-decoration-none rounded border text-secondary" target="_blank" href="<?= esc_url( $news_coverage_post['article_url'] ); ?>" style="min-height: 260px;">
							<span class="date text-muted mb-4"><?= esc_html( $news_coverage_post['publication_name'] ); ?></span>
							<h3><?= esc_html( $news_coverage_post['article_headline'] ); ?></h3>
						</a>
					</div>
					<?php
				endif;
			endforeach;
		} else {
			if ( have_posts() ) :
				while ( have_posts() ) :
					the_post();
					$post_title = strlen( get_the_title() ) > 85 ? substr( get_the_title(), 0, 85 ) . '...' : get_the_title();
					?>
					<div class="d-flex col-12 col-md-6 col-lg-4 mb-4">
						<a class="d-flex flex-column w-100 p-4 p-sm-5 text-left text-decoration-none rounded border text-secondary" href="<?= esc_url( get_permalink() ); ?>" style="min-height: 260px;">
							<?php if ( ! empty( $category ) && 'releases' === $category->slug ) : ?>
								<span class="date text-muted mb-4"><?= esc_html( get_the_date( 'd/m/Y' ) ); ?></span>
							<?php endif ?>
							<h3><?= esc_html( $post_title ); ?></h3>
						</a>
					</div>
					<?php
				endwhile;
				wp_reset_postdata();
			endif;
		}
		?>
	</div>
	<a href="<?= esc_url( home_url( '/press' ) ); ?>"><?= esc_html( __( 'Back to Press Center', 'freshpress-website' ) ); ?></a>
</div>
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
		'name' => 'blue-cta-bar',
		'attr' => [
			'className' => 'trackingSection-blue-cta-bar-footer',
		],
	]
); ?>
