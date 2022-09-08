import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `related-links ${ getCommonBlockSettingsClass( attributes ) }`,
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
					<EditorControls.Select name="links_type" />
					<EditorControls.Select name="select_post_type" />
					<EditorControls.Acf.Repeater name="custom_links" />
					<EditorControls.Number name="number_of_posts" />
					<EditorControls.Select name="order_by" />
					<EditorControls.Select name="posts_visibility" />
					<EditorControls.Select name="select_layout" />
					<EditorControls.TrueFalse name="use_anchors" />
					<EditorControls.Select name="number_of_posts_in_one_row" />
					<EditorControls.Select name="select_categories" />
					<EditorControls.Select name="category_layout" />
					<EditorControls.ColourPicker name="links_colour" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender block="fpbk/related-links" attributes={ attributes } />
			</div>
		</EditorControls.Context.Provider>
	);
}
