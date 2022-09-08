/**
 * Product Tour Hero.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import { animate } from 'scripts/modules/_animations';

const videoCoverClass = 'product-tour-hero__video-cover-file';
const videoClass = 'product-tour-hero__video-file';
const videoLoadedClass = 'loaded';
const youtubePlayerId = 'youtube_player';
const videoRatioSizeId = 'video_ratio_size';
const dropdownClass = 'product-tour-hero__dropdown';
const dropdownExpandedClass = 'product-tour-hero__dropdown--expanded';

class ProductTourHero {
	constructor( blockWrapper ) {
		this.blockWrapperId = blockWrapper.id;
		this.youtube = {
			player: null,
			staticOptions: {
				autoplay: 0,
				cc_lang_pref: 'en',
				disablekb: 1,
				enablejsapi: 1,
				iv_load_policy: 3,
				rel: 0,
				showinfo: 0,
			},
		};

		this.init();
	}

	init() {
		this.attachYoutubePlayer();

		setTimeout( () => {
			this.handleMobileDropdown();
			this.handleVideoResizing();
			this.handleVideoPlaying();
		}, 100 );
	}

	handleMobileDropdown() {
		const dropdownNode = document.querySelector(
			`#${ this.blockWrapperId } .${ dropdownClass }`
		);
		dropdownNode.addEventListener( 'click', () => {
			dropdownNode.classList.toggle( dropdownExpandedClass );
		} );
	}

	attachYoutubePlayer() {
		const video = this.getVideoNodes();

		if ( video.node && video.node.id === youtubePlayerId && video.node.dataset.videoId ) {
			window.onYouTubeIframeAPIReady = () => {
				// eslint-disable-next-line no-undef,no-unused-vars
				this.youtube.player = new YT.Player( video.node, {
					videoId: video.node.dataset.videoId,
					playerVars: Object.assign( this.youtube.staticOptions, {
						mute: parseInt( video.node.dataset.videoMuted ),
						origin: window.location.origin,
						playlist: video.node.dataset.videoId,
						controls: parseInt( video.node.dataset.videoControls ),
						loop: parseInt( video.node.dataset.videoLoop ),
						cc_load_policy: parseInt( video.node.dataset.videoCc ),
					} ),
					events: {
						onReady: () => {
							this.handleVideoResizing();
							if ( video.node.dataset.playOnLoad > 0 ) {
								this.playVideo();
							}
						},
						onStateChange: ( event ) => {
							// eslint-disable-next-line no-undef
							if ( event.data === YT.PlayerState.PLAYING ) {
								document
									.getElementById( youtubePlayerId )
									.classList.add( 'product-tour-hero__video-player--playing' );
							}
						},
						onApiChange: () => {
							if (
								video.node.dataset.videoCc > 0 &&
								typeof this.youtube.player.setOption === 'function'
							) {
								// Without that call captions do not work.
								this.youtube.player.setOption( 'captions', 'track', {
									languageCode: 'en',
								} );
							}
						},
					},
				} );
			};

			this.loadYouTubeApi();
		}
	}

	handleVideoResizing() {
		const video = this.getVideoNodes();

		if ( this.youtube.player && video.node && video.node.dataset.videoId ) {
			// eslint-disable-next-line no-undef
			fetch(
				`https://youtube.com/oembed?url=http://www.youtube.com/watch?v=${ video.node.dataset.videoId }&format=json`
			)
				.then( ( response ) => {
					if ( response && response.ok ) {
						response
							.json()
							.then( ( youtubeVideoData ) => {
								if (
									youtubeVideoData &&
									youtubeVideoData.width &&
									youtubeVideoData.height
								) {
									this.setVideoRatioSize(
										youtubeVideoData.width,
										youtubeVideoData.height
									);
								}
							} )
							.catch( () => {
								//Ommit console error.
							} );
					}
				} )
				.catch( () => {
					//Ommit console error.
				} );
		} else if ( video.node && video.node.id !== youtubePlayerId ) {
			if ( video.node.tagName === 'IMG' || video.node.tagName === 'VIDEO' ) {
				if (
					video.node.classList.contains( videoLoadedClass ) ||
					( video.node.tagName === 'VIDEO' && video.node.readyState > 0 )
				) {
					this.setVideoRatioSize( video.node.clientWidth, video.node.clientHeight );
				} else {
					video.node.addEventListener( 'load', () => {
						this.setVideoRatioSize( video.node.clientWidth, video.node.clientHeight );
					} );
					video.node.addEventListener( 'canplay', () => {
						this.setVideoRatioSize( video.node.clientWidth, video.node.clientHeight );
					} );
				}
				this.setVideoRatioSize( video.node.clientWidth, video.node.clientHeight );
			}
		}
	}

	setVideoRatioSize( width, height ) {
		const video = this.getVideoNodes();
		if ( video.ratioSize ) {
			const ratio = parseInt( height ) / parseInt( width );
			video.ratioSize.style.paddingTop = Number( ratio ) * 100 + '%';
		}
	}

	handleVideoPlaying() {
		const video = this.getVideoNodes();

		if ( video.node ) {
			if ( parseInt( video.node.dataset.playOnLoad ) === 0 ) {
				video.cover.addEventListener( 'click', () => {
					this.playVideo();
				} );
			} else if (
				video.node.classList.contains( videoLoadedClass ) ||
				( video.node.tagName === 'VIDEO' && video.node.readyState > 0 )
			) {
				this.playVideo();
			} else {
				video.node.addEventListener( 'load', () => {
					this.playVideo();
				} );
				video.node.addEventListener( 'canplay', () => {
					this.playVideo();
				} );
			}
		}
	}

	playVideo() {
		const video = this.getVideoNodes();

		animate( video.cover, 'fade_away' );
		animate( video.node, 'fade_in' );

		if ( this.youtube.player ) {
			this.youtube.player.playVideo();
		} else if ( video.node.tagName === 'VIDEO' ) {
			video.node.play();
		} else if ( video.node.tagName === 'IMG' ) {
			//start GIF from beginning
			const imgSrc = video.node.src;
			video.node.src = '';
			video.node.src = imgSrc;
		}
	}

	loadYouTubeApi() {
		if ( typeof YT === 'undefined' ) {
			const tag = document.createElement( 'script' );
			tag.src = 'https://www.youtube.com/iframe_api';
			const firstScriptTag = document.getElementsByTagName( 'script' )[ 0 ];
			firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
		}
	}

	//Always get fresh nodes as they might change dynamically.
	getVideoNodes() {
		return {
			node: document.querySelector( `#${ this.blockWrapperId } .${ videoClass }` ),
			cover: document.querySelector( `#${ this.blockWrapperId } .${ videoCoverClass }` ),
			ratioSize: document.querySelector( `#${ this.blockWrapperId } #${ videoRatioSizeId }` ),
		};
	}
}

initBlock( '.product-tour-hero', ( productTourHero ) => {
	new ProductTourHero( productTourHero );
} );
