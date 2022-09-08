<?php
/**
 * Footer template for FreshPress Website theme.
 *
 * @package FreshPress\Website
 */

$no_footer = ! empty( $args['no-footer'] ) && $args['no-footer'];
$reduced_footer = ! empty( $args['reduced-footer'] ) && $args['reduced-footer'];

?>
		</div><!-- /.container-fluid -->
	</main><!-- .main -->
	<?php
	if ( ! $no_footer ) {
		if ( $reduced_footer ) {
			require_once get_template_directory() . '/partials/common/footer/reduced-footer.php';
		} else {
			require_once get_template_directory() . '/partials/common/footer/footer.php';
		}
	}
	require_once get_template_directory() . '/partials/common/footer/banner-cookie-consent.php';
	wp_footer();
	?>
</body>
</html>
