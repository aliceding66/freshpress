<?php
/**
 * Template Name: Password Protected Page
 *
 * @package FreshPress\Website
 */

get_header();
$pwd_validated = false;

if ( isset( $_REQUEST['_wpnonce'] ) ) {
	$nonce = sanitize_text_field( wp_unslash( $_REQUEST['_wpnonce'] ) );
	if ( ! wp_verify_nonce( $nonce, 'pwd-nonce' ) ) {
		echo 'Something went wrong. Please try again.';
	} else {
		if ( isset( $_REQUEST['submitted'] ) && ( '1' === $_REQUEST['submitted'] ) ) {
			$pwd = isset( $_REQUEST['password'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['password'] ) ) : null;
			$password = get_field( 'password' );
			if ( get_field( 'password' ) === $pwd ) {
				$pwd_validated = true;
			}
		}
	}
}
?>

<script>
document.addEventListener( 'DOMContentLoaded', function() {
	document.querySelector('#pp-template').addEventListener('submit', function(){
		document.querySelector('#pp-template').submit();
	});
});
</script>

<div class="p-5">
	<?php if ( ! $pwd_validated ) : ?>
		<form action="#" id="pp-template" name="pp-template" method="post" novalidate>
			<label for="password">Password:</label>
			<input name="password" type="password">
			<input type="hidden" name="submitted" value="1">
			<input type="hidden" name="_wpnonce" value="<?= esc_attr( wp_create_nonce( 'pwd-nonce' ) ) ?>">
			<button type="submit">Submit</button>
		</form>
	<?php endif; ?>

	<?php if ( $pwd_validated ) : ?>
		<?php get_template_part( 'partials/content' ); ?>
	<?php endif; ?>
</div>

<?php
	get_footer();

