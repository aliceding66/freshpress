/**
 * Accounting Partners Archive and Taxonomies Scripts
 */

window.sessionStorage.removeItem( 'accounting_partners_init_term_count' );
const backHover = document.createElement( 'SPAN' );
backHover.classList.add( 'accounting-partners-filter__back-hover' );
backHover.setAttribute( 'aria-hidden', 'true' );
const filterTermsObj = window.sessionStorage.getItem( 'accounting_partners_filter' );

const stringToSlug = ( str ) => {
	str = str.replace( /^\s+|\s+$/g, '' ); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	const from = 'àáäâèéëêìíïîòóöôùúüûñçěščřžýúůďťň·/_,:;';
	const to = 'aaaaeeeeiiiioooouuuuncescrzyuudtn------';

	for ( let i = 0, l = from.length; i < l; i++ ) {
		str = str.replace( new RegExp( from.charAt( i ), 'g' ), to.charAt( i ) );
	}

	str = str
		.replace( '.', '-' ) // replace a dot by a dash
		.replace( /[^a-z0-9 -]/g, '' ) // remove invalid chars
		.replace( /\s+/g, '-' ) // collapse whitespace and replace by a dash
		.replace( /-+/g, '-' ) // collapse dashes
		.replace( /\//g, '' ); // collapse all forward-slashes

	return str;
};

let amTaxonomiesObj = '';

const fromSingle = () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams( queryString );
	const single = urlParams.get( 'from' );
	let isSingle = false;
	if ( single === 'single' ) {
		isSingle = true;
	}
	return isSingle;
};
if ( ! fromSingle() ) {
	window.sessionStorage.removeItem( 'accounting_partners_filter' );
}

const amGetLocations = () => {
	if ( ! window.sessionStorage.getItem( 'accounting_partners_locations' ) ) {
		const apTaxonomies = window.sessionStorage.getItem( 'accounting_partners_taxonomies' );
		if ( apTaxonomies !== null ) {
			const taxonomies = JSON.parse( apTaxonomies );
			const locations = taxonomies.filter( ( item ) => {
				return item.name_slug === 'accounting_partners_location';
			} );
			window.sessionStorage.setItem(
				'accounting_partners_locations',
				JSON.stringify( locations[ 0 ].terms )
			);
		}
	}
};

const amTaxonomies = () => {
	if ( ! window.sessionStorage.getItem( 'accounting_partners_taxonomies' ) ) {
		$.ajax( {
			async: false,
			url: '/wp-json/acct-accounting-partners/get-am-taxonomies',
			type: 'POST',
			dataType: 'json',
			data: '',
			success( response ) {
				window.sessionStorage.setItem(
					'accounting_partners_taxonomies',
					JSON.stringify( response.body_response )
				);
				amTaxonomiesObj = response.body_response;
			},
		} );
	} else {
		amTaxonomiesObj = JSON.parse(
			window.sessionStorage.getItem( 'accounting_partners_taxonomies' )
		);
	}
	amGetLocations();
};

const checkAccountingPartnersUrl = ( amTaxObj ) => {
	const url = window.location.pathname;
	const urlSplit = url.split( '/' );
	const countSlash = urlSplit.length;
	if ( countSlash >= 4 && urlSplit[ 2 ] !== 'page' ) {
		const obj = {};
		amTaxObj.map( ( item ) => {
			if ( item.name_slug === 'accounting_partners_service' ) {
				item.terms.forEach( ( term ) => {
					if ( term.name_slug === urlSplit[ 2 ] ) {
						obj.accounting_partners_service = [
							{
								name: term.name,
								slug: term.name_slug,
							},
						];
						addHeroTitle( term.name, 'h1 .title_service' );
					}
				} );
			}
			if ( item.name_slug === 'accounting_partners_location' ) {
				item.terms.forEach( ( term ) => {
					if ( term.name_slug === urlSplit[ 3 ] ) {
						obj.accounting_partners_location = [
							{
								name: term.name,
								slug: term.name_slug,
							},
						];
						addHeroTitle( term.name, 'h1 .title_location' );
					}
				} );
			}
			return true;
		} );
		const arr = JSON.parse( window.sessionStorage.getItem( 'accounting_partners_locations' ) );
		const selectedDataSlug = obj.accounting_partners_location[ 0 ].slug;
		const selectedVal = obj.accounting_partners_location[ 0 ].name;

		const location = arr.filter( ( item ) => {
			return item.name_slug === selectedDataSlug;
		} );
		if ( location[ 0 ].type_code === 3 ) {
			const country = arr.filter( ( item ) => {
				return item.name_slug === location[ 0 ].parent_slug;
			} );
			obj.accounting_partners_location = [
				{ slug: country[ 0 ].parent_slug, name: country[ 0 ].parent_name },
				{ slug: location[ 0 ].parent_slug, name: location[ 0 ].parent_name },
				{ slug: selectedDataSlug, name: selectedVal },
			];
		} else if ( location[ 0 ].type_code === 2 ) {
			obj.accounting_partners_location = [
				{ slug: location[ 0 ].parent_slug, name: location[ 0 ].parent_name },
				{ slug: selectedDataSlug, name: selectedVal },
			];
		} else {
			obj.accounting_partners_location = [ { slug: selectedDataSlug, name: selectedVal } ];
		}

		window.sessionStorage.setItem( 'accounting_partners_filter', JSON.stringify( obj ) );
		amTaxonomiesObj = JSON.parse(
			window.sessionStorage.getItem( 'accounting_partners_taxonomies' )
		);
		setTimeout( () => {
			generateBreadcrumbs( JSON.stringify( obj ) );
			updateTermsCount( getAllTermsSelected(), getParentContainer() );
		}, 100 );
	}
};

