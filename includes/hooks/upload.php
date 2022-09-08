<?php
/**
 * Filter and action handlers for file upload.
 *
 * @package FreshPress\Website
 */

/**
 * Value to convert between megabytes to bytes.
 */
const FP_MEGABYTES_TO_BYTES = 1024 * 1024;

/**
 * Limits images filesize.
 *
 * @param array $file File metadata.
 *
 * @return array
 */
function fp_limit_images_upload_size( $file ) {
	$image_upload_max_size = 5 * FP_MEGABYTES_TO_BYTES;

	if ( strpos( $file['type'], 'image' ) !== false && $file['size'] > $image_upload_max_size ) {
		// translators: %s is max file size.
		$file['error'] = fp_sprintf( _x( 'File is too big. It should be smaller than %s MB', 'File size limit error message', 'freshpress-website' ), [ number_format( $image_upload_max_size / FP_MEGABYTES_TO_BYTES ) ] );
	}

	return $file;
}

add_filter( 'wp_handle_upload_prefilter', 'fp_limit_images_upload_size' );
