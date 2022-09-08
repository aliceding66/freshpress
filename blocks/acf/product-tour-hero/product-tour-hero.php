<?php
/**
 * Product Tour Hero template.
 *
 * @package FreshPress\Website
 */

$background_color = get_field( 'background_color' );
$heading_text = get_field( 'heading_text' );
$dropdown = get_field( 'dropdown' );
$cta = get_field( 'cta' );
$cta_subtext = get_field( 'cta_subtext' );
$video = get_field( 'video' );

$background_color_attr = ! empty( $background_color ) ? 'style="background-color: ' . $background_color . ';"' : '';
$video_background_color_attr = ! empty( $video['background_color'] ) ? 'style="background-color: ' . $video['background_color'] . ';"' : '';
$video_extension = strtolower( pathinfo( (string) $video['video_file'], PATHINFO_EXTENSION ) );
$is_video_gif = 'gif' === $video_extension;
$video_play_on_load = (int) $video['play_on_load'];
$video_muted = (int) $video['muted'];
$video_looped = (int) $video['loop'];
$video_with_controls = (int) $video['controls'];
$video_show_youtube_subtitles = (int) $video['show_youtube_subtitles'];
if ( $video_play_on_load ) {
	$video_muted = 1;
}

?>

<div
	<?= fp_get_block_id( $block, true ); ?>
	<?= fp_noesc( $background_color_attr ) ?>
	class="<?= esc_attr( fp_get_block_classes( 'product-tour-hero' ) ); ?> row px-2 py-5 p-md-x-0"
>
	<div class="container row d-flex flex-column justify-content-center align-items-center m-auto py-3">
		<?php if ( ! empty( $dropdown['links'] ) ) : ?>
			<div
				class="product-tour-hero__dropdown fp-animate fp-animate__swing_in_bottom fp-animate--order--order-0 py-3 text-center position-relative">
				<span class="product-tour-hero__dropdown-label text-nowrap text-uppercase"><?= esc_html( $dropdown['label'] ) ?></span>
				<ul class="product-tour-hero__dropdown-list text-lg-left flex-row flex-wrap w-100 d-none d-editor-none">
					<?php foreach ( $dropdown['links'] as $dropdown_link ) : ?>
						<li class="product-tour-hero__dropdown-list-item align-self-start w-50 p-0 border-0">
							<a class="d-block p-0" href="<?= esc_attr( $dropdown_link['url']['url'] ) ?>" target="<?= esc_attr( $dropdown_link['url']['target'] ) ?? '' ?>">
								<?= esc_html( $dropdown_link['url']['title'] ) ?>
							</a>
						</li>
					<?php endforeach; ?>
				</ul>
				<div class="tri-outer d-none d-editor-none position-absolute"></div>
				<div class="tri-inner d-none d-editor-none position-absolute"></div>
			</div>
		<?php endif; ?>

		<h1 class="product-tour-hero__heading fp-animate fp-animate__swing_in_bottom fp-animate--order-order-2 h1 font-size-xl text-center"><?= fp_noesc( str_replace( "\n", '<br/>', $heading_text ) ) ?></h1>
		<div class="fp-animate fp-animate__swing_in_bottom fp-animate--order-4 mt-4 mb-5 text-center">
			<?php if ( is_array( $cta ) ) : ?>
				<a class="btn btn-cta-green product-tour-hero__cta-button font-weight-medium text-nowrap" href="<?= esc_attr( $cta['url'] ) ?>" target="<?= esc_attr( $cta['target'] ) ?? '' ?>"> <?= esc_html( $cta['title'] ) ?></a>
			<?php endif; ?>
			<?php if ( ! empty( $cta_subtext ) ) : ?>
				<p class="product-tour-hero__cta-subtext text-center mt-2 pt-1"><?= fp_noesc( $cta_subtext ); ?></p>
			<?php endif; ?>
		</div>

		<?php if ( ! empty( $video['video_file'] ) || ! empty( $video['youtube_video_id'] ) ) : ?>
			<div
				class="product-tour-hero__video-container fp-animate fp-animate__swing_in_bottom fp-animate--order--order-3 mb-5 position-relative overflow-hidden"
				<?= fp_noesc( $video_background_color_attr ) ?>
			>
				<?php if ( $is_video_gif ) : ?>
					<?= fp_render_img(
						$video['video_file'],
						[
							'class'             => 'product-tour-hero__video-file skip-lazyload position-absolute w-100 h-auto',
							'alt'               => esc_attr( $video['alt'] ),
							'onload'            => "this.classList.add( 'loaded' )",
							'data-play-on-load' => esc_attr( $video_play_on_load ),
						]
					) ?>
					<?php
				elseif ( $video['show_youtube_video'] && ! empty( $video['youtube_video_id'] ) ) :
					$video_player_classes = 'product-tour-hero__video-file product-tour-hero__video-player position-absolute w-100 h-100 border-0';
					if ( ! empty( $video['cover_file'] ) ) {
						$video_player_classes .= ' product-tour-hero__video-player--with-cover';
					}
					if ( $video_with_controls ) {
						$video_player_classes .= ' product-tour-hero__video-player--with-controls';
					}
					?>
					<div
						id="youtube_player"
						class="<?= esc_attr( $video_player_classes ) ?>"
						data-video-id="<?= esc_attr( $video['youtube_video_id'] ) ?>"
						data-video-muted="<?= esc_attr( $video_muted ) ?>"
						data-video-loop="<?= esc_attr( $video_looped ) ?>"
						data-video-controls="<?= esc_attr( $video_with_controls ) ?>"
						data-video-cc="<?= esc_attr( $video_show_youtube_subtitles ) ?>"
						data-play-on-load="<?= esc_attr( $video_play_on_load ) ?>"
					></div>
				<?php elseif ( $video['video_file'] ) : ?>
					<?php
					$additional_attributes = '';
					if ( $video_muted > 0 ) {
						$additional_attributes = ' muted';
					}
					if ( $video_looped > 0 ) {
						$additional_attributes = ' loop';
					}
					if ( $video_with_controls > 0 ) {
						$additional_attributes = ' controls';
					}
					?>
					<video
						<?= esc_attr( $additional_attributes ) ?>
						class="product-tour-hero__video-file position-absolute w-100"
						oncanplay="this.classList.add( 'loaded' )"
						data-play-on-load="<?= esc_attr( $video_play_on_load ) ?>"
					>
						<source src="<?= esc_attr( $video['video_file'] ) ?>" type="video/<?= esc_attr( $video_extension ) ?>">
						<?php if ( ! empty( $video['subtitles'] ) && ! empty( $video['subtitles']['url'] ) ) : ?>
							<track src="<?= fp_noesc( $video['subtitles']['url'] ) ?>" kind="subtitles" srclang="en" label="English" default>
						<?php endif; ?>
					</video>
				<?php endif; ?>

				<?php if ( ! empty( $video['cover_file'] ) ) : ?>
					<?= fp_render_img(
						$video['cover_file'],
						[
							'class' => 'product-tour-hero__video-cover-file position-absolute w-100 h-100',
							'alt'   => esc_attr( $video['alt'] ),
						]
					) ?>
				<?php endif; ?>

				<span id="video_ratio_size" class="product-tour-hero__video-container-ratio-size w-100 d-block"></span>
			</div>
		<?php endif; ?>

		<div class="fp-animate fp-animate__swing_in_bottom">
			<InnerBlocks/>
		</div>
	</div>
</div>