const getParentContainer = () => {
	const parentContainerArr = document.querySelectorAll( '.accounting-partners-filter__options' );
	const parentContainer = [];
	parentContainerArr.forEach( ( pContainer ) => {
		parentContainer.push( pContainer.getAttribute( 'id' ) );
	} );
	return parentContainer;
};

const addHeroTitle = ( title, place ) => {
	const titleSpace = document.querySelector( place );
	if ( titleSpace !== null && titleSpace.innerHTML === '' ) {
		titleSpace.innerHTML = title;
	}
};

const closeLocation = ( obj ) => {
	const bLocation = document.querySelector( '.accounting-partners-filter__button_location' );
	if ( bLocation === obj ) return false;
	const locationInput = document.querySelector( '.accounting-partners-filter__location-input' );
	if ( locationInput !== null && ! locationInput.classList.contains( 'clicked' ) ) {
		bLocation.style.display = 'block';
		bLocation.classList.add( 'opc-trans' );
		locationInput.classList?.remove( 'active' );
		setTimeout( () => {
			bLocation.classList.remove( 'opc-trans' );
		}, 1000 );
	}
};

const buttonEnter = () => {
	const amButtons = document.querySelectorAll(
		'.accounting-partners-filter__button:not(.accounting-partners-filter__button_location)'
	);
	const funcBackHover = ( e ) => {
		if ( document.querySelector( '.accounting-partners-filter__back-hover' ) === null ) {
			document.querySelector( 'body' ).appendChild( backHover );
		}
		document
			.querySelector( '.accounting-partners-filter__back-hover' )
			.addEventListener( 'click', () => {
				buttonOut();
			} );

		if ( e.target.classList.contains( 'active' ) ) {
			e.target.classList.remove( 'active' );
		} else {
			amButtons.forEach( ( ele ) => {
				ele.classList?.remove( 'active' );
			} );
			e.target.classList.add( 'active' );
		}
	};
	amButtons.forEach( ( amButton ) => {
		if ( window.innerWidth >= 1024 ) {
			amButton.removeEventListener( 'mouseenter', funcBackHover );
			amButton.addEventListener( 'mouseenter', funcBackHover );
		} else {
			amButton.removeEventListener( 'click', funcBackHover );
			amButton.addEventListener( 'click', funcBackHover );
		}
	} );
};

const buttonOut = () => {
	const bgHover = document.querySelector( '.accounting-partners-filter__back-hover' );
	const amButtons = document.querySelectorAll(
		'.accounting-partners-filter__button:not(.accounting-partners-filter__button_location)'
	);
	bgHover?.classList.add( 'accounting-partners-filter__back-hover-out' );
	setTimeout( () => {
		bgHover?.classList.remove( 'accounting-partners-filter__back-hover-out' );
		bgHover?.remove();
	}, 500 );
	amButtons.forEach( ( ambutton ) => {
		ambutton.classList.remove( 'active' );
	} );
};

const activesOut = () => {
	const acContainer = document.querySelector( '.accounting-partners-filter__container' );
	const acButtonLocation = document.querySelector( '.accounting-partners-filter__location' );
	if ( window.innerWidth >= 1024 ) {
		acContainer?.addEventListener( 'mouseleave', () => {
			buttonOut();
			closeLocation();
		} );

		acButtonLocation?.addEventListener( 'mouseenter', () => {
			buttonOut();
		} );
	} else {
		acButtonLocation?.addEventListener( 'click', () => {
			buttonOut();
		} );
	}
};

const showLocation = ( e ) => {
	const obj = e.target;
	const locationInput = document.querySelector( '.accounting-partners-filter__location-input' );
	locationInput?.addEventListener( 'click', function () {
		this.classList.add( 'clicked' );
	} );
	if ( obj !== undefined ) obj.style.display = 'none';
	locationInput.classList.add( 'active' );
	if ( window.innerWidth < 768 ) {
		locationInput.focus();
		locationInput.classList.add( 'clicked' );
	}
};
const locationButton = () => {
	const bLocation = document.querySelector( '.accounting-partners-filter__button_location' );
	if ( window.innerWidth >= 768 && ! isMobileDevice() ) {
		bLocation?.addEventListener( 'mouseover', showLocation );
	} else {
		bLocation?.addEventListener( 'click', showLocation );
	}
};
/* global navigator */
const isMobileDevice = () => {
	let bool = false;
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent )
	) {
		bool = true;
	}

	return bool;
};

let currentFocus;

const closeAllLists = ( elmnt ) => {
	const locationInput = document.querySelector( '.accounting-partners-filter__location-input' );
	const x = document.getElementsByClassName( 'autocomplete-items' );
	for ( let i = 0; i < x.length; i++ ) {
		if ( elmnt !== x[ i ] && elmnt !== locationInput ) {
			x[ i ].parentNode.removeChild( x[ i ] );
		}
	}
};

