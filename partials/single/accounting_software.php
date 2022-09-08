<?php
/**
 * Single template for Accounting Software.
 *
 * @package FreshPress\Website
 */

the_post();

?>

<div class="m-0">

	<?php the_content(); ?>
	<!-- Blue CTA bar -->
	<?= fp_render_blocks(
		[
			'name' => 'blue-cta-bar',
		],
	); ?>

</div>
