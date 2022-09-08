<?php
/**
 * Stats template.
 *
 * @package FreshPress\Website
 */

$stats_description = ! empty( $block['stats_description'] ) ? $block['stats_description'] : get_field( 'stats_description' );
$stats = ! empty( $block['stats'] ) ? $block['stats'] : get_field( 'stats' );
$typography = ! empty( $block['typography'] ) ? $block['typography'] : get_field( 'typography' );
$count_up = ! empty( $block['count_up'] ) ? $block['count_up'] : get_field( 'count_up' );
$max_width = ! empty( $block['max_width'] ) ? $block['max_width'] : get_field( 'max_width' );

$block_classes = [ esc_attr( fp_get_block_classes( 'stats' ) ) ];
$block_classes[] = 'row px-2 p-md-x-0 my-0 mx-auto';
if ( ! empty( $typography['text_colour'] ) ) {
	$block_classes[] = $typography['text_colour'];
}
if ( ! empty( $typography['layout'] ) ) {
	$block_classes[] = $typography['layout'];
}
$block_attributes = '';
if ( ! empty( $max_width ) ) {
	$block_attributes .= ' style="max-width: ' . $max_width . 'px;"';
}

?>

<div
	<?= fp_get_block_id( $block, true ); ?>
	class="<?= fp_noesc( implode( ' ', $block_classes ) ) ?>"
	<?= fp_noesc( $block_attributes ) ?>
>
	<p class="stats__stats-description w-100 font-weight-medium text-center">
		<?= esc_html( $stats_description ) ?>
	</p>
	<div class="stats__stats-container d-flex flex-column flex-md-row m-auto">
		<?php
		foreach ( $stats as $stat ) :
			$value_font_size = 'font-size-l';
			if ( ! empty( $typography['layout'] ) && 'stats--layout-big' === $typography['layout'] ) {
				$value_font_size = 'font-size-xxl';
			}
			$value_html = '<span class="stats__stat-item-value--content ' . fp_noesc( $value_font_size ) . '">' . $stat['value'] . '</span>';
			$unit_html = '<span class="stats__stat-item-value--unit font-additional h3 ' . fp_noesc( $value_font_size ) . '">' . esc_html( $stat['unit'] ) . '</span>';
			$unit_placement = 'right';
			if ( ! empty( $stat['unit_placement'] ) ) {
				$unit_placement = $stat['unit_placement'];
			}

			if ( $count_up ) {
				$exploded_value = explode( '.', $stat['value'] );
				$exploded_step = explode( '.', $stat['step'] );
				$decimals_amount = max(
					isset( $exploded_value[1] ) ? strlen( $exploded_value[1] ) : 0,
					isset( $exploded_step[1] ) ? strlen( $exploded_step[1] ) : 0,
				);
				$init_value = number_format( 0, $decimals_amount, '.', '' );
				$decimals_amount_modifier = 1;
				if ( $decimals_amount >= 1 ) {
					$decimals_amount_modifier = 10 * $decimals_amount;
				}
				$step_modifier = intval( floor( $stat['step'] ) );
				if ( empty( $step_modifier ) ) {
					$step_modifier = 1;
				}
				$count_speed = ceil(
					( $stat['duration'] * 1000 )
					/ ( $stat['value'] / $stat['step'] )
				);

				$count_step = esc_attr( $stat['step'] );
				$decimals_amount = esc_attr( $decimals_amount );
				$stat_value = esc_attr( $stat['value'] );
				$count_speed = esc_attr( $count_speed );
				$init_value = esc_html( $init_value );

				$value_html = <<<VALUE_HTML
<span class="stats__stat-item-value--content stats__count-up $value_font_size"
	data-count-step="$count_step"
	data-count-decimal-amount="$decimals_amount"
	data-count-to="$stat_value"
	data-count-speed="$count_speed"
	data-count-started="0"
>$init_value</span>
VALUE_HTML;
			}
			?>
			<div class="stats__stat-item px-3">
				<div class="stats__stat-item-value text-center text-nowrap">
					<?= 'left' === $unit_placement ? fp_noesc( $unit_html ) : '' ?>
					<?= fp_noesc( $value_html ) ?>
					<?= 'right' === $unit_placement ? fp_noesc( $unit_html ) : '' ?>
				</div>
				<p class="stats__stat-item-label text-center font-size-smaller"><?= fp_noesc( $stat['description'] ) ?></p>
			</div>
		<?php endforeach; ?>
	</div>
</div>
