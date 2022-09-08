<?php
/**
 * Helper functions for assets.
 *
 * @package FreshPress\Website
 */

define( 'FP_SUFFIX_JOINT', '#' );
define( 'FP_SUFFIX_ASSET_DEFER', 'defer' );
define( 'FP_SUFFIX_ASSET_ASYNC', 'async' );

/**
 * Gets the contents of the asset manifest.
 *
 * @return array Manifest content or [] if no manifest.
 */
function fp_get_manifest() {
	global $asset_manifest;

	if ( empty( $asset_manifest ) ) {
		$manifest_location = get_stylesheet_directory() . '/dist/manifest.json';
		$asset_manifest = null;

		$manifest_data = fp_read_file( $manifest_location );
		if ( ! empty( $manifest_data ) ) {
			$asset_manifest = json_decode( $manifest_data, true );
		}
		$asset_manifest = $asset_manifest ? $asset_manifest : [];

	}

	return $asset_manifest;
}

/**
 * Gets the contents of the script dependencies.
 *
 * @return array Script dependencies or [] if no data found.
 */
function fp_get_script_dependencies() {
	global $script_dependencies;

	if ( empty( $script_dependencies ) ) {
		$script_dependencies_location = get_stylesheet_directory() . '/dist/script_dependencies.json';
		$script_dependencies = null;

		$script_dependencies_data = fp_read_file( $script_dependencies_location );
		if ( ! empty( $script_dependencies_data ) ) {
			$script_dependencies = json_decode( $script_dependencies_data, true );
		}
		$script_dependencies = $script_dependencies ?: [];

	}

	return $script_dependencies;
}

/**
 * Get asset from manifest as URI.
 *
 * @param string $asset_path Filename of the asset (with path relative to assets folder).
 * @param string $asset_suffix Optional suffix that can be added to asset (to control if asset should be eg. async).
 *
 * @return string
 */
function fp_get_asset( $asset_path = '', $asset_suffix = '' ) {
	$manifest = fp_get_manifest();

	// Get asset path from manifest.
	if ( fp_asset_exists( $asset_path ) ) {
		$real_asset_path = $manifest[ $asset_path ];
	} else {
		$real_asset_path = $asset_path;
	}

	// Output correct URI based on relative or absolute path provided.
	if ( substr( $real_asset_path, 0, 1 ) !== '/' ) {
		$full_asset_path = get_stylesheet_directory_uri() . '/' . $real_asset_path;
	} else {
		$full_asset_path = site_url( $real_asset_path );
	}

	if ( ! empty( $asset_suffix ) ) {
		$asset_suffix = ( FP_SUFFIX_JOINT . $asset_suffix );
	}

	return $full_asset_path . $asset_suffix;
}

/**
 * Get asset from manifest as array.
 *
 * @param string $asset_path Filename of the asset (with path relative to assets folder).
 *
 * @return array
 */
function fp_get_asset_with_meta( $asset_path = '' ) {
	$transient_name = ( $asset_path . '_asset_meta' );
	$cached = get_transient( $transient_name );
	if ( ! empty( $cached ) ) {
		return $cached;
	}

	if ( filter_var( $asset_path, FILTER_VALIDATE_URL ) ) {
		$file_url = $asset_path;
	} else {
		$file_url = fp_get_asset( $asset_path );
	}
	$url_path = wp_parse_url( $file_url, PHP_URL_PATH );
	$file_path = str_replace( '//', '/', ABSPATH . $url_path );

	try {
		$width = 0;
		$height = 0;
		$mime = mime_content_type( $file_path );
		if ( strpos( $mime, 'image/' ) !== false ) {
			if ( strpos( $mime, 'svg' ) !== false ) {
				$svg = @simplexml_load_string( file_get_contents( $file_path ) );
				$svg_attributes = $svg->attributes();
				//phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
				$view_box = (string) $svg_attributes->viewBox;
				$exploded_view_box = explode( ' ', $view_box );
				if ( $svg_attributes->width ) {
					$width = (float) $svg_attributes->width;
				} else if ( count( $exploded_view_box ) === 4 ) {
					$width = $exploded_view_box[2] - $exploded_view_box[0];
				}
				if ( $svg_attributes->height ) {
					$height = (float) $svg_attributes->height;
				} else if ( count( $exploded_view_box ) === 4 ) {
					$height = $exploded_view_box[3] - $exploded_view_box[1];
				}
			} else {
				list( $width, $height ) = @getimagesize( $file_path );
			}
		}
	} catch ( \Exception $e ) {
		$width = 0;
		$height = 0;
	}

	$asset_with_meta = [
		'url'    => $file_url,
		'width'  => ceil( $width ),
		'height' => ceil( $height ),
	];

	set_transient( $transient_name, $asset_with_meta );

	return $asset_with_meta;
}

