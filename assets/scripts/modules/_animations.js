const mainAnimateClass = 'fp-animate';
const offScreenResetClass = 'fp-animate--offscreen-reset';
const animationNameRegex = /fp-animate__([a-z_]+)/g;

export const initAnimations = () => {
	const intersectingOptions = {
		root: null,
		rootMargin: '0px',
	};

	setTimeout( () => {
		const animationCallback = ( entries ) => {
			entries.forEach( ( entry ) => {
				const animationClass = entry.target.className.match( animationNameRegex );

				if ( animationClass && Array.isArray( animationClass ) && animationClass[ 0 ] ) {
					const animationOnHoverClass = `${ animationClass[ 0 ] }--on-hover`;
					if ( ! entry.target.classList.contains( animationOnHoverClass ) ) {
						const animationTriggerClass = `${ animationClass[ 0 ] }--animate`;

						if (
							! entry.target.classList.contains( animationTriggerClass ) &&
							entry.isIntersecting
						) {
							entry.target.classList.add( animationTriggerClass );
						} else if (
							entry.target.classList.contains( animationTriggerClass ) &&
							! entry.isIntersecting &&
							entry.target.classList.contains( offScreenResetClass )
						) {
							const currentStyle = entry.target.getAttribute( 'style' );
							entry.target.setAttribute(
								'style',
								'animation-delay: 0s !important; animation-duration: 0s !important; transition-delay: 0s !important; transition-duration: 0s !important;'
							);
							entry.target.classList.remove( animationTriggerClass );
							setTimeout( () => {
								entry.target.setAttribute(
									'style',
									currentStyle ? currentStyle : ''
								);
							}, 100 );
						}
					}
				}
			} );
		};

		wrapMultipleAnimations();

		// eslint-disable-next-line no-undef
		const animationObserver = new IntersectionObserver(
			animationCallback,
			intersectingOptions
		);

		document.querySelectorAll( `.${ mainAnimateClass }` ).forEach( ( animationNode ) => {
			animationObserver.observe( animationNode );
		} );
	}, 100 );
};

const wrapMultipleAnimations = () => {
	document.querySelectorAll( `.${ mainAnimateClass }` ).forEach( ( animationNode ) => {
		const foundAnimations = animationNode.className.match( animationNameRegex );
		if ( foundAnimations && Array.isArray( foundAnimations ) ) {
			const uniqueFoundAnimations = [ ...new Set( foundAnimations ) ];

			if ( uniqueFoundAnimations.length > 1 ) {
				//Make multiple-animation wrappers for animations that are defined after first one
				for ( let i = 1; i < uniqueFoundAnimations.length; ++i ) {
					const multipleAnimationWrapper = document.createElement( 'DIV' );
					multipleAnimationWrapper.classList.add( 'fp-animate' );
					multipleAnimationWrapper.classList.add( 'fp-animate--multiple-animation' );

					multipleAnimationWrapper.classList.add( `${ uniqueFoundAnimations[ i ] }` );
					animationNode.classList.remove( `${ uniqueFoundAnimations[ i ] }` );
					if (
						animationNode.classList.contains(
							`${ uniqueFoundAnimations[ i ] }--on-hover`
						)
					) {
						multipleAnimationWrapper.classList.add(
							`${ uniqueFoundAnimations[ i ] }--on-hover`
						);
						animationNode.classList.remove(
							`${ uniqueFoundAnimations[ i ] }--on-hover`
						);
					} else if ( animationNode.classList.contains( offScreenResetClass ) ) {
						multipleAnimationWrapper.classList.add( offScreenResetClass );
					}

					multipleAnimationWrapper.innerHTML = animationNode.outerHTML;
					animationNode.parentNode.replaceChild(
						multipleAnimationWrapper,
						animationNode
					);
				}
			}
		}
	} );
};

export const animate = function ( node, animationName ) {
	if ( node && node.classList ) {
		node.classList.add( `fp-animate__${ animationName }` );
		node.classList.add( `fp-animate__${ animationName }--animate` );
	}
};
