import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import stageTemplate from '../templates/stage.partial.mustache';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

// eslint-disable-next-line @wordpress/no-global-event-listener
window.addEventListener( 'message', ( e ) => {
	if ( e && e.data ) {
		const pardotIframe = document.querySelector( '.pardot-form__iframe' );

		if ( pardotIframe && e.data.frameHeight ) {
			pardotIframe.style.height = `${ e.data.frameHeight }px`;
		}
	}
} );

export default function ( { attributes, clientId, setAttributes } ) {
	const blockPropsAttributes = {
		className: `modal my-0 ${ getCommonBlockSettingsClass( attributes ) }`,
	};

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	if ( attributes.modal_form_include ) {
		blockPropsAttributes.className += ' modal_with-form';
	}

	if ( attributes.modal_pardot ) {
		blockPropsAttributes.className += ' pardot_modal';
	}

	const blockProps = useBlockProps( blockPropsAttributes );
	const isWithStagesTheme = blockProps?.className.includes( 'is-style-with-stages' );

	// eslint-disable-next-line no-undef
	const templateData = { ...modalTemplateData, ...attributes };

	if ( templateData.modal_stages ) {
		templateData.modal_stages.forEach( ( stage, index ) => {
			if ( stage.list_text ) {
				templateData.modal_stages[ index ].list_items = stage.list_text.split( ';\n' );
			}
		} );
	}

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<p className="text-center">Modal ID: { attributes.id }</p>
				<PanelBody initialOpen={ true }>
					{ !! isWithStagesTheme && (
						<EditorControls.Acf.Repeater
							name="modal_stages"
							buttonLabel={ __( 'Add Stage', 'freshpress-website' ) }
						/>
					) }
					{ !! attributes.modal_form_include && ! isWithStagesTheme && (
						<>
							<EditorControls.Text name="pardot_form_url" />
							<EditorControls.Number name="pardot_form_iframe_width" />
							<EditorControls.Text name="pardot_form_form_name" />
							<EditorControls.TrueFalse name="pardot_form_no_close" />
						</>
					) }
					<EditorControls.Acf.Accordion name="visibility_&_behaviour" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				{ isWithStagesTheme ? (
					<Template
						template={ blockTemplate }
						attributes={ templateData }
						components={ {
							modal_stages: (
								<Template template={ stageTemplate } attributes={ templateData } />
							),
						} }
					/>
				) : (
					<Template
						template={ blockTemplate }
						attributes={ templateData }
						components={ {
							modal_title: (
								<EditorControls.RichText
									isSimple
									name="modal_title"
									placeholder={ __( 'Insert title', 'freshpress-website' ) }
								/>
							),
							modal_content_heading: (
								<EditorControls.RichText
									isSimple
									name="modal_content_heading"
									placeholder={ __(
										'Insert content heading',
										'freshpress-website'
									) }
								/>
							),
							modal_description: (
								<EditorControls.RichText
									isSimple
									name="modal_description"
									placeholder={ __( 'Insert description', 'freshpress-website' ) }
								/>
							),
							modal_cta: (
								<EditorControls.Link
									inline
									className="btn btn-cta-green btn-block btn-lg mt-4 mt-sm-5 modal__cta mx-auto"
									name="modal_cta"
								/>
							),
							modal_bottom_text: (
								<EditorControls.RichText
									isSimple
									name="modal_bottom_text"
									placeholder={ __( 'Insert bottom text', 'freshpress-website' ) }
								/>
							),
							modal_close_link_text: (
								<EditorControls.RichText
									isSimple
									name="modal_close_link_text"
									placeholder={ __(
										'Insert close modal text',
										'freshpress-website'
									) }
								/>
							),
							pardot_form: (
								<InnerBlocks
									template={ [
										[
											'fpbk/pardot-form',
											{
												pardot_form_url: attributes.pardot_form_url,
												pardot_form_iframe_width:
													attributes.pardot_form_iframe_width,
												pardot_form_form_name:
													attributes.pardot_form_form_name,
											},
										],
									] }
									templateLock="all"
								/>
							),
						} }
					/>
				) }
			</div>
		</EditorControls.Context.Provider>
	);
}
