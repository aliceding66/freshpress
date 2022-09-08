import { nanoid } from 'nanoid';
import * as actions from './_actions';

/**
 * @param {Array} array
 * @param {number} index
 * @return {Array} Array with moved item left/up.
 */
const moveArrayItemPrevious = ( array, index ) => {
	const movedArray = [ ...array ];
	const previousItem = movedArray[ index - 1 ];
	movedArray[ index - 1 ] = movedArray[ index ];
	movedArray[ index ] = previousItem;
	return movedArray;
};

/**
 * @param {Array} array
 * @param {number} index
 * @return {Array} Array with moved item right/down.
 */
const moveArrayItemNext = ( array, index ) => {
	const movedArray = [ ...array ];
	const nextItem = movedArray[ index + 1 ];
	movedArray[ index + 1 ] = movedArray[ index ];
	movedArray[ index ] = nextItem;
	return movedArray;
};

/**
 * @param {Array} rowTitles Row titles.
 * @return {Object} Empty column item.
 */
export const getEmptyColumn = ( rowTitles = [] ) => {
	return {
		key: `column_${ nanoid() }`,
		heading: '',
		background_colour: { hex: '' },
		width: '',
		rows: rowTitles.map( () => getEmptyRow() ),
	};
};

/**
 * @return {Object} Empty row item.
 */
export const getEmptyRow = () => {
	return {
		mark_check_green: false,
		mark_check_grey: false,
		mark_x: false,
		list: [],
		paragraphs: [],
	};
};

/**
 * @return {Object} Empty row title item.
 */
export const getEmptyRowTitle = () => {
	return {
		key: `row_title_${ nanoid() }`,
		title: '',
		padding: 'normal',
		font_size: 'normal',
	};
};

/**
 * @param {Object} state
 * @param {Object} action
 * @param {string} action.type Action to be executed.
 * @param {number} action.columnIndex columns index (optional).
 * @param {number} action.rowIndex columns[*].row and row_titles index (optional).
 * @param {number} action.listIndex columns[*].rows[*].list index (optional).
 * @param {number} action.paragraphIndex columns[*].rows[*].paragraph index (optional).
 * @return {Object} Edited state bu reducer action.
 */
