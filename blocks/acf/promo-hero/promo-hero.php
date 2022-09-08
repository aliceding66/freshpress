<?php
/**
 * Promo Hero template.
 *
 * @package FreshPress\Website
 */

$class_name = 'promo-hero';
$block_id_selector = '#' . fp_get_block_id( $block, false );

if ( is_front_page() ) {
	$class_name .= ' wide-block';
}

$current_region = fp_parse_language_code( fp_get_current_language() )['country'];

$campaign = fp_init_campaign();
$start_date = strtotime( $campaign['start_date'] );
$end_date = $campaign['end_date'];
$current_time = time();
$is_campaign_active = $start_date < $current_time && $end_date > $current_time;
$countdown_start_time = $campaign['countdown_start_date'] ?? '';
$page_name = is_front_page() ? 'homepage' : 'pricing';

// Content.
$is_new_design = ! empty( $campaign[ $page_name . '_promo_hero_variation' ] ) && 'new' === $campaign[ $page_name . '_promo_hero_variation' ];
if ( $is_new_design ) {
	$class_name .= ' new position-relative';
}

// Top Banner (currently pricing only).
$include_top_banner = $campaign[ $page_name . '_promo_hero_include_top_banner' ] ?? false;
$top_banner_text = $campaign[ $page_name . '_promo_hero_top_banner_text' ] ?? '';
$top_banner_background = $campaign[ $page_name . '_promo_hero_top_banner_bg_colour' ] ?? '';
$top_banner_colour = $campaign[ $page_name . '_promo_hero_top_banner_text_colour' ] ?? '';
$top_banner_inline_styles = 'style="' . ( ! empty( $top_banner_background ) ? "background-color: $top_banner_background;" : '' ) . ( ! empty( $top_banner_colour ) ? " color: $top_banner_colour;" : '' ) . '"';

