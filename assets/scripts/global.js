import { initAnimations } from 'scripts/modules/_animations';
import {
	initCookieDefaults,
	initCookieModal,
	initCookiesModalListener,
} from 'scripts/modules/_cookies';
import { initForms } from 'scripts/modules/_forms';
import { setRegionCookies } from 'scripts/modules/_i18n';
import {
	addLinkTracking,
	initAttributionTracking,
	setGlobalDataLayer,
} from 'scripts/modules/_tracking';
import {
	addStickyTopObserver,
	addStickyBottomObserver,
	cleanupTelLinks,
	externalLinksPatcher,
	initSmoothScroll,
	initOpenModalLinks,
	isNfbCustomer,
	replaceRegionalisedUrls,
	setTrialLengthCookie,
} from 'scripts/helpers/_utils';
import { initHeader } from 'scripts/templates/common/header';
import { initFooter } from 'scripts/templates/common/footer';
import { initRSHeader } from 'scripts/templates/common/region-selection-header';
import { initRSFooter } from 'scripts/templates/common/region-selection-footer';
import { initBannerPromo } from 'scripts/templates/common/header-banner-promo';

/**
 * Init function executed once the DOM has loaded.
 */
const contentLoadedInit = () => {
	addLinkTracking();
	initForms();
	initCookieModal();
	initSmoothScroll();
	initAnimations();
	addStickyTopObserver();
	addStickyBottomObserver();
	replaceRegionalisedUrls();
	cleanupTelLinks();
	externalLinksPatcher();
	setTrialLengthCookie();
	initHeader();
	initFooter();
	initRSHeader();
	initRSFooter();
	initCookiesModalListener();
	initBannerPromo();
	initOpenModalLinks();

	document.body.classList.remove( 'loading' );
	document.body.classList.add( 'loaded' );
};

/**
 * Init function executed as soon as possible (i.e., it won't wait for the DOM to load).
 */
const immediateInit = () => {
	if ( null === document.body ) {
		return;
	}

	initCookieDefaults();
	setRegionCookies();
	initAttributionTracking();
	setGlobalDataLayer();

	document.body.classList.add( 'loading' );

	if ( isNfbCustomer() ) {
		document.body.classList.remove( 'fbprospect' );
		document.body.classList.add( 'fbcustomer' );
	}

	// Execute contentLoaded function once DOM loaded.
	document.addEventListener( 'DOMContentLoaded', contentLoadedInit, false );
};

// Execute immediateInit function ASAP.
immediateInit();