const addInputActive = ( x ) => {
	if ( ! x ) return false;
	removeInputActive( x );
	if ( currentFocus >= x.length ) currentFocus = 0;
	if ( currentFocus < 0 ) currentFocus = x.length - 1;
	x[ currentFocus ].classList.add( 'autocomplete-active' );
};

const removeInputActive = ( x ) => {
	for ( let i = 0; i < x.length; i++ ) {
		x[ i ].classList.remove( 'autocomplete-active' );
	}
};
const closeList = () => {
	document.addEventListener( 'click', function ( e ) {
		closeAllLists( e.target );
		closeLocation( e.target );
	} );
};

const locationSearch = () => {
	const locationInput = document.querySelector( '.accounting-partners-filter__location-input' );
	if ( locationInput !== null ) {
		locationInput.addEventListener( 'keydown', function ( e ) {
			let x = document.getElementById( this.id + 'autocomplete-list' );
			if ( x ) x = x.getElementsByTagName( 'div' );
			if ( e.keyCode === 40 ) {
				currentFocus++;
				addInputActive( x );
			} else if ( e.keyCode === 38 ) {
				currentFocus--;
				addInputActive( x );
			} else if ( e.keyCode === 13 ) {
				e.preventDefault();
				if ( currentFocus > -1 ) {
					if ( x ) x[ currentFocus ].click();
				} else if ( x ) {
					x[ 0 ].click();
				}
			}
		} );
		if ( window.innerWidth < 1024 ) {
			locationInput.addEventListener( 'focusout', () => {
				locationInput.classList.add( 'br-8' );
				const aList = document.getElementById( 'autocomplete-list' );
				if ( aList !== null ) {
					const noResults = aList.querySelector( '.no-results' );
					if ( noResults !== null ) {
						noResults.click();
					}
				}
			} );
		}
	}
};

const autocomplete = () => {
	const inp = document.querySelector( '.accounting-partners-filter__location-input' );
	const arr = JSON.parse( window.sessionStorage.getItem( 'accounting_partners_locations' ) );
	if ( inp !== null ) {
		inp.addEventListener( 'input', function () {
			this.classList.remove( 'br-8' );
			let b, i;
			const val = this.value;
			closeAllLists();
			if ( ! val || val.split( '' ).length < 2 ) {
				return false;
			}
			currentFocus = -1;
			const a = document.createElement( 'DIV' );
			a.setAttribute( 'id', this.id + 'autocomplete-list' );
			a.setAttribute( 'class', 'autocomplete-items' );
			this.parentNode.appendChild( a );
			for ( i = 0; i < arr.length; i++ ) {
				if (
					arr[ i ].name.substr( 0, val.length ).toUpperCase() === val.toUpperCase() ||
					arr[ i ].name_slug.substr( 0, val.length ).toUpperCase() === val.toUpperCase()
				) {
					b = document.createElement( 'DIV' );
					b.innerHTML = `
							${ arr[ i ].name.substr( 0, val.length ) }${ arr[ i ].name.substr( val.length ) }${
						arr[ i ].parent_slug !== undefined
							? ', ' + arr[ i ].parent_slug.substr( 0, val.length ).toUpperCase()
							: ''
					} 
						<input type='hidden' value='${ arr[ i ].name }' data-slug='${ arr[ i ].name_slug }'></input>`;
					b.addEventListener( 'click', function () {
						const input = this.getElementsByTagName( 'input' )[ 0 ];
						const selectedVal = input.value;
						const selectedDataSlug = input.getAttribute( 'data-slug' );
						const aFilterData = window.sessionStorage.getItem(
							'accounting_partners_filter'
						);
						let aFilterJson = {};

						inp.value = selectedVal;

						if ( aFilterData !== null ) {
							aFilterJson = JSON.parse( aFilterData );
						}

						const location = arr.filter( ( item ) => {
							return item.name_slug === selectedDataSlug;
						} );
						if ( location[ 0 ].type_code === 3 ) {
							const country = arr.filter( ( item ) => {
								return item.name_slug === location[ 0 ].parent_slug;
							} );
							aFilterJson.accounting_partners_location = [
								{ slug: country[ 0 ].parent_slug, name: country[ 0 ].parent_name },
								{
									slug: location[ 0 ].parent_slug,
									name: location[ 0 ].parent_name,
								},
								{ slug: selectedDataSlug, name: selectedVal },
							];
						} else if ( location[ 0 ].type_code === 2 ) {
							aFilterJson.accounting_partners_location = [
								{
									slug: location[ 0 ].parent_slug,
									name: location[ 0 ].parent_name,
								},
								{ slug: selectedDataSlug, name: selectedVal },
							];
						} else {
							aFilterJson.accounting_partners_location = [
								{ slug: selectedDataSlug, name: selectedVal },
							];
						}

						window.sessionStorage.setItem(
							'accounting_partners_filter',
							JSON.stringify( aFilterJson )
						);
						closeAllLists();
						generateBreadcrumbs( JSON.stringify( aFilterJson ) );
						backFilter( 1, false, 'breadcrumbs' );
						if ( window.innerWidth >= 1024 ) {
							inp.value = '';
							document.querySelector(
								'.accounting-partners-filter__button_location'
							).style.display = 'block';
							inp.classList.remove( 'active', 'clicked' );
						}
					} );
					a.appendChild( b );
				}
			}
			if ( document.querySelector( '.autocomplete-items' ).innerHTML === '' ) {
				a.innerHTML = '';
				b = document.createElement( 'DIV' );
				b.classList.add( 'no-results' );
				b.innerHTML = `No results found`;
				a.appendChild( b );
				b.addEventListener( 'click', function () {
					const nonses = inp.value;
					const nonsesSlug = stringToSlug( nonses );
					const aFilterData = window.sessionStorage.getItem(
						'accounting_partners_filter'
					);
					let aFilterJson = {};
					if ( aFilterData !== null ) {
						aFilterJson = JSON.parse( aFilterData );
					}
					aFilterJson.accounting_partners_location = [
						{ slug: nonsesSlug, name: nonses },
					];
					window.sessionStorage.setItem(
						'accounting_partners_filter',
						JSON.stringify( aFilterJson )
					);

					closeAllLists();
					generateBreadcrumbs( JSON.stringify( aFilterJson ) );
					backFilter( 1, false, 'breadcrumbs' );

					if ( window.innerWidth >= 1024 ) {
						inp.value = '';
						document.querySelector(
							'.accounting-partners-filter__button_location'
						).style.display = 'block';
						inp.classList.remove( 'active', 'clicked' );
					}
				} );
			}
		} );
	}
};

