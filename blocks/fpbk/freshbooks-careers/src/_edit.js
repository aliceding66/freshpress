import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `freshbooks-careers my-5 mx-auto ${ getCommonBlockSettingsClass( attributes ) }`,
	} );
	// eslint-disable-next-line no-undef
	const templateData = { ...attributes, ...freshbooksCareerTemplateData };

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
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ templateData }
					components={ {
						editor_pagination: (
							<li className="freshbooks-careers__page mx-1 d-flex justify-content-center align-items-center active">
								1
							</li>
						),
						editor_careers_items: (
							<a
								href="#0"
								className="freshbooks-careers__item d-flex flex-wrap text-decoration-none"
							>
								<h4 className="freshbooks-careers__item-text freshbooks-careers__item-text_title d-block pr-5 pr-sm-3">
									{ templateData.str_job_title }
								</h4>
								<span className="freshbooks-careers__item-text freshbooks-careers__item-department d-flex align-items-center pr-5 pr-sm-3">
									{ templateData.str_department }
								</span>
								<span className="freshbooks-careers__item-text freshbooks-careers__item-location d-flex align-items-center pr-5 pr-sm-3">
									{ templateData.str_location }
								</span>
							</a>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
