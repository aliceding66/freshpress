import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';

export default ( props ) => {
	const { dispatch } = getEditorControlsContext();

	const {
		columnIndex,
		indexName,
		index,
		moveDownAction,
		moveUpAction,
		rowIndex,
		removeAction,
	} = props;

	return (
		<ToolbarGroup>
			<ToolbarButton
				icon="arrow-up-alt2"
				onClick={ () => {
					dispatch( {
						type: moveUpAction,
						columnIndex,
						rowIndex,
						[ indexName ]: index,
					} );
				} }
			/>
			<ToolbarButton
				icon="arrow-down-alt2"
				onClick={ () => {
					dispatch( {
						type: moveDownAction,
						columnIndex,
						rowIndex,
						[ indexName ]: index,
					} );
				} }
			/>
			<ToolbarButton
				icon="no-alt"
				onClick={ () => {
					dispatch( {
						type: removeAction,
						columnIndex,
						rowIndex,
						[ indexName ]: index,
					} );
				} }
			/>
		</ToolbarGroup>
	);
};