$content_background = $campaign[ $page_name . '_promo_hero_content_background_colour' ] ?? '';
$content_inline_styles = $is_new_design ? 'style="background-color: ' . esc_attr( $content_background ) . ';"' : '';
$label = $campaign[ $page_name . '_promo_hero_label_text' ] ?? '';
$label_colour = $campaign[ $page_name . '_promo_hero_label_text_colour' ] ?? '';
$label_background = $campaign[ $page_name . '_promo_hero_label_background_image' ] ?? '';
$label_inline_styles = 'style="color: ' . esc_attr( $label_colour ) . ';' . ( ! empty( $label_background ) ? ' background-image: url(' . esc_url( $label_background['url'] ) . ');' : '' ) . '"';
$include_mtd = $campaign[ $page_name . '_promo_hero_mtd_include_mtd' ];
$mtd_colour = $campaign[ $page_name . '_promo_hero_mtd_icons_colour' ] ?? '#fff';
$mtd_inline_styles = 'style="color: ' . esc_url( $mtd_colour ) . ';"';
$mtd_icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="19px" height="19px" viewBox="0 0 19 19" version="1.1"><title></title><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="UK" transform="translate(-175.000000, -202.000000)" fill="' . esc_attr( $mtd_colour ) . '" fill-rule="nonzero"><g id="Group-7" transform="translate(175.376093, 202.746094)"><path d="M9.00390625,18.0078125 C10.2408854,18.0078125 11.40625,17.7701823 12.5,17.2949219 C13.59375,16.8196615 14.547526,16.1751302 15.3613281,15.3613281 C16.1751302,14.547526 16.8196615,13.59375 17.2949219,12.5 C17.7701823,11.40625 18.0078125,10.2408854 18.0078125,9.00390625 C18.0078125,7.76692708 17.7701823,6.6015625 17.2949219,5.5078125 C16.8196615,4.4140625 16.1751302,3.46028646 15.3613281,2.64648438 C14.547526,1.83268229 13.59375,1.18815104 12.5,0.712890625 C11.40625,0.237630208 10.2408854,0 9.00390625,0 C7.76692708,0 6.6015625,0.237630208 5.5078125,0.712890625 C4.4140625,1.18815104 3.46028646,1.83268229 2.64648438,2.64648438 C1.83268229,3.46028646 1.18815104,4.4140625 0.712890625,5.5078125 C0.237630208,6.6015625 0,7.76692708 0,9.00390625 C0,10.2408854 0.237630208,11.40625 0.712890625,12.5 C1.18815104,13.59375 1.83268229,14.547526 2.64648438,15.3613281 C3.46028646,16.1751302 4.4140625,16.8196615 5.5078125,17.2949219 C6.6015625,17.7701823 7.76692708,18.0078125 9.00390625,18.0078125 Z M9.00390625,16.5039062 C7.96223958,16.5039062 6.98893229,16.3085938 6.08398438,15.9179688 C5.17903646,15.5273438 4.38476562,14.9902344 3.70117188,14.3066406 C3.01757812,13.6230469 2.48046875,12.828776 2.08984375,11.9238281 C1.69921875,11.0188802 1.50390625,10.0455729 1.50390625,9.00390625 C1.50390625,7.96223958 1.69921875,6.98893229 2.08984375,6.08398438 C2.48046875,5.17903646 3.01757812,4.38476562 3.70117188,3.70117188 C4.38476562,3.01757812 5.17903646,2.48046875 6.08398438,2.08984375 C6.98893229,1.69921875 7.96223958,1.50390625 9.00390625,1.50390625 C10.0455729,1.50390625 11.0188802,1.69921875 11.9238281,2.08984375 C12.828776,2.48046875 13.6230469,3.01757812 14.3066406,3.70117188 C14.9902344,4.38476562 15.5273438,5.17903646 15.9179688,6.08398438 C16.3085938,6.98893229 16.5039062,7.96223958 16.5039062,9.00390625 C16.5039062,10.0325521 16.3085938,11.0026042 15.9179688,11.9140625 C15.5273438,12.8255208 14.9902344,13.6230469 14.3066406,14.3066406 C13.6230469,14.9902344 12.828776,15.5273438 11.9238281,15.9179688 C11.0188802,16.3085938 10.0455729,16.5039062 9.00390625,16.5039062 Z M8.2421875,12.5 C8.359375,12.5 8.47330729,12.4707031 8.58398438,12.4121094 C8.69466146,12.3535156 8.78255208,12.2786458 8.84765625,12.1875 L12.8710938,6.4453125 C12.9101562,6.38020833 12.9427083,6.31184896 12.96875,6.24023438 C12.9947917,6.16861979 13.0078125,6.08723958 13.0078125,5.99609375 C13.0078125,5.78776042 12.9329427,5.61197917 12.7832031,5.46875 C12.6334635,5.32552083 12.4544271,5.25390625 12.2460938,5.25390625 C12.1289062,5.25390625 12.014974,5.28320312 11.9042969,5.34179688 C11.7936198,5.40039062 11.7057292,5.47526042 11.640625,5.56640625 L8.2421875,10.4492188 L7.36328125,9.19921875 C7.29817708,9.10807292 7.21354167,9.03320312 7.109375,8.97460938 C7.00520833,8.91601562 6.88802083,8.88671875 6.7578125,8.88671875 C6.54947917,8.88671875 6.37044271,8.96158854 6.22070312,9.11132812 C6.07096354,9.26106771 5.99609375,9.44010417 5.99609375,9.6484375 C5.99609375,9.7265625 6.00911458,9.80143229 6.03515625,9.87304688 C6.06119792,9.94466146 6.09375,10.0130208 6.1328125,10.078125 L7.6171875,12.1875 C7.68229167,12.2786458 7.77018229,12.3535156 7.88085938,12.4121094 C7.99153646,12.4707031 8.11197917,12.5 8.2421875,12.5 Z" id=""></path></g></g></g></svg>';
$headline = $campaign[ $page_name . '_promo_hero_heading' ] ?? '';
$headline_size = $campaign[ $page_name . '_promo_hero_heading_size' ] ?? '';
$headline_weight = ! empty( $campaign[ $page_name . '_promo_hero_heading_weight' ] ) ? 'font-weight-' . $campaign[ $page_name . '_promo_hero_heading_weight' ] : '';
$headline_inline_styles = 'style="color: ' . esc_attr( $campaign[ $page_name . '_promo_hero_heading_colour' ] ) . ';"';
$description = $campaign[ $page_name . '_promo_hero_description' ] ?? '';
$description_size = $campaign[ $page_name . '_promo_hero_description_size' ] ?? '';
$description_weight = ! empty( $campaign[ $page_name . '_promo_hero_description_weight' ] ) ? 'font-weight-' . $campaign[ $page_name . '_promo_hero_description_weight' ] : '';
$description_inline_styles = 'style="color: ' . esc_attr( $campaign[ $page_name . '_promo_hero_description_colour' ] ) . ';"';
$description_2 = $campaign[ $page_name . '_promo_hero_description_2' ] ?? '';
$description_2_size = $campaign[ $page_name . '_promo_hero_description_2_size' ] ?? '';
$description_2_weight = ! empty( $campaign[ $page_name . '_promo_hero_description_2_weight' ] ) ? 'font-weight-' . $campaign[ $page_name . '_promo_hero_description_2_weight' ] : '';
$description_2_inline_styles = ! empty( $campaign[ $page_name . '_promo_hero_description_2_colour' ] ) ? 'style="color: ' . esc_attr( $campaign[ $page_name . '_promo_hero_description_2_colour' ] ) . ';"' : '';
$subtext = $campaign[ $page_name . '_promo_hero_subtext_link' ] ?? '';
$subtext_size = $campaign[ $page_name . '_promo_hero_subtext_size' ] ?? '';
$subtext_weight = ! empty( $campaign[ $page_name . '_promo_hero_subtext_weight' ] ) ? 'font-weight-' . $campaign[ $page_name . '_promo_hero_subtext_weight' ] : '';
$subtext_inline_styles = ! empty( $campaign[ $page_name . '_promo_hero_subtext_colour' ] ) ? 'style="color: ' . esc_attr( $campaign[ $page_name . '_promo_hero_subtext_colour' ] ) . ';"' : '';
$cta = $campaign[ $page_name . '_promo_hero_cta' ] ?? '';
$is_offer_details_link = $campaign['pricing_promo_hero_is_offer_details_a_link'];
$offer_details_link = $campaign['pricing_promo_hero_offer_details_link'] ?? '';
$offer_details_href = $is_offer_details_link && ! empty( $offer_details_link ) ? $offer_details_link['url'] : '#0';
$offer_details_text = $is_offer_details_link && ! empty( $offer_details_link ) ? $offer_details_link['title'] : __( 'See Offer Details', 'freshpress-website' );
$offer_details = $campaign['pricing_promo_hero_offer_details'] ?? '';
$offer_details_label_inline_styles = ! empty( $campaign['pricing_promo_hero_offer_details_label_colour'] ) ? 'style="color: ' . esc_attr( $campaign['pricing_promo_hero_offer_details_label_colour'] ) . ';"' : '';
$countdown_colour = $campaign[ $page_name . '_promo_hero_countdown_colour' ] ?? '';
$countdown_numbers_colour = $campaign[ $page_name . '_promo_hero_countdown_numbers_colour' ] ?? '';
$background_images = $campaign[ $page_name . '_promo_hero_background_images' ] ?? [];
$star_rating_image = fp_get_asset( 'images/rating/white-yellow.svg' );
$reviews_number = number_format_i18n( FP_Site_Options::get_option( 'getapp_reviews' ) );
// translators: ratings widget.
$rating_link = fp_noesc( fp_sprintf( __( '(Based on <a href="https://www.getapp.com/finance-accounting-software/a/freshbooks/" target="_blank" >%1$s GetApp reviews</a>)', 'freshpress-website' ), [ $reviews_number ] ) );

