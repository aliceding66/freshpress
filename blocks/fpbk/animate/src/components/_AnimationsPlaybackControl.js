import { Button } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';

export const LONGEST_ANIMATION_DURATION = 2000;
export const LONGEST_DELAY_DURATION = 10000;
export const PLAYBACK_STATE_NO_ANIMATION = 0;
export const PLAYBACK_STATE_ANIMATION_LOAD = 1;
export const PLAYBACK_STATE_ANIMATION_PRE_START = 2;
export const PLAYBACK_STATE_ANIMATION_START = 3;

const timeouts = [ null, null ]; //Placeholder for 2 timeouts.

export default () => {
	const { animations, playbackState, setPlaybackState } = getEditorControlsContext();

	// 1. Sets animation start classes.
	const play = () => {
		clearTimeout( timeouts[ 0 ] );
		clearTimeout( timeouts[ 1 ] );
		setPlaybackState( PLAYBACK_STATE_ANIMATION_LOAD );
	};

	// 2. Adds class that triggers actual animation.
	useEffect( () => {
		if (
			playbackState === PLAYBACK_STATE_ANIMATION_LOAD ||
			playbackState === PLAYBACK_STATE_ANIMATION_PRE_START
		) {
			clearTimeout( timeouts[ 0 ] );
			timeouts[ 0 ] = setTimeout( () => {
				clearTimeout( timeouts[ 1 ] );
				setPlaybackState( playbackState + 1 );
				timeouts[ 1 ] = setTimeout( () => {
					stop();
				}, LONGEST_ANIMATION_DURATION + LONGEST_DELAY_DURATION );
			}, 250 );
		}
	}, [ playbackState ] );

	// 3. Resets animation state.
	const stop = () => {
		clearTimeout( timeouts[ 0 ] );
		clearTimeout( timeouts[ 1 ] );
		setPlaybackState( PLAYBACK_STATE_NO_ANIMATION );
	};

	// Stop playback if animation has changed when still playing.
	useEffect( () => {
		if ( playbackState !== PLAYBACK_STATE_NO_ANIMATION ) {
			stop();
		}
	}, [ animations ] );

	return (
		<div className="wp-block-fpbk-animate__playback-control position-absolute d-flex align-items-center">
			{ playbackState === PLAYBACK_STATE_NO_ANIMATION && (
				<Button
					variant="link"
					icon="controls-play"
					onClick={ () => {
						play();
					} }
					title={ __( 'Animation preview for "Page load" ones.', 'freshpress-website' ) }
					showTooltip={ true }
				/>
			) }
			{ playbackState !== PLAYBACK_STATE_NO_ANIMATION && (
				<Button
					variant="link"
					icon="controls-pause"
					onClick={ () => {
						stop();
					} }
				/>
			) }
		</div>
	);
};
