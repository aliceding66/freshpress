<?php
/**
 * Migrator class.
 *
 * @package FreshpressBlocks\Migrator
 * @subpackage Migrator
 */

namespace FreshpressBlocks\Migrator;

use FreshpressBlocks\ACli;
use WP_Block_Type_Registry;

require_once __DIR__ . '/../autoloader.php';

/**
 * Class Migrator.
 *
 * @package FreshpressBlocks\Migrator
 */
class Migrator extends ACli {

	const SCHEME_CORE = 'core';
	const SCHEME_REST = 'rest';
	const ALLOWED_SCHEMES = [ self::SCHEME_CORE, self::SCHEME_REST ];
	const CORE_BLOCKS = [
		'blue-cta-bar',
		'border-box',
		'boxes',
		'button',
		'carousel',
		'column',
		'columns',
		'comparison-table',
		'did-you-know',
		'faq',
		'feature-grid',
		'feature-row',
		'file-download',
		'flexible-colour-background',
		'freshbooks-careers',
		'hero',
		'icon-tiles',
		'icons-list',
		'logo-group',
		'mobile-segment-navigation',
		'modal',
		'new-cta-bar',
		'pardot-form',
		'pricing-table',
		'product-tour',
		'rating',
		'related-links',
		'sign-up',
		'social-share',
		'stat-tiles',
		'sticky-footer',
		'subnav',
		'testimonial-columns',
		'testimonial-quote',
	];

	const CORE_PAGES = [
		// Signup (also include /en-gb/ for this one).
		617, // ok.
		3767, // ok.
		// Pricing (also include /en-gb/ for this one).
		1900, // ok.
		3766, // ok.
		// Homepage.
		8, // ok.
		// Segment pages.
		// - /select.
		2164, // ok.
		// Product pages.
		// - /invoice.
		185, // ok.
		// - /accounting.
		182, // ok.
		// - /mileage-tracking-app.
		107828, // ok.
		// About pages.
		// - about.
		627, // ok.
		// - careers.
		121947, // ok.
		// Other pages.
		// - accountants.
		223, // ok.
		// SEO pages.
		// - /invoice-templates.
		// - /invoice-templates/simple-invoice.
		112445, // ok.
		// - /invoice-templates/pdf. ok.
		113451, // ok.
		// - /accounting-templates/general-ledger.
		6813, // ok.
		// - /hub/estimates/estimate-house-cleaning-jobs.
		32941, // ok but it doesn't contain any Reacty blocks.
	];

	/**
	 * Migrated pages counter.
	 *
	 * @var int
	 */
	private $migrated_pages = 0;

	/**
	 * All blocks counter.
	 *
	 * @var int
	 */
	private $all_blocks = 0;

	/**
	 * Passed by CLI options.
	 *
	 * @var array
	 */
	private $cli_options = [
		'name'           => '',
		'scheme'         => '',
		'ID'             => '',
		'ask'            => false,
		'debug'          => false,
		'skip-revisions' => false,
		'verify'         => false,
	];

	/**
	 * Posts IDs to process.
	 *
	 * @var array
	 */
	private $post_ids;

	/**
	 * Block names to parse.
	 *
	 * @var array
	 */
	private $blocks_to_parse;

	/**
	 * Blocks to migrate.
	 *
	 * @var array
	 */
	private $current_blocks;

	/**
	 * Current post.
	 *
	 * @var WP_Post
	 */
	private $current_post;

	/**
	 * Current post content.
	 *
	 * @var string
	 */
	private $current_post_content;

	/**
	 * Replaced blocks cache.
	 *
	 * @var array
	 */
	private $replaced_blocks_cache;

	/**
	 * Runs Migrator.
	 *
	 * @param array $args Pure attributes passed in.
	 * @param array $assoc_args Named parameters with "--" prefix e.g. "--param=value".
	 */
	public function run( $args, $assoc_args ) {
		$this->load_command_params( $args, $assoc_args );
		if ( $this->cli_options['verify'] ) {
			$this->verify_blocks();
		} else {
			$this->initiate_blocks_to_parse();
			$this->load_post_ids();

			$post_ids_amount = count( $this->post_ids );
			$continue = ! $this->cli_options['skip-revisions'] || $this->cli_options['debug'];
			if ( ! $continue ) {
				$continue = $this->get_confirm( 'You chose to skip revision which will update actual pages. Are You sure You want to continue?' );
			}

			if ( $continue ) {
				$this->write_line( "found {$post_ids_amount} wp_posts to process" );
				$this->process_next_post();
			} else {
				$this->finish_migration();
			}
		}
	}

