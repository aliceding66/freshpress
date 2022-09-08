<?php
/**
 * GalleryCarousel block.
 *
 * @package FreshPress\GalleryCarousel
 * @subpackage GalleryCarousel
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_gallery_carousel_block_init() {
	$block = new \FreshpressBlocks\GalleryCarouselBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_gallery_carousel_block_init' );
