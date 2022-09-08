import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';

// eslint-disable-next-line no-unused-vars
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import Template from 'scripts/components/_Template';
// import blockTemplate from '../templates/block.mustache';
import vatTablePartial from '../templates/table.partial.mustache';
// eslint-disable-next-line no-unused-vars
import * as tableActions from './state/vat_table_cell/_actions';
import reducer from './state/vat_table_cell/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `vat-table ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	const commonTableAttributes = attributes;

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	// eslint-disable-next-line no-unused-vars
	const [ vatTableCell, tableDispatch ] = blockStateManager.addReducerManager(
		reducer,
		'vat_table_cell'
	);

	const tablePartials = [];
	vatTableCell.forEach( ( table, index ) => {
		tablePartials.push(
			<Template
				key={ table.key }
				attributes={ { ...commonTableAttributes } }
				template={ vatTablePartial }
				components={ {
					vat_table_cell__title: (
						<EditorControls.RichText
							isSimple
							className="vat-table-cell__title"
							value={ table.vat_table_cell__title }
							onChange={ ( value ) => {
								tableDispatch( {
									type: tableActions.EDIT_TABLE_TITLE,
									index,
									value,
								} );
							} }
							placeholder={ __( 'Insert title', 'freshpress-website' ) }
						/>
					),
					vat_table_cell__text: (
						<EditorControls.RichText
							className="vat-table-cell__text"
							value={ table.vat_table_cell__text }
							onChange={ ( value ) => {
								tableDispatch( {
									type: tableActions.EDIT_TABLE_TEXT,
									index,
									value,
								} );
							} }
							placeholder={ __( 'Insert text', 'freshpress-website' ) }
						/>
					),
					admin_controls: (
						<div className="block-editor__block-controls d-flex flex-column">
							{ index > 0 && (
								<Button
									isSmall
									onClick={ () => {
										tableDispatch( {
											type: tableActions.MOVE_TABLE_UP,
											index,
										} );
									} }
									icon="arrow-up-alt2"
								/>
							) }
							<Button
								// className="icon__remove-button"
								isDestructive
								isSmall
								onClick={ () => {
									const newTable = [ ...attributes.vat_table_cell ];
									newTable.splice( index, 1 );
									setAttributes( { vat_table_cell: newTable } );
								} }
								icon="no-alt"
							/>
							{ index < vatTableCell.length - 1 && (
								<Button
									isSmall
									onClick={ () => {
										tableDispatch( {
											type: tableActions.MOVE_TABLE_DOWN,
											index,
										} );
									} }
									icon="arrow-down-alt2"
								/>
							) }
						</div>
					),
				} }
			/>
		);
	} );

	tablePartials.push(
		<Button
			key="admin_add_button"
			isSecondary
			className="icon__add-button d-block mx-auto"
			onClick={ () => {
				tableDispatch( {
					type: tableActions.ADD_TABLE,
				} );
			} }
			text={ __( 'Add Column', 'freshpress-website' ) }
			icon="plus"
		/>
	);
	tablePartials.push(
		<Button
			key="admin_remove_button"
			isSecondary
			className="icon__remove-button d-block mx-auto"
			onClick={ () => {
				tableDispatch( {
					type: tableActions.REMOVE_TABLE,
				} );
			} }
			text={ __( 'Remove Column', 'freshpress-website' ) }
			icon="minus"
		/>
	);

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }></PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<div className="vat-table-container">
					<div className="vat-table__title">
						<EditorControls.RichText
							name="vat_table__title"
							placeholder={ __( 'Insert title', 'freshpress-website' ) }
						/>
					</div>
					<div className="vat-table__cell">{ tablePartials }</div>
				</div>
			</div>
		</EditorControls.Context.Provider>
	);
}
