import { Button, Toolbar, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import columnRowItemPartialTemplate from '../../../templates/column/row-item.partial.mustache';
import RepeatedElementControls from '../RepeatedElementControls';
import ToolbarGroupRepeatedControls from './row-components/ToolbarGroupRepeatedControls';
import ImageToggle from './row-components/ImageToggle';
import * as actions from '../../state/_actions';
import ToolbarListItemStyleButton from './row-components/ToolbarListItemStyleButton';
import RowTitleSelect from './row-components/RowTitleSelect';

const {
	mark_check_green_src: markCheckGreenSrc,
	mark_check_grey_src: markCheckGreySrc,
	mark_x_src: markXSrc,
} = featuresTableTemplateData; // eslint-disable-line no-undef

export default () => {
	const { dispatch, state } = getEditorControlsContext();

	const rowPartials = state.row_titles.map( ( rowTitle, rowIndex ) => {
		const columnRowItems = [];

		state.columns.forEach( ( column, columnIndex ) => {
			const columnRow = column.rows[ rowIndex ] ?? {};
			const rowTemplateData = {
				...columnRow,
				background_colour: column?.background_colour,
				list_exists: columnRow.list.length > 0,
				// All below are true to show editable elements.
				mark_check_green: true,
				mark_check_grey: true,
				mark_x: true,
			};

			const paragraphItems = columnRow.paragraphs.map( ( paragraph, paragraphIndex ) => (
				<div
					key={ paragraph.key }
					className="block-editor-rich-text__toolbar-wrapper position-relative"
				>
					<EditorControls.RichText
						isSimple
						className={ `mb-2${ paragraph.bolded ? ' font-weight-bold' : '' }` }
						value={ paragraph.text }
						placeholder={ __( 'Insert paragraph', 'freshpress-website' ) }
						onChange={ ( value ) => {
							dispatch( {
								type: actions.EDIT_COLUMN_ROW_PARAGRAPH_TEXT,
								value,
								columnIndex,
								rowIndex,
								paragraphIndex,
							} );
						} }
					/>
					<Toolbar
						label={ __( 'Paragraph', 'freshpress-website' ) }
						className="position-absolute block-editor-rich-text__toolbar"
					>
						<ToolbarGroup>
							<ToolbarButton
								icon="editor-bold"
								label={ __( 'Bold', 'freshpress-website' ) }
								isActive={ paragraph.bolded }
								onClick={ () => {
									dispatch( {
										type: actions.EDIT_COLUMN_ROW_PARAGRAPH_BOLDED,
										value: ! paragraph.bolded,
										columnIndex,
										rowIndex,
										paragraphIndex,
									} );
								} }
							/>
						</ToolbarGroup>
						<ToolbarGroupRepeatedControls
							columnIndex={ columnIndex }
							rowIndex={ rowIndex }
							indexName="paragraphIndex"
							index={ paragraphIndex }
							moveUpAction={ actions.MOVE_COLUMN_ROW_PARAGRAPH_UP }
							moveDownAction={ actions.MOVE_COLUMN_ROW_PARAGRAPH_DOWN }
							removeAction={ actions.REMOVE_COLUMN_ROW_PARAGRAPH }
						/>
					</Toolbar>
				</div>
			) );

			const listItems = columnRow.list.map( ( listItem, listIndex ) => (
				<li
					key={ listItem.key }
					className={ `block-editor-rich-text__toolbar-wrapper position-relative d-flex mb-2 ${ listItem.style }` }
				>
					<span className="features-table__list--icon">
						<EditorControls.RichText
							isSimple
							className="text-center position-relative"
							value={ listItem.text }
							placeholder={ __( 'Insert list item', 'freshpress-website' ) }
							onChange={ ( value ) => {
								dispatch( {
									type: actions.EDIT_COLUMN_ROW_LIST_TEXT,
									value,
									columnIndex,
									rowIndex,
									listIndex,
								} );
							} }
						/>
					</span>
					<Toolbar
						label={ __( 'List item', 'freshpress-website' ) }
						className="position-absolute block-editor-rich-text__toolbar"
					>
						<ToolbarGroup>
							<ToolbarListItemStyleButton
								columnIndex={ columnIndex }
								rowIndex={ rowIndex }
								listIndex={ listIndex }
								listItem={ listItem }
								src={ markCheckGreenSrc }
								value={ 'normal' }
								label={ 'Normal' }
							/>
							<ToolbarListItemStyleButton
								columnIndex={ columnIndex }
								rowIndex={ rowIndex }
								listIndex={ listIndex }
								listItem={ listItem }
								src={ markCheckGreySrc }
								value={ 'grey-check' }
								label={ 'With Grey Check Mark' }
							/>
							<ToolbarListItemStyleButton
								columnIndex={ columnIndex }
								rowIndex={ rowIndex }
								listIndex={ listIndex }
								listItem={ listItem }
								src={ markXSrc }
								value={ 'greyed-out' }
								label={ 'Greyed Out with Cross Mark' }
							/>
						</ToolbarGroup>
						<ToolbarGroupRepeatedControls
							columnIndex={ columnIndex }
							rowIndex={ rowIndex }
							indexName="listIndex"
							index={ listIndex }
							moveUpAction={ actions.MOVE_COLUMN_ROW_LIST_UP }
							moveDownAction={ actions.MOVE_COLUMN_ROW_LIST_DOWN }
							removeAction={ actions.REMOVE_COLUMN_ROW_LIST }
						/>
					</Toolbar>
				</li>
			) );

			columnRowItems.push(
				<Template
					key={ `column_${ columnIndex }_row_${ rowIndex }` }
					template={ columnRowItemPartialTemplate }
					attributes={ rowTemplateData }
					components={ {
						mark_check_green_image: (
							<ImageToggle
								src={ markCheckGreenSrc }
								active={ columnRow?.mark_check_green === true }
								action={ actions.EDIT_COLUMN_ROW_MARK_CHECK_GREEN }
								columnIndex={ columnIndex }
								rowIndex={ rowIndex }
							/>
						),
						mark_check_grey_image: (
							<ImageToggle
								src={ markCheckGreySrc }
								active={ columnRow?.mark_check_grey === true }
								action={ actions.EDIT_COLUMN_ROW_MARK_CHECK_GREY }
								columnIndex={ columnIndex }
								rowIndex={ rowIndex }
							/>
						),
						mark_x_image: (
							<ImageToggle
								src={ markXSrc }
								active={ columnRow?.mark_x === true }
								action={ actions.EDIT_COLUMN_ROW_MARK_X }
								columnIndex={ columnIndex }
								rowIndex={ rowIndex }
							/>
						),
						admin_paragraphs: paragraphItems,
						admin_add_paragraph: (
							<Button
								isSecondary
								isSmall
								className="w-auto d-block"
								icon="plus"
								text={ __( 'Add paragraph', 'freshpress-website' ) }
								onClick={ () => {
									dispatch( {
										type: actions.ADD_COLUMN_ROW_PARAGRAPH,
										columnIndex,
										rowIndex,
									} );
								} }
							/>
						),
						admin_list: listItems,
						admin_add_list: (
							<Button
								isSecondary
								isSmall
								className="w-auto d-block"
								icon="plus"
								text={ __( 'Add list item', 'freshpress-website' ) }
								onClick={ () => {
									dispatch( {
										type: actions.ADD_COLUMN_ROW_LIST,
										columnIndex,
										rowIndex,
									} );
								} }
							/>
						),
					} }
				/>
			);
		} );

		return (
			<tr key={ rowTitle.key }>
				<td
					className={ `text-uppercase text-left font-${ rowTitle.font_size } padding-${ rowTitle.padding }` }
				>
					<EditorControls.RichText
						isSimple
						value={ rowTitle.title }
						onChange={ ( value ) => {
							dispatch( { type: actions.EDIT_ROW_TITLE_TITLE, rowIndex, value } );
						} }
					/>
					<RowTitleSelect
						rowIndex={ rowIndex }
						action={ actions.EDIT_ROW_TITLE_PADDING }
						label={ __( 'Padding', 'freshpress-website' ) }
						value={ rowTitle.padding }
					/>
					<RowTitleSelect
						rowIndex={ rowIndex }
						action={ actions.EDIT_ROW_TITLE_FONT_SIZE }
						label={ __( 'Font size', 'freshpress-website' ) }
						value={ rowTitle.font_size }
					/>
				</td>
				{ columnRowItems }
				<td>
					<RepeatedElementControls
						vertical
						indexName="rowIndex"
						index={ rowIndex }
						movePreviousAction={ actions.MOVE_ROW_UP }
						removeAction={ actions.REMOVE_ROW }
						moveNextAction={ actions.MOVE_ROW_DOWN }
					/>
				</td>
			</tr>
		);
	} );
	rowPartials.push(
		<tr key="add-row-admin-button">
			<td colSpan={ state.columns.length + 2 }>
				<Button
					isSecondary
					icon="plus"
					text={ __( 'Add row', 'freshpress-website' ) }
					onClick={ () => {
						dispatch( { type: actions.ADD_ROW } );
					} }
				/>
			</td>
		</tr>
	);

	return rowPartials;
};
