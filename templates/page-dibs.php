<?php
/**
 * Template Name: DIBS Page
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-page-dibs' );

get_header();
?>

<div class="dibs p-0">
	<?php
		require_once __DIR__ . '/dibs/includes/dibs-hero.php';
		require_once __DIR__ . '/dibs/includes/dibs-welcome.php';
		require_once __DIR__ . '/dibs/includes/dibs-framework.php';
		require_once __DIR__ . '/dibs/includes/dibs-culture.php';
		require_once __DIR__ . '/dibs/includes/dibs-journey-mobile.php';
		require_once __DIR__ . '/dibs/includes/dibs-journey-desktop.php';
		require_once __DIR__ . '/dibs/includes/dibs-stand.php';
		require_once __DIR__ . '/dibs/includes/dibs-graph.php';
		require_once __DIR__ . '/dibs/includes/dibs-categories.php';
		require_once __DIR__ . '/dibs/includes/dibs-champions.php';
		require_once __DIR__ . '/dibs/includes/dibs-join.php';
		require_once __DIR__ . '/dibs/includes/dibs-contact.php';
	?>
</div>

<?php
	get_footer();

