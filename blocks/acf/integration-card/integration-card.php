<?php
/**
 * Integration Card template.
 *
 * @package FreshPress\Website
 */

$int_id = $block['data']['integration_card_id'];
$integration = get_post( $int_id );
$class_name = 'integration-card border border-primary rounded mt-0 mb-4 position-relative';
?>

<div
	id="category__integration_<?= esc_attr( $integration->post_name );  ?>"
	class="<?= esc_attr( fp_get_block_classes( $class_name ) ); ?>"
>
	<div class="integration-card__integration-top text-center border-bottom border-primary position-relative">
		<a
			class="integration-card__integration-link p-4 w-100 h-100 d-flex align-items-center"
			href="/integrations/pages/<?= esc_attr( $integration->post_name ); ?>"
		>
			<?= fp_render_img(
				get_the_post_thumbnail_url( $int_id, 'thumbnail' ),
				[
					'class' => 'integration-card__integration-image d-block m-auto h-auto position-relative align-self-center fp-animate__zoom_in fp-animate__zoom_in--on-hover',
					'alt'   => $integration->post_title,
				]
			) ?>
		</a>
	</div>
	<div class="integration-card__integration-bottom text-left">

		<div class="integration-card__integration-info pt-3 px-3">

			<div class="position-relative">
				<?php if ( has_term( 'top-picks', 'integration_collection', $int_id ) ) : ?>
					<div class="integration-card__top-pick position-absolute"></div>
				<?php endif; ?>
			</div>
			<div>
				<?php if ( has_term( 'freshbooks-tested', 'integration_collection', $int_id ) ) : ?>
					<p class="integrations__freshbooks-tested integration-card__freshbooks-tested text-left text-uppercase d-inline-block pl-3 mb-1"><?= esc_html__( 'Freshbooks Tested', 'freshpress-website' ) ?></p>
				<?php endif; ?>
			</div>
			<div class="integration-card__integration-excerpt mb-4">
				<?php
				$excerpt  = get_the_excerpt( $int_id );
				if ( strlen( $excerpt ) > 100 ) {
					$excerpt = substr( $excerpt, 0, 100 );
					$excerpt .= '...';
				}
				?>
				<?= esc_html( $excerpt ) ?>
			</div>
			<div class="integration-card__integration-tags d-flex flex-wrap">
				<?php $tags = get_the_terms( $int_id, 'integration_tag' ); ?>
				<?php if ( $tags ) : ?>
					<?php foreach ( $tags as $int_tag ) : ?>
						<a
							class="integration-card__integration-tag border rounded d-inline-block text-decoration-none py-1 px-2 mr-2 mb-2 btn btn-white"
							href="/integrations/tag/<?= esc_html( $int_tag->slug ); ?>"
						>
							<?= esc_html( $int_tag->name ); ?>
						</a>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
			<?php $available_in = get_the_terms( $int_id, 'integration_availability' ); ?>
			<?php if ( $available_in ) : ?>
				<div class="integrations__available-in mb-4">
					<div class="d-inline-block">
						<?php foreach ( $available_in as $country ) : ?>
							<span class="fi fi-<?= esc_html( $country->slug ); ?> mr-2"></span>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endif; ?>

		</div>
		<div class="integration-card__integration-bottom-wrap position-absolute px-3 pb-3 pt-0 w-100 text-center ">
			<a
				class="integration-card__integration-cta btn btn-white w-100 border"
				href="/integrations/pages/<?= esc_attr( $integration->post_name ); ?>"
				data-integration-title="<?= esc_attr( $integration->post_title ); ?>"
			>
				<?= esc_html__( 'Learn More', 'freshpress-website' ) ?>
			</a>
		</div>
	</div>
</div>
