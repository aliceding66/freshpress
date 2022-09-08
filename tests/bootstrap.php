<?php
/**
 * Bootstrapping PHP Unit Tests and WP_Mock.
 *
 * @package FreshPress\Website
 */

// load the composer autoloader so we can use WP Mock.
require_once './vendor/autoload.php';
// Load Patchwork as is as Composer loader seems to omit that one.
if ( file_exists( __DIR__ . '/../../../vendor/antecedent/patchwork/Patchwork.php' ) ) {
	require_once __DIR__ . '/../../../vendor/antecedent/patchwork/Patchwork.php';
}
// Load fpbk blocks autoloader.
require_once __DIR__ . '/../includes/blocks/fpbk/autoloader.php';

// call the bootstrap method of WP Mock.
WP_Mock::bootstrap();

// load all functions under includes.

$helper_traits_folder = './themes/freshpress/tests/helper-traits/';
$helpers_folder = './themes/freshpress/includes/helpers/';
$hooks_folder = './themes/freshpress/includes/hooks/';
$modules_folder = './themes/freshpress/includes/modules/';

fp_require_all( $helper_traits_folder );
fp_require_all( $helpers_folder );
fp_require_all( $hooks_folder );
fp_require_all( $modules_folder );

FP_Polyfill_Classes::loadClassPolyfills();

/**
 * Load folder all function within a file
 *
 * @param string $folder     full path where to check files and load function.
 * @return void .
 */
function fp_require_all( $folder ) {
	foreach ( scandir( $folder ) as $filename ) {
		$path = $folder . $filename;
		if ( is_file( $path ) ) {
			require $path;
		}
	}
}