/**
 * Get file content of an asset from manifest as a string.
 *
 * @param string $asset_path Filename of the asset (with path relative to assets folder).
 *
 * @return string
 */
function fp_inline_asset( $asset_path = '' ) {
	$manifest = fp_get_manifest();

	// Get asset path from manifest.
	if ( fp_asset_exists( $asset_path ) ) {
		$real_asset_path = $manifest[ $asset_path ];
	} else {
		$real_asset_path = $asset_path;
	}

	return fp_read_file( ABSPATH . $real_asset_path );
}

/**
 * Does the asset exist in the manifest?
 *
 * @param string $asset_path Filename of the asset (with path relative to assets folder).
 *
 * @return bool
 */
function fp_asset_exists( $asset_path = '' ) {
	$manifest = fp_get_manifest();

	return is_array( $manifest ) && array_key_exists( $asset_path, $manifest );
}

/**
 * Get the contents of a local file as a string.
 *
 * @param string $file_path Filename to open for reading.
 *
 * @return string
 */
function fp_read_file( $file_path = '' ) {
	$output = '';

	if ( ! empty( $file_path ) && is_string( $file_path ) && is_readable( $file_path ) ) {
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$output = file_get_contents( $file_path );
	}

	return $output;
}

/**
 * Load global and page-specific scripts in the specified DOM location.
 *
 * @param string $location DOM location in which scripts should be loaded.
 */
function fp_load_external_scripts( $location ) {
	$global_scripts = FP_Site_Options::get_option( "global_${location}_scripts" );

	// Only load global scripts when it's a non-dev environment.
	if ( ! in_array( fp_get_env(), [ 'development', 'local' ], true ) && ! empty( $global_scripts ) ) {
		echo fp_noesc( implode( PHP_EOL, $global_scripts ) );
	}

	if ( function_exists( 'get_field' ) ) {
		$page_specific_scripts = get_field( 'inline_scripts' );
		if ( ! empty( $page_specific_scripts ) && ( is_array( $page_specific_scripts ) || is_object( $page_specific_scripts ) ) ) {
			foreach ( $page_specific_scripts as $script ) {
				if ( $location === $script['location'] ) {
					echo fp_noesc( preg_replace( '/[^[:print:]\r\n]/', '', $script['code'] ) . PHP_EOL );
				}
			}
		}
	}
}

/**
 * Parse CSV string.
 *
 * @param string $input CSV data string.
 * @param string $delimiter Delimiting character.
 * @param bool   $trim_fields Whether or not to trim the provided data.
 *
 * @return  array
 */
