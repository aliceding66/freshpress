<?php
/**
 * Core content template partial for FreshPress Website theme.
 *
 * @package FreshPress\Website
 */

if ( have_posts() ) {
	while ( have_posts() ) {
		the_post();
		the_content();
	}
} else {
	the_content();
}