const changeFiltering = ( termName, term, taxonomy, action = 'add', clicked = null ) => {
	const aFilterData = window.sessionStorage.getItem( 'accounting_partners_filter' );
	let aFilterJson = JSON.parse( aFilterData );
	if ( action === 'remove' ) {
		if ( aFilterData !== null ) {
			const taxData = aFilterJson[ taxonomy ];
			const termsData = taxData.filter( ( item ) => {
				return item.slug !== term;
			} );
			aFilterJson[ taxonomy ] = termsData;
			window.sessionStorage.setItem(
				'accounting_partners_filter',
				JSON.stringify( aFilterJson )
			);
		}
	} else {
		if ( aFilterData === null ) {
			aFilterJson = {
				[ taxonomy ]: [
					{
						name: termName,
						slug: term,
					},
				],
			};
		} else {
			const taxData = aFilterJson[ taxonomy ];
			if ( taxData === [] || taxData === undefined ) {
				aFilterJson[ taxonomy ] = [
					{
						name: termName,
						slug: term,
					},
				];
			} else {
				taxData.push( {
					name: termName,
					slug: term,
				} );
				aFilterJson[ taxonomy ] = taxData;
			}
		}

		window.sessionStorage.setItem(
			'accounting_partners_filter',
			JSON.stringify( aFilterJson )
		);
	}
	if ( window.innerWidth >= 768 ) {
		generateBreadcrumbs( JSON.stringify( aFilterJson ) );
		backFilter( 1, false, clicked );
	}
};
const initActivesButton = () => {
	const amButtons = document.querySelectorAll(
		'.accounting-partners-filter__button:not(.accounting-partners-filter__button_location)'
	);
	const amButtonTerms = document.querySelectorAll( '.accounting-partners-filter__term' );

	amButtons.forEach( ( button ) => {
		button.classList.remove( 'selected' );
	} );
	amButtonTerms.forEach( ( button ) => {
		button.classList.remove( 'active' );
	} );

	const aFilterData = JSON.parse( window.sessionStorage.getItem( 'accounting_partners_filter' ) );
	if ( aFilterData !== null ) {
		for ( const property in aFilterData ) {
			if ( Array.isArray( aFilterData[ property ] ) ) {
				aFilterData[ property ].map( ( item ) => {
					if ( 'accounting_partners_location' !== property ) {
						document
							.querySelector( `#${ property } [data-slug=${ item.slug }]` )
							.classList.add( 'active' );
						document
							.querySelector( `#${ property }` )
							.previousElementSibling.classList.add( 'selected' );
					}
					return false;
				} );
			} else {
				document
					.querySelector( `#${ property } [data-slug=${ aFilterData[ property ] }]` )
					.classList.add( 'active' );
			}
		}
	}
	addNumberOfSelectedPerTaxnomy( amButtons );
};

const addNumberOfSelectedPerTaxnomy = ( amButtons ) => {
	if ( window.innerWidth < 768 ) {
		amButtons.forEach( ( button ) => {
			const buttonsActive = button.nextElementSibling.querySelectorAll(
				'.accounting-partners-filter__term.active'
			);
			const buttonsActiveNum = buttonsActive.length;
			const oldSpan = button.querySelector( 'span' );
			if ( buttonsActiveNum > 0 ) {
				if ( oldSpan !== null ) {
					oldSpan.remove();
				}
				const span = document.createElement( 'SPAN' );
				const number = document.createTextNode( buttonsActiveNum );
				span.appendChild( number );
				button.appendChild( span );
			} else if ( oldSpan !== null ) {
				oldSpan.remove();
			}
		} );
	}
};

const filterTermButtonEvent = () => {
	const aFilterTermButton = document.querySelectorAll(
		'.accounting-partners-filter__term:not(.disabled)'
	);
	for ( const button of aFilterTermButton ) {
		button.addEventListener( 'click', function () {
			const termSlug = this.getAttribute( 'data-slug' );
			const termName = this.querySelector( '.accounting-partners-filter__term-name' )
				.textContent;
			const taxSlug = this.parentElement.getAttribute( 'id' );
			if ( this.classList.contains( 'active' ) ) {
				changeFiltering( termName, termSlug, taxSlug, 'remove', this );
				this.classList.remove( 'active' );
			} else {
				changeFiltering( termName, termSlug, taxSlug, 'add', this );
				this.classList.add( 'active' );
			}
			initActivesButton();
		} );
	}
};

