import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const displayRatingClass = attributes.testimonial_quote_display_rating
		? 'testimonial-quote_with-rating'
		: '';
	const blockProps = useBlockProps( {
		className: `testimonial-quote d-flex mx-auto px-3 flex-column flex-lg-row ${ displayRatingClass } ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	// eslint-disable-next-line no-undef
	const templateData = { ...testimonialQuoteTemplateData, ...attributes };

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Select name="testimonial_quote_font_size" />
					<EditorControls.TrueFalse name="testimonial_quote_display_rating" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ templateData }
					components={ {
						testimonial_quote_image: (
							<EditorControls.Image
								inline
								name="testimonial_quote_image"
								className="testimonial-quote__image"
							/>
						),
						testimonial_quote_quote: (
							<EditorControls.RichText
								name="testimonial_quote_quote"
								placeholder={ __( 'Insert quote', 'freshpress-website' ) }
							/>
						),
						testimonial_quote_author_name: (
							<EditorControls.RichText
								name="testimonial_quote_author_name"
								placeholder={ __( 'Author name', 'freshpress-website' ) }
							/>
						),
						testimonial_quote_author_description: (
							<EditorControls.RichText
								name="testimonial_quote_author_description"
								placeholder={ __( 'Author description', 'freshpress-website' ) }
							/>
						),
						testimonial_quote_author_location: (
							<EditorControls.RichText
								name="testimonial_quote_author_location"
								placeholder={ __( 'Author location', 'freshpress-website' ) }
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
