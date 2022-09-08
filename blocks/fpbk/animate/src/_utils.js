import {
	PLAYBACK_STATE_ANIMATION_LOAD,
	PLAYBACK_STATE_ANIMATION_START,
} from './components/_AnimationsPlaybackControl';

/**
 *
 * @param {Object} attributes
 * @param {number} playbackState
 * @return {Object} Formatted data to be used in Mustache template.
 */
export const getTemplateData = ( attributes, playbackState ) => {
	const templateData = { ...attributes };

	if ( Array.isArray( templateData.animations ) ) {
		templateData.multiple_animations = templateData.animations.length > 1;
		templateData.animations = templateData.animations.map( ( animation ) => {
			let animationClass = 'fp-animate';
			let animationName = animation.animation;
			// Use "_alt" zoom animations as they are easier to properly preview in Editor.
			if ( animationName.includes( 'zoom' ) ) {
				animationName += '_alt';
			}

			if ( animation.trigger === 'hover' ) {
				animationClass += ` fp-animate__${ animationName }`;
				animationClass += ` fp-animate__${ animationName }--on-hover`;
			} else {
				if ( playbackState <= PLAYBACK_STATE_ANIMATION_LOAD ) {
					animationClass += ' no-animations';
				}

				if ( playbackState >= PLAYBACK_STATE_ANIMATION_LOAD ) {
					animationClass += ` fp-animate__${ animationName }`;
				}

				if ( playbackState === PLAYBACK_STATE_ANIMATION_START ) {
					animationClass += ` fp-animate__${ animationName }--animate`;
				}

				if ( animation.delay > 0 ) {
					animationClass += ` fp-animate--delay-${ animation.delay }`;
				}

				if ( animation.offscreen_reset ) {
					animationClass += ' fp-animate--offscreen-reset';
				}
			}

			animation.animation_class = animationClass;

			return animation;
		} );
	}

	return templateData;
};
