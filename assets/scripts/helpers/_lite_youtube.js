/**
 * Lite YouTube helpers.
 */

/**
 * Play embedded YT video.
 *
 * @param {Node} videoNode
 */
export const playVideo = ( videoNode ) => {
	const videoIframe = videoNode.querySelector( 'iframe' );
	if ( videoIframe ) {
		videoIframe.contentWindow.postMessage(
			'{"event":"command","func":"playVideo","args":""}',
			'*'
		);
	} else {
		videoNode.click();
	}
};

/**
 * Pause embedded YT video.
 *
 * @param {Node} videoNode
 */
export const pauseVideo = ( videoNode ) => {
	const videoIframe = videoNode.querySelector( 'iframe' );
	if ( videoIframe ) {
		videoIframe.contentWindow.postMessage(
			'{"event":"command","func":"pauseVideo","args":""}',
			'*'
		);
	} else {
		videoNode.click();
	}
};
