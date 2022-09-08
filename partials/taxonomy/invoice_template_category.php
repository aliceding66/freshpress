<?php
/**
 * Taxonomy template for Invoice Template Categories.
 *
 * @package FreshPress\Website
 */

$queried_object = get_queried_object();

if ( is_tax( 'invoice_template_category' ) && $queried_object instanceof WP_Term ) {
	$category = $queried_object;

	$archive_url = fp_get_post_type_archive_link( 'invoice_template', 'invoice-templates' );
	$category = fp_get_primary_term( 'invoice_template_category' );
	$category_url = get_term_link( $category, 'invoice_template_category' );

	$category_fields = $category->taxonomy . '_' . $category->term_id;
	$category_image = get_field( 'image', $category_fields );
	$category_colour = get_field( 'colour', $category_fields );
} else {
	get_template_part( 'partials/content' );
}
?>

<style>
	.max780 {
		width: 100%;
		max-width: 780px;
	}

	.box__category {
		cursor: pointer;
	}

	.box.box__category.box__category--<?= esc_html( $category->term_id ) ?> {
		border-top: 10px solid <?= esc_html( $category_colour ) ?>;
	}
</style>

<?php
$cards = [];
while ( have_posts() ) :
	the_post();
	$cards[] = [
		'name'    => 'fpbk/column',
		'attrs'   => [
			'bootstrap_class' => 'col-12 col-md-6 col-lg-4',
			'className'       => 'mb-5',
		],
		'content' => [
			'name'    => 'fpbk/boxes',
			'attrs'   => [
				'className' => 'box__category box__category--' . esc_html( $category->term_id ) . ' text-center py-5',
			],
			'content' => [
				[
					'name'    => 'core/heading',
					'content' => '<h3 class="justify-self-center align-self-center my-5" data-url="' . get_permalink( get_post()->ID ) . '">' . get_the_title() . '</h3>',
				],
			],
		],
	];
endwhile;
?>

<?= fp_render_blocks(
	[
		'name'    => 'fpbk/columns',
		'attrs'   => [
			'className'          => 'justify-content-center',
			'data-column-layout' => 'equal',
		],
		'content' => $cards,
	]
) ?>

<script>
	const categoryCards = document.querySelectorAll( '.box__category' );
	categoryCards.forEach( ( card ) => {
		card.addEventListener( 'click', () => {
			const url = card.querySelector( 'h3' ).getAttribute( 'data-url' );
			window.location.href = url;
		} );
	} );
</script>
