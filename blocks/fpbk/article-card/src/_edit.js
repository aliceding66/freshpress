import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { _x, __, sprintf } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `article-card position-relative d-flex flex-wrap flex-column w-100 my-0 ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	// eslint-disable-next-line no-undef
	const templateData = { ...articleCardTemplateData, ...attributes };

	templateData.read_min = sprintf(
		/* Translators: Article read time in minutes. */
		_x( '%1$s Min. Read', 'Read time', 'freshpress-website' ),
		attributes.read_time ? attributes.read_time : '-'
	);

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Image name="bg_image" />
					<EditorControls.Text name="article_url" />
					<EditorControls.Number name="read_time" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ templateData }
					components={ {
						category: (
							<EditorControls.RichText
								isSimple
								name="category"
								placeholder={ __( 'Insert category', 'freshpress-website' ) }
							/>
						),
						article_title: (
							<EditorControls.RichText
								isSimple
								name="article_title"
								placeholder={ __( 'Insert article title', 'freshpress-website' ) }
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
