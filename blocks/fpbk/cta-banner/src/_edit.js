import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `cta-banner ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<InnerBlocks
					template={ [
						[
							'fpbk/columns',
							{},
							[
								[
									'fpbk/column',
									{
										bootstrap_class: 'col col-8 col-md-8',
									},
									[
										[
											'core/heading',
											{
												content: __(
													'Tools and Resources to Grow Your Business'
												),
												className: 'banner-heading',
											},
										],
									],
								],
								[
									'fpbk/column',
									{
										bootstrap_class: 'col col-md-4 col-4',
										className: 'align-items-end justify-content-center l-50',
									},
									[
										[
											'fpbk/button',
											{
												button_link: {
													url: __( '/signup' ),
													title: __( 'SIGN ME UP' ),
												},
												button_max_width: '242px',
												className: 'is-style-btn-midnight-blue',
											},
										],
									],
								],
							],
						],
					] }
					templateLock="all"
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
