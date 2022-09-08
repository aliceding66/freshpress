<?php
/**
 * Single template for Hub Articles.
 *
 * @package FreshPress\Website
 */

the_post();
fp_enqueue_template_assets( 'templates-single-hub-article' );

require_once get_template_directory() . '/partials/common/hub/reading-progress-bar.php';
require_once get_template_directory() . '/partials/common/hub/common-functions.php';

$archive_url = fp_get_post_type_archive_link( 'hub_article', 'hub' );
$category = fp_get_primary_term( 'hub_category' );
$category_url = get_term_link( $category, 'hub_category' );

$post_date = get_the_modified_date();
$author_id = get_the_author_meta( 'ID' );
$author_fullname = trim( get_the_author_meta( 'first_name' ) . ' ' . get_the_author_meta( 'last_name' ) );
$author_photo = get_field( 'author_photo', "user_$author_id" );
$author_description = get_the_author_meta( 'description' );

fp_enqueue_template_assets( 'templates-page-hub' );

?>

<div class="row mt-3 mb-0 mt-md-5 fp-block trackingSection-hub-article">
	<div class="d-none d-lg-block col-lg-3">
		<div class="sticky-top mb-5">
			<?= fp_render_blocks(
				[
					'name'  => 'related-links',
					'attrs' => [
						'className'         => 't-100',
						'links_type'        => 'taxonomy',
						'select_categories' => 'hub_category',
					],
				]
			); ?>

			<!-- CTA Banner -->
			<?= fp_render_blocks(
				[
					'name'  => 'cta-banner',
					'attrs' => [
						'heading'   => __( 'Resources for Your Growing Business', 'freshpress-website' ),
						'className' => 'is-style-navigation mt-5',
					],
				]
			); ?>
		</div>
	</div>

	<div id="mobile-sidebar" class="fp-block mb-3 mobile-list-container d-lg-none sticky-top flexible-colour-background wp-block wp-block-fpbk-flexible-colour-background no-gutters w-auto trackingSection-flexible-colour-background" data-prefix="fpbk">
		<div class="position-absolute flexible-colour-background__background-wrapper"></div>
		<p class="mobile-list-title">Articles<span class="mobile-list-arrow"></span></p>

		<div id="block_en-us_6048c308aa2fa" class="fp-block d-lg-none position-relative mobile-list related-links wp-block wp-block-fpbk-related-links m-0 w-100 trackingSection-related-links" data-use-anchors="true" data-prefix="fpbk">

			<?= fp_render_blocks(
				[
					'name'  => 'related-links',
					'attrs' => [
						'links_type'        => 'taxonomy',
						'select_categories' => 'hub_category',
						'select_layout'     => 'list_with_bg',
					],
				]
			); ?>
		</div>
	</div>


	<div class="p-0 mx-0 mt-0 mb-5 col-12 d-block d-lg-none hub__mobile-cta-banner">
		<!-- CTA Banner -->
		<?= fp_render_blocks(
			[
				'name'  => 'cta-banner',
				'attrs' => [
					'heading'   => __( 'Resources for Your<br />Growing Business', 'freshpress-website' ),
					'className' => 'm-0 p-0',
				],
			]
		); ?>
	</div>

	<div class="col-lg-7 hub-article__content">
		<div class="font-weight-bold font-size-smaller mb-2">
			<span>
				<?php
					// translators: %s: calculated article reading time.
					$content = get_the_content();
					echo esc_html( sprintf( __( '%s Min. Read', 'freshpress-website' ), fp_estimate_read_time( $content ) ) ); // phpcs:ignore WordPress.WP.I18n.MissingTranslatorsComment
					preg_match( '/<img[^>]+src=[\'"](?P<src>.+?)[\'"]/i', $content, $image );
				if ( isset( $image['src'] ) ) {
					global $combined_file_locations;
					$combined_file_locations['_md5']['footer']['image'] = $image['src'];
				}
				?>
			</span>
		</div>

		<h1 class="mb-2"><?= esc_html( get_the_title() ); ?></h1>

		<nav aria-label="breadcrumb" class="mb-2">
			<ol class="list-unstyled clearfix mb-0">
				<li class="breadcrumb-item float-left"><a class="text-decoration-none" href="<?= esc_url( $archive_url ); ?>"><?= esc_html( __( 'Hub', 'freshpress-website' ) ); ?></a></li>
				<li class="breadcrumb-item float-left"><a class="text-decoration-none" href="<?= esc_url( $category_url ); ?>"><?= esc_html( $category->name ); ?></a></li>
				<li class="breadcrumb-item float-left sr-only" aria-current="page"><?= esc_html( get_the_title() ); ?></li>
			</ol>
		</nav>
		<div class="hub-article__date font-weight-medium mb-3"><?= esc_html( $post_date ); ?></div>

		<?= fp_noesc( $content ); ?>

		<hr>

		<?php
		$related_links = fp_render_blocks(
			[
				'name'  => 'related-links',
				'attrs' => [
					'number_of_posts' => '6',
					'links_type'      => 'fixed_link_posts',
					'select_layout'   => 'cards_grid',
					'className'       => 'mb-5',
				],
			]
		);
		?>

		<?php if ( ! empty( $related_links ) ) : ?>
			<p class="text-center font-weight-bold my-4 font-size-smaller"><?= esc_html( __( 'RELATED ARTICLES', 'freshpress-website' ) ); ?></p>
			<?= fp_noesc( $related_links ) ?>
		<?php endif; ?>

		<?php if ( ! empty( $author_fullname ) && ! empty( $author_photo ) && ! empty( $author_description ) ) : ?>
			<div class="article-bio mt-n4 mb-5 pb-4 d-flex flex-column">
				<div class="article-bio__image d-flex align-items-center mb-3">
					<img src="<?= esc_url( $author_photo['url'] ); ?>" alt="<?= esc_attr( $author_photo['alt'] ); ?>" class="author-headshot ml-0 mr-3" width="96" height="96">
					<h5 class="article-bio__name mb-3"><?= esc_html( $author_fullname ); ?></h5>
				</div>

				<div class="article-bio__text">
					<p class="article-bio__title text-uppercase mb-1"><?= esc_html( __( 'About the author', 'freshpress-website' ) ); ?></p>
					<p class="article-bio__description mb-0"><?= fp_noesc( $author_description ); ?></p>
				</div>
			</div>
		<?php endif; ?>

	</div>
</div>

<?php
require_once get_template_directory() . '/partials/common/hub/common-footer.php';
