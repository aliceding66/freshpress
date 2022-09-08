<?php
/**
 * Alphabetical Nav partial for Glossary.
 *
 * @package FreshPress\Website
 */

// @TODO: Populate letters based on the actual posts (will remove empty ones).
$nav_items = str_split( '#abcdefghijklmnopqrstuvwxyz' );
?>

<div class="alpha-nav fp-block wide-block my-0 mb-md-2 pt-4 pb-3 py-md-4 px-0 px-md-3 border-top">
	<h4 class="alpha-nav__heading text-center mt-md-2 mb-md-4"><?= esc_html( _x( 'Browse Glossary Term', 'Glossary', 'freshpress-website' ) ); ?></h4>
	<div class="alpha-nav__wrapper d-flex align-items-center justify-content-center mx-auto">
		<a href="<?= esc_url( home_url( '/glossary/' ) ) ?>" class="alpha-nav__home">
			<?php require get_template_directory() . '/partials/common/glossary/icon-home.php'; ?>
		</a>
		<div class="alpha-nav__items-container d-flex py-2 py-md-0">
			<?php foreach ( $nav_items as $nav_item ) : ?>
				<a href="<?= esc_url( home_url( "/glossary/$nav_item/" ) ); ?>" class="alpha-nav__item">
					<?= esc_html( $nav_item ); ?>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</div>