const breadcrumbsUnit = ( tax, name, slug ) => {
	return `<button class="accounting-partners-filter-elements__button" data-slug="${ slug }" data-tax-slug="${ tax.name_slug }"><span>${ tax.name }: </span>${ name }</button>`;
};

const generateBreadcrumbs = ( obj ) => {
	const aFilterElements = document.querySelector( '.accounting-partners-filter-elements' );
	amTaxonomiesObj = JSON.parse(
		window.sessionStorage.getItem( 'accounting_partners_taxonomies' )
	);
	const locations = JSON.parse(
		window.sessionStorage.getItem( 'accounting_partners_locations' )
	);
	aFilterElements.innerHTML = '';
	let buttonsFiltered = '';
	obj = JSON.parse( obj );
	let flag = false;
	for ( const property in obj ) {
		if ( property === 'accounting_partners_location' ) {
			obj[ property ].map( ( item ) => {
				const tax = amTaxonomiesObj?.filter( ( term ) => {
					return term.name_slug === property;
				} );
				const location = locations?.filter( ( term ) => {
					return term.name_slug === item.slug;
				} );

				if ( location.length === 0 ) {
					buttonsFiltered += breadcrumbsUnit(
						{ name: 'Location', name_slug: 'accounting_partners_location' },
						item.name,
						item.slug
					);
				} else {
					buttonsFiltered += breadcrumbsUnit(
						{ name: location[ 0 ].type, name_slug: tax[ 0 ].name_slug },
						item.name,
						item.slug
					);
				}

				return ( flag = true );
			} );
		} else {
			obj[ property ].map( ( item ) => {
				const tax = amTaxonomiesObj?.filter( ( term ) => {
					return term.name_slug === property;
				} );
				buttonsFiltered += breadcrumbsUnit( tax[ 0 ], item.name, item.slug );
				return ( flag = true );
			} );
		}
	}
	if ( flag ) {
		buttonsFiltered +=
			'<button class="accounting-partners-filter-elements__clear-all">Clear All</button>';
		aFilterElements.innerHTML = buttonsFiltered;
		eventButtonsFilterd();
	}
};
const eventButtonsFilterd = () => {
	const clearAll = document.querySelector( '.accounting-partners-filter-elements__clear-all' );
	clearAll.addEventListener( 'click', () => {
		clearAllFilter();
	} );
	const clearTerm = document.querySelectorAll( '.accounting-partners-filter-elements__button' );
	clearTerm.forEach( ( button ) => {
		button.addEventListener( 'click', function () {
			clearAllFilter( this );
		} );
	} );
};

const removeActiveFromLocation = () => {
	const locationInput = document.querySelector( '.accounting-partners-filter__location-input' );
	locationInput.value = '';
	locationInput.classList.remove( 'active', 'clicked', 'br-8' );
	document.querySelector( '.accounting-partners-filter__button_location' ).style.display = '';
};

const clearAllFilter = ( button ) => {
	if ( button === undefined ) {
		window.sessionStorage.removeItem( 'accounting_partners_filter' );
		removeActiveFromLocation();
	} else {
		const objFilter = JSON.parse(
			window.sessionStorage.getItem( 'accounting_partners_filter' )
		);
		const tax = button.getAttribute( 'data-tax-slug' );
		const term = button.getAttribute( 'data-slug' );
		let termsData = '';
		if ( tax === 'accounting_partners_location' ) {
			const mlButtons = document.querySelectorAll(
				'.accounting-partners-filter-elements__button[data-tax-slug="accounting_partners_location"]'
			);

			let mlPosition = 0;
			let mlButtonSlugs = [];
			mlButtons.forEach( ( obj, index = 0 ) => {
				const buttonTerm = obj.getAttribute( 'data-slug' );
				if ( term === buttonTerm ) {
					mlPosition = index;
				}
				mlButtonSlugs = [ ...mlButtonSlugs, buttonTerm ];
				index++;
			} );
			if ( mlPosition === 2 && mlButtons.length === 3 ) {
				termsData = objFilter[ tax ].filter( ( item ) => {
					return item.slug !== mlButtonSlugs[ 2 ];
				} );
			} else if ( mlPosition === 1 && mlButtons.length === 3 ) {
				termsData = objFilter[ tax ].filter( ( item ) => {
					return item.slug !== mlButtonSlugs[ 1 ] && item.slug !== mlButtonSlugs[ 2 ];
				} );
			} else if ( mlPosition === 0 && mlButtons.length === 3 ) {
				termsData = objFilter[ tax ].filter( ( item ) => {
					return (
						item.slug !== mlButtonSlugs[ 0 ] &&
						item.slug !== mlButtonSlugs[ 1 ] &&
						item.slug !== mlButtonSlugs[ 2 ]
					);
				} );
			} else if ( mlPosition === 1 && mlButtons.length === 2 ) {
				termsData = objFilter[ tax ].filter( ( item ) => {
					return item.slug !== mlButtonSlugs[ 1 ];
				} );
			} else if ( mlPosition === 0 && mlButtons.length === 2 ) {
				termsData = objFilter[ tax ].filter( ( item ) => {
					return item.slug !== mlButtonSlugs[ 0 ] && item.slug !== mlButtonSlugs[ 1 ];
				} );
			} else {
				termsData = objFilter[ tax ].filter( ( item ) => {
					return item.slug !== mlButtonSlugs[ 0 ];
				} );
			}
			removeActiveFromLocation();
		} else {
			termsData = objFilter[ tax ].filter( ( item ) => {
				return item.slug !== term;
			} );
		}

		objFilter[ tax ] = termsData;
		window.sessionStorage.setItem( 'accounting_partners_filter', JSON.stringify( objFilter ) );
	}
	const obj = window.sessionStorage.getItem( 'accounting_partners_filter' );

	generateBreadcrumbs( obj );
	initActivesButton();
	backFilter( 1, false, 'breadcrumbs' );
};

