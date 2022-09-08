<?php
/**
 * Single template for API.
 *
 * @package FreshPress\Website
 */

$col_snippets_empty = empty( get_field( 'curl_snippets' ) ) && empty( get_field( 'python_snippets' ) ) && empty( get_field( 'php_snippets' ) );

fp_enqueue_template_assets( 'templates-single-api' );
?>

<div class="row api-single">
	<div class="col-12 col-lg-2 d-none d-lg-block p-0 border-right">
		<?php
		$terms = get_the_terms( get_the_ID(), 'api_category' );
		$args = [
			'taxonomy' => 'api_category',
		];
		$categories = get_categories( $args );
		$select_values = [];
		$current_url = get_permalink();
		if ( is_array( $terms ) ) {
			$current_category = $terms[0]->name;
		} else {
			$current_category = null;
		}
		?>
		<div class="api__menu-items">
			<?php foreach ( $categories as $category ) : ?>
				<?php if ( 'Setup' !== $category->name ) : ?>

					<div class="api__menu-section border-bottom">
						<?php
						$all_posts = get_posts(
							[
								'posts_per_page' => -1,
								'post_type'      => 'api',
								'tax_query'      => [
									[
										'taxonomy' => 'api_category',
										'field'    => 'term_id',
										'terms'    => $category->term_id,
									],
								],
							]
						);

						usort(
							$all_posts,
							function( $a, $b ) {
								return $a->menu_order <=> $b->menu_order;
							}
						);
						?>

						<a class="api__menu-section--title text-decoration-none d-flex align-items-center justify-content-between pl-4 pr-3 pt-3 <?= esc_attr( $current_category !== $category->name ? 'collapsed' : '' ); ?>">
							<span><?= esc_html( $category->name ) ?></span>
							<?= fp_inline_asset( 'images/icons/chevron-down.svg' ) ?>
						</a>

						<?php if ( ! empty( $all_posts ) ) : ?>
							<div class="api__menu-section--group py-2 <?= esc_attr( $current_category !== $category->name ? 'd-none' : '' ); ?>">
								<?php foreach ( $all_posts as $single ) : ?>
									<?php
									$single_url = get_permalink( $single->ID );
									$select_values[ $category->name ][] = [
										'title'  => $single->post_title,
										'url'    => esc_url( $single_url ),
										'active' => $single_url === $current_url,
									];
									?>
									<a class="api__menu-section--item d-block pl-5 pr-2 py-1" href="<?= esc_url( $single_url ) ?>">
										<span><?= esc_html( $single->post_title ) ?></span>
									</a>
								<?php endforeach; ?>
							</div>
						<?php endif; ?>
					</div>

				<?php endif; ?>
			<?php endforeach; ?>
		</div>
	</div>

	<?= fp_render_blocks(
		[
			'name'  => 'fpbk/related-links',
			'attrs' => [
				'className'        => 'col-12 d-block d-lg-none d-flex justify-content-center align-items-center',
				'links_type'       => 'predefined',
				'predefined_links' => $select_values,
				'select_layout'    => 'dropdown_list',
			],
		]
	) ?>

	<div class="col-content col-12<?= $col_snippets_empty ? ' offset-lg-2 col-lg-6' : ' col-lg-5' ?> p-4">
		<?php the_content(); ?>
	</div>

	<!-- Hide contents if no snippets, but keep for col-5 width. -->
	<div class="col-snippets col-12 col-lg-5 pt-0 px-3 px-lg-0 pb-5 m-0<?= $col_snippets_empty ? ' d-none' : '' ?>">
		<div class="snippets bg-dark">
			<div class="snippets__menu">
				<?php if ( ! empty( get_field( 'curl_snippets' ) ) ) : ?>
					<a class="snippets__menu-tab text-decoration-none d-inline-block px-3 pt-1 pb-2 active" data-target-tab="curl">
						curl
					</a>
				<?php endif; ?>
				<?php if ( ! empty( get_field( 'python_snippets' ) ) ) : ?>
					<a class="snippets__menu-tab text-decoration-none d-inline-block px-3 pt-1 pb-2" data-target-tab="python">
						Python
					</a>
				<?php endif; ?>
				<?php if ( ! empty( get_field( 'php_snippets' ) ) ) : ?>
					<a class="snippets__menu-tab text-decoration-none d-inline-block px-3 pt-1 pb-2" data-target-tab="php">
						PHP
					</a>
				<?php endif; ?>
			</div>

			<div class="snippets__wrapper p-3">
				<?php
				$curl_snippets = get_field( 'curl_snippets' );
				?>
				<?php if ( ! empty( $curl_snippets ) ) : ?>
					<div class="snippets__tab-content" data-tab="curl">
						<?php foreach ( $curl_snippets as $key => $curl ) : ?>
							<h4 class="snippets__title <?= 0 === $key ? '' : 'pt-5' ?>"><?= esc_html( $curl['title'] ) ?></h4>
							<?= fp_render_blocks(
								[
									'name'  => 'code-snippet',
									'attrs' => [
										'className' => 'my-0 p-3',
										'data'      => [
											'snippet' => $curl['snippet_code'],
										],
									],
								]
							); ?>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>

				<?php
				$python_snippets = get_field( 'python_snippets' );
				?>
				<?php if ( ! empty( $python_snippets ) ) : ?>
					<div class="snippets__tab-content d-none" data-tab="python">
						<?php foreach ( $python_snippets as $key => $python ) : ?>
							<h4 class="snippets__title <?= 0 === $key ? '' : 'pt-5' ?>"><?= esc_html( $python['title'] ) ?></h4>
							<?= fp_render_blocks(
								[
									'name'  => 'code-snippet',
									'attrs' => [
										'className' => 'my-0 p-3',
										'data'      => [
											'snippet' => $python['snippet_code'],
										],
									],
								]
							); ?>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>

				<?php
				$php_snippets = get_field( 'php_snippets' );
				?>
				<?php if ( ! empty( get_field( 'php_snippets' ) ) ) : ?>
					<div class="snippets__tab-content d-none" data-tab="php">
						<?php foreach ( get_field( 'php_snippets' ) as $php ) : ?>
							<h4 class="snippets__title"><?= esc_html( $php['title'] ) ?></h4>
							<?= fp_render_blocks(
								[
									'name'  => 'code-snippet',
									'attrs' => [
										'className' => 'my-0 p-3',
										'data'      => [
											'snippet' => $php['snippet_code'],
										],
									],
								]
							); ?>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>
