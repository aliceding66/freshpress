<?php
return [
	// translators: %s is the current year.
	'footer_copyright'         => fp_sprintf( _x( '© 2000-%s FreshBooks', 'Footer copyright with current year', 'freshpress-website' ), [ date_format( fp_get_date(), 'Y' ) ] ),
	'default_terms_of_service' => _x( 'I confirm that I have read and agree to FreshBooks <a href="/policies/terms-of-service" target="_blank">Terms of Service</a> and <a href="/policies/privacy" target="_blank">Privacy Policy</a>. <a href="/policies/security-safeguards" target="_blank">Security Safeguards</a>', 'Default terms of service', 'freshpress-website' ),
];