const getAllTermsSelected = () => {
	let objData = window.sessionStorage.getItem( 'accounting_partners_filter' );
	objData = JSON.parse( objData );

	const allTermsSelected = [];

	if ( objData !== null ) {
		if (
			objData.accounting_partners_industry !== undefined ||
			( Array.isArray( objData.accounting_partners_industry ) &&
				objData.accounting_partners_industry.length )
		) {
			allTermsSelected.push( ...ArrObjectToArray( objData.accounting_partners_industry ) );
		}
		if (
			objData.accounting_partners_language !== undefined ||
			( Array.isArray( objData.accounting_partners_language ) &&
				objData.accounting_partners_language.length )
		) {
			allTermsSelected.push( ...ArrObjectToArray( objData.accounting_partners_language ) );
		}
		if (
			objData.accounting_partners_location !== undefined ||
			( Array.isArray( objData.accounting_partners_location ) &&
				objData.accounting_partners_location.length )
		) {
			allTermsSelected.push(
				...ArrObjectToArray( objData.accounting_partners_location.slice( -1 ) )
			);
		}
		if (
			objData.accounting_partners_service !== undefined ||
			( Array.isArray( objData.accounting_partners_service ) &&
				objData.accounting_partners_service.length )
		) {
			allTermsSelected.push( ...ArrObjectToArray( objData.accounting_partners_service ) );
		}
	}
	return allTermsSelected;
};

const backFilter = ( page, animate = false, clicked = null ) => {
	const mContent = document.querySelector( '.accounting-partners-content' );
	if ( ! animate ) {
		const loader = `<div class="accounting-partners-loader"><div></div></div>`;
		mContent.innerHTML = loader;
	}
	let objData = window.sessionStorage.getItem( 'accounting_partners_filter' );
	objData = JSON.parse( objData );
	let accountingPartnersIndustry = '';
	let accountingPartnersLanguage = '';
	const accountingPartnersLocation = [];
	let accountingPartnersService = '';

	const allTermsSelected = [];

	if ( objData !== null ) {
		if (
			objData.accounting_partners_industry !== undefined ||
			( Array.isArray( objData.accounting_partners_industry ) &&
				objData.accounting_partners_industry.length )
		) {
			accountingPartnersIndustry = objData.accounting_partners_industry;
			allTermsSelected.push( ...ArrObjectToArray( objData.accounting_partners_industry ) );
		}
		if (
			objData.accounting_partners_language !== undefined ||
			( Array.isArray( objData.accounting_partners_language ) &&
				objData.accounting_partners_language.length )
		) {
			accountingPartnersLanguage = objData.accounting_partners_language;
			allTermsSelected.push( ...ArrObjectToArray( objData.accounting_partners_language ) );
		}
		if (
			objData.accounting_partners_location !== undefined ||
			( Array.isArray( objData.accounting_partners_location ) &&
				objData.accounting_partners_location.length )
		) {
			accountingPartnersLocation.push( objData.accounting_partners_location );
			allTermsSelected.push(
				...ArrObjectToArray( objData.accounting_partners_location.slice( -1 ) )
			);
		}
		if (
			objData.accounting_partners_service !== undefined ||
			( Array.isArray( objData.accounting_partners_service ) &&
				objData.accounting_partners_service.length )
		) {
			accountingPartnersService = objData.accounting_partners_service;
			allTermsSelected.push( ...ArrObjectToArray( objData.accounting_partners_service ) );
		}
	}

	if ( page === undefined ) {
		page = 1;
	}

	$.ajax( {
		async: true,
		url: '/wp-json/acct-accounting-partners/accounting-partners-filter',
		type: 'POST',
		dataType: 'json',
		data: {
			values: {
				accounting_partners_industry: accountingPartnersIndustry,
				accounting_partners_language: accountingPartnersLanguage,
				accounting_partners_location: accountingPartnersLocation.slice( -1 ),
				accounting_partners_service: accountingPartnersService,
				page,
			},
		},
		success( response ) {
			mContent.innerHTML = response.body_response[ 0 ];
			generateBreadcrumbs( window.sessionStorage.getItem( 'accounting_partners_filter' ) );
			initActivesButton();
			toggleSingleTerms();
			filteredPaginator();
			cardHover();

			let newUrl = `${ window.location.href }/page/${ page }`;
			if ( window.location.href.includes( '/page/' ) ) {
				newUrl = `${ window.location.href.split( '/page/' )[ 0 ] }/page/${ page }`;
			}
			if ( parseInt( page ) === 1 ) {
				newUrl = `${ window.location.href.split( '/page/' )[ 0 ] }`;
			}
			window.history.pushState( { page: `page ${ page }` }, '', newUrl );

			if ( animate ) {
				const target = document.querySelector( '.accounting-partners-filter-wrapper' );
				scrollAnimate(
					document.scrollingElement || document.documentElement,
					'scrollTop',
					'',
					document.scrollingElement.scrollTop || document.documentElement.scrollTop,
					target.offsetTop,
					600,
					true
				);
			}
		},
	} );
	if ( allTermsSelected.length > 0 ) {
		if ( clicked !== null && clicked !== 'breadcrumbs' ) {
			const parentContainer = [ clicked.parentElement.getAttribute( 'id' ) ];
			const taxesActive = [];
			const amButtons = document.querySelectorAll(
				'.accounting-partners-filter__button:not(.accounting-partners-filter__button_location)'
			);
			setTimeout( () => {
				amButtons.forEach( ( button ) => {
					const buttonsActive = button.nextElementSibling.querySelectorAll(
						'.accounting-partners-filter__term.active'
					);
					taxesActive.push( buttonsActive.length );
				} );
				let runFlag = false;
				taxesActive.forEach( ( active ) => {
					if ( active > 0 ) {
						runFlag = true;
					}
				} );
				if ( runFlag ) {
					updateTermsCount( allTermsSelected, parentContainer );
				}
			}, 50 );
		} else if ( clicked !== null && clicked === 'breadcrumbs' ) {
			updateTermsCount( allTermsSelected, getParentContainer() );
		}
	} else {
		resetTermButtonsCount();
	}
};

