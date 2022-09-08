<?php
/**
 * FreshPress Website theme functions and definitions.
 *
 * Please note that the order of requiring is important as dependencies must be declared first.
 *
 * @package FreshPress\Website
 */

/*
 * Initialise helper functions, starting with custom objects.
 */

// Filter and action related to logger.
require_once __DIR__ . '/includes/hooks/logger.php';
require_once __DIR__ . '/includes/helpers/logger.php';
// Helper functions for custom post types.
require_once __DIR__ . '/includes/helpers/post-types.php';
// Helper functions for custom taxonomies.
require_once __DIR__ . '/includes/helpers/taxonomies.php';
// Other helper functions.
require_once __DIR__ . '/includes/helpers/tools.php';

/*
 * Initialise universal reused helper functions.
 */

// Helper functions for using dates and times.
require_once __DIR__ . '/includes/helpers/datetime.php';
// Helper functions for server environments.
require_once __DIR__ . '/includes/helpers/environments.php';
// Helper functions for output.
require_once __DIR__ . '/includes/helpers/output.php';
// Helper functions for strings.
require_once __DIR__ . '/includes/helpers/strings.php';
// Helper functions for templates.
require_once __DIR__ . '/includes/helpers/templates.php';
// Helper functions for URLs.
require_once __DIR__ . '/includes/helpers/urls.php';

/*
 * Initialise remaining helper functions.
 */

// Helper functions for ACF.
require_once __DIR__ . '/includes/helpers/acf.php';
// Helper functions for assets using the manifest.
require_once __DIR__ . '/includes/helpers/assets.php';
// Helper functions for blocks.
require_once __DIR__ . '/includes/helpers/blocks.php';
// Helper functions for i18n.
require_once __DIR__ . '/includes/helpers/i18n.php';
// Helper functions for SEO.
require_once __DIR__ . '/includes/helpers/seo.php';

/*
 * Initialise our site-wide options.
 */

require_once __DIR__ . '/includes/class-fp-site-options.php';

/*
 * Initialise modules.
 */

require_once __DIR__ . '/includes/modules/campaigns.php';
require_once __DIR__ . '/includes/modules/class-namegenerator.php';
require_once __DIR__ . '/includes/modules/simplecast-sync.php';

/*
 * Initialize block based functions.
 */

// Load ROI calculator helpers.
require_once __DIR__ . '/includes/blocks/acf/roi-calculator.php';
// Load entry file that bootstrap fpbk blocks.
require_once __DIR__ . '/includes/blocks/fpbk/fpbk-blocks.php';
// Load Accounting Partners helpers.
require_once __DIR__ . '/includes/blocks/acf/accounting-partners.php';

/*
 * Initialise action and filter handlers, starting with those affecting wp-admin.
 */

// Filter and action handlers for theme setup.
require_once __DIR__ . '/includes/hooks/theme-setup.php';
// Filter and action handlers for menu setup.
require_once __DIR__ . '/includes/hooks/menus.php';
// Filter and action handlers for custom WordPress objects.
require_once __DIR__ . '/includes/hooks/custom-objects.php';
// Filter and action handlers for Fastly.
require_once __DIR__ . '/includes/hooks/fastly.php';
// Filter and action handlers for HTTP Headers.
require_once __DIR__ . '/includes/hooks/http-headers.php';
// Filter and action handlers for REST API.
require_once __DIR__ . '/includes/hooks/rest-api.php';
// Filter and action handlers for ACF.
require_once __DIR__ . '/includes/hooks/acf.php';
// Filter and action handlers for blocks.
require_once __DIR__ . '/includes/hooks/blocks.php';
// Filter and action handlers for shortcodes.
require_once __DIR__ . '/includes/hooks/shortcodes.php';
// Filter and action related to templates.
require_once __DIR__ . '/includes/hooks/templates.php';
// Filter and action extending security.
require_once __DIR__ . '/includes/class-fp-security-gate.php';
require_once __DIR__ . '/includes/hooks/security.php';
// Filter and action related to redirects.
require_once __DIR__ . '/includes/hooks/redirects.php';
// Filter and action related to file upload.
require_once __DIR__ . '/includes/hooks/upload.php';

/*
 * Initialise remaining action and filter handlers.
 */

// Filter and action handlers for Assets.
require_once __DIR__ . '/includes/hooks/assets.php';
// Filter and action handlers for SEO.
require_once __DIR__ . '/includes/hooks/seo.php';
// Cron jobb.
require_once __DIR__ . '/includes/hooks/cron.php';
// Adds content-wide variables support.
require_once __DIR__ . '/includes/hooks/content-wide-variables.php';

/*
 * Initialise site wide settings fields.
 */
if ( function_exists( 'acf_add_options_page' ) ) {
	acf_add_options_page(
		[
			'page_title' => 'Site Wide Settings',
			'menu_title' => 'Site Wide Settings',
			'menu_slug'  => 'site-wide-settings',
		]
	);
}

// Styles and scripts combining engine.
require_once __DIR__ . '/includes/hooks/assets-combiner.php';

// CLI command for hub articles - commented out on 30.05.2022 after being run on staging to prevent unexpected run in future.
// phpcs:ignore Squiz.Commenting.InlineComment.InvalidEndChar
// require_once __DIR__ . '/includes/hooks/class-hub-featured-image-cli.php';

add_filter( 'pre_option_blog_public', 'production' !== fp_get_env() ? '__return_zero' : '__return_true' );
