import { registerFormatType, insert, create, slice, store } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { select } from '@wordpress/data';

const name = 'freshbooks/ul';

const listUnorderedType = {
	name,
	register: () => {
		if ( typeof select( store ).getFormatType( name ) === 'undefined' ) {
			registerFormatType( name, {
				title: 'ul',
				tagName: 'ul',
				className: null,
				edit( { isActive, value, onChange } ) {
					const onToggle = () => {
						if ( isActive ) {
							return onChange(
								insert(
									value,
									create( { html: slice( value ).text } ),
									value.start,
									value.end
								)
							);
						}

						const str = slice( value )
							.text.split( '\n' )
							.filter( ( el ) => ! el.match( /^\s*$/ ) )
							.map( ( el ) => el.replace( /(^[\s\t]+|[\s\t]+$, '')/g ) )
							.join( '</li>\n<li>' );

						return onChange(
							insert(
								value,
								create( {
									html: '<ul>\n<li>' + str + '</li>\n</ul>',
								} ),
								value.start,
								value.end
							)
						);
					};

					return (
						<RichTextToolbarButton
							icon={ 'editor-ul' }
							title={ 'List Unordered' }
							onClick={ onToggle }
							isActive={ isActive }
						/>
					);
				},
			} );
		}
	},
};

export default listUnorderedType;
