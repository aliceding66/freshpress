import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: getCommonBlockSettingsClass( attributes ),
	} );

	const templateData = { ...attributes };

	let buttonClassName = 'btn-cta-green';
	if ( blockProps.className.includes( 'is-style-btn-white' ) ) {
		buttonClassName = 'btn-white';
	}
	if ( blockProps.className.includes( 'is-style-btn-midnight-blue' ) ) {
		buttonClassName = 'btn-midnight-blue';
	}

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Link name="button_link" />
					<EditorControls.Text name="button_max_width" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					className="button my-0"
					template={ blockTemplate }
					attributes={ templateData }
					components={ {
						button_link: (
							<EditorControls.Link
								inline
								className={ `btn ${ buttonClassName }` }
								name="button_link"
								value={ templateData.button_link }
								onChange={ ( newLink ) => {
									setAttributes( {
										button_link: newLink,
									} );
								} }
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
