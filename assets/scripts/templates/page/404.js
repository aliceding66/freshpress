import { getSiteCountryCode, getLanguage } from 'scripts/modules/_i18n';

const init404PageScripts = () => {
	const renderAutomaticResults = ( data ) => {
		if ( ! data || ! data.records || ! data.records.page || ! data.records.page.length ) {
			return;
		}

		const faqContainer = document.querySelector( '.fp-block.faq' );
		if ( ! faqContainer ) return;

		const faqItem = faqContainer.querySelector( '.faq__item' );
		if ( ! faqItem ) return;

		const newNode = faqItem.cloneNode( true );
		newNode.classList.add( 'faq__items-revealed' );
		faqContainer.querySelector( '.faq__items' ).prepend( newNode );

		const ul = newNode.querySelector( 'ul' );
		ul.classList.add( 'is404' );
		ul.innerHTML = '';

		newNode.querySelector( 'h3' ).innerHTML = 'I might have been looking for';

		data.records.page.forEach( ( result ) => {
			ul.insertAdjacentHTML(
				'beforeend',
				`<li><a href="${ result.url }">${
					( result.highlight && result.highlight.title ) || result.title
				}</a>`
			);
		} );
	};

	const siteRegionCode = `${ getLanguage() }-${ getSiteCountryCode() }`.toLowerCase();

	$.ajax( {
		dataType: 'json',
		url: 'https://search-api.swiftype.com/api/v1/public/engines/search.json',
		data: {
			engine_key: '6SDRjozKUVXQCY-3fFf9',
			q: window.location.pathname.replace( /(_|-|\/|%20)+/g, ' ' ).trim(),
			per_page: 5,
			filters: {
				page: {
					region: siteRegionCode,
				},
			},
		},
		success: renderAutomaticResults,
	} );
};

document.addEventListener( 'DOMContentLoaded', init404PageScripts, false );
