/**
 * Helper functions for dealing with DOM Events.
 */

/**
 * Add listeners for one or more events to one or more elements.
 *
 * @param {Array|NodeList|EventTarget} elements An element or an Array or NodeList (array-like) of elements.
 * @param {string}                     events   Events to listen for (space separated).
 * @param {Function}                   handler  Handler function to run.
 */
export const addEventListeners = ( elements, events, handler ) => {
	if ( ! elements || ! events || 'string' !== typeof events || 'function' !== typeof handler ) {
		return;
	}

	// Ensure elements is an array.
	if ( ! Array.isArray( elements ) ) {
		elements =
			'function' === typeof elements.addEventListener ? [ elements ] : Array.from( elements );
	}

	// Convert the event names to an array for looping.
	events = events.split( ' ' );

	if ( elements.length && events.length ) {
		elements.forEach( ( el ) => {
			events.forEach( ( ev ) => {
				if ( el && 'function' === typeof el.addEventListener ) {
					el.addEventListener( ev, handler, false );
				}
			} );
		} );
	}
};
