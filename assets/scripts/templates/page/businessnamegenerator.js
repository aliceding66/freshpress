const initBusinessNameGenerator = () => {
	//Request for the API - start is a random number initially
	const request = {
		industry: '',
		key_word: '',
		count: 3,
		start: Math.floor( Math.random() * 100 ),
		nonce: $( '#business_name_generator_nonce' ).val(),
	};

	const states = {
		Start: '#bng-start',
		Industry: '#bng-industry',
		Query: '#bng-keyword',
		Options: '#bng-options',
		Result: '#bng-result',
	};

	// Animation classes
	const slideOutLeft = 'animated fade-out-left';
	const slideInRight = 'animated fade-in-right';
	const slideOutRight = 'animated fade-out-right';
	const slideInLeft = 'animated fade-in-left';
	const fadeIn = 'animated fade-in';
	const endAnimation = 'animationend webkitAnimationEnd';

	// Click Event on 'Let's Get Started'
	$( '#get-started' ).on( 'click', function () {
		switchState( 'Start', 'Industry', 'right' );
	} );

	// Go Back to Keyword Page
	$( '#select-new-word' ).on( 'click', function ( e ) {
		e.preventDefault();
		switchState( 'Options', 'Query', 'left' );
	} );

	// Click Event on 'Industry'
	$( '.hero__industry' ).on( 'click', function () {
		request.industry = $( this ).attr( 'id' );
		switchState( 'Industry', 'Query', 'right' );
	} );

	// Click Event on 'Keyword'
	$( '#keyword-submit' ).on( 'click', function ( e ) {
		e.preventDefault();

		const $keyWordInput = $( '.keyword-input' );
		let keyWord = $keyWordInput.val().trim();
		keyWord = toTitleCase( keyWord );
		//Client side validation here
		if ( isValidKeyWord( keyWord ) ) {
			request.key_word = keyWord;

			//Starts spinner
			$( this ).addClass( 'button-disabled' );
			$( this ).find( 'span' ).addClass( 'is-transparent' );
			$( this ).attr( 'disabled', 'disabled' );

			requestNames( function ( names ) {
				//Stops spinner
				$( this ).removeClass( 'button-disabled' );
				$( this ).find( 'span' ).removeClass( 'is-transparent' );
				$( this ).removeAttr( 'disabled' );

				//Adds results to Options state
				clearResults();
				names.forEach( addResult );

				//Switches to Options state
				switchState( 'Query', 'Options', 'right', function () {
					setTimeout( function () {
						$( '#magic-wand' )
							.removeClass( 'hidden-wand' )
							.one( endAnimation, function () {
								$( this ).removeClass( 'fade-in' );
							} );
					}, 1000 );
				} );
			} );
		} else {
			$keyWordInput.addClass( 'has-error' );
		}
	} );

	// Show more names
	$( '#see-more' ).on( 'click', function ( e ) {
		e.preventDefault();
		requestNames( function ( names ) {
			clearResults();
			names.forEach( addResult );
		} );
	} );

	// Click Event on Options
	$( '#options-container' ).on( 'click', '.name-option', function () {
		const name = $( this ).text();

		$( '.business-name-result' ).text( name );
		switchState( 'Options', 'Result', 'right', function () {
			initLights();
			setTimeout( function () {
				$( '.building-left' ).addClass( fadeIn );
				$( '.building-right' ).addClass( fadeIn );
			}, 50 );
			setTimeout( function () {
				$( '.look-sign' ).addClass( fadeIn );
			}, 500 );
			setTimeout( function () {
				$( '.hero__name-container' ).addClass( fadeIn );
			}, 1000 );
			setTimeout( function () {
				$( '.hero__subtitle_blog-lead-in' ).addClass( fadeIn );
			}, 2500 );
		} );
	} );

	// Resize the Windows for the Lights
	$( window ).resize( function () {
		$( '.tile' ).remove();
		resizeLights();
	} );

	// Function to move to the next state of the Business Generator
	const switchState = function ( prev, next, direction, callback ) {
		const slideOut = direction === 'left' ? slideOutRight : slideOutLeft;
		const slideIn = direction === 'left' ? slideInLeft : slideInRight;
		const $statesNext = $( states[ next ] );
		$( states[ prev ] )
			.addClass( slideOut )
			.one( endAnimation, function () {
				$( this ).removeClass( slideOut );
				$( this ).addClass( 'hidden-step' );
				$statesNext
					.removeClass( 'hidden-step' )
					.addClass( slideIn )
					.one( endAnimation, function () {
						$( this ).removeClass( slideIn );
						//execute optional callback
						typeof callback !== 'undefined' && callback(); // eslint-disable-line
					} );
			} );
	};

	// Clear Results of the options generated
	const clearResults = () => {
		$( '#options-container' ).empty();
	};

	// Add Results to the Page
	const addResult = ( name ) => {
		$( '#options-container' ).append( '<button class="name-option">' + name + '</button>' );
	};

	const isValidKeyWord = ( input ) => {
		return /^[a-zA-Z0-9][a-zA-Z\'0\d\-]*( [a-zA-Z0-9][a-zA-Z\'\d\-]*)*$/.test( input );
	};

	const toTitleCase = ( str ) => {
		return str.replace( /\w\S*/g, function ( txt ) {
			return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase();
		} );
	};

	// Dev: Daniel Hicks & Sacha Sayan
	const resizeLights = () => {
		const $nameContainer = $( '.hero__name-container' );
		const $centerContent = $( '.center-content' );
		$nameContainer.width( '' );
		$nameContainer.height( '' );
		$( '.tile' ).hide();

		// Let's round up our width to something divisible by 40
		const initialWidth = $nameContainer.width();
		let newWidth = initialWidth;

		if ( initialWidth % 40 !== 0 ) {
			newWidth = initialWidth - ( initialWidth % 40 ) + 40;
		}

		$nameContainer.width( newWidth );

		// Let's add a number of tiles appropriate for our width
		for ( let i = 0; i < newWidth / 40; i++ ) {
			$( '.lights-row' ).append( '<div class="tile"></div>' );
		}

		// Let's round up our height to something divisible by 40
		const initialHeight = $centerContent.height();
		let newHeight = initialHeight;

		if ( initialHeight % 40 !== 0 ) {
			newHeight = initialHeight - ( initialHeight % 40 ) + 40;
		}

		$centerContent.height( newHeight );
		// Let's add a number of tiles appropriate for our height
		for ( let i = 0; i < newHeight / 40; i++ ) {
			$( '.lights-col' ).append( '<div class="tile"></div>' );
		}
	};

	const randomizeLightCoordinates = function ( tileSize ) {
		$( '.hero__name-container' )
			.find( '.tile' )
			.each( function () {
				const bgX = Math.floor( Math.random() * 10 ) * tileSize;
				const bgY = Math.floor( Math.random() * 10 ) * tileSize;

				const cssString = bgX + 'px ' + bgY + 'px';

				$( this ).css( 'background-position', cssString );
			} );
	};

	const initLights = () => {
		resizeLights();
		window.setInterval( function () {
			randomizeLightCoordinates( 20 );
		}, 500 );
	};

	const requestNames = function ( onFinish ) {
		$.ajax( {
			url: '/wp-json/bng/generate?' + $.param( request ),
			type: 'GET',
			data: {},
			datatype: 'json',
			success( data ) {
				//Add to start for next request
				request.start += request.count;
				data.map( function ( obj ) {
					return obj.name;
				} );

				//Run optional callback with list of generated names
				typeof onFinish !== 'undefined' && // eslint-disable-line
					onFinish(
						data.map( function ( obj ) {
							return obj.name;
						} )
					);
			},
		} );
	};
};

document.addEventListener( 'DOMContentLoaded', initBusinessNameGenerator, false );
