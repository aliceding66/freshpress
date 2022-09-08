<?php
/**
 * Hero Search template.
 *
 * @package FreshPress\Website
 */

$class_name = 'hero-search';

if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
	$class_name .= ' align' . $block['align'];
}

$header = $block['header'] ?? get_field( 'header' );
$placeholder = $block['placeholder'] ?? get_field( 'placeholder' );
$background_image = $block['background_image'] ?? get_field( 'background_image' );
$background_image = $block['background_image'] ?? get_field( 'background_image' );
$text_color = $block['text_color'] ?? get_field( 'text_color' );

$bg_style = $background_image ? 'style="background-image:url(' . $background_image['url'] . ');"' : '';
$header_style = $text_color ? 'style="color:' . $text_color . ';"' : '';
$class_name .= ' row my-0';
?>

<div <?= fp_get_block_id( $block, true ) ?> class="<?= esc_attr( fp_get_block_classes( $class_name ) ) ?>" <?= fp_noesc( $bg_style ) ?>>
	<div class="hero-search__content d-flex flex-wrap w-100 p-2 mx-auto ml-md-0">
		<h1 class="hero-search__header text-center text-md-left pb-3" <?= fp_noesc( $header_style ) ?>>
			<?= esc_html( $header ) ?>
		</h1>
		<div class="hero-search__input-container w-100 position-relative">
			<input
				class="st-default-search-input form-control hero-search__input"
				aria-label="search"
				type="text"
				placeholder="<?= esc_attr( $placeholder ) ?>"
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
			>
		</div>
	</div>
</div>
