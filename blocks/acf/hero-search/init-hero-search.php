<?php
/**
 * Hero Search block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'hero-search',
	[
		'title'          => 'Hero Search',
		'description'    => 'Hero block with a search input',
		'keywords'       => [ 'search', 'hero' ],
		'enqueue_assets' => function() {
			wp_enqueue_style( 'hero-search', fp_get_asset( 'styles/blocks-acf-hero-search-hero-search.css' ), [], null );
			wp_add_inline_script(
				'freshpress-global',
				"jQuery( document ).ready(function(){ jQuery(':input.st-default-search-input').one('focus', function(){ (function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);})(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');_st('install','e-LL1PbfxbuEgxXxniPC','2.0.0'); }) });"
			);
		},
	]
);