function fp_parse_csv( $input, $delimiter = ',', $trim_fields = true ) {
	$input = preg_replace_callback(
		'/,"[^"]*\R[^"]*"/',
		function( $fields ) {
			$replacement = preg_split( '/\R\R/', $fields[0] );
			$replaced = implode( '!n!!n!', $replacement );

			return preg_replace( '/\R/', '!n!', $replaced );
		},
		$input
	);
	$rows = str_getcsv( $input, PHP_EOL );
	$output = [
		'headers' => str_getcsv( array_shift( $rows ), $delimiter ),
		'data'    => [],
	];
	foreach ( $rows as $row ) {
		$row = str_replace( '!n!', "\n", $row );
		$values = str_getcsv( $row, $delimiter );
		if ( ! empty( $values ) ) {
			if ( $trim_fields ) {
				$values = array_map( 'trim', $values );
			}
			if ( count( $output['headers'] ) === count( $values ) ) {
				$output['data'][] = array_combine( array_map( 'strtolower', $output['headers'] ), $values );
			}
		}
	}

	return $output;
}

/**
 * Output proper <img /> element for images from assets or ACF Image field.
 *
 * @param string|array $asset_data Filename of the asset or image array.
 * @param array        $attributes Attributes to be inserted to <img /> element.
 * @param string       $size Size used by WP function.
 *
 * @return  string
 */
function fp_render_img( $asset_data = '', $attributes = [], $size = 'thumbnail' ) {
	if ( ! empty( $asset_data ) ) {
		if ( is_array( $asset_data ) ) {
			if ( empty( $asset_data['ID'] ) && ! empty( $asset_data['id'] ) ) {
				$asset_data['ID'] = $asset_data['id'];
			}

			if ( ! empty( $asset_data['ID'] ) ) {
				return wp_get_attachment_image( $asset_data['ID'], $size, false, $attributes );
			}

			if ( empty( $attributes['src'] ) && ! empty( $asset_data['url'] ) ) {
				$attributes['src'] = esc_url( $asset_data['url'] );
			}
			if ( ! empty( $attributes['src'] ) ) {
				if ( strtolower( substr( $attributes['src'], - 3 ) ) === 'svg' ) {
					$svg_meta = fp_get_asset_with_meta( $attributes['src'] );
					$attributes['width'] = $svg_meta['width'];
					$attributes['height'] = $svg_meta['height'];
				} else {
					if ( empty( $attributes['width'] ) && ! empty( $asset_data['width'] ) ) {
						$attributes['width'] = (int) $asset_data['width'];
					}
					if ( empty( $attributes['height'] ) && ! empty( $asset_data['height'] ) ) {
						$attributes['height'] = (int) $asset_data['height'];
					}
				}
			}
		} else if ( is_numeric( $asset_data ) ) {
			return wp_get_attachment_image( $asset_data, $size, false, $attributes );
		} else {
			$asset_with_meta = fp_get_asset_with_meta( $asset_data );
			$attributes['src'] = $asset_with_meta['url'];

			if ( empty( $attributes['width'] ) && isset( $asset_with_meta['width'] ) ) {
				$attributes['width'] = $asset_with_meta['width'];
			}

			if ( empty( $attributes['height'] ) && isset( $asset_with_meta['height'] ) ) {
				$attributes['height'] = $asset_with_meta['height'];
			}
		}

		if ( empty( $attributes['alt'] ) ) {
			$attributes['alt'] = '';
		}

		$parsed_attributes = implode(
			' ',
			array_filter(
				array_map(
					function( $value, $name ) use ( $attributes ) {
						if ( is_array( $value ) || false === $value || '_lazy' === $name ) {
							return '';
						}

						if ( true === $value ) {
							return $name;
						}

						if ( 'src' === $name && array_key_exists( '_lazy', $attributes ) ) {
							return 'src="data:image/svg+xml,%3Csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20viewBox=\'0%200%20344%20194\'%3E%3C/svg%3E" data-lazy-src="' . $attributes['src'] . '"';
						}

						return "${name}=\"${value}\"";
					},
					$attributes,
					array_keys( $attributes )
				)
			)
		);

		return "<img ${parsed_attributes} />";
	}

	return '';
}

/**
 * Get the featured image or another field for a post thumbnail.
 *
 * @param string  $field_name Field name to retrieve, defaults to _featured_image (a pseudo field name).
 * @param integer $post_id ID of the post for which we wish to retrieve an image.
 * @param string  $output_type Return type for this function ('url' for image URL, or 'id' for attachment ID).
 *
 * @return string|integer
 */