export default ( state, action ) => {
	/**
	 * @param {string} fieldName
	 * @return {Object} Edited state.
	 */
	const editRowTitleFieldAtIndex = ( fieldName ) => {
		const editedState = { ...state };
		editedState.row_titles[ action.rowIndex ][ fieldName ] = action.value;

		return editedState;
	};

	/**
	 * @param {string} fieldName
	 * @return {Object} Edited state.
	 */
	const editColumnFieldAtIndex = ( fieldName ) => {
		const editedState = { ...state };
		editedState.columns[ action.columnIndex ][ fieldName ] = action.value;

		return editedState;
	};

	/**
	 * @param {string} fieldName
	 * @return {Object} Edited state.
	 */
	const editColumnRowFieldAtIndex = ( fieldName ) => {
		const editedState = { ...state };
		editedState.columns[ action.columnIndex ].rows[ action.rowIndex ][ fieldName ] =
			action.value;

		return editedState;
	};

	/**
	 * @param {string} fieldName
	 * @return {Object} Edited state.
	 */
	const editColumnRowListFieldAtIndex = ( fieldName ) => {
		const editedState = { ...state };
		editedState.columns[ action.columnIndex ].rows[ action.rowIndex ].list[ action.listIndex ][
			fieldName
		] = action.value;

		return editedState;
	};

	/**
	 * @param {string} fieldName
	 * @return {Object} Edited state.
	 */
	const editColumnRowParagraphFieldAtIndex = ( fieldName ) => {
		const editedState = { ...state };
		editedState.columns[ action.columnIndex ].rows[ action.rowIndex ].paragraphs[
			action.paragraphIndex
		][ fieldName ] = action.value;

		return editedState;
	};

	/**
	 * Reducer main switch.
	 */
	switch ( action.type ) {
		case actions.EDIT_ROTATE_TITLES_ON_MOBILE:
			return { ...state, table_rotate_titles: action.value };

		case actions.EDIT_TABLE_MIN_WIDTH:
			return { ...state, table_min_width: action.value };

		case actions.EDIT_TITLE_COLUMN_WIDTH:
			return { ...state, title_column_width: action.value };

		case actions.ADD_ROW:
			const newRowState = {
				...state,
				row_titles: [ ...state.row_titles, getEmptyRowTitle() ],
			};

			newRowState.columns = newRowState.columns.map( ( column ) => {
				column.rows.push( getEmptyRow() );

				return column;
			} );

			return newRowState;

		case actions.REMOVE_ROW:
			const removeRowTitleState = { ...state };
			removeRowTitleState.row_titles.splice( action.rowIndex, 1 );

			removeRowTitleState.columns = removeRowTitleState.columns.map( ( column ) => {
				column.rows.splice( action.rowIndex, 1 );

				return column;
			} );

			return removeRowTitleState;

		case actions.MOVE_ROW_UP:
			if ( action.rowIndex > 0 ) {
				const moveRowUpState = { ...state };
				moveRowUpState.row_titles = moveArrayItemPrevious(
					moveRowUpState.row_titles,
					action.rowIndex
				);

				moveRowUpState.columns = moveRowUpState.columns.map( ( column ) => {
					column.rows = moveArrayItemPrevious( column.rows, action.rowIndex );

					return column;
				} );

				return moveRowUpState;
			}

			return state;

		case actions.MOVE_ROW_DOWN:
			if ( action.rowIndex < state.row_titles.length - 1 ) {
				const moveRowDownState = { ...state };
				moveRowDownState.row_titles = moveArrayItemNext(
					moveRowDownState.row_titles,
					action.rowIndex
				);

				moveRowDownState.columns = moveRowDownState.columns.map( ( column ) => {
					column.rows = moveArrayItemNext( column.rows, action.rowIndex );

					return column;
				} );

				return moveRowDownState;
			}

			return state;

		case actions.EDIT_ROW_TITLE_TITLE:
			return editRowTitleFieldAtIndex( 'title' );

		case actions.EDIT_ROW_TITLE_PADDING:
			return editRowTitleFieldAtIndex( 'padding' );

		case actions.EDIT_ROW_TITLE_FONT_SIZE:
			return editRowTitleFieldAtIndex( 'font_size' );

		case actions.ADD_COLUMN:
			const newColumnState = { ...state };
			newColumnState.columns.push( getEmptyColumn( state.row_titles ) );

			return newColumnState;

		case actions.REMOVE_COLUMN:
			const removeColumnState = { ...state };
			removeColumnState.columns.splice( action.columnIndex, 1 );

			return removeColumnState;

		case actions.EDIT_COLUMN_HEADING:
			return editColumnFieldAtIndex( 'heading' );

		case actions.EDIT_COLUMN_BACKGROUND_COLOUR:
			return editColumnFieldAtIndex( 'background_colour' );

		case actions.EDIT_COLUMN_WIDTH:
			return editColumnFieldAtIndex( 'width' );

		case actions.MOVE_COLUMN_LEFT:
			if ( action.columnIndex > 0 ) {
				const moveColumnLeftState = { ...state };
				moveColumnLeftState.columns = moveArrayItemPrevious(
					moveColumnLeftState.columns,
					action.columnIndex
				);

				return moveColumnLeftState;
			}

			return state;

		case actions.MOVE_COLUMN_RIGHT:
			if ( action.columnIndex < state.columns.length - 1 ) {
				const moveColumnRightState = { ...state };
				moveColumnRightState.columns = moveArrayItemNext(
					moveColumnRightState.columns,
					action.columnIndex
				);

				return moveColumnRightState;
			}

			return state;

		case actions.EDIT_COLUMN_ROW_MARK_CHECK_GREEN:
			return editColumnRowFieldAtIndex( 'mark_check_green' );

		case actions.EDIT_COLUMN_ROW_MARK_CHECK_GREY:
			return editColumnRowFieldAtIndex( 'mark_check_grey' );

		case actions.EDIT_COLUMN_ROW_MARK_X:
			return editColumnRowFieldAtIndex( 'mark_x' );

		case actions.ADD_COLUMN_ROW_LIST:
			const addColumnRowListState = { ...state };
			addColumnRowListState.columns[ action.columnIndex ].rows[ action.rowIndex ].list.push( {
				key: `list_${ nanoid() }`,
				style: 'normal',
				text: '',
			} );

			return addColumnRowListState;

		case actions.REMOVE_COLUMN_ROW_LIST:
			const removeColumnRowListState = { ...state };
			removeColumnRowListState.columns[ action.columnIndex ].rows[
				action.rowIndex
			].list.splice( action.listIndex, 1 );

			return removeColumnRowListState;

		case actions.EDIT_COLUMN_ROW_LIST_STYLE:
			return editColumnRowListFieldAtIndex( 'style' );

		case actions.EDIT_COLUMN_ROW_LIST_TEXT:
			return editColumnRowListFieldAtIndex( 'text' );

		case actions.MOVE_COLUMN_ROW_LIST_UP:
			if ( action.listIndex > 0 ) {
				const moveColumnRowListUpState = { ...state };
				moveColumnRowListUpState.columns[ action.columnIndex ].rows[
					action.rowIndex
				].list = moveArrayItemPrevious(
					moveColumnRowListUpState.columns[ action.columnIndex ].rows[ action.rowIndex ]
						.list,
					action.listIndex
				);

				return moveColumnRowListUpState;
			}

			return state;

		case actions.MOVE_COLUMN_ROW_LIST_DOWN:
			if (
				action.listIndex <
				state.columns[ action.columnIndex ].rows[ action.rowIndex ].list.length - 1
			) {
				const moveColumnRowListDownState = { ...state };
				moveColumnRowListDownState.columns[ action.columnIndex ].rows[
					action.rowIndex
				].list = moveArrayItemNext(
					moveColumnRowListDownState.columns[ action.columnIndex ].rows[ action.rowIndex ]
						.list,
					action.listIndex
				);

				return moveColumnRowListDownState;
			}

			return state;

		case actions.ADD_COLUMN_ROW_PARAGRAPH:
			const addColumnRowParagraphState = { ...state };
			addColumnRowParagraphState.columns[ action.columnIndex ].rows[
				action.rowIndex
			].paragraphs.push( {
				key: `paragraph_${ nanoid() }`,
				bolded: false,
				text: '',
			} );

			return addColumnRowParagraphState;

		case actions.REMOVE_COLUMN_ROW_PARAGRAPH:
			const removeColumnRowParagraphState = { ...state };
			removeColumnRowParagraphState.columns[ action.columnIndex ].rows[
				action.rowIndex
			].paragraphs.splice( action.paragraphIndex, 1 );

			return removeColumnRowParagraphState;

		case actions.EDIT_COLUMN_ROW_PARAGRAPH_BOLDED:
			return editColumnRowParagraphFieldAtIndex( 'bolded' );

		case actions.EDIT_COLUMN_ROW_PARAGRAPH_TEXT:
			return editColumnRowParagraphFieldAtIndex( 'text' );

		case actions.MOVE_COLUMN_ROW_PARAGRAPH_UP:
			if ( action.paragraphIndex > 0 ) {
				const moveColumnRowParagraphUpState = { ...state };
				moveColumnRowParagraphUpState.columns[ action.columnIndex ].rows[
					action.rowIndex
				].paragraphs = moveArrayItemPrevious(
					moveColumnRowParagraphUpState.columns[ action.columnIndex ].rows[
						action.rowIndex
					].paragraphs,
					action.paragraphIndex
				);

				return moveColumnRowParagraphUpState;
			}

			return state;

		case actions.MOVE_COLUMN_ROW_PARAGRAPH_DOWN:
			if (
				action.paragraphIndex <
				state.columns[ action.columnIndex ].rows[ action.rowIndex ].paragraphs.length - 1
			) {
				const moveColumnRowParagraphDownState = { ...state };
				moveColumnRowParagraphDownState.columns[ action.columnIndex ].rows[
					action.rowIndex
				].paragraphs = moveArrayItemNext(
					moveColumnRowParagraphDownState.columns[ action.columnIndex ].rows[
						action.rowIndex
					].paragraphs,
					action.paragraphIndex
				);

				return moveColumnRowParagraphDownState;
			}

			return state;

		default:
			return state;
	}
};
