<?php
/**
 * The header partial.
 *
 * @package FreshPress\Website
 */

/**
 * Displays the header menu.
 */
function fp_header_get_nav() {

	if ( has_nav_menu( 'primary_navigation' ) ) {
		wp_nav_menu(
			[
				'link_after'     => '</span>',
				'link_before'    => '<span>',
				'theme_location' => 'primary_navigation',
				'menu_class'     => 'header__nav-menu',
				'container'      => false,
				'walker'         => new FP_Primary_Nav_With_Description(),
			]
		);
	}

}

/*
 * Custom NavWalker
 */
require_once __DIR__ . '/class-fp-primary-nav-with-description.php';


/*
 * The markup
 */

$header_classes = 'header trackingSection-header my-0 py-0 mx-auto';
if ( function_exists( 'get_field' ) && get_field( 'header_wide_block', get_the_ID() ) ) {
	$header_classes .= ' wide-block';
}
if ( function_exists( 'get_field' ) && get_field( 'header_no_border', get_the_ID() ) ) {
	$header_classes .= ' header--no-border';
}

$site_language = fp_get_current_language();

$campaign = fp_init_campaign();

$phone_number_displayed = FP_Site_Options::get_option( 'fb_phone_number' );
$phone_number_href = preg_replace( '/[^0-9+]/', '', $phone_number_displayed );
$show_customer_phone_number = $phone_number_displayed && $phone_number_href;
$non_customer_phone_number_displayed = FP_Site_Options::get_option( 'fb_non_customer_phone_number' );
$non_customer_phone_number_href = preg_replace( '/[^0-9+]/', '', $non_customer_phone_number_displayed );
$show_non_customer_phone_number = $non_customer_phone_number_displayed && $non_customer_phone_number_href;
$signup_url = home_url( '/signup' );
$try_it_free_label = esc_html_x( 'Try it Free', 'Header', 'freshpress-website' );
$login_label = esc_html_x( 'Login', 'Header', 'freshpress-website' );
?>
<header class="<?= esc_attr( $header_classes ); ?>">

	<?php
	if ( $campaign ) {
		if ( $campaign['include_promo_banner'] ) {
			require_once get_template_directory() . '/partials/common/campaigns/banner-promo.php';
		}
	} elseif ( 'fr-fr' === $site_language ) {
		fp_insert_banner_informational(
			'Version BÊTA française',
			[
				'content' => 'Version BÊTA française',
			]
		);
	}
	?>

	<div class="header__region-selector-container d-flex justify-content-center">
		<?php require_once get_template_directory() . '/partials/common/header/region-selection-header.php'; ?>
	</div>

	<!-- Mobile Header -->
	<div id="header__mobile-header" class="header__mobile-header">
		<div class="header__head py-3 px-3 d-flex justify-content-between align-items-center">
			<a class="header__logo" href="<?= esc_url( fp_add_remove_trailing_slash( home_url() ) ); ?>">
				<?= fp_render_img(
					'images/logos/freshbooks-logo.svg',
					[
						'class' => 'header__logo-image',
						'alt'   => 'Freshbooks Logo',
					]
				) ?>
			</a>
			<div class="header__interaction-controls">
				<a class="btn btn-cta-green cta__button show-fbprospect" href="<?= esc_url( $signup_url ); ?>"><?= fp_noesc( $try_it_free_label ); ?></a>
				<a class="btn btn-cta-green cta__button px-4 show-fbcustomer" href="https://auth.freshbooks.com/service/auth/integrations/sign_in"><?= fp_noesc( $login_label ); ?></a>
				<div id="header__menu-handler" class="header__menu-handler ml-3 py-1 px-0" title="<?= esc_html( 'Open Menu', 'freshpress-website' ); ?>">
					<?= fp_render_img(
						'images/header/nav-hamburger.svg',
						[
							'id'    => 'header__menu-handler-image_open',
							'class' => 'header__menu-handler-image header__menu-handler-image_open',
						]
					) ?>
					<?= fp_render_img(
						'images/header/nav-close.svg',
						[
							'id'    => 'header__menu-handler-image_close',
							'class' => 'header__menu-handler-image d-none header__menu-handler-image_close',
						]
					) ?>
				</div>
			</div>
		</div>
		<div id="header__body" class="header__body d-none">
			<div id="header__mobile-nav" class="header__nav pb-3">
				<?php fp_header_get_nav(); ?>
			</div>
			<div class="header__contact pb-3">
				<a class="header__contact_page mr-md-4" href="<?= esc_url( home_url( '/contact' ) ); ?>"><?php esc_html_e( 'Contact Us', 'freshpress-website' ); ?></a>
				<?php if ( $show_customer_phone_number ) : ?>
					<p class="header__contact_phone mt-2 mb-0 m-md-0 show-fbcustomer"><?= esc_html__( 'Call Toll Free: ', 'freshpress-website' ) ?><a href="tel:<?= esc_attr( $phone_number_href ) ?>" class="header__contact_phone-number"><?= esc_html( $phone_number_displayed ) ?></a></p>
				<?php endif; ?>
				<?php if ( $show_non_customer_phone_number ) : ?>
					<p class="header__contact_phone mt-2 mb-0 m-md-0 show-fbprospect"><?= esc_html__( 'Call Sales: ', 'freshpress-website' ) ?><a href="tel:<?= esc_attr( $non_customer_phone_number_href ) ?>" class="header__contact_phone-number"><?= esc_html( $non_customer_phone_number_displayed ) ?></a></p>
				<?php endif; ?>
			</div>
			<div class="header__ctas pb-3 show-fbprospect">
				<a class="header__try-cta-2 btn btn-cta-green cta__button mx-1 mx-md-2 py-2" href="<?= esc_url( $signup_url ); ?>"><?= fp_noesc( $try_it_free_label ); ?></a>
				<a class="header__try-cta-2 btn btn-white cta__button mx-1 mx-md-2 pt-2" href="https://auth.freshbooks.com/service/auth/integrations/sign_in"><?= fp_noesc( $login_label ); ?></a>
			</div>
			<div class="header__ctas pb-3 show-fbcustomer">
				<a class="header__try-cta-2 btn btn-cta-green cta__button mx-1 mx-md-2 py-2" href="https://auth.freshbooks.com/service/auth/integrations/sign_in"><?= fp_noesc( $login_label ); ?></a>
				<a class="header__try-cta-2 btn btn-white cta__button mx-1 mx-md-2 pt-2" href="<?= esc_url( $signup_url ); ?>"><?= fp_noesc( $try_it_free_label ); ?></a>
			</div>
		</div>
	</div>
	<!-- .header__mobile-header -->

	<!-- Desktop Header -->
	<div id="header__desktop-header" class="header__desktop-header">
		<a class="header__logo" href="<?= esc_url( fp_add_remove_trailing_slash( home_url() ) ); ?>">
			<?= fp_render_img(
				'images/logos/freshbooks-logo.svg',
				[
					'class' => 'header__logo-image',
					'alt'   => 'Freshbooks Logo',
				]
			) ?>
		</a>
		<div id="header__nav" class="header__nav pl-5">
			<?php fp_header_get_nav(); ?>
		</div>
		<div class="header__ctas">
			<?php if ( $show_customer_phone_number ) : ?>
				<?php $customer_class = $show_non_customer_phone_number ? 'show-fbcustomer' : ''; ?>
				<p class="header__contact_phone mr-3 mb-0 <?= esc_attr( $customer_class ) ?>"><a href="tel:<?= esc_attr( $phone_number_href ) ?>" class="header__contact_phone-number"><?= esc_html( $phone_number_displayed ) ?></a></p>
			<?php endif; ?>
			<?php if ( $show_non_customer_phone_number ) : ?>
				<span class="header__contact_phone-title show-fbprospect"><?php esc_html_e( 'CALL SALES', 'freshpress-website' ); ?></span>
				<p class="header__contact_phone mr-3 mb-0 show-fbprospect"><a href="tel:<?= esc_attr( $non_customer_phone_number_href ) ?>" class="header__contact_phone-number"><?= esc_html( $non_customer_phone_number_displayed ) ?></a></p>
			<?php endif; ?>
			<a class="header__contact_page mr-3" href="<?= esc_url( home_url( '/contact' ) ); ?>"><?php esc_html_e( 'Contact Us', 'freshpress-website' ); ?></a>

			<!-- non-customers -->
			<a class="header__contact_login mr-3 show-fbprospect" href="https://auth.freshbooks.com/service/auth/integrations/sign_in"><?= fp_noesc( $login_label ); ?></a>
			<a class="header__try-cta-2 py-2 px-3 btn btn-cta-green cta__button show-fbprospect" href="<?= esc_url( $signup_url ) ?>"><?= fp_noesc( $try_it_free_label ); ?></a>

			<!-- customers -->
			<a class="header__contact_login mr-3 show-fbcustomer" href="<?= esc_url( $signup_url ) ?>"><?= fp_noesc( $try_it_free_label ); ?></a>
			<a class="header__try-cta-2 py-2 px-4 btn btn-cta-green cta__button show-fbcustomer" href="https://auth.freshbooks.com/service/auth/integrations/sign_in"><?= fp_noesc( $login_label ); ?></a>
		</div>
	</div>
	<!-- .header__desktop-header -->

</header><!-- .header -->