usort(
	$background_images,
	function( $a, $b ) {
		$breakpoint_a = 'custom' === $a['screen_size'] ? intval( $a['custom_breakpoint'] ) : intval( $a['screen_size'] );
		$breakpoint_b = 'custom' === $b['screen_size'] ? intval( $b['custom_breakpoint'] ) : intval( $b['screen_size'] );
		return $breakpoint_a <=> $breakpoint_b;
	}
);

$active_page = is_front_page() ? 'Homepage' : 'Pricing-Page';
$has_countdown = ! empty( $campaign['countdown_start_date'] ) && ! empty( $campaign['end_date'] );
$is_countdown_visible = $has_countdown && $is_campaign_active && $countdown_start_time < $current_time;
$is_pricing_without_countdown = 'Pricing-Page' === $active_page && ! $is_countdown_visible;

$label_partial = '';
if ( empty( $label ) && ! empty( $label_background ) ) {
	$label_partial = fp_render_img(
		$label_background,
		[
			'class' => 'promo-hero__lto is-img mb-2',
			'alt'   => __( 'Campaign Label', 'freshpress-website' ),
		]
	);
} else {
	$styles = fp_noesc( $label_inline_styles );
	$classes = esc_attr( empty( $label_background ) ? 'justify-content-md-start' : '' );
	$classes .= 'Homepage' === $active_page ? ' big ' . esc_attr( $description_size ) : ' mb-4';
	$classes .= ! $is_countdown_visible ? ' no-countdown' : '';
	$label_escaped = esc_html( $label );
	$label_partial = <<<HTML
		<span {$styles} class="promo-hero__lto d-flex justify-content-center align-items-center {$classes}">
			{$label_escaped}
		</span>
HTML;
}
?>
<style>
	<?php if ( ! empty( $background_images ) ) : ?>
		<?php foreach ( $background_images as $background_image ) : ?>
			<?php
				$screen_size = 'custom' === $background_image['screen_size'] ? $background_image['custom_breakpoint'] : $background_image['screen_size'];
				$image = ! empty( $background_image['background_image'] ) ? 'background-image: url( "' . esc_html( $background_image['background_image']['url'] ) . '" ); background-repeat: no-repeat;' : '';
				$background_colour = ! empty( $background_image['background_colour'] ) ? 'background-color: ' . esc_html( $background_image['background_colour'] ) . ';' : '';
				$background_size = 'background-size: ' . esc_html( $background_image['background_size'] ) . ';';
				$background_size  = ! empty( $background_image['custom_background_size'] ) ? 'background-size: ' . esc_html( $background_image['custom_background_size'] ) . ';' : $background_size;
				$background_position = 'background-position: ' . esc_html( $background_image['background_position'] ) . ';';
				$background_position  = ! empty( $background_image['custom_background_position'] ) ? 'background-position: ' . esc_html( $background_image['custom_background_position'] ) . ';' : $background_position;
				$max_width = ! empty( $background_image['max_width'] ) ? 'max-width: ' . esc_html( $background_image['max_width'] ) . '; margin-left: auto; margin-right: auto;' : '';
				$min_height = ! empty( $background_image['min_height'] ) ? 'min-height: ' . esc_html( $background_image['min_height'] ) . ';' : '';
			?>
			@media screen and ( min-width: <?= esc_html( $screen_size ); ?>px ) {
				<?= esc_html( $block_id_selector ); ?> {
					<?= fp_noesc( $image ); ?>
					<?= fp_noesc( $background_colour ); ?>
					<?= fp_noesc( $background_size ); ?>
					<?= fp_noesc( $background_position ); ?>
					<?= fp_noesc( $max_width ); ?>
					<?= fp_noesc( $min_height ); ?>
				}

				<?= esc_html( $block_id_selector ); ?> .reversed-corner div::before {
					box-shadow: -100px -100px 0 0 <?= fp_noesc( $background_image['background_colour'] ); ?>;
				}
			}
		<?php endforeach; ?>
	<?php endif; ?>
