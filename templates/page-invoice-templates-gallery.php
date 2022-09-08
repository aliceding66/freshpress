<?php
/**
 * Template Name: Invoice Templates Gallery
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-page-invoice-templates-gallery' );

get_header();

$categories = get_terms(
	[
		'taxonomy'   => 'invoice_template_category',
		'hide_empty' => true,
	]
);

$cat_query = isset( $_GET['template_category'] ) ? sanitize_text_field( wp_unslash( $_GET['template_category'] ) ) : 'all';
$search_query = isset( $_GET['search'] ) ? sanitize_text_field( wp_unslash( $_GET['search'] ) ) : '';

$args = [
	'post_type'      => 'invoice_template',
	'posts_per_page' => -1,
	'post_status'    => 'publish',
	'orderby'        => 'title',
	'order'          => 'ASC',
	'tax_query'      => [],
	's'              => $search_query,
];

if ( 'all' !== $cat_query ) {
	$args['tax_query'][] = [
		'taxonomy' => 'invoice_template_category',
		'field'    => 'id',
		'terms'    => [ $cat_query ],
	];
}

$posts_query = new WP_Query( $args );
$posts_found = $posts_query->get_posts();

$inv_templates = [];
$pagex_count = 0;
$available_file_acf = [];

if ( ! empty( $posts_found ) ) {
	foreach ( $posts_found as $invoice_template_post ) {
		$templates = get_field( 'download_templates', $invoice_template_post->ID );

		if ( ! empty( $templates ) ) {
			$post_permalink = get_permalink( $invoice_template_post->ID );

			foreach ( $templates as $template ) {
				if ( 'Invoice with FreshBooks' !== $template['title'] ) {
					$template['permalink'] = $post_permalink;
					$inv_templates[] = $template;
				}
			}
		}
	}
	$available_file_acf = array_keys( get_field_object( 'download_templates', $posts_found[0]->ID )['value'][0]['download_links'] );
	array_shift( $available_file_acf );
}

// Create sample template with signup links.
$sample_template = [
	[
		'is_premium' => true,
		'title'      => __( 'Invoice with FreshBooks', 'freshpress-website' ),
		'image'      => [
			'ID'  => 120265,
			'url' => wp_get_attachment_image_url( 120265, 'full' ),
			'alt' => __( 'Sample Invoice', 'freshpress-website' ),
		],
		'cta_btn'    => [
			'title' => __( 'Create My Free Invoice', 'freshpress-website' ),
			'url'   => '/signup',
		],
		'permalink'  => '/signup',
	],
];


// Insert sample template on every 4th spot in the array of the templates.
if ( ! empty( $inv_templates ) ) {
	$inv_templates_count = count( $inv_templates );
	for ( $i = 1; $i <= $inv_templates_count; $i++ ) {
		if ( 0 === $i % 4 ) {
			array_splice( $inv_templates, $i - 1, 0, $sample_template );
		}
	}

	$pagex_count = ceil( count( $inv_templates ) / 6 );
}

?>
<?= fp_render_blocks(
	[
		'name'  => 'hero',
		'attrs' => [
			'block_settings_tracking_section' => 'invoice-templates-gallery-hero',
			'className'                       => 'my-0',
			'hero_content_max_width'          => '645px',
			'headline'                        => __( 'Additional Free Invoice Template Styles and Formats', 'freshpress-website' ),
			'images'                          => [
				[
					'screen_size'         => 'xs',
					'display_image'       => false,
					'background_color'    => [ 'hex' => '#e5f4fe' ],
					'background_size'     => 'cover',
					'background_position' => 'center',
				],
			],
		],
	],
); ?>
<div class="invoice-gallery-navbar row d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between py-4 px-3 px-lg-5 px-xl-7">
	<ul class="invoice-gallery-navbar__categories d-none d-lg-flex align-items-center m-0 p-0">
		<li class="mb-0 mr-4"><a class="position-relative <?= esc_attr( 'all' === $cat_query || empty( $cat_query ) ? 'active' : '' ); ?>" href="<?= esc_url( get_permalink() . '?template_category=all' ); ?>"><?= esc_html( __( 'All', 'freshpress-website' ) ); ?></a></li>
		<?php foreach ( $categories as $category ) : ?>
			<li class="mb-0 mr-4"><a class="position-relative <?= esc_attr( strval( $category->term_id ) === $cat_query ? 'active' : '' ); ?>" href="<?= esc_url( get_permalink() . '?template_category=' . $category->term_id ); ?>"><?= esc_html( $category->name ); ?></a></li>
		<?php endforeach; ?>
	</ul>
	<div class="invoice-gallery-navbar__select-container d-lg-none mb-3">
		<select aria-label="<?= esc_attr( __( 'Select Invoice Templates Category', 'freshpress-website' ) ); ?>" name="invoice-gallery-select" id="invoice-gallery-select">
			<option value="all" <?= esc_attr( 'all' === $cat_query || empty( $cat_query ) ? 'selected' : '' ); ?>><?= esc_html( __( 'All', 'freshpress-website' ) ); ?></option>
			<?php foreach ( $categories as $category ) : ?>
				<option value="<?= esc_attr( $category->term_id ); ?>" <?= esc_attr( strval( $category->term_id ) === $cat_query ? 'selected' : '' ); ?>><?= esc_html( $category->name ); ?></option>
			<?php endforeach; ?>
		</select>
	</div>
	<div class="invoice-gallery-navbar__search-container">
		<form class="search-form" action="<?= esc_url( get_permalink() ); ?>">
			<input type="hidden" name="template_category" value="all" />
			<input class="invoice-gallery-navbar__search-input" type="text" name="search" placeholder="<?= esc_attr( __( 'Search for an invoice', 'freshpress-website' ) ); ?>" value="<?= esc_attr( $search_query ) ?>">
		</form>
	</div>
</div>

<div class="invoice-gallery row px-sm-4 px-md-5 px-lg-6 mt-4">
	<?php foreach ( $inv_templates as $index => $inv_template ) : ?>
		<div class="invoice-gallery__item col-12 col-sm-6 col-lg-4 px-5 py-4 mb-3 <?= esc_attr( $inv_template['is_premium'] ? 'with-bg rounded ' : '' ) . esc_attr( $index > 5 ? 'd-none' : '' ); ?>">
			<a href="<?= esc_attr( $inv_template['permalink'] ) ?>">
				<h3 class="invoice-gallery__item-heading text-center text-primary mb-3 mt-3"><?= fp_noesc( $inv_template['title'] ) ?></h3>
			</a>
			<?= fp_render_img(
				$inv_template['image'],
				[
					'class' => 'w-100 h-auto',
				]
			) ?>
			<?php if ( $inv_template['is_premium'] ) : ?>
				<a class="btn btn-cta-green w-100 py-3 mt-3" href="<?= esc_url( $inv_template['cta_btn']['url'] ); ?>"><?= esc_html( $inv_template['cta_btn']['title'] ); ?></a>
			<?php else : ?>
				<?php
				$files = [];

				foreach ( $available_file_acf as $available_file ) {
					if ( ! empty( $inv_template['download_links'][ $available_file ] ) ) {
						$files[] = [
							'download_type' => 'url',
							'url'           => $inv_template['download_links'][ $available_file ],
						];
					}
				}
				?>
				<?= fp_render_blocks(
					[
						'name'  => 'file-download',
						'attrs' => [
							'className' => 'mt-3 d-flex justify-content-center',
							'data'      => [
								'file_download_files' => $files,
							],
						],
					],
				); ?>
			<?php endif; ?>
		</div>
	<?php endforeach; ?>
</div>

<?php if ( $pagex_count > 1 ) : ?>
<div class="invoice-gallery-pagination d-flex align-items-center justify-content-center mt-5">
	<div id="nav-arrow-left" class="invoice-gallery-pagination__arrow invoice-gallery-pagination__arrow_left d-flex justify-content-center align-items-center mb-2"></div>
	<ul class="invoice-gallery-pagination__list d-flex flex-wrap justify-content-center mb-0 p-0" data-pages="<?= esc_attr( $pagex_count ); ?>"></ul>
	<div id="nav-arrow-right" class="invoice-gallery-pagination__arrow invoice-gallery-pagination__arrow_right d-flex justify-content-center align-items-center active mb-2"></div>
</div>
<?php endif; ?>

<!-- CTA Banner -->
<style>
@media (max-width:480px){
	.cta-banner .l-50 {
		left: 0vw !important;
		min-width: 30vw;
		padding: 0;
	}
}	
@media (max-width:320px){
	.cta-banner .btn-midnight-blue {
		font-size: 11px !important;
	}
}
</style>
<?= fp_render_blocks(
	[
		'name'  => 'cta-banner',
		'attrs' => [
			'align'     => 'center',
			'heading'   => __( 'Tailored Resources <br>Right to Your Inbox', 'freshpress-website' ),
			'className' => 'mb-5',
		],
	]
); ?>

<?php
	get_footer();
?>
