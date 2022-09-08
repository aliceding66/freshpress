import { registerFormatType, store } from '@wordpress/rich-text';
import { select } from '@wordpress/data';

const name = 'freshbooks/li';

const listItemType = {
	name,
	register: () => {
		if ( typeof select( store ).getFormatType( name ) === 'undefined' ) {
			registerFormatType( name, {
				title: 'li',
				tagName: 'li',
				className: null,
			} );
		}
	},
};

export default listItemType;
