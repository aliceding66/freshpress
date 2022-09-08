/**
 * Accounting Partners Services Accordion.
 */

import { initBlock } from 'scripts/helpers/_blocks';

const accDown = ( element, hidden = false ) => {
	if ( hidden ) {
		element.nextElementSibling.style.height = 'auto';
		element.remove();
	} else {
		element.parentElement.nextElementSibling.style.height = `${ element.parentElement.nextElementSibling.scrollHeight }px`;
		setTimeout( () => {
			element.parentElement.nextElementSibling.style.height = 'auto';
		}, 500 );
	}
};
const accUp = ( element ) => {
	element.parentElement.nextElementSibling.style.height = `${ element.parentElement.nextElementSibling.scrollHeight }px`;
	setTimeout( () => {
		element.parentElement.nextElementSibling.style.height = '0px';
	}, 10 );
};

const activeAccordion = ( accountingPartnersServicesAccordion ) => {
	const accordionItem = accountingPartnersServicesAccordion.querySelectorAll(
		'.accounting-partners-services-accordion__open-body'
	);
	const accordionHiddenElement = accountingPartnersServicesAccordion.querySelectorAll(
		'.accounting-partners-services-accordion__button-show'
	);
	accordionItem.forEach( ( item ) => {
		item.addEventListener( 'click', function () {
			if ( this.classList.contains( 'active' ) ) {
				accUp( this );
				this.classList.remove( 'active' );
			} else {
				accDown( this );
				this.classList.add( 'active' );
			}
		} );
	} );
	accordionHiddenElement.forEach( ( item ) => {
		item.addEventListener( 'click', function () {
			accDown( this, true );
			this.classList.remove( 'active' );
		} );
	} );
};

const initAccountingPartnersServicesAccordion = ( accountingPartnersServicesAccordion ) => {
	activeAccordion( accountingPartnersServicesAccordion );
};

initBlock( '.accounting-partners-services-accordion', initAccountingPartnersServicesAccordion );
