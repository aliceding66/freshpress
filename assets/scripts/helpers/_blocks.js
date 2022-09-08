/**
 * Small helper functions for blocks.
 */

/**
 * Initialiase all instances of a block. Defaults to triggering on DOMContentLoaded
 * for the document element.
 *
 * @param {string} selector CSS selector for the blocks to be initialised.
 * @param {Function} callback Callback function to be executed on each block.
 * @param {string} [event=DOMContentLoaded] Event to listen to.
 * @param {HTMLElement} [container=document] DOM object to use as a container for events and queries.
 */
export const initBlock = (
	selector,
	callback,
	event = 'DOMContentLoaded',
	container = document
) => {
	container.addEventListener( event, () => {
		const blocks = container.querySelectorAll( selector );
		if ( blocks ) {
			blocks.forEach( ( block ) => {
				callback( block );
			} );
		}
	} );
};
