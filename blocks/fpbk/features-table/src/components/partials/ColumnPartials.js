import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';
import EditorControls from 'scripts/components/_EditorControls';
import Template from 'scripts/components/_Template';
import RepeatedElementControls from '../RepeatedElementControls';
import columnHeaderPartialTemplate from '../../../templates/column/header.partial.mustache';
import * as actions from '../../state/_actions';
import { MAX_COLUMNS_AMOUNT } from '../../state/_manager';

export default () => {
	const { dispatch, dispatchWidth, state } = getEditorControlsContext();

	const columnPartials = state.columns.map( ( column, columnIndex ) => (
		<Template
			key={ column.key }
			template={ columnHeaderPartialTemplate }
			attributes={ column }
			components={ {
				heading: (
					<EditorControls.RichText
						isSimple
						value={ column.heading }
						onChange={ ( value ) => {
							dispatch( {
								type: actions.EDIT_COLUMN_HEADING,
								value,
								columnIndex,
							} );
						} }
					/>
				),
				admin_column_controls: (
					<div className="d-inline-flex flex-column align-items-center">
						<RepeatedElementControls
							dispatch={ dispatch }
							indexName="columnIndex"
							index={ columnIndex }
							movePreviousAction={ actions.MOVE_COLUMN_LEFT }
							removeAction={ actions.REMOVE_COLUMN }
							moveNextAction={ actions.MOVE_COLUMN_RIGHT }
						/>
						<EditorControls.ColourPicker
							inline
							isSmall
							value={ column.background_colour }
							label={ __( ' Background colour', 'freshpress-website' ) }
							onChange={ ( value ) => {
								dispatch( {
									type: actions.EDIT_COLUMN_BACKGROUND_COLOUR,
									columnIndex,
									value,
								} );
							} }
						/>
						<EditorControls.Text
							// eslint-disable-next-line @wordpress/i18n-translator-comments
							label={ __( 'Width (e.g. 200px, 30% etc.)', 'freshpress-website' ) }
							value={ column.width }
							onChange={ ( value ) => {
								dispatchWidth( actions.EDIT_COLUMN_WIDTH, value, { columnIndex } );
							} }
						/>
					</div>
				),
			} }
		/>
	) );

	columnPartials.push(
		<th key="add-column-admin-button">
			<Button
				disabled={ state.columns.length >= MAX_COLUMNS_AMOUNT }
				isSecondary
				icon="plus"
				showTooltip={ true }
				title={ __( 'Add column', 'freshpress-website' ) }
				onClick={ () => {
					dispatch( { type: actions.ADD_COLUMN } );
				} }
			/>
		</th>
	);

	return columnPartials;
};