	/**
	 * Migrator constructor.
	 */
	public function process_next_post() {
		$this->clear_current_block_data();

		if ( ! empty( $this->post_ids ) ) {
			$post_id = array_pop( $this->post_ids );

			try {
				$this->load_current_post( $post_id );
				$this->load_current_blocks();
				$this->format_current_post();
				$this->all_blocks = count( $this->current_blocks );
				$this->write_debug( 'post and block are loaded' );

				if ( $this->all_blocks > 0 ) {
					$this->write_line( " - {$post_id}:" );
					if (
						! $this->revision_exists()
						|| ( $this->cli_options['skip-revisions'] || (
								$this->cli_options['debug']
								|| $this->get_confirm( 'post has active revision - continue anyway?' )
							) )
					) {
						$this->write_debug( 'before blocks loop' );
						$replaced_blocks = 0;
						foreach ( $this->current_blocks as $current_block ) {
							$replaced_blocks += $this->try_replace_with_inner_blocks( $current_block );
						}

						if ( $replaced_blocks > 0 ) {
							$this->try_update_post();
						}

						$this->write_line( " |- replaced {$replaced_blocks}/{$this->all_blocks} blocks" );
					}
				}
			} catch ( \Exception $e ) {
				$this->throw_error( $e->getMessage() );
			}
			$this->process_next_post();
		} else {
			$this->finish_migration();
		}
	}

	/**
	 * Load CLI options.
	 *
	 * @param array $args Pure attributes passed in.
	 * @param array $assoc_args Named parameters with "--" prefix e.g. "--param=value".
	 */
	private function load_command_params( $args, $assoc_args ) {
		if ( isset( $assoc_args['name'] ) ) {
			$this->cli_options['name'] = ( 'acf/' . str_replace( [ 'fpbk/', 'acf/' ], [ '', '' ], esc_sql( $assoc_args['name'] ) ) );
		}

		foreach ( $this->cli_options as $option_name => $default_value ) {
			if ( empty( $this->cli_options[ $option_name ] ) ) {
				if ( isset( $assoc_args[ $option_name ] ) ) {
					$this->cli_options[ $option_name ] = $assoc_args[ $option_name ];
				} else {
					$this->cli_options[ $option_name ] = in_array( $option_name, $args );
				}
			}
		}

		$this->validate_cli_options();
	}

	/**
	 * Initiate blocks to parse.
	 */
	private function initiate_blocks_to_parse() {
		if ( ! empty( $this->cli_options['scheme'] ) ) {
			$fpbk_blocks = $this->get_fpbk_blocks();

			if ( self::SCHEME_CORE === $this->cli_options['scheme'] ) {
				$this->blocks_to_parse = array_map(
					function( $block ) {
						return "acf/{$block}";
					},
					self::CORE_BLOCKS
				);
			} else if ( self::SCHEME_REST === $this->cli_options['scheme'] ) {
				$this->blocks_to_parse = array_filter(
					array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() ),
					function( $block ) use ( $fpbk_blocks ) {
						return strpos( $block, 'acf/' ) !== false && in_array( str_replace( 'acf/', 'fpbk/', $block ), $fpbk_blocks );
					}
				);
			}
		} else if ( ! empty( $this->cli_options['name'] ) ) {
			$this->blocks_to_parse = [ $this->cli_options['name'] ];
		}

