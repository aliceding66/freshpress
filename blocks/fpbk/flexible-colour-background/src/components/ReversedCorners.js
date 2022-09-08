import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';

export default () => {
	const { attributes } = getEditorControlsContext();

	return (
		<>
			{ attributes?.reversed_corners?.map( ( corner, index ) => (
				<div
					key={ `corner_${ index }` }
					className={ `d-none d-md-block reversed-corner reversed-corner_${
						corner?.placement ?? 'up-left'
					} reversed-corner_${ corner?.colour ?? 'white' }` }
				>
					<div />
				</div>
			) ) }
		</>
	);
};
