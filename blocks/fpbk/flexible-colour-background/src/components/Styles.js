import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';

export default () => {
	const { attributes, blockProps } = getEditorControlsContext();

	const selector = `#${ blockProps.id }`;
	let style = '';

	if ( attributes.background_colour ) {
		style += `${ selector } {
				background-color: ${ attributes.background_colour.hex }
			}`;
	}

	if ( Array.isArray( attributes.background_images ) ) {
		attributes.background_images.forEach( ( background ) => {
			const backgroundColour = background.background_colour
				? `background-color: ${ background.background_colour.hex };`
				: '';
			const maxWidth = background.max_width
				? `max-width: ${ background.max_width }; margin-left: auto; margin-right: auto;`
				: '';
			const minHeight = background.min_height
				? `min-height: ${ background.min_height };`
				: '';

			style += `@media screen and (min-width: ${ background.screen_size }px) {
					${ selector } {
						${ backgroundColour }
						${ maxWidth }
						${ minHeight }
					}
				}`;
		} );
	}

	return <style>{ style }</style>;
};
