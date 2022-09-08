<?php
/**
 * Template Name: No Header/Footer
 *
 * @package FreshPress\Website
 */

get_header( '', [ 'no-header' => true ] );
get_template_part( 'partials/content' );
get_footer( '', [ 'no-footer' => true ] );
