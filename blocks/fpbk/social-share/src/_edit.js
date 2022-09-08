import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import { getAlignClass, generateSocialInfo } from './_utils';
import SharePlatformGroups from './components/_SharePlatformGroups';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `social-share ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	const shareIconsOrderDefinition = useSelect( ( select ) => {
		return select( 'core/blocks' ).getBlockType( blockName )?.attributes?.share_icons_order;
	}, [] );

	const templateData = { ...attributes };
	templateData.social_info = generateSocialInfo( attributes, shareIconsOrderDefinition );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes, shareIconsOrderDefinition } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.ColourPicker name="share_text_colour" />
					<SharePlatformGroups />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ getAlignClass( attributes?.align ) }>
					<Template
						template={ blockTemplate }
						attributes={ templateData }
						components={ {
							share_text: <EditorControls.RichText isSimple name="share_text" />,
						} }
					/>
				</div>
			</div>
		</EditorControls.Context.Provider>
	);
}
