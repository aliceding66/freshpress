/**
 * Lottie Animation.
 */

import Lottie from 'lottie-web';

import { initBlock } from 'scripts/helpers/_blocks';

const fetchFieldValue = ( lottieAnimationNode, inputName, callback = null ) => {
	const field = lottieAnimationNode.querySelector( `[data-name="${ inputName }"]` );
	if ( field ) {
		const value = field.innerText;
		field.remove();

		if ( typeof callback === 'function' ) {
			return callback( value );
		}

		return value;
	}

	return null;
};

const resizeUsingAnimationData = ( lottieAnimationNode, animationData ) => {
	if ( animationData ) {
		if ( animationData.w ) {
			lottieAnimationNode.style.width = `${ animationData.w }px}`;
		}
		if ( animationData.h ) {
			lottieAnimationNode.style.height = `${ animationData.h }px}`;
		}
	}
};

const initLottieAnimation = ( lottieAnimationNode ) => {
	const renderer = fetchFieldValue( lottieAnimationNode, 'renderer' );
	const speed = fetchFieldValue( lottieAnimationNode, 'speed', parseFloat );
	const config = {
		container: lottieAnimationNode,
		loop: true,
		renderer,
		autoplay: false,
	};

	const path = fetchFieldValue( lottieAnimationNode, 'animation-url' );
	if ( path ) {
		config.path = path;
		// eslint-disable-next-line no-undef
		fetch( path )
			.then( ( res ) => res.json() )
			.then( ( animationData ) => {
				if ( animationData ) {
					resizeUsingAnimationData( lottieAnimationNode, animationData );
				}
			} )
			.catch( () => {
				// Set default values.
				resizeUsingAnimationData( lottieAnimationNode, { w: 500, h: 500 } );
			} );
	} else {
		config.animationData = fetchFieldValue( lottieAnimationNode, 'animation', JSON.parse );
		resizeUsingAnimationData( lottieAnimationNode, config.animationData );
	}

	const animation = Lottie.loadAnimation( config );
	animation.setSpeed( speed );
	let animationPlaying = false;

	const observerCallback = ( entries ) => {
		entries.forEach( ( entry ) => {
			if ( entry.isIntersecting && ! animationPlaying ) {
				animation.play();
				animationPlaying = true;
			} else if ( animationPlaying ) {
				animation.pause();
				animationPlaying = false;
			}
		} );
	};

	// eslint-disable-next-line no-undef
	const lottieObserver = new IntersectionObserver( observerCallback );
	lottieObserver.observe( lottieAnimationNode );
};

initBlock( '.lottie-animation', initLottieAnimation );
