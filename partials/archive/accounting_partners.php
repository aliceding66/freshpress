<?php
/**
 * Archive template for Accounting Partners.
 *
 * @package FreshPress\Website
 */

$ap_page = get_page_by_path( 'accounting-partners', OBJECT, 'page' );
$ap_content = get_post( $ap_page->ID );
$ap_blocks = parse_blocks( $ap_content->post_content );
$split_url = [];
if ( isset( $_SERVER['REQUEST_URI'] ) ) {
	$split_url = explode( '/', esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
}
if ( ! empty( $ap_blocks ) ) :
	foreach ( $ap_blocks as $ap_block ) {
		if ( count( $split_url ) < 4 || 'page' == $split_url[2] ) {
			if ( 'acf/accounting-partners-hero' == $ap_block['blockName'] ) {
				echo fp_render_blocks(
					[
						'name'  => 'accounting-partners-hero',
						'attrs' => [
							'data' => $ap_block['attrs']['data'],
						],
					],
				);
			}
		} else {
			if ( 'acf/accounting-partners-hero-service-location' == $ap_block['blockName'] ) {
				$location_str = $split_url[3];
				$location_term = get_term_by( 'slug', $location_str, 'accounting_partners_location' ); ?>

				<div class="accounting-partners__top">
					<div class="accounting-partners__breadcrumbs">
						<div class="col-md-12 text-left text-sm-center text-lg-left">
							<?php
							$ac_terms = [];
							$city = $location_term;
							$state = '';
							if ( false !== $city && $city->parent ) {
								$state = get_term( $city->parent, 'accounting_partners_location' );
							}
							$country = '';
							if ( '' != $state && $state->parent ) {
								$country = get_term( $state->parent, 'accounting_partners_location' );
							}
							if ( ! is_wp_error( $country ) && '' != $country ) {
								$ac_terms[] = $country;
							}
							if ( ! is_wp_error( $state ) && '' != $state ) {
								$ac_terms[] = $state;
							}
							if ( ! is_wp_error( $city ) && '' != $city ) {
								$ac_terms[] = $city;
							}

							if ( ! empty( $ac_terms ) ) {
								echo '<a href="' . esc_url( site_url() ) . '/accounting-partners">' . esc_html( __( 'Home', 'freshpress-website' ) ) . '</a><span class="accounting-partners__breadcrumbs-divider">/</span>';
								foreach ( $ac_terms as $i => $ac_term ) {
									$flag = $i < count( $ac_terms ) - 1;
									if ( $flag ) {
										echo '<a href="' . esc_url( site_url() . '/accounting-partners/location/' . $ac_term->slug ) . '">' . esc_html( $ac_term->name ) . '</a>';
									} else {
										echo esc_html( $ac_term->name );
									}
									if ( $flag ) {
										echo '<span class="accounting-partners__breadcrumbs-divider">/</span>';
									}
								}
							}
							?>
						</div>
					</div>
				</div>
				<?php
				if ( 'location' == $split_url[2] ) {
					$fields = [
						'accounting-partners-hero-service-location-service-location_certified',
						'_accounting-partners-hero-service-location-service-location_certified',
						'accounting-partners-hero-service-location-service-location_title_1',
						'_accounting-partners-hero-service-location-service-location_title_1',
						'accounting-partners-hero-service-location-service-location_title_2',
						'_accounting-partners-hero-service-location-service-location_title_2',
						'accounting-partners-hero-service-location-service-location_title_3',
						'_accounting-partners-hero-service-location-service-location_title_3',
						'accounting-partners-hero-service-location-service-location_description',
						'_accounting-partners-hero-service-location-service-location_description',
					];

					$location_attr = [];
					$flag = false;
					$count = 1;
					foreach ( $fields as $field ) :
						if ( get_field( $field, $location_term ) && $count % 2 ) {
							$location_attr[ $field ] = get_field( $field, $location_term );
							$flag = true;
						}
						if ( ! empty( get_term_meta( $location_term->term_id, $field ) ) && $flag && 0 == $count % 2 ) {
							$location_attr[ $field ] = get_term_meta( $location_term->term_id, $field )[0];
							$flag = false;
						}
						$count++;
					endforeach;
					if ( empty( $location_attr ) ) {
						$location_attr = $ap_block['attrs']['data'];
					} else {
						$location_attr['block_settings_wide_block'] = 0;
					}
				} else {
					$location_attr = $ap_block['attrs']['data'];
				}

				echo fp_render_blocks(
					[
						'name'  => 'accounting-partners-hero-service-location',
						'attrs' => [
							'data' => $location_attr,
						],
					],
				);
			}
		}
	}
endif;

?>

<div class="accounting-partners-filter-wrapper">
	<div class="accounting-partners-filter">
		<div class="accounting-partners-filter__container">
			<button class="d-block d-md-none accounting-partners-filter__label"><?= esc_html( __( 'I am looking for', 'freshpress-website' ) ); ?></button>

			<?php
			$service = get_terms(
				[
					'taxonomy'   => 'accounting_partners_service',
					'hide_empty' => true,
				]
			);
			$industry = get_terms(
				[
					'taxonomy'   => 'accounting_partners_industry',
					'hide_empty' => true,
				]
			);
			$language = get_terms(
				[
					'taxonomy'   => 'accounting_partners_language',
					'hide_empty' => true,
				]
			);
			$location = get_terms(
				[
					'taxonomy'   => 'accounting_partners_location',
					'hide_empty' => true,
				]
			);
			$accounting_partners_service = get_taxonomy( 'accounting_partners_service' );
			$accounting_partners_industry = get_taxonomy( 'accounting_partners_industry' );
			$accounting_partners_language = get_taxonomy( 'accounting_partners_language' );
			$accounting_partners_location = get_taxonomy( 'accounting_partners_location' );

			$tax_array = [ [ $accounting_partners_service, $service ], [ $accounting_partners_industry, $industry ], [ $accounting_partners_language, $language ] ];
			?>

			<div class="accounting-partners-filter__select">
				<span class="accounting-partners-filter__label"><?= esc_html( __( 'I am looking for', 'freshpress-website' ) ); ?></span>
				<?php
				foreach ( $tax_array as $acct_taxs ) {
					echo '<button class="accounting-partners-filter__button">' . esc_html( $acct_taxs[0]->labels->name ) . '</button>';
					echo '<div class="accounting-partners-filter__options" id="' . esc_attr( $acct_taxs[0]->name ) . '">';
					foreach ( $acct_taxs[1] as $acct_tax ) {
						echo '<button class="accounting-partners-filter__term" data-id="' . esc_attr( $acct_tax->term_id ) . '" data-slug="' . esc_attr( $acct_tax->slug ) . '"><span class="accounting-partners-filter__term-name">' . esc_html( $acct_tax->name ) . '</span><span class="accounting-partners-filter__term_gray">(' . esc_html( $acct_tax->count ) . ')</span></button>';
					}
					echo '</div>';
				}
				?>
				<span class="accounting-partners-filter__location">
					<button class="accounting-partners-filter__button accounting-partners-filter__button_location"><?= esc_html( $accounting_partners_location->labels->singular_name ) ?></button>
					<input type="text" class="accounting-partners-filter__location-input" placeholder="<?= esc_attr( 'Search near you' ); ?>" aria-label="<?= esc_attr( 'Search near you' ); ?>" autocomplete="off">
					<button class="accounting-partners-filter__location-submit"><span class="sr-only"><?= esc_html( __( 'Submit Search by location', 'freshpress-website' ) ); ?></span></button>
				</span>
				<div class="d-flex w-100 fixed-bottom d-md-none accounting-partners-filter__trigger">
					<button class="btn-cta-green btn accounting-partners-filter__trigger-button"><?= esc_html( __( 'Search', 'freshpress-website' ) ); ?></button>
				</div>
			</div>
		</div>
	</div>

	<div class="accounting-partners-filter-elements"></div>
	<div class="accounting-partners-content">
		<div class="accounting-partners-content__container">
			<?php
			$page_number = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
			if ( count( $split_url ) > 4 ) {
				if ( 'page' == $split_url[4] ) {
					$page_number = $split_url[5];
				}
			}
			$args = [
				'post_type'   => 'accounting_partners',
				'post_status' => 'publish',
				'paged'       => $page_number,
			];
			if ( count( $split_url ) >= 4 ) {
				if ( 'location' == $split_url[2] ) {
					$args['tax_query'] = [
						[
							'taxonomy' => 'accounting_partners_location',
							'field'    => 'slug',
							'terms'    => $split_url[3],
						],
					];
				} elseif ( 'page' != $split_url[2] || ( isset( $split_url[4] ) && 'page' != $split_url[4] ) ) {
					$args['tax_query'] = [
						'relation' => 'AND',
						[
							'taxonomy' => 'accounting_partners_service',
							'field'    => 'slug',
							'terms'    => $split_url[2],
						],
						[
							'taxonomy' => 'accounting_partners_location',
							'field'    => 'slug',
							'terms'    => $split_url[3],
						],
					];
				}
			}

			$the_query = new WP_Query( $args );

			if ( $the_query->have_posts() ) :

				$mid_size = 2;
				$end_size = 3;
				if ( wp_is_mobile() ) {
					$mid_size = 1;
					$end_size = 2;
				}
				$count = 0;

				$post_count = $the_query->post_count;
				while ( $the_query->have_posts() ) :
					$the_query->the_post();
					?>

					<div class="accounting-partners-content__single">
						<div class="accounting-partners-content__profile-image">
							<a href="<?= esc_url( get_the_permalink() ); ?>">
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
							</a>
						</div>
						<div class="accounting-partners-content__profile-info">
							<h2><a href="<?= esc_url( get_the_permalink() ); ?>"><?= esc_html( get_the_title() ); ?></a></h2>
							<address><?= esc_html( get_field( 'am_address' ) ); ?></address>
							<div class="accounting-partners-content__description">
								<?= esc_html( wp_trim_words( get_field( 'am_about' ), 35, '...' ) ); ?>
							</div>
							<div class="accounting-partners-content__terms">
								<?php
								$ac_terms = get_the_terms( get_the_ID(), 'accounting_partners_service' );
								foreach ( $ac_terms as $ac_term ) {
									echo '<span class="accounting-partners-content__term">' . esc_html( $ac_term->name ) . '</span>';
								}
								?>
							</div>
						</div>
						<a href="<?= esc_url( get_the_permalink() ); ?>" class="accounting-partners-content__button">
							<?= esc_html( __( 'View Profile', 'freshpress-website' ) ); ?>
						</a>
					</div>

					<?php
					if ( ( 5 >= $post_count && ( $count + 1 ) == $post_count ) || 4 == $count && ! empty( $ap_blocks ) ) :
						foreach ( $ap_blocks as $ap_block ) {
							if ( 'acf/accounting-partners-cta' == $ap_block['blockName'] ) {
								echo fp_render_blocks(
									[
										'name'  => 'accounting-partners-cta',
										'attrs' => [
											'data' => $ap_block['attrs']['data'],
										],
									],
								);
							}
						}
					endif;
					?>

					<?php
					$count++;
				endwhile;
				echo '<nav class="navigation accounting-partners-content__pagination">';
				$pag_args = [
					'base'      => str_replace( 999999999, '%#%', esc_url( get_pagenum_link( 999999999 ) ) ),
					'format'    => '?paged=%#%',
					'current'   => max( 1, $page_number ),
					'total'     => $the_query->max_num_pages,
					'prev_text' => 'Previous',
					'next_text' => 'Next',
					'mid_size'  => $mid_size,
					'end_size'  => $end_size,
				];
				echo fp_noesc( paginate_links( $pag_args ) );
				echo '</nav>';
				wp_reset_postdata();
			else :
				if ( ! empty( $ap_blocks ) ) {
					foreach ( $ap_blocks as $ap_block ) {
						if ( isset( $ap_block['attrs']['className'] ) && 'no-results' == $ap_block['attrs']['className'] ) {
							$no_results = '';
							foreach ( $ap_block['innerBlocks'] as $element ) {
								$no_results .= $element['innerHTML'];
							}
							echo fp_noesc( $no_results );
						}
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
		if ( 'fpbk/faq' == $ap_block['blockName'] ) {
			$location_str = '';
			if ( count( $split_url ) >= 4 ) {
				$location_str = $split_url[3];
			}
			$location_term = get_term_by( 'slug', $location_str, 'accounting_partners_location' );

			$fields = [ 'layout', 'headline', 'questions_and_answers' ];
			$faq_attr = [];
			$flag = false;
			foreach ( $fields as $field ) :
				if ( get_field( $field, $location_term ) ) {
					if ( 'layout' != $field ) {
						$flag = true;
					}
					$faq_attr[ $field ] = get_field( $field, $location_term );
				}
			endforeach;

			if ( ! $flag ) {
				$faq_attr = $ap_block['attrs'];
			}
			echo fp_render_blocks(
				[
					'name'  => 'fpbk/faq',
					'attrs' => [
						'data' => $faq_attr,
					],
				],
			);
		}
		if ( 'fpbk/new-cta-bar' == $ap_block['blockName'] && 0 == $count_block ) {
			echo fp_render_blocks(
				[
					'name'    => 'fpbk/new-cta-bar',
					'attrs'   => $ap_block['attrs'],
					'content' => array_map(
						function( $inner_block ) {
							return $inner_block['innerContent'];
						},
						$ap_block['innerBlocks']
					),
				]
			);
			$count_block++;
		}
	}
endif;
?>