</style>
<?php if ( $include_top_banner && ! empty( $top_banner_text ) ) : ?>
	<div <?= fp_noesc( $top_banner_inline_styles ); ?> class="promo-hero__top-banner d-flex	justify-content-center align-items-center py-1 px-4 text-center">
		<?= fp_noesc( $top_banner_text ); ?>
	</div>
<?php endif; ?>
<div
	<?= fp_get_block_id( $block, true ); ?>
	class="<?= esc_attr( fp_get_block_classes( $class_name ) ) ?> d-none row p-0 my-0"
	data-has-countdown="false"
	data-show-countdown="<?= esc_html( $has_countdown ? 'true' : 'false' ); ?>"
	data-is-active-campaign="<?= esc_attr( $is_campaign_active ? 'true' : 'false' ); ?>"
>
	<div class="promo-hero__half_left d-flex justify-content-center pt-4 pt-lg-0 w-100 justify-content-md-start">
		<div <?= fp_noesc( $content_inline_styles ); ?> class="promo-hero__content d-flex flex-column justify-content-center align-items-center <?= $is_new_design ? 'position-relative mx-auto pt-5 px-4 p-md-5' : 'align-items-md-start h-100 pt-4 pb-5 py-md-0'; ?>">
			<?php if ( $include_mtd ) : ?>
				<div <?= fp_noesc( $mtd_inline_styles ); ?> class="promo-hero__icon-labels d-flex pb-md-3 mb-4 <?= esc_attr( is_front_page() ? 'mt-md-n4 mb-md-4' : 'mb-md-0' ); ?>">
					<span class="mr-4"><?= fp_noesc( $mtd_icon ); ?><?= esc_html( __( 'MTD COMPLAINT', 'freshpress-website' ) ); ?></span>
					<span><?= fp_noesc( $mtd_icon ); ?><?= esc_html( __( 'HMRC APPROVED', 'freshpress-website' ) ); ?></span>
				</div>
			<?php endif; ?>

			<?php if ( $is_pricing_without_countdown ) : ?>
				<?= fp_noesc( $label_partial ); ?>
			<?php endif; ?>

			<?php if ( ! empty( $headline ) ) : ?>
				<h1 <?= fp_noesc( $headline_inline_styles ); ?> class="promo-hero__header position-relative text-center <?= $is_new_design ? 'px-0 px-sm-3' : 'text-md-left my-0 w-100 px-4 px-md-0 ' . ( 'Pricing-Page' === $active_page ? 'mb-0 mx-auto ml-md-0' : 'mb-4 pb-2' ); ?> <?= esc_attr( $headline_size ); ?> <?= esc_attr( $headline_weight ); ?>">
					<?= fp_noesc( $headline ); ?>
				</h1>
			<?php endif; ?>

			<?php if ( 'Homepage' === $active_page ) : ?>
				<?= fp_noesc( $label_partial ); ?>
			<?php endif; ?>

			<?php if ( ! empty( $description ) ) : ?>
				<h2 <?= fp_noesc( $description_inline_styles ); ?> class="promo-hero__subheader w-100 text-center mx-auto <?= 'Pricing-Page' === $active_page && ! $is_countdown_visible ? 'mb-3' : ''; ?> <?= $is_new_design ?: 'text-md-left'; ?> <?= esc_attr( $description_size ); ?> <?= esc_attr( $description_weight ); ?>">
					<?= fp_noesc( $description ); ?>
				</h2>
			<?php endif; ?>
			<?php if ( ! empty( $description_2 ) ) : ?>
				<h3 <?= fp_noesc( $description_2_inline_styles ); ?> class="promo-hero__subheader_2 w-100 text-center mx-auto <?= $is_new_design ?: 'text-md-left'; ?> <?= esc_attr( $description_2_size ); ?> <?= esc_attr( $description_2_weight ); ?>">
					<?= fp_noesc( $description_2 ); ?>
				</h3>
			<?php endif; ?>
			<?php if ( ! empty( $subtext ) ) : ?>
				<a <?= fp_noesc( $subtext_inline_styles ); ?> href="<?= esc_attr( $subtext['url'] ); ?>" class="promo-hero__text w-100 text-center mt-2 mx-auto mb-4 <?= ! $is_countdown_visible && $is_new_design ? 'mb-lg-3' : 'mb-lg-0'; ?> <?= $is_new_design ?: 'text-md-left'; ?> <?= esc_attr( $subtext_size ); ?> <?= esc_attr( $subtext_weight ); ?>">
					<?= fp_noesc( $subtext['title'] ); ?>
				</a>
			<?php endif; ?>

			<div class="promo-hero__actions <?= 'Homepage' === $active_page ? 'flex-column' : ''; ?> w-100 <?= $is_new_design ?: 'py-2'; ?>">
				<!-- Countdown -->
				<?php if ( $has_countdown && $is_countdown_visible ) : ?>
					<?= fp_render_blocks(
						[
							'name'  => 'countdown-timer',
							'attrs' => [
								'className'        => 'mt-lg-3',
								'styled'           => true,
								'colour'           => $countdown_colour,
								'numbers_colour'   => $countdown_numbers_colour,
								'lto_label'        => $label,
								'lto_label_colour' => $label_colour,
								'lto_label_background_image' => $campaign[ $page_name . '_promo_hero_label_background_image' ] ?? '',
							],
						]
					); ?>
				<?php endif; ?>

				<!-- Links -->
				<div class="promo-hero__actions_links">
					<div class="promo-hero__actions_inner-wrap d-block d-md-inline-block">
						<?php if ( ! empty( $cta ) ) : ?>
							<a href="<?= esc_url( $cta['url'] ) ?>" class="promo-hero__actions_cta btn btn-cta-green mx-auto mx-md-0 d-block px-md-4 <?= ! $is_countdown_visible && 'Homepage' === $active_page ? 'no-countdown' : ''; ?>"><?= esc_html( $cta['title'] ); ?></a>
						<?php endif; ?>
					</div>
					<?php if ( ! is_front_page() && ! empty( $offer_details ) ) : ?>
					<div class="promo-hero__actions_inner-wrap d-block d-md-inline-block position-relative">
						<a href="<?= esc_attr( $offer_details_href ); ?>" <?= fp_noesc( $offer_details_label_inline_styles ); ?> class="promo-hero__actions_offer-link d-block px-2 <?= ! $is_offer_details_link ?: 'is-link' ?>"><?= esc_html( $offer_details_text ); ?></a>
						<?php if ( ! $is_offer_details_link ) : ?>
							<div class="promo-hero__actions_offer-details position-absolute text-left">
								<span><?= fp_noesc( $offer_details ); ?></span>
							</div>
						<?php endif; ?>
					</div>
					<?php endif; ?>
				</div>
			</div>
			<?php if ( $is_new_design ) : ?>
				<div class="promo-hero__rating d-flex align-items-center flex-wrap justify-content-center">
					<span class="promo-hero__rating-score"><?= esc_html( __( 'Excellent', 'freshpress-website' ) ); ?></span>
					<?= fp_render_img(
						$star_rating_image,
						[
							'class' => 'promo-hero__rating-stars',
							'alt'   => __( 'Star Rating', 'freshpress-website' ),
						]
					) ?>
					<span class="promo-hero__rating-getapp"><?= fp_noesc( $rating_link ); ?></span>
				</div>
			<?php endif; ?>
		</div>

		<?php if ( $is_new_design ) : ?>
			<div class="reversed-corner reversed-corner_down-right d-none d-lg-block"><div></div></div>
		<?php endif; ?>
	</div>
</div>
