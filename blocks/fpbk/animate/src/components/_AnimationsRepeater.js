import { BaseControl, Button, CardDivider } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';
import * as animationActions from '../state/animations/_actions';

const animationsMap = [
	{
		label: 'Fade In',
		name: 'fade_in',
		mode: 'page_load',
		exclude_regex: /fade_/,
	},
	{
		label: 'Fade Away',
		name: 'fade_away',
		mode: 'both',
		exclude_regex: /fade_/,
	},
	{
		label: 'Slide in left',
		name: 'slide_in_left',
		mode: 'page_load',
		exclude_regex: /slide|swing_in_/,
	},
	{
		label: 'Slide in right',
		name: 'slide_in_right',
		mode: 'page_load',
		exclude_regex: /slide|swing_in_/,
	},
	{
		label: 'Swing in bottom',
		name: 'swing_in_bottom',
		mode: 'page_load',
		exclude_regex: /slide|swing_in_/,
	},
	{
		label: 'Swing in top',
		name: 'swing_in_top',
		mode: 'page_load',
		exclude_regex: /slide|swing_in_/,
	},
	{
		label: 'Zoom in',
		name: 'zoom_in',
		mode: 'both',
		exclude_regex: /zoom_/,
	},
	{
		label: 'Zoom out',
		name: 'zoom_out',
		mode: 'both',
		exclude_regex: /zoom_/,
	},
];

const getAvailableAnimations = ( currentItemAnimation, selectedAnimationExcludeRegexes = [] ) => {
	const availableAnimations = {};
	animationsMap
		.filter( ( animation ) => {
			return (
				animation.name === currentItemAnimation ||
				selectedAnimationExcludeRegexes.filter( ( regex ) => animation.name.match( regex ) )
					.length === 0
			);
		} )
		.forEach( ( animation ) => {
			availableAnimations[ animation.name ] = animation.label;
		} );

	return availableAnimations;
};

const getAvailableTriggers = ( currentItemAnimation ) => {
	const allTriggers = {
		page_load: 'Page load',
		hover: 'Hover',
	};

	if (
		! currentItemAnimation ||
		! currentItemAnimation.mode ||
		currentItemAnimation.mode === 'both'
	) {
		return allTriggers;
	}
	return { [ currentItemAnimation.mode ]: allTriggers[ currentItemAnimation.mode ] };
};

export default () => {
	const { animations, animationDispatch } = getEditorControlsContext();

	const selectedAnimations = animations.map( ( a ) => a.animation );

	const animationFields = animations.map( ( animation, index ) => {
		const selectedAnimation = animationsMap.filter(
			( a ) => a.name === animation.animation
		)[ 0 ];

		const selectedAnimationsExcludeRegexes = animationsMap
			.filter(
				( a ) =>
					selectedAnimations.includes( a.name ) &&
					selectedAnimation?.exclude_regex !== a.exclude_regex
			)
			.map( ( a ) => a.exclude_regex );

		return (
			<div key={ animation.key }>
				<EditorControls.Select
					label={ __( 'Animation', 'freshpress-website' ) }
					emptyChoice={ __( 'Select animation', 'freshpress-website' ) }
					choices={ getAvailableAnimations(
						animation.animation,
						selectedAnimationsExcludeRegexes
					) }
					value={ animation.animation }
					onChange={ ( value ) => {
						animationDispatch( {
							type: animationActions.EDIT_ANIMATION_ANIMATION,
							value,
							index,
						} );

						const newSelectedAnimation = animationsMap.filter(
							( a ) => a.name === value
						)[ 0 ];

						if (
							newSelectedAnimation &&
							newSelectedAnimation?.mode &&
							newSelectedAnimation?.mode !== '' &&
							newSelectedAnimation?.mode !== 'both'
						) {
							animationDispatch( {
								type: animationActions.EDIT_ANIMATION_TRIGGER,
								value: newSelectedAnimation.mode,
								index,
							} );
						}
					} }
				/>
				<EditorControls.Select
					label={ __( 'Triggered on', 'freshpress-website' ) }
					choices={ getAvailableTriggers( selectedAnimation ) }
					value={ animation.trigger }
					onChange={ ( value ) => {
						animationDispatch( {
							type: animationActions.EDIT_ANIMATION_TRIGGER,
							value,
							index,
						} );
					} }
				/>
				{ animation.trigger === 'page_load' && (
					<>
						<EditorControls.Range
							label={ __( 'Delay', 'freshpress-website' ) }
							instructions={ __(
								'Delay of animation is seconds.',
								'freshpress-website'
							) }
							min={ 0 }
							max={ 10 }
							value={ animation.delay }
							onChange={ ( value ) => {
								animationDispatch( {
									type: animationActions.EDIT_ANIMATION_DELAY,
									value,
									index,
								} );
							} }
						/>
						<EditorControls.TrueFalse
							label={ __( 'Offscreen reset', 'freshpress-website' ) }
							instructions={ __(
								'Whether animation state should be resetted when element get scrolled away screen.',
								'freshpress-website'
							) }
							value={ animation.offscreen_reset }
							onChange={ ( value ) => {
								animationDispatch( {
									type: animationActions.EDIT_ANIMATION_OFFSCREEN_RESET,
									value,
									index,
								} );
							} }
						/>
					</>
				) }

				<div className="block-editor__block-controls">
					<Button
						isSmall
						isDestructive
						onClick={ () => {
							animationDispatch( {
								type: animationActions.REMOVE_ANIMATION,
								index,
							} );
						} }
						icon="no-alt"
					/>
				</div>
				<CardDivider />
			</div>
		);
	} );

	return (
		// eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
		<BaseControl
			label={
				<strong style={ { lineHeight: '2rem' } }>
					{ __( 'Animations', 'freshpress-website' ) }
				</strong>
			}
		>
			<div>
				{ animationFields }
				<Button
					isPrimary
					onClick={ () => {
						animationDispatch( {
							type: animationActions.ADD_ANIMATION,
						} );
					} }
					text={ __( 'Add Animation', 'freshpress-website' ) }
				/>
			</div>
		</BaseControl>
	);
};
