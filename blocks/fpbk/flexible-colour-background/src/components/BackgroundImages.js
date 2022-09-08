import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';

/**
 * @param {Array} backgroundImages Background images.
 * @return {Object} Return array of display classes per screen size.
 */
const getVisibilityClassesForBackgroundImages = ( backgroundImages ) => {
	const visibilityClasses = {};

	const visibilityMaxBreakpoint = backgroundImages
		.map( ( backgroundImage ) => {
			return backgroundImage.screen_size;
		} )
		.filter( ( value, index, self ) => {
			return self.indexOf( value ) === index;
		} )
		.sort( ( a, b ) => ( a < b ? 1 : -1 ) )
		.slice( 0, 1 )[ 0 ];

	visibilityClasses[ visibilityMaxBreakpoint ] = true;

	return visibilityClasses;
};

export default () => {
	const { attributes } = getEditorControlsContext();
	const backgroundImages = attributes?.background_images;
	let backgroundImageNodes = [];

	if ( Array.isArray( backgroundImages ) ) {
		const visibilityClasses = getVisibilityClassesForBackgroundImages( backgroundImages );

		backgroundImageNodes = backgroundImages
			.filter(
				( backgroundImage ) =>
					backgroundImage?.background_image?.url &&
					visibilityClasses[ backgroundImage?.screen_size ]
			)
			.map( ( backgroundImage, index ) => {
				const styles = {
					backgroundImage: `url(${ backgroundImage.background_image.url })`,
					backgroundPosition: backgroundImage?.background_position,
					backgroundSize: backgroundImage?.custom_background_size
						? backgroundImage.custom_background_size
						: backgroundImage?.background_size,
				};

				if ( backgroundImage?.max_width ) {
					styles.maxWidth = backgroundImage.max_width;
					styles.marginLeft = 'auto';
					styles.marginRight = 'auto';
				}

				if ( backgroundImage?.min_height ) {
					styles.minHeight = backgroundImage.min_height;
				}

				let offset = parseInt( backgroundImage?.offset );
				if ( offset !== 0 ) {
					const direction = offset > 0 ? 'bottom' : 'top';
					offset = Math.abs( offset );
					const offsetDoubled = offset * 2;
					styles.height = `calc(100% + ${ offsetDoubled }px)`;
					styles[ direction ] = `-${ offset }px`;
				}

				return (
					<div
						className="flexible-colour-background__background-image position-absolute d-block"
						style={ styles }
						key={ `bg_img_${ index }` }
					/>
				);
			} );
	}

	return <>{ backgroundImageNodes }</>;
};
