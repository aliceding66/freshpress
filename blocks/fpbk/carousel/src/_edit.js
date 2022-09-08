import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `carousel position-relative overflow-hidden ${ getCommonBlockSettingsClass(
			attributes
		) }`,
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
				<PanelBody initialOpen={ true }>
					<EditorControls.Text name="max_width" />
					<EditorControls.TrueFalse name="navigation" />
					<EditorControls.TrueFalse name="pagination" />
					<EditorControls.Acf.Group name="swiper_settings" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<div className="carousel__swiper-container swiper-container">
					<div className="carousel__swiper-wrapper swiper-wrapper">
						<InnerBlocks
							orientation={ 'horizontal' }
							renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> }
						/>
					</div>
				</div>
			</div>
		</EditorControls.Context.Provider>
	);
}