		$this->write_debug( 'blocks to parse: ' . join( ', ', $this->blocks_to_parse ) );
	}

	/**
	 * Load post_ids.
	 */
	private function load_post_ids() {
		global $wpdb;
		$post_content_query = join(
			' OR ',
			array_map(
				function( $block_name ) {
					return "p.post_content LIKE \"%wp:{$block_name} %\"";
				},
				$this->blocks_to_parse
			)
		);

		$and_where = '';
		if ( ! empty( $this->cli_options['ID'] ) ) {
			$and_where = 'AND p.ID = ' . (int) $this->cli_options['ID'];
		} else if ( ! empty( $this->cli_options['scheme'] ) ) {
			if ( self::SCHEME_CORE === $this->cli_options['scheme'] ) {
				$and_where = ' AND p.ID IN (' . implode( ',', self::CORE_PAGES ) . ')';
			} else if ( self::SCHEME_REST === $this->cli_options['scheme'] ) {
				$and_where = ' AND p.ID NOT IN (' . implode( ',', self::CORE_PAGES ) . ')';
			}
		}

		$sql = <<< SQL
				SELECT p.ID
				FROM {$wpdb->prefix}posts AS p
				WHERE
					({$post_content_query})
				  	{$and_where}
SQL;
		$this->write_debug( 'load post ids SQL: ' . $sql );

		// @codingStandardsIgnoreStart
		$this->post_ids = $wpdb->get_col($sql);
		// @codingStandardsIgnoreEnd
	}

	/**
	 * Loads and format post.
	 *
	 * @param integer $post_id Post ID to load.
	 */
	private function load_current_post( $post_id ) {
		$this->current_post = get_post( $post_id );
		if ( ! empty( $this->current_post ) ) {
			$this->current_post_content = $this->current_post->post_content;
		}
	}

	/**
	 * Formats post_content as JS and PHP block serializers provided by WP doesn't give same output.
	 */
	private function format_current_post() {
		$this->current_post_content = preg_replace(
			'/ ?: ?( ["{}\]])/',
			':$1',
			str_replace(
				"\n",
				'',
				preg_replace( '/[\s]{2,}/m', '', $this->current_post_content )
			)
		);
	}

	/**
	 * Load blocks to migrate.
	 * Empty blocks and "fpbk" ones are excluded by migrator.
	 */
	private function load_current_blocks() {
		$this->current_blocks = parse_blocks( $this->current_post_content );
	}

	/**
	 * Clears all dynamic values used for calculation.
	 */
	private function clear_current_block_data() {
		$this->all_blocks = 0;
		$this->current_blocks = [];
		$this->replaced_blocks_cache = [];
		$this->current_post = null;
		$this->current_post_content = null;
	}

	/**
	 * Validates passed by CLI block name.
	 */
	private function validate_cli_options() {
		if ( empty( $this->cli_options['name'] ) && empty( $this->cli_options['scheme'] ) && empty( $this->cli_options['verify'] ) ) {
			$this->throw_error( '"--[name|scheme|verify]" option is required' );
		}

		if ( ! empty( $this->cli_options['scheme'] ) && ! in_array( $this->cli_options['scheme'], self::ALLOWED_SCHEMES ) ) {
			$this->throw_error( 'Scheme can be one of the following: ' . implode( ',', self::ALLOWED_SCHEMES ) );
		}

		if ( ! empty( $this->cli_options['name'] ) ) {
			$block_exists = in_array( $this->cli_options['name'], array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() ) );

			if ( ! $block_exists ) {
				$this->throw_error( 'block can\'t be replaced - it\'s not registered' );
			}
		}
	}

	/**
	 * Try to replace block and return amount of replaced blocks.
	 *
	 * @param array $current_block Block to replace.
	 *
	 * @return int
	 */
	private function try_replace_block( $current_block ) {
		$block_parser = new BlockParser( $current_block, $this->blocks_to_parse, $this->replaced_blocks_cache, $this->cli_options['debug'] );
		$block_parser->parse();
		$this->write_debug( 'parsing block' );

		if ( $block_parser->was_parsed() ) {
			$parsed_block = $block_parser->get_parsed_block();
			if ( ! empty( $parsed_block['attrs']['id'] ) ) {
				$this->replaced_blocks_cache[ $parsed_block['attrs']['id'] ] = $parsed_block;
				$serialized_parsed_block = $this->serialize_block( $parsed_block );
				$this->write_debug( 'block was parsed' );
				if ( strpos( $this->current_post_content, $serialized_parsed_block ) >= 0 ) {
					$to_replace_block_string = $this->get_to_replace_block_string( $parsed_block );
					$this->write_debug( 'post_content: ' . $this->current_post_content );
					if ( ! empty( $to_replace_block_string ) ) {
						$this->write_debug( 'block can be replaced on : ' . $to_replace_block_string );
						if ( ! $this->cli_options['ask'] || $this->get_confirm( ' |- replace block [' . $parsed_block['blockName'] . '::' . $parsed_block['attrs']['id'] . ']?' ) ) {
							$this->current_post_content = str_replace( $to_replace_block_string, $serialized_parsed_block, $this->current_post_content );
							if ( strpos( $this->current_post_content, $serialized_parsed_block ) >= 0 ) {
								$this->write_debug( 'block got replaced' );

								return 1;
							}
						}
					} else {
						$this->write_debug( 'block can\'t be replaced' );
						$this->write_debug( 'found replacement string: ' . serialize( $to_replace_block_string ) );
					}
				}
			}
		}

		return 0;
	}

	/**
	 * Replace block with InnerBlocks inclusively.
	 *
	 * @param array $current_block Block.
	 * @return int
	 */
	private function try_replace_with_inner_blocks( $current_block ) {
		$replaced_blocks = 0;

		if ( empty( $current_block['blockName'] ) ) {
			$this->all_blocks--;
		} else {
			if ( ! empty( $current_block['innerBlocks'] ) ) {
				$this->all_blocks += count( $current_block['innerBlocks'] );
				foreach ( $current_block['innerBlocks'] as $current_inner_block ) {
					$replaced_blocks += $this->try_replace_with_inner_blocks( $current_inner_block );
				}
			}

			$replaced_blocks += $this->try_replace_block( $current_block );
		}

		return $replaced_blocks;
	}

	/**
	 * Try to update post content.
	 */
	private function try_update_post() {
		$this->fix_embed_urls();

		if ( $this->cli_options['debug'] ) {
			$this->write_debug( 'new post_content:  ' . $this->current_post_content );
		} else {
			if ( $this->cli_options['skip-revisions'] ) {
				global $wpdb;
				$wpdb->update( "{$wpdb->prefix}posts", [ 'post_content' => $this->current_post_content ], [ 'ID' => (int) $this->current_post->ID ] );
			} else {
				$this->create_revision( $this->current_post_content );
			}

			++$this->migrated_pages;
		}
	}

	/**
	 * Fixes embed issue that require newline char within embed wrapper.
	 */
	private function fix_embed_urls() {
		$this->current_post_content = preg_replace( '/<div class="wp-block-embed__wrapper">(.+)<\/div>/iU', "\n$1\n", $this->current_post_content );
	}

	/**
	 * Serialize block with "<" and ">" WP escaping fix.
	 *
	 * @param array $block Block data.
	 *
	 * @return string
	 */
	private function serialize_block( $block ) {
		if ( isset( $block['originalName'] ) ) {
			unset( $block['originalName'] );
		}

		return str_replace( [ '\u003c', '\u003e', "\n" ], [ '<', '>', '' ], serialize_block( $block ) );
	}

	/**
	 * Gets block string that will be overwritten by new block string.
	 *
	 * @param array $block Parsed block.
	 *
	 * @return string
	 */
	private function get_to_replace_block_string( $block ) {
		$block_name = str_replace( '/', '\/', $block['originalName'] );
		$block_name = str_replace( 'acf', '(?:acf|fpbk)', $block_name );
		if ( ! empty( $block['innerBlocks'] ) ) {
			$block_occurrences = 1 + $this->get_block_occurences( $block['blockName'], $block['innerBlocks'] );
			$block_end_token = str_repeat( "(?:.)+? \/wp:{$block_name} ?-->", $block_occurrences );
			$search_block_regex = "/(<\!-- wp:{$block_name} {\"id\": ?\"{$block['attrs']['id']}\"{$block_end_token})/";
		} else {
			$search_block_regex = "/(<\!-- wp:{$block_name} {\"id\": ?\"{$block['attrs']['id']}\"(?:.)+? \/-->)/";
		}

		$this->write_debug( 'regex: ' . $search_block_regex );

		ini_set( 'pcre.jit', '0' );
		preg_match(
			$search_block_regex,
			$this->current_post_content,
			$matches,
		);
		ini_set( 'pcre.jit', '1' );

		return ! empty( $matches[1] ) ? $matches[1] : '';
	}

	/**
	 * Checks whether current post has revision.
	 *
	 * @return bool
	 */
	private function revision_exists() {
		global $wpdb;

		// @codingStandardsIgnoreStart
		return (bool)$wpdb->get_var(
			"
			SELECT COUNT(*)
			FROM {$wpdb->prefix}posts AS p
			WHERE p.post_status = \"pending-revision\" AND p.comment_count = {$this->current_post->ID}
		"
		);
		// @codingStandardsIgnoreEnd
	}

	/**
	 * Creates PublishPress Revision.
	 *
	 * @see https://publishpress.com/knowledge-base/revisions-api/
	 *
	 * @param string $new_post_content Updated post_content to insert in revision.
	 */
	private function create_revision( $new_post_content ) {
		global $wpdb;

		$wpdb->insert(
			"{$wpdb->prefix}posts",
			[
				'post_author'           => $this->current_post->post_author,
				'post_date'             => $this->current_post->post_date,
				'post_date_gmt'         => $this->current_post->post_date_gmt,
				'post_content'          => $new_post_content,
				'post_title'            => $this->current_post->post_title,
				'post_status'           => 'pending-revision',
				'post_password'         => $this->current_post->post_password,
				'post_name'             => $this->current_post->post_name,
				'to_ping'               => $this->current_post->to_ping,
				'pinged'                => $this->current_post->pinged,
				'post_modified'         => current_time( 'Y-m-d H:i:s' ),
				'post_modified_gmt'     => get_gmt_from_date( current_time( 'Y-m-d H:i:s' ) ),
				'post_content_filtered' => $this->current_post->post_content_filtered,
				'post_parent'           => $this->current_post->post_parent,
				'comment_status'        => $this->current_post->comment_status,
				'ping_status'           => $this->current_post->ping_status,
				'post_type'             => $this->current_post->post_type,
				'post_mime_type'        => $this->current_post->post_mime_type,
				'comment_count'         => $this->current_post->ID,
			]
		);

		add_post_meta( $wpdb->insert_id, '_rvy_base_post_id', $this->current_post->ID );
		update_post_meta( $this->current_post->ID, '_rvy_has_revisions', '1' );
	}

	/**
	 * Outputs summary message at the end.
	 */
	private function finish_migration() {
		if ( $this->cli_options['skip-revisions'] ) {
			$this->write_line( $this->migrated_pages . ' pages updated' );
		} else {
			$this->write_line( $this->migrated_pages . ' revisions created' );
		}
	}

	/**
	 * Outputs debug message in CLI.
	 *
	 * @param string $message Message to output.
	 */
	private function write_debug( $message ) {
		if ( $this->cli_options['debug'] ) {
			$this->write_line( '######################################################' );
			$this->write_line( 'D: ' . $message );
		}
	}

	/**
	 * Return amount of occurence of same block withing InnerBlocks.
	 *
	 * @param string $block_name Block name to search for occurrences.
	 * @param array  $blocks Blocks to search in.
	 * @return int
	 */
	private function get_block_occurences( $block_name, $blocks ) {
		$amount = 0;
		foreach ( $blocks as $block ) {
			if ( ! empty( $block['innerBlocks'] ) ) {
				$amount += $this->get_block_occurences( $block_name, $block['innerBlocks'] );
			}

			if ( $block['blockName'] === $block_name ) {
				$amount++;
			}
		}

		return $amount;
	}

	/**
	 * Get all registered FPBK blocks.
	 *
	 * @return array
	 */
	private function get_fpbk_blocks() {
		return array_filter(
			array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() ),
			function( $block ) {
				return strpos( $block, 'fpbk/' ) !== false;
			}
		);
	}

	/**
	 * Calls checking query that identify all usage of ACF blocks that should be migrated.
	 */
	private function verify_blocks() {
		global $wpdb;
		$post_content_query = join(
			' OR ',
			array_map(
				function( $block_name ) {
					return "p.post_content LIKE \"%wp:{$block_name} %\"";
				},
				array_map(
					function( $block_name ) {
						return str_replace( 'fpbk/', 'acf/', $block_name );
					},
					$this->get_fpbk_blocks()
				)
			)
		);

		$and_where = '';

		$sql = <<< SQL
				SELECT *
				FROM {$wpdb->prefix}posts AS p
				WHERE
					({$post_content_query})
				  	{$and_where}
SQL;

		// @codingStandardsIgnoreStart
		$posts = $wpdb->get_results($sql);
		// @codingStandardsIgnoreEnd
		$posts_amount = count( $posts );

		if ( $posts_amount > 0 ) {
			$this->write_line( "There are still {$posts_amount} posts that used non-migrated ACF blocks." );
			array_walk(
				$posts,
				function( $post ) {
					$this->write_line( $post->ID . ' ' . get_permalink( $post->ID ) );
				}
			);
		} else {
			$this->write_line( 'All ACF blocks were migrated' );
		}
	}

	/**
	 * Adds WP-CLI command.
	 */
	public static function add_cli_command() {
		if ( class_exists( 'WP_CLI' ) ) {
			\WP_CLI::add_command( 'blocks-migrate', [ self::class, 'run' ], [ 'test' ] );
		}
	}
}
