export default ( props ) => {
	const { attributes, blockProps } = props;
	const selector = `#${ blockProps.id }`;
	let style = '';
	const backgroundColour = attributes.background_colour
		? `background-color: ${ attributes.background_colour.hex };`
		: '';
	const maxWidth = attributes.max_width
		? `max-width: ${ attributes.max_width }; margin-left: auto; margin-right: auto;`
		: '';
	const borderColour = attributes.border_colour
		? `border-color: ${ attributes.border_colour.hex } !important;`
		: '';
	const negativeMargin = attributes.negative_margin
		? `margin-top: -${ attributes.negative_margin }px;`
		: '';

	if ( backgroundColour || maxWidth || borderColour || negativeMargin ) {
		style = `${ selector } {
				${ backgroundColour }
				${ maxWidth }
				${ borderColour }
				${ negativeMargin }
			}`;
	}

	return <style>{ style }</style>;
};
