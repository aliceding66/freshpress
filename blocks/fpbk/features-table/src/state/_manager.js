import { useDispatch } from '@wordpress/data';
import { useEffect, useReducer } from '@wordpress/element';
import reducer, { getEmptyColumn, getEmptyRowTitle } from './_reducer';

export const MAX_COLUMNS_AMOUNT = 9;

/**
 * @param {Object} state
 * @return {Object} Translated state to attributes.
 */
const stateToAttributes = ( state ) => {
	const attributes = {
		table_rotate_titles: state.table_rotate_titles,
		table_min_width: state.table_min_width,
		table_width_0: state.title_column_width,
		table_row_titles: state.row_titles,
	};

	for (
		let inStateColumnIndex = 0;
		inStateColumnIndex < MAX_COLUMNS_AMOUNT;
		++inStateColumnIndex
	) {
		const columnIndex = inStateColumnIndex + 1;
		const {
			heading = '',
			background_colour: backgroundColour = { hex: '' },
			width = '',
			rows = [],
		} = state.columns[ inStateColumnIndex ] ? state.columns[ inStateColumnIndex ] : {};

		attributes[ `table_heading_${ columnIndex }` ] = heading;
		attributes[ `table_background_colour_${ columnIndex }` ] = backgroundColour;
		attributes[ `table_width_${ columnIndex }` ] = width;
		attributes[ `table_column_${ columnIndex }_rows` ] = rows;
	}

	return attributes;
};

/**
 * @param {Object} attributes
 * @return {Object} Translated attributes to state.
 */
const attributesToState = ( attributes ) => {
	const state = {
		table_rotate_titles: attributes.table_rotate_titles,
		table_min_width: attributes.table_min_width,
		title_column_width: attributes.table_width_0,
		row_titles: attributes.table_row_titles,
		columns: [],
	};

	let processData = false;
	for (
		let inStateColumnIndex = MAX_COLUMNS_AMOUNT - 1;
		inStateColumnIndex >= 0;
		--inStateColumnIndex
	) {
		const columnIndex = inStateColumnIndex + 1; // Due to title column that is always first.

		if (
			processData ||
			( attributes[ `table_heading_${ columnIndex }` ] &&
				attributes[ `table_heading_${ columnIndex }` ] !== '' )
		) {
			if ( ! processData ) {
				processData = true;
			}

			state.columns[ inStateColumnIndex ] = {
				heading: attributes[ `table_heading_${ columnIndex }` ],
				background_colour: attributes[ `table_background_colour_${ columnIndex }` ],
				width: attributes[ `table_width_${ columnIndex }` ],
				rows: [],
			};

			Object.keys( state.row_titles ).forEach( ( rowIndex ) => {
				state.columns[ inStateColumnIndex ].rows[ rowIndex ] =
					attributes[ `table_column_${ columnIndex }_rows` ][ rowIndex ];
			} );
		}
	}

	// Set default values if nothing is there.
	if ( state.row_titles.length === 0 && state.columns.length === 0 ) {
		// Set 1 row and 2 columns.
		state.row_titles.push( getEmptyRowTitle() );
		state.columns.push( getEmptyColumn( state.row_titles ) );
		state.columns.push( getEmptyColumn( state.row_titles ) );
	}

	return state;
};

/**
 * Outputs single state that matches ACF fields and translates them back to attributes properly.
 */
export class FeaturesTableStateManager {
	constructor( attributes, setAttributes ) {
		this.attributes = attributes;
		this.setAttributes = setAttributes;
		this.timeout = null;

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { lockPostSaving, unlockPostSaving } = useDispatch( 'core/editor' );
		const lockEditorKey = 'BlockStateManagerProxy';
		this.lockEditor = () => lockPostSaving( lockEditorKey );
		this.unlockEditor = () => unlockPostSaving( lockEditorKey );

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [ state, dispatch ] = useReducer( reducer, attributesToState( attributes ) );

		this.#setProxy( state );

		return [ state, dispatch ];
	}

	#setProxy( state ) {
		try {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useEffect( () => {
				this.lockEditor();
				if ( this.timeout ) {
					clearTimeout( this.timeout );
				}

				this.timeout = setTimeout( () => {
					this.setAttributes( stateToAttributes( state ) );
					this.unlockEditor();
				}, 100 );
			}, [ state ] );
		} catch ( _ ) {
			this.unlockEditor();
		}
	}
}
