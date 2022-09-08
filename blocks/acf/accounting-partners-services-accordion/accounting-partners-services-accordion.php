<?php
/**
 * Accounting Partners Services Accordion template.
 *
 * @package FreshPress\Website
 */

$services = get_terms( 'accounting_partners_service' );
$locations = get_terms( 'accounting_partners_location' );

$us_id = get_term_by( 'slug', 'us', 'accounting_partners_location' );
$canada_id = get_term_by( 'slug', 'canada', 'accounting_partners_location' );
$us_states = [];
$us_cities = [];
$canadian_provinces = [];
$canadian_cities = [];
foreach ( $locations as $location ) {
	if ( $location->parent == $us_id->term_id ) {
		$us_states[] = $location;
	}
	if ( $location->parent == $canada_id->term_id ) {
		$canadian_provinces[] = $location;
	}
}
foreach ( $locations as $location ) {
	foreach ( $us_states as $us_state ) {
		if ( $location->parent == $us_state->term_id ) {
			$us_cities[] = $location;
		}
	}
	foreach ( $canadian_provinces as $canadian_province ) {
		if ( $location->parent == $canadian_province->term_id ) {
			$canadian_cities[] = $location;
		}
	}
}

$us_states_obj = new stdClass();
$us_states_obj->name = __( 'US States', 'freshpress-website' );
$us_states_obj->group = $us_states;
$us_cities_obj = new stdClass();
$us_cities_obj->name = __( 'US Cities', 'freshpress-website' );
$us_cities_obj->group = $us_cities;
$canadian_provinces_obj = new stdClass();
$canadian_provinces_obj->name = __( 'Canadian Provinces', 'freshpress-website' );
$canadian_provinces_obj->group = $canadian_provinces;
$canadian_cities_obj = new stdClass();
$canadian_cities_obj->name = __( 'Canadian Cities', 'freshpress-website' );
$canadian_cities_obj->group = $canadian_cities;
$location_columns = [ $us_states_obj, $us_cities_obj, $canadian_provinces_obj, $canadian_cities_obj ];

?>

<div <?= fp_get_block_id( $block, true ); ?> class="<?= esc_attr( fp_get_block_classes( 'accounting-partners-services-accordion' ) ); ?>">
	<h2 class="accounting-partners-services-accordion__heading"><?= esc_html( __( 'Services', 'freshpress-website' ) ); ?></h2>
	<div class="accounting-partners-services-accordion__parent">
		<?php foreach ( $services as $service ) : ?>
			<div class="accounting-partners-services-accordion__item">
				<div class="accounting-partners-services-accordion__header">
					<button class="accounting-partners-services-accordion__open-body">
						<h3><?= esc_html( $service->name ); ?></h3>
					</button>
				</div>
				<div class="accounting-partners-services-accordion__body">
					<div class="accounting-partners-services-accordion__content">
						<div class="row">
							<?php foreach ( $location_columns as $location_col ) : ?>
								<div class="col-6 col-md-3">
									<h4><?= esc_html( $location_col->name ); ?></h4>
									<ul>
										<?php
										$count = 0;
										foreach ( $location_col->group as $location ) :
											$has_post = fp_fetch_posts_by_common_term_slugs( [ $service->slug, $location->slug ] );

											if ( ! empty( $has_post ) ) :
												if ( 10 == $count ) :
													?>
									</ul>
									<button class="accounting-partners-services-accordion__button-show"><?= esc_html( __( 'View all ', 'freshpress-website' ) ) . esc_html( $location_col->name ); ?> <span class="accounting-partners-services-accordion__button-show_green">+</span></button>
									<div class="accounting-partners-services-accordion__hidden">
										<ul>
										<?php endif; ?>
												<?php if ( ! empty( $has_post ) ) : ?>
											<li><a href="<?= esc_url( site_url() . '/accounting-partners/' . $service->slug . '/' . $location->slug ); ?>"><?= esc_html( $location->name ); ?></a></li>
													<?php $count++; ?>
										<?php endif; ?>
									<?php endif; ?>
								<?php endforeach; ?>
								<?php if ( $count < 11 ) : ?>
										</ul>
									<?php else : ?>
										</ul>
									</div>
									</ul>
								<?php endif; ?>
								</div>
							<?php endforeach; ?>
						</div>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>
