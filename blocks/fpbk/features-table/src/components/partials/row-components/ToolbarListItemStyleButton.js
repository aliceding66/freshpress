import { ToolbarButton } from '@wordpress/components';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';
import * as actions from '../../../state/_actions';

export default ( props ) => {
	const { dispatch } = getEditorControlsContext();
	const { columnIndex, rowIndex, listIndex, listItem, label, src, value } = props;

	return (
		<ToolbarButton
			label={ label }
			icon={ <img src={ src } alt={ label } /> }
			isActive={ listItem?.style === value }
			onClick={ () => {
				dispatch( {
					type: actions.EDIT_COLUMN_ROW_LIST_STYLE,
					value,
					columnIndex,
					rowIndex,
					listIndex,
				} );
			} }
		/>
	);
};
