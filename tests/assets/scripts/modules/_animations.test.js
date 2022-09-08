/* eslint-env jest */

import * as _animations from 'scripts/modules/_animations';

/**
 * @param {Array} animations
 * @param {boolean} isHover
 * @param {boolean}isOffscreenReset
 * @return {Node} Appended element.
 */
const getAppendedToBodyDivWithAnimation = (
	animations = [],
	isHover = true,
	isOffscreenReset = false
) => {
	const div = document.createElement( 'div' );
	let className = `fp-animate`;
	animations.forEach( ( animation ) => {
		className += ` fp-animate__${ animation }`;
		if ( isHover ) {
			className += ` fp-animate__${ animation }--on-hover`;
		}
		if ( isOffscreenReset ) {
			className += ` fp-animate--offscreen-reset`;
		}
	} );
	div.setAttribute( 'class', className );
	document.body.appendChild( div );
	return div;
};

/**
 * @param {Node}element
 * @param {boolean} isIntersecting
 */
const insertEntry = ( element, isIntersecting = false ) => {
	entries.push( {
		target: element,
		isIntersecting,
	} );
};

const clearEntries = () => {
	entries = [];
};

const clearCallback = () => {
	callback = () => {};
};

let entries, callback;
const observeMock = jest.fn().mockImplementation( () => {
	callback( entries );
} );
global.IntersectionObserver = jest.fn().mockImplementation( ( callbackFn ) => {
	callback = callbackFn;
	return {
		observe: () => {
			observeMock( callback );
		},
	};
} );

beforeEach( () => {
	document.body.innerHTML = '';
	clearEntries();
	clearCallback();
	jest.clearAllMocks();
} );

afterEach( () => {
	jest.useRealTimers();
} );

