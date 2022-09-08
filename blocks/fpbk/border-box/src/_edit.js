import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import Styles from './components/_Style';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	let additionalClassNames = `${ 'none' !== attributes.border_type ? 'border' : '' } ${
		'rounded' === attributes.border_radius ? 'rounded' : ''
	}`;

	if ( attributes.align ) {
		if ( 'right' === attributes.align ) {
			additionalClassNames += ' ml-md-auto mr-md-0';
		} else if ( 'left' === attributes.align ) {
			additionalClassNames += ' mr-md-auto ml-md-0';
		} else {
			additionalClassNames += ' mx-auto';
		}
	}

	const blockProps = useBlockProps( {
		className: `border-box ${ getCommonBlockSettingsClass(
			attributes
		) } ${ additionalClassNames }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.ColourPicker name="background_colour" />
					<EditorControls.Text name="max_width" />
					<EditorControls.Select name="border_radius" />
					<EditorControls.Number name="negative_margin" />
					<EditorControls.Select name="border_type" />
					<EditorControls.ColourPicker name="border_colour" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>
			<div { ...blockProps }>
				<Styles attributes={ attributes } blockProps={ blockProps } />
				<InnerBlocks />
			</div>
		</EditorControls.Context.Provider>
	);
}
