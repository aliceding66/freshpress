<?php
/**
 * Footer Navigation Partial.
 *
 * @package FreshPress\Website
 */

/**
 * Displays footer menu
 */
function fp_footer_get_nav() {

	if ( has_nav_menu( 'footer_navigation' ) ) {
		wp_nav_menu(
			[
				'link_after'     => '</span>',
				'link_before'    => '<span>',
				'theme_location' => 'footer_navigation',
				'menu_class'     => 'footer__nav-menu',
				'menu_id'        => 'footer__nav-menu',
				'container'      => false,
			]
		);
	}

}

?>

<div class="nav mx-auto d-flex flex-nowrap">
	<a class="nav__logo d-none d-lg-flex align-self-start mr-4" href="<?= esc_url( fp_add_remove_trailing_slash( home_url() ) ); ?>">
		<?= fp_render_img(
			'images/logos/freshbooks-logo.svg',
			[
				'class' => 'nav__logo-image',
				'alt'   => 'Freshbooks Logo',
			]
		) ?>
	</a>
	<div class="nav__container">
		<?php fp_footer_get_nav(); ?>
	</div>
</div>
