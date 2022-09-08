import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `did-you-know ${ getCommonBlockSettingsClass( attributes ) }`,
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
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ attributes }
					components={ {
						did_you_know_image: (
							<EditorControls.Image
								inline
								className="did-you-know__image h-auto"
								name="did_you_know_image"
							/>
						),
						did_you_know_heading: (
							<EditorControls.RichText
								isSimple
								name="did_you_know_heading"
								className="did-you-know__heading mt-2 mb-4"
								placeholder={ __( 'Insert heading', 'fpbk' ) }
							/>
						),
						did_you_know_description: (
							<EditorControls.RichText
								name="did_you_know_description"
								className="did-you-know__description mb-4"
								placeholder={ __( 'Insert description', 'fpbk' ) }
							/>
						),
						did_you_know_cta: (
							<EditorControls.Link
								inline
								name="did_you_know_cta"
								className="did-you-know__cta btn btn-cta-green btn-block btn-lg"
							/>
						),
						did_you_know_top_sub_text: (
							<EditorControls.RichText
								name="did_you_know_top_sub_text"
								isSimple
								className="did-you-know__sub-text my-3"
								placeholder={ __( 'Insert Top Sub text', 'fpbk' ) }
							/>
						),
						did_you_know_bottom_sub_text: (
							<EditorControls.RichText
								name="did_you_know_bottom_sub_text"
								isSimple
								className="did-you-know__sub-text my-2"
								placeholder={ __( 'Insert Bottom Sub text', 'fpbk' ) }
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