function fp_get_featured_image( $field_name = '_featured_image', $post_id = null, $output_type = 'url' ) {
	// Set output format to default if not correctly set.
	if ( ! in_array( $output_type, [ 'url', 'id' ], true ) ) {
		$output_type = 'url';
	}

	// Set $post_id to current global post if not set.
	if ( is_null( $post_id ) ) {
		$post_id = get_the_ID();
	}

	$output = 'id' === $output_type ? 0 : '';

	if ( ! empty( $field_name ) ) {
		if ( '_featured_image' === $field_name && has_post_thumbnail( $post_id ) ) {
			$output = 'id' === $output_type ? get_post_thumbnail_id( $post_id ) : get_the_post_thumbnail_url( $post_id );
		} elseif ( get_field( $field_name, $post_id ) ) {
			$output = get_field( $field_name, $post_id );
		}
	}

	return $output;
}

/**
 * Load global and Site Wide Settings-related chatbot scripts.
 *
 * @param string $chatbot Chatbot identified (e.g. drift, qualified).
 */
function fp_load_chatbot_snippet( $chatbot ) {
	if ( ! is_admin() && function_exists( 'get_field' ) ) {
		$enabled = get_field( $chatbot . '_enabled', 'option' );
		if ( $enabled ) {
			$snippet = get_field( $chatbot . '_snippet', 'option' );
			$current_id = get_the_ID();

			$object = get_queried_object();
			if ( is_object( $object ) && 'WP_Term' === get_class( $object ) && 'hub_category' === $object->taxonomy ) {
				global $wp_query;
				if ( ! array_key_exists( 'paged', $wp_query->query ) ) {
					$current_id = $object->term_taxonomy_id;
				}
			}

			if ( ! empty( $snippet ) && ! empty( $current_id ) ) {
				$include_mode = get_field( $chatbot . '_include_mode', 'option' );
				$selected_pages = get_field( $chatbot . '_selected_pages', 'option' );
				if ( is_object( $object ) && 'WP_Term' === get_class( $object ) && 'hub_category' === $object->taxonomy ) {
					$selected_pages = get_field( $chatbot . '_hub_categories', 'option' );
				}

				if (
					! empty( $include_mode ) &&
					(
						'everywhere_except' === $include_mode
						&& (
							! is_array( $selected_pages )
							|| ! in_array( $current_id, $selected_pages )
						)
					)
					||
					(
						'only_on' === $include_mode
						&& is_array( $selected_pages )
						&& in_array( $current_id, $selected_pages )
					)
				) {
					echo fp_noesc( $snippet . PHP_EOL );
				}
			}
		}
	}
}

/**
 * Load global and Site Wide Settings-related Mutiny scripts.
 */
function fp_load_mutiny_snippet() {
	if ( ! is_admin() && function_exists( 'get_field' ) ) {
		$mutiny_enabled = get_field( 'mutiny_enabled', 'option' );
		if ( $mutiny_enabled ) {
			$mutiny_snippet = get_field( 'mutiny_snippet', 'option' );
			$current_id = get_the_ID();

			$mutiny_force_show = false;
			$object = get_queried_object();
			if ( true === get_field( 'mutiny_on_hub_cpt', 'option' ) && is_object( $object ) ) {
				if ( 'WP_Term' === get_class( $object ) && 'hub_category' === $object->taxonomy ) {
					$mutiny_force_show = true;
				}
				if ( 'WP_Post' === get_class( $object ) && ( 'hub' === $object->post_name || 'hub_article' === $object->post_type ) ) {
					$mutiny_force_show = true;
				}
			}

			if ( ! empty( $mutiny_snippet ) && ! empty( $current_id ) ) {
				$mutiny_include_mode = get_field( 'mutiny_include_mode', 'option' );
				$mutiny_selected_pages = get_field( 'mutiny_selected_pages', 'option' );

				if (
					true === $mutiny_force_show
					||
					! empty( $mutiny_include_mode ) &&
					(
						'everywhere_except' === $mutiny_include_mode
						&& (
							! is_array( $mutiny_selected_pages )
							|| ! in_array( $current_id, $mutiny_selected_pages )
						)
					)
					||
					(
						'only_on' === $mutiny_include_mode
						&& is_array( $mutiny_selected_pages )
						&& in_array( $current_id, $mutiny_selected_pages )
					)
				) {
					echo fp_noesc( $mutiny_snippet . PHP_EOL );
				}
			}
		}
	}
}

