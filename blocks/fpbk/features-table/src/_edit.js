import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import ColumnPartials from './components/partials/ColumnPartials';
import RowPartials from './components/partials/RowPartials';
import { FeaturesTableStateManager } from './state/_manager';
import * as actions from './state/_actions';
import { name as blockName } from '../block.json';

const columnWidthTimeouts = [];

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `features-table ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	const [ state, dispatch ] = new FeaturesTableStateManager( attributes, setAttributes );

	/**
	 * Helper function to dispatch and auto add 'px' to width if missing.
	 *
	 * @param {string} action
	 * @param {any} value
	 * @param {Object} restParams
	 */
	const dispatchWidth = ( action, value, restParams = {} ) => {
		dispatch( { type: action, value, ...restParams } );

		if ( columnWidthTimeouts[ action ] ) {
			clearTimeout( columnWidthTimeouts[ action ] );
		}
		columnWidthTimeouts[ action ] = setTimeout( () => {
			if ( /^\d+$/.test( value ) ) {
				dispatch( {
					type: action,
					value: `${ value }px`,
					...restParams,
				} );
			}
		}, 1000 );
	};

	return (
		<EditorControls.Context.Provider
			value={ {
				attributes,
				blockName,
				clientId,
				setAttributes,
				state,
				dispatch,
				dispatchWidth,
			} }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.TrueFalse
						value={ state.table_rotate_titles }
						onChange={ ( value ) => {
							dispatch( { type: actions.EDIT_ROTATE_TITLES_ON_MOBILE, value } );
						} }
						label={ __( 'Rotate titles on mobile', 'freshpress-website' ) }
					/>
					<EditorControls.Text
						value={ state.table_min_width }
						onChange={ ( value ) => {
							dispatch( { type: actions.EDIT_TABLE_MIN_WIDTH, value } );
						} }
						label={ __( 'Table min width', 'freshpress-website' ) }
					/>
					<EditorControls.Text
						value={ state.title_column_width }
						onChange={ ( value ) => {
							dispatchWidth( actions.EDIT_TITLE_COLUMN_WIDTH, value );
						} }
						label={ __( 'Title column width', 'freshpress-website' ) }
					/>
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<table
					className="w-100"
					style={ state.table_min_width ? { minWidth: state.table_min_width } : {} }
				>
					<thead>
						<tr>
							<th
								className="mw-100"
								scope="col"
								style={
									state.title_column_width
										? { width: state.title_column_width }
										: {}
								}
							/>
							<ColumnPartials />
						</tr>
					</thead>
					<tbody>
						<RowPartials />
					</tbody>
				</table>
			</div>
		</EditorControls.Context.Provider>
	);
}
