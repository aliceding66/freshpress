<?php
/**
 * Header template for FreshPress Website theme.
 *
 * @package FreshPress\Website
 */

?><!doctype html>
<html <?php language_attributes(); ?> class="min-vh-100">
	<head>
		<?php wp_head(); ?>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta class="swiftype" name="region" data-type="string" content="<?= esc_attr( fp_get_current_language() ); ?>" />
		<?php if ( is_page_template( 'templates/page-homepage.php' ) ) : ?>
			<link rel="canonical" href="https://www.freshbooks.com/" />
		<?php endif; ?>
	</head>
	<body <?php body_class( 'min-vh-100 fbprospect' ); ?> <?= fp_noesc( fp_get_trial_length_attr() ); ?>>
		<a class="sr-only" href="#main-content"><?= esc_html__( 'Skip to content', 'freshpress-website' ); ?></a>
		<?php wp_body_open(); ?>
		<?php
		if ( empty( $args['no-header'] ) ) {
			require_once get_template_directory() . '/partials/common/header/header.php';
		}
		?>
		<main class="main mx-auto" id="main-content">
			<div class="container-fluid">
