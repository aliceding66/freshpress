export const getAlignClass = ( attributes ) => {
	let alignClass = '';

	if ( attributes.align ) {
		alignClass += ' d-flex';

		if ( 'right' === attributes.align ) {
			alignClass += ' justify-content-end';
		} else if ( 'left' === attributes.align ) {
			alignClass += ' justify-content-start';
		} else {
			alignClass += ' justify-content-center';
		}
	}

	return alignClass;
};

export const getFileUrlType = ( file, urlTypes, urlFileTypes ) => {
	if ( file.url === '' || file.download_type !== 'url' ) {
		return 'empty';
	}

	if ( typeof file.url === 'string' ) {
		const foundUrlType = Object.keys( urlTypes ).filter( ( urlType ) =>
			file.url.includes( urlType )
		)[ 0 ];

		if ( foundUrlType ) {
			return foundUrlType;
		}
		const splitFilUrl = file.url.split( '.' );
		const fileExtension = splitFilUrl[ splitFilUrl.length - 1 ];
		if ( Object.keys( urlFileTypes ).includes( fileExtension ) ) {
			return fileExtension;
		}
	}

	return false;
};