describe( 'modules/_animations', () => {
	describe( 'initAnimations', () => {
		test( 'initAnimations function exists', () => {
			expect( typeof _animations.initAnimations ).toBe( 'function' );
		} );

		test( 'initAnimations function properly process hover animation', () => {
			const zoomInOnHoverDiv = getAppendedToBodyDivWithAnimation( [ 'zoom_in' ], true );

			jest.useFakeTimers();
			_animations.initAnimations();
			jest.runOnlyPendingTimers();

			// Observer was set.
			expect( observeMock ).toHaveBeenCalledTimes( 1 );

			// Element is outside viewport.
			insertEntry( zoomInOnHoverDiv, false );
			observeMock( entries );
			expect( zoomInOnHoverDiv.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate__zoom_in fp-animate__zoom_in--on-hover'
			);

			clearEntries();

			// Element is inside viewport.
			insertEntry( zoomInOnHoverDiv, true );
			observeMock( entries );
			expect( zoomInOnHoverDiv.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate__zoom_in fp-animate__zoom_in--on-hover'
			);
		} );

		test( 'initAnimations function properly process onload (when scrolled in element) animation', () => {
			const zoomInOnLoadDiv = getAppendedToBodyDivWithAnimation( [ 'zoom_in' ], false );

			jest.useFakeTimers();
			_animations.initAnimations();
			jest.runOnlyPendingTimers();

			// Observer was set.
			expect( observeMock ).toHaveBeenCalledTimes( 1 );

			// Element is outside viewport.
			insertEntry( zoomInOnLoadDiv, false );
			observeMock( entries );
			expect( zoomInOnLoadDiv.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate__zoom_in'
			);

			clearEntries();

			// Element is inside viewport.
			insertEntry( zoomInOnLoadDiv, true );
			observeMock( entries );
			expect( zoomInOnLoadDiv.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate__zoom_in fp-animate__zoom_in--animate'
			);
		} );

		test( 'initAnimations function properly process offscreen-reset animation', () => {
			const zoomInWithOffscreenResetDiv = getAppendedToBodyDivWithAnimation(
				[ 'zoom_in' ],
				false,
				true
			);
			const zoomInWithoutOffscreenResetDiv = getAppendedToBodyDivWithAnimation(
				[ 'zoom_in' ],
				false,
				false
			);

			jest.useFakeTimers();
			_animations.initAnimations();
			jest.runOnlyPendingTimers();

			// Elements are outside viewport.
			insertEntry( zoomInWithOffscreenResetDiv, false );
			insertEntry( zoomInWithoutOffscreenResetDiv, false );
			observeMock( entries );
			expect( zoomInWithOffscreenResetDiv.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate__zoom_in fp-animate--offscreen-reset'
			);
			expect( zoomInWithoutOffscreenResetDiv.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate__zoom_in'
			);

			clearEntries();

			// Elements are inside viewport.
			insertEntry( zoomInWithOffscreenResetDiv, true );
			insertEntry( zoomInWithoutOffscreenResetDiv, true );
			observeMock( entries );
			expect( zoomInWithOffscreenResetDiv.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate__zoom_in fp-animate--offscreen-reset fp-animate__zoom_in--animate'
			);
			expect( zoomInWithoutOffscreenResetDiv.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate__zoom_in fp-animate__zoom_in--animate'
			);

			clearEntries();

			// Elements are again outside viewport (got scrolled away).
			insertEntry( zoomInWithOffscreenResetDiv, false );
			insertEntry( zoomInWithoutOffscreenResetDiv, false );
			observeMock( entries );
			expect( zoomInWithOffscreenResetDiv.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate__zoom_in fp-animate--offscreen-reset'
			);
			expect( zoomInWithoutOffscreenResetDiv.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate__zoom_in fp-animate__zoom_in--animate'
			);

			// Element with offscreen-reset have few removing animation delay styles added for 100ms to make animation reset be instant action.
			expect( zoomInWithoutOffscreenResetDiv.getAttribute( 'style' ) ).toBeNull();

			expect( zoomInWithOffscreenResetDiv.style.animationDelay ).toBe( '0s' );
			expect( zoomInWithOffscreenResetDiv.style.animationDuration ).toBe( '0s' );
			expect( zoomInWithOffscreenResetDiv.style.transitionDelay ).toBe( '0s' );
			expect( zoomInWithOffscreenResetDiv.style.transitionDuration ).toBe( '0s' );
			jest.runOnlyPendingTimers();
			expect( zoomInWithOffscreenResetDiv.getAttribute( 'style' ) ).toBe( '' );
		} );

		test( 'initAnimations function properly process multiple animations', () => {
			getAppendedToBodyDivWithAnimation( [ 'zoom_in', 'fade_in' ], false );

			jest.useFakeTimers();
			_animations.initAnimations();
			jest.runOnlyPendingTimers();

			const zoomInElement = document.querySelector( '.fp-animate__zoom_in' );
			const fadeInElement = document.querySelector( '.fp-animate__fade_in' );

			// Each animation was spread to separate element.
			expect( zoomInElement ).toBeDefined();
			expect( fadeInElement ).toBeDefined();
			expect( zoomInElement ).not.toBe( fadeInElement );
			// Elements are wrapping each other.
			expect( zoomInElement.parentElement ).toBe( fadeInElement );
			// Parent element has "fp-animate--multiple-animation" added that resets display setting for div.
			expect( fadeInElement.classList ).toContain( 'fp-animate--multiple-animation' );

			// Observer was set for both elements.
			expect( observeMock ).toHaveBeenCalledTimes( 2 );

			// Elements are inside viewport.
			insertEntry( zoomInElement, true );
			insertEntry( fadeInElement, true );
			observeMock( entries );

			expect( zoomInElement.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate__zoom_in fp-animate__zoom_in--animate'
			);
			expect( fadeInElement.getAttribute( 'class' ) ).toBe(
				'fp-animate fp-animate--multiple-animation fp-animate__fade_in fp-animate__fade_in--animate'
			);
		} );
	} );

	describe( 'animate', () => {
		test( 'animate function exists', () => {
			expect( typeof _animations.animate ).toBe( 'function' );
		} );

		test( 'animate function add proper class to element', () => {
			const element = document.createElement( 'div' );
			_animations.animate( element, 'slide_left' );

			expect( element.getAttribute( 'class' ) ).toBe(
				'fp-animate__slide_left fp-animate__slide_left--animate'
			);
		} );
	} );
} );