const updateTermsCount = ( allTermsSelected, parentContainer ) => {
	$.ajax( {
		async: true,
		url: '/wp-json/acct-accounting-partners/accounting-partners-term-count',
		type: 'POST',
		dataType: 'json',
		data: {
			values: {
				all_terms_selected: allTermsSelected,
			},
		},
		success( response ) {
			const listTermsCount = response.body_response[ 0 ];
			if ( Object.keys( listTermsCount ).length !== 0 ) {
				parentContainer.forEach( ( pContainer ) => {
					const numbers = document.querySelectorAll(
						`.accounting-partners-filter__term:not(#${ pContainer } .accounting-partners-filter__term)`
					);
					for ( let i = 0; i < numbers.length; i++ ) {
						numbers[ i ].classList.add( 'disabled' );
						numbers[ i ].querySelector(
							`.accounting-partners-filter__term_gray`
						).innerHTML = `(0)`;
					}
					for ( const term in listTermsCount ) {
						const termButton = document.querySelector(
							`.accounting-partners-filter__term[data-slug="${ term }"]:not(#${ pContainer } .accounting-partners-filter__term[data-slug="${ term }"])`
						);
						if ( termButton !== null ) {
							termButton.classList.remove( 'disabled' );
							const number = termButton.querySelector(
								`.accounting-partners-filter__term_gray`
							);
							if ( number !== null ) {
								number.innerHTML = `(${ listTermsCount[ term ] })`;
							}
						}
					}
				} );
			} else {
				resetTermButtonsCount();
			}
		},
	} );
};

const resetTermButtonsCount = () => {
	const initTermsCount = JSON.parse(
		window.sessionStorage.getItem( 'accounting_partners_init_term_count' )
	);
	for ( let i = 0; i < initTermsCount.length; i++ ) {
		const termButton = document.querySelector(
			`.accounting-partners-filter__term[data-slug="${ initTermsCount[ i ].slug }"]`
		);
		if ( termButton !== null ) {
			termButton.classList.remove( 'disabled' );
			const number = termButton.querySelector( '.accounting-partners-filter__term_gray' );
			if ( number !== null ) {
				number.innerHTML = initTermsCount[ i ].number;
			}
		}
	}
};

const saveTermCount = () => {
	if ( ! window.sessionStorage.getItem( 'accounting_partners_init_term_count' ) ) {
		const numbers = document.querySelectorAll( '.accounting-partners-filter__term' );
		const arr = [];
		for ( let i = 0; i < numbers.length; i++ ) {
			const newObj = {};
			const slug = numbers[ i ].getAttribute( 'data-slug' );
			const number = numbers[ i ].querySelector( '.accounting-partners-filter__term_gray' )
				.innerHTML;
			newObj.slug = slug;
			newObj.number = number;
			arr.push( newObj );
		}
		window.sessionStorage.setItem(
			'accounting_partners_init_term_count',
			JSON.stringify( arr )
		);
	}
};

const ArrObjectToArray = ( arr ) => {
	let newArr = [];
	for ( let i = 0; i < arr.length; i++ ) {
		newArr = [ ...newArr, arr[ i ].slug ];
	}
	return newArr;
};

