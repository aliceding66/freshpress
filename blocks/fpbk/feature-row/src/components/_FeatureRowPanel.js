import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import * as columnActions from '../../state/columns/_actions';
import {
	getBlockAttributesDefinitions,
	getEditorControlsContext,
	getBlockAttributeSubfieldDefinition,
} from 'scripts/components/EditorControls/_helpers';

export default ( props ) => {
	const { columns = [], dispatch: columnDispatch } = props;
	const { blockName } = getEditorControlsContext();

	const columnsPanelBodyFields = [];

	const columnsDefinition = getBlockAttributesDefinitions( blockName )?.columns;
	const typeFieldDefinition = getBlockAttributeSubfieldDefinition( blockName, 'columns', 'type' );
	const ctaFieldDefinition = getBlockAttributeSubfieldDefinition( blockName, 'columns', 'cta' );
	const secondaryCtaFieldDefinition = getBlockAttributeSubfieldDefinition(
		blockName,
		'columns',
		'secondary_cta'
	);
	const imageMobileMaxWidthFieldDefinition = getBlockAttributeSubfieldDefinition(
		blockName,
		'columns',
		'image_mobile_max_width'
	);
	const alignToGutterFieldDefinition = getBlockAttributeSubfieldDefinition(
		blockName,
		'columns',
		'align_to_gutter'
	);

	{
		columns.forEach( ( column, index ) => {
			const typeFieldChoices = Object.fromEntries(
				Object.entries( typeFieldDefinition.choices ).filter( ( [ key ] ) => {
					const selectedTabs = columns.filter( ( c ) => c.type === 'tabs' ).length;

					return key !== 'tabs' || column.type === 'tabs' || selectedTabs === 0;
				} )
			);

			columnsPanelBodyFields.push(
				<>
					<EditorControls.Select
						{ ...typeFieldDefinition }
						choices={ typeFieldChoices }
						value={ column.type }
						onChange={ ( value ) =>
							columnDispatch( {
								type: columnActions.EDIT_COLUMN_TYPE,
								index,
								value,
							} )
						}
					/>
					{ 'content' === column.type && (
						<>
							<EditorControls.Link
								value={ column.cta }
								label={ ctaFieldDefinition.label }
								instructions={ ctaFieldDefinition.instructions }
								onChange={ ( value ) =>
									columnDispatch( {
										type: columnActions.EDIT_COLUMN_CTA,
										index,
										value,
									} )
								}
							/>
							<EditorControls.Link
								value={ column.secondary_cta }
								label={ secondaryCtaFieldDefinition.label }
								instructions={ secondaryCtaFieldDefinition.instructions }
								onChange={ ( value ) =>
									columnDispatch( {
										type: columnActions.EDIT_COLUMN_SECONDARY_CTA,
										index,
										value,
									} )
								}
							/>
						</>
					) }

					{ 'image' === column.type && (
						<>
							<EditorControls.Text
								value={ column.image_mobile_max_width }
								label={ imageMobileMaxWidthFieldDefinition.label }
								help={ imageMobileMaxWidthFieldDefinition.instructions }
								onChange={ ( value ) =>
									columnDispatch( {
										type: columnActions.EDIT_COLUMN_IMAGE_MOBILE_MAX_WIDTH,
										index,
										value,
									} )
								}
							/>
							<EditorControls.TrueFalse
								value={ column.align_to_gutter }
								label={ alignToGutterFieldDefinition.label }
								help={ alignToGutterFieldDefinition.instructions }
								onChange={ ( value ) =>
									columnDispatch( {
										type: columnActions.EDIT_COLUMN_IMAGE_ALIGN_TO_GUTTER,
										index,
										value,
									} )
								}
							/>
						</>
					) }
				</>
			);
		} );
	}

	return (
		<InspectorControls>
			<PanelBody title={ columnsDefinition.label } initialyOpened={ true }>
				{ columnsPanelBodyFields }
			</PanelBody>

			<EditorControls.Acf.Accordion name="block_settings" />
			<EditorControls.Acf.CommonBlockSettings />
		</InspectorControls>
	);
};
