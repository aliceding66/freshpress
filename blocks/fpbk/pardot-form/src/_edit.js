import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `pardot-form m-0 p-0 mx-auto ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Text name="pardot_form_url" />
					<EditorControls.Number name="pardot_form_iframe_width" />
					<EditorControls.Text name="pardot_form_form_name" />
					<EditorControls.TrueFalse name="pardot_form_no_close" />
					<EditorControls.Special.ModalPicker
						label="Select Thank You Modal"
						name="pardot_form_thank_you_modal_id"
						emptyLabel="No Thank You modal selected"
					/>
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					style={ { pointerEvents: 'none' } }
					template={ blockTemplate }
					attributes={ attributes }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
