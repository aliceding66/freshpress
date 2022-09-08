/* eslint-env jest */

import * as _events from 'scripts/helpers/_events';

const getDivWithClass = ( className ) => {
	const div = document.createElement( 'div' );
	div.setAttribute( 'class', className );
	div.addEventListener = jest.fn().mockImplementation( ( event, callback ) => {
		callback();
	} );
	return div;
};

const noEvents = '';
const oneEvent = 'click';
const twoEvents = 'mouseenter mouseover';

const callback = jest.fn();

describe( 'helpers/_events', () => {
	describe( 'addEventListeners', () => {
		test( 'addEventListeners function exists', () => {
			expect( typeof _events.addEventListeners ).toBe( 'function' );
		} );

		test( 'addEventListeners execute all events for all elements passed as Arrays', () => {
			const elements = [
				getDivWithClass( 'element div-a' ),
				getDivWithClass( 'element div-b' ),
			];
			expect( Array.isArray( elements ) ).toBeTruthy();

			_events.addEventListeners( elements, noEvents, callback );
			expect( elements[ 0 ].addEventListener ).toBeCalledTimes( 0 );
			expect( elements[ 1 ].addEventListener ).toBeCalledTimes( 0 );
			jest.resetAllMocks();

			_events.addEventListeners( elements, oneEvent, callback );
			expect( elements[ 0 ].addEventListener ).toBeCalledTimes( 1 );
			expect( elements[ 1 ].addEventListener ).toBeCalledTimes( 1 );
			jest.resetAllMocks();

			_events.addEventListeners( elements, twoEvents, callback );
			expect( elements[ 0 ].addEventListener ).toBeCalledTimes( 2 );
			expect( elements[ 1 ].addEventListener ).toBeCalledTimes( 2 );
			jest.resetAllMocks();
		} );

		test( 'addEventListeners execute all events for all elements passed as NodeList', () => {
			const docFragment = document.createDocumentFragment();
			docFragment.appendChild( getDivWithClass( 'element div-a' ) );
			docFragment.appendChild( getDivWithClass( 'element div-b' ) );
			const elements = docFragment.querySelectorAll( '.element' );
			// eslint-disable-next-line no-undef
			expect( NodeList.prototype.isPrototypeOf( elements ) ).toBeTruthy();

			_events.addEventListeners( elements, noEvents, callback );
			expect( elements[ 0 ].addEventListener ).toBeCalledTimes( 0 );
			expect( elements[ 1 ].addEventListener ).toBeCalledTimes( 0 );
			jest.resetAllMocks();

			_events.addEventListeners( elements, oneEvent, callback );
			expect( elements[ 0 ].addEventListener ).toBeCalledTimes( 1 );
			expect( elements[ 1 ].addEventListener ).toBeCalledTimes( 1 );
			jest.resetAllMocks();

			_events.addEventListeners( elements, twoEvents, callback );
			expect( elements[ 0 ].addEventListener ).toBeCalledTimes( 2 );
			expect( elements[ 1 ].addEventListener ).toBeCalledTimes( 2 );
			jest.resetAllMocks();
		} );
	} );
} );
