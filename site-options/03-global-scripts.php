<?php
return [
	'global_head_scripts'   => [
		<<<'SCRIPT'
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MCH68J');</script>
		SCRIPT, // Google Tag Manager.
	],
	'global_body_scripts'   => [
		<<<'SCRIPT'
		<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MCH68J" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		SCRIPT, // Google Tag Manager.
	],
	'global_footer_scripts' => [],
];
