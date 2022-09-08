<?php
/**
 * Code Snippet template.
 *
 * @package FreshPress\Website
 */

$class_name = 'code-snippet';

if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
	$class_name .= ' align' . $block['align'];
}

$snippet = $block['data']['snippet'];
?>

<div <?= fp_get_block_id( $block, true ); ?> class="<?= esc_attr( fp_get_block_classes( $class_name ) ); ?>">
	<?= fp_noesc( $snippet ) ?>
</div>