/**
 * Enqueue any template-specific assets if they exist.
 *
 * @param string $asset_name_override Asset name to use instead of the default 'templates-{template_name}'.
 */
function fp_enqueue_template_assets( $asset_name_override = '' ) {
	if ( ! empty( $asset_name_override ) && is_string( $asset_name_override ) ) {
		$template_name = $asset_name_override;
	} else {
		$template_name = 'templates-' . basename( get_page_template(), '.php' );
	}

	$scripts_asset_file = "scripts/${template_name}.js";
	$styles_asset_file = "styles/${template_name}.css";

	if ( fp_asset_exists( $scripts_asset_file ) ) {
		$script_dependencies = fp_get_script_dependencies();
		$script_asset_dependencies = [ 'freshpress-global' ];
		if ( array_key_exists( $template_name, $script_dependencies ) && is_array( $script_dependencies[ $template_name ] ) ) {
			$script_asset_dependencies = $script_dependencies[ $template_name ];
		}

		wp_enqueue_script( $template_name, fp_get_asset( $scripts_asset_file ), $script_asset_dependencies, null, true );
	}

	if ( fp_asset_exists( $styles_asset_file ) ) {
		wp_enqueue_style( $template_name, fp_get_asset( $styles_asset_file ), [], null );
	}
}

/**
 * Check if asset has suffix added.
 *
 * @param string $asset Asset url.
 * @param string $suffix Asset suffix to check.
 *
 * @return bool
 */
function fp_asset_has_suffix( $asset, $suffix ) {
	return fp_ends_with( $asset, FP_SUFFIX_JOINT . $suffix );
}

/**
 * Handle deferring and asyncing scripts.
 *
 * @param string $url Script's url.
 * @param string $handle Script's asset name.
 * @param string $src Script's src attribute.
 *
 * @return string
 */
function fp_handle_script_loading( $url, $handle, $src ) {
	if ( fp_asset_has_suffix( $src, FP_SUFFIX_ASSET_DEFER ) ) {
		return str_replace( ' src', ' defer src', $url );
	}

	if ( fp_asset_has_suffix( $src, FP_SUFFIX_ASSET_ASYNC ) ) {
		return str_replace( ' src', ' async src', $url );
	}

	return $url;
}

add_filter( 'script_loader_tag', 'fp_handle_script_loading', 10, 3 );

/**
 * Handle deferring and asyncing styles.
 *
 * @param string $html Style's HTML.
 * @param string $handle Style's asset name.
 * @param string $href Style's href attribute.
 *
 * @return string
 */
function fp_handle_style_loading( $html, $handle, $href ) {
	if (
		fp_asset_has_suffix( $href, FP_SUFFIX_ASSET_DEFER )
		|| fp_asset_has_suffix( $href, FP_SUFFIX_ASSET_ASYNC )
	) {
		$preload_html = str_replace(
			[ 'stylesheet', 'rel=' ],
			[ 'preload', 'as="style" onload="this.onload=null;this.rel=\'stylesheet\'" rel=' ],
			$html
		);

		return "
			$preload_html
			<noscript>$html</noscript>
		";
	}

	return $html;
}

// This is not needed anymore with combine, but let it's be here for a while.
// add_filter( 'style_loader_tag', 'fp_handle_style_loading', 10, 3 ).
