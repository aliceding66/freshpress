import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `search-swiftype ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Text name="swiftype_id" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ attributes }
					components={ {
						admin_search_input: (
							<EditorControls.RichText
								isSimple
								className="search-swiftype__input st-default-search-input form-control mb-2"
								name="placeholder"
								placeholder={ __(
									'Insert search placeholder',
									'freshpress-website'
								) }
							/>
						),
						admin_no_results: (
							<div className="search-swiftype__no-results">
								<EditorControls.RichText
									name="no_result_content"
									placeholder={ __(
										'Insert "No results" content',
										'freshpress-website'
									) }
								/>
							</div>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
