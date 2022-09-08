import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	return (
		<EditorControls.Context.Provider value={ { attributes, blockName, setAttributes } }>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Text name="iframe_url" />
					<EditorControls.Text name="iframe_width" />
					<EditorControls.Text name="iframe_height" />
				</PanelBody>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				{ /* eslint-disable-next-line jsx-a11y/iframe-has-title */ }
				<iframe
					frameBorder={ 0 }
					height={ attributes.iframe_height ? attributes.iframe_height : 'auto' }
					width={ attributes.iframe_width ? attributes.iframe_width : '100%' }
					src={ attributes.iframe_url }
					style={ {
						width: attributes.iframe_width ? `${ attributes.iframe_width }px` : '100%',
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
