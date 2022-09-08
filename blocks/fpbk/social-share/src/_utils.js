import { sprintf } from '@wordpress/i18n';

export const getAlignClass = ( align = '' ) => {
	if ( align === 'right' ) {
		return 'text-right ml-md-auto mr-md-0';
	} else if ( align === 'left' ) {
		return 'text-left mr-md-auto ml-md-0';
	}
	return 'text-center mr-md-auto ml-md-0';
};

export const generateSocialInfo = ( attributes, shareIconsOrderDefinition ) => {
	return attributes.share_icons_order.map( ( shareIconOrder ) => {
		let sharingTitle = attributes[ `share_on_${ shareIconOrder }_group_sharing_title` ];
		if ( ! sharingTitle ) {
			// translators: 'Share on ___' where ___ is the social media service (eg, Facebook or LinkedIn).
			sharingTitle = sprintf( 'Share on %s', [
				shareIconsOrderDefinition.choices[ shareIconOrder ],
			] );
		}

		return {
			share_url: '#',
			share_icon: socialShareTemplateData.icons[ shareIconOrder ], // eslint-disable-line no-undef
			sharing_title: sharingTitle,
		};
	} );
};
