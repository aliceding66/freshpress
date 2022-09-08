<?php
/**
 * Single template for Accounting Partners.
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-single-accounting-partners' );

$ap_page = get_page_by_path( 'accounting-partners', OBJECT, 'page' );
$ap_content = get_post( $ap_page->ID );
$ap_blocks = parse_blocks( $ap_content->post_content );

the_post();

$partner = get_field( 'am_firm_name' );
$address = get_field( 'am_address' );
$about = get_field( 'am_about' );
$free_freshbooks_partner_subscription = get_field( 'am_free_freshbooks_partner_subscription' );
$accounting_affiliate = get_field( 'am_accounting_affiliate' );
$certified = '';
if ( $accounting_affiliate ) {
	$certified = __( 'FreshBooks Certified', 'freshpress-website' );
}

$detail_cta_block_name = 'acf/accounting-partners-detail-cta';
?>
<div class="accounting-partners-single">
	<div class="accounting-partners-single__container">
		<div class="accounting-partners-single__breadcrumbs">
			<div class="col-md-12 text-left text-sm-center text-lg-left">
				<?php
				$ac_terms = get_the_terms( get_the_ID(), 'accounting_partners_location' );
				if ( ! empty( $ac_terms ) ) {
					usort( $ac_terms, 'fp_cmp' );
					echo '<a href="' . esc_url( site_url() ) . '/accounting-partners?from=single">' . esc_html( __( 'Home', 'freshpress-website' ) ) . '</a><span class="accounting-partners-single__breadcrumbs-divider">/</span>';
					foreach ( $ac_terms as $i => $ac_term ) {
						$flag = $i < count( $ac_terms ) - 1;
						echo '<a href="' . esc_url( site_url() . '/accounting-partners/location/' . $ac_term->slug ) . '">' . esc_html( $ac_term->name ) . '</a>';
						echo ( $flag ) ? '<span class="accounting-partners-single__breadcrumbs-divider">/</span>' : '';
					}
				}
				?>
			</div>
		</div>
		<div class="accounting-partners-single__white-container">
			<div class="accounting-partners-single__left-side">
				<div class="accounting-partners-single__profile-image">
					<?php
					if ( has_post_thumbnail() ) {
						$image_id = get_post_thumbnail_id( get_the_ID() );
						$image_url = wp_get_attachment_image_url( $image_id, 'medium' );
						$image_alt = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
						echo fp_render_img(
							$image_url,
							[
								'alt' => $image_alt,
							]
						);
					} else {
						echo fp_render_img(
							'images/accounting-partners/freshbooks-certified.png',
							[
								'alt' => 'Accounting Partner default logo',
							]
						);
					}
					?>
				</div>
				<?php
				foreach ( $ap_blocks as $ap_block ) :
					if ( $detail_cta_block_name == $ap_block['blockName'] ) :
						$btn_title = $ap_block['attrs']['data']['accounting-partners-details-cta_cta_button_link']['title'];
						$btn_url = $ap_block['attrs']['data']['accounting-partners-details-cta_cta_button_link']['url'];
						$btn_url .= '?partner=' . get_the_ID();
						if ( $btn_title && $btn_url ) :
							?>
							<a href="<?= esc_url( $btn_url ); ?>" class="btn-cta-green btn d-none d-md-block"><?= esc_html( $btn_title ); ?></a>
							<?php
						endif;
					endif;
				endforeach;
				?>
			</div>
			<div class="accounting-partners-single__right-side">
				<?php if ( $certified ) : ?>
					<span class="accounting-partners-single__certified"><?= esc_html( $certified ); ?></span>
				<?php endif; ?>
				<?php if ( $partner ) : ?>
					<h1 class="accounting-partners-single__title"><?= esc_html( $partner ); ?></h1>
				<?php endif; ?>
				<?php if ( $address ) : ?>
					<address class="accounting-partners-single__address"><?= esc_html( $address ); ?></address>
				<?php endif; ?>

				<?php
				foreach ( $ap_blocks as $ap_block ) :
					if ( $detail_cta_block_name == $ap_block['blockName'] ) :
						$btn_title = $ap_block['attrs']['data']['accounting-partners-details-cta_cta_button_link']['title'];
						$btn_url = $ap_block['attrs']['data']['accounting-partners-details-cta_cta_button_link']['url'];
						$btn_url .= '?partner=' . get_the_ID();
						if ( $btn_title && $btn_url ) :
							?>
							<a href="<?= esc_url( $btn_url ); ?>" class="btn-cta-green btn d-inline-block d-md-none"><?= esc_html( $btn_title ); ?></a>
							<?php
						endif;
					endif;
				endforeach;
				?>

				<?php if ( $about ) : ?>
					<p class="accounting-partners-single__about"><?= fp_noesc( $about ); ?></p>
				<?php endif; ?>

				<?php
				$ac_terms = get_the_terms( get_the_ID(), 'accounting_partners_service' );
				if ( ! empty( $ac_terms ) ) {
					$ac_terms_count = count( $ac_terms );
					$ac_terms_half = round( $ac_terms_count / 2 );
					echo '<div class="accounting-partners-single__services">
                    <h2>' . esc_html( __( 'Services offered', 'freshpress-website' ) ) . '</h2>
                    <div class="row">';
					echo '<div class="col-md-6"><ul>';
					foreach ( $ac_terms as $i => $ac_term ) {
						if ( $ac_terms_half == $i && $ac_terms_count !== $i ) {
							echo '</ul></div><div class="col-md-6"><ul>';
						}
						echo '<li>' . esc_html( $ac_term->name ) . '</li>';
					}
					echo '</ul></div>';
					echo '</div></div>';
				}
				?>

				<?php
				$ac_terms = get_the_terms( get_the_ID(), 'accounting_partners_industry' );
				if ( ! empty( $ac_terms ) ) {
					$ac_terms_count = count( $ac_terms );
					$ac_terms_half = round( $ac_terms_count / 2 );
					echo '<div class="accounting-partners-single__services">
                    <h2>' . esc_html( __( 'Industries served', 'freshpress-website' ) ) . '</h2>
                    <div class="row">';
					echo '<div class="col-md-6"><ul>';
					foreach ( $ac_terms as $i => $ac_term ) {
						if ( $ac_terms_half == $i && $ac_terms_count !== $i ) {
							echo '</ul></div><div class="col-md-6"><ul>';
						}
						echo '<li>' . esc_html( $ac_term->name ) . '</li>';
					}
					echo '</ul></div>';
					echo '</div></div>';
				}

				if ( ! empty( $ap_blocks ) ) :
					foreach ( $ap_blocks as $ap_block ) {
						if ( $detail_cta_block_name == $ap_block['blockName'] ) {
							echo fp_render_blocks(
								[
									'name'  => 'accounting-partners-detail-cta',
									'attrs' => [
										'data' => $ap_block['attrs']['data'],
									],
								],
							);
						}
					}
				endif;
				?>

			</div>
		</div>
	</div>
	<?php
	if ( ! empty( $ap_blocks ) ) :
		$count_block = 0;
		foreach ( $ap_blocks as $ap_block ) {
			if ( 'fpbk/new-cta-bar' == $ap_block['blockName'] ) {
				if ( 1 == $count_block ) :
					echo fp_render_blocks(
						[
							'name'    => 'fpbk/new-cta-bar',
							'attrs'   => $ap_block['attrs'],
							'content' => array_map(
								function( $inner_block ) {
									return $inner_block['innerContent'];  },
								$ap_block['innerBlocks']
							),
						],
					);
				endif;
				$count_block++;
			}
		}
	endif;
	?>
</div>