const toggleSingleTerms = () => {
	if ( window.innerWidth >= 768 ) {
		const singles = document.querySelectorAll( '.accounting-partners-content__single' );
		const singlesContainerWidth = document.querySelector(
			'.accounting-partners-content__description'
		)?.offsetWidth;
		singles.forEach( ( single ) => {
			const terms = single.querySelectorAll( '.accounting-partners-content__term' );
			let termsWidth = parseInt( 41 );
			let termsHiddenHtml =
				'<button class="show-terms">+ more</button><div class="terms-hidden">';
			let termsHtml = '';
			for ( let index = 0; index < terms.length; index++ ) {
				const term = terms[ index ].outerHTML;
				const termWith = parseInt( terms[ index ].offsetWidth );
				termsWidth += termWith + 8;
				if ( termsWidth < singlesContainerWidth ) {
					termsHtml += term;
				} else {
					termsHtml += termsHiddenHtml + term;
					termsHiddenHtml = '';
				}
			}
			termsHtml = termsHtml + '</div>';
			single.querySelector( '.accounting-partners-content__terms' ).innerHTML = termsHtml;
			const mores = document.querySelectorAll( '.show-terms' );
			mores.forEach( ( more ) => {
				more.addEventListener( 'click', function () {
					this.nextElementSibling?.classList.add( 'd-flex' );
					this.remove();
				} );
			} );
		} );
	}
};

const filteredPaginator = () => {
	const pageWrapper = document.querySelector( '.accounting-partners-content__pagination' );
	const pages = document.querySelectorAll( '.page-numbers' );
	pages.forEach( ( page ) => {
		page.addEventListener( 'click', function ( e ) {
			pageWrapper.classList.add( 'accounting-partners-content__pagination_disabled' );
			setTimeout( () => {
				pageWrapper.classList.remove( 'accounting-partners-content__pagination_disabled' );
			}, 3000 );
			e.preventDefault();
			let num = this.innerHTML;
			if ( num === 'Next' ) {
				num = parseInt( getPageNumber( pages ) ) + 1;
			}
			if ( num === 'Previous' ) {
				num = parseInt( getPageNumber( pages ) ) - 1;
			}
			backFilter( num, true );
		} );
	} );
};

const getPageNumber = ( pages ) => {
	let num = 0;
	pages.forEach( ( pageNum ) => {
		if ( pageNum.classList.contains( 'current' ) ) num = pageNum.innerHTML;
	} );
	return num;
};

const scrollAnimate = ( elem, style, unit, from, to, time, prop ) => {
	if ( ! elem ) {
		return;
	}
	const start = new Date().getTime(),
		timer = setInterval( function () {
			const step = Math.min( 1, ( new Date().getTime() - start ) / time );
			if ( prop ) {
				elem[ style ] = from + step * ( to - from ) + unit;
			} else {
				elem.style[ style ] = from + step * ( to - from ) + unit;
			}
			if ( step === 1 ) {
				clearInterval( timer );
			}
		}, 25 );
	if ( prop ) {
		elem[ style ] = from + unit;
	} else {
		elem.style[ style ] = from + unit;
	}
};

const mainMenu = () => {
	if ( window.innerWidth < 768 ) {
		const filterLabels = document.querySelectorAll( '.accounting-partners-filter__label' );
		const filterSelect = document.querySelector( '.accounting-partners-filter__select' );
		const body = document.querySelector( 'body' );
		filterLabels.forEach( ( label ) => {
			label.addEventListener( 'click', () => {
				filterLabels.forEach( ( lbel ) => {
					lbel.classList.toggle( 'active' );
				} );
				filterSelect.classList.toggle( 'active' );
				body.classList.toggle( 'unmoved' );
				buttonOut();
			} );
		} );
	}
};

const mobileSerachTrigger = () => {
	if ( window.innerWidth < 768 ) {
		const buttonTrigger = document.querySelector(
			'.accounting-partners-filter__trigger-button'
		);
		const body = document.querySelector( 'body' );
		buttonTrigger.addEventListener( 'click', () => {
			const filterLabels = document.querySelectorAll( '.accounting-partners-filter__label' );
			filterLabels.forEach( ( lbel ) => {
				lbel.classList.toggle( 'active' );
			} );
			body.classList.toggle( 'unmoved' );
			backFilter( 1, false, 'breadcrumbs' );
			const filterSelect = document.querySelector( '.accounting-partners-filter__select' );
			filterSelect.classList.toggle( 'active' );
			buttonOut();
			const filterObj = JSON.parse(
				window.sessionStorage.getItem( 'accounting_partners_filter' )
			);
			if ( filterObj !== null && filterObj.accounting_partners_location.length === 0 ) {
				removeActiveFromLocation();
			}
		} );
	}
};

const cardHover = () => {
	const cards = document.querySelectorAll( '.accounting-partners-content__single a' );
	cards.forEach( ( card ) => {
		card.addEventListener( 'mouseenter', function () {
			this.closest( '.accounting-partners-content__single' ).classList.add( 'hovered' );
		} );
		card.addEventListener( 'mouseout', function () {
			this.closest( '.accounting-partners-content__single' ).classList.remove( 'hovered' );
		} );
	} );
};

/**
 * Inits functionality.
 */
const initAccountingPartners = () => {
	saveTermCount();
	amTaxonomies();
	checkAccountingPartnersUrl( amTaxonomiesObj );
	buttonEnter();
	activesOut();
	locationButton();
	closeList();
	locationSearch();
	autocomplete();
	filterTermButtonEvent();
	initActivesButton();
	toggleSingleTerms();
	filteredPaginator();
	mainMenu();
	mobileSerachTrigger();
	cardHover();
	if ( filterTermsObj !== null && filterTermsObj.length > 0 && fromSingle() ) {
		backFilter( 1, false, 'breadcrumbs' );
	}
};

document.addEventListener( 'DOMContentLoaded', initAccountingPartners, false );
