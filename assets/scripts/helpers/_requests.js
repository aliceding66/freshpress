/**
 * Request handling helper functions.
 */

/**
 * Send a fetch request and parse the response in a consistent way.
 *
 * @param {string}  url              Target URL for fetch to make request to.
 * @param {Object}  options          Options object for fetch request.
 * @param {boolean} [parseJSON=true] Should the request body be parsed as JSON data.
 */
export const request = async ( url, options, parseJSON = true ) => {
	return await window
		.fetch( url, options )
		.then( ( response ) => {
			return parseResponse( response, parseJSON );
		} )
		.catch( ( error ) => {
			return error;
		} );
};

/**
 * Parse a request response so that we have consistent returns.
 *
 * @param {Response} response         The Response object from a fetch request.
 * @param {boolean}  [parseJSON=true] Should the parse attempt to return parsed JSON.
 */
export const parseResponse = async ( response, parseJSON = true ) => {
	if ( ! ( response instanceof window.Response ) ) {
		return response;
	}
	const output = response;

	if ( response.ok ) {
		if ( parseJSON ) {
			try {
				output.data = await response.clone().json();
			} catch ( e1 ) {
				try {
					output.data = await response.text();
				} catch {}
			}
		} else {
			output.data = await response.text();
		}
	}
	return output;
};
