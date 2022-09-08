<?php
/**
 * Partner Feature block.
 *
 * @package FreshPress\PartnerFeature
 * @subpackage PartnerFeature
 */

/**
 * Register block and initialise block assets.
 */
function fpbk_partner_feature_block_init() {
	$block = new \FreshpressBlocks\PartnerFeatureBlock( __DIR__ );

	$block->register();
}

add_action( 'init', 'fpbk_partner_feature_block_init' );
