import { track } from 'scripts/modules/_tracking';
import { setUserCountryCode, setUserCountryName } from 'scripts/modules/_i18n';

/**
 * Bind click of select-like element to visibility of associated modal.
 *
 * @param {HTMLElement} thisSelectorEl Clicked select element.
 * @param {HTMLElement} thatSelectorEl Sibling select of clicked select element
 * @param {HTMLElement} thisModal      Modal associated with clicked select element.
 * @param {HTMLElement} thatModal      Sibling modal of expanded modal element.
 */
const modalAction = ( thisSelectorEl, thatSelectorEl, thisModal, thatModal ) => {
	thisSelectorEl.addEventListener( 'click', () => {
		if ( thisModal.classList.contains( 'd-none' ) ) {
			thisModal.classList.remove( 'd-none' );
			thisSelectorEl.classList.add( 'expanded' );
		} else {
			thisModal.classList.add( 'd-none' );
			thisSelectorEl.classList.remove( 'expanded' );
		}
		thatModal.classList.add( 'd-none' );
		thatSelectorEl.classList.remove( 'expanded' );
	} );
};

/**
 * Adjust the position of expanded modals to align with style at active viewport size.
 *
 * @param {HTMLElement} select Associated select element of modal to align
 * @param {HTMLElement} modal  Modal to align
 */
const positionModal = ( select, modal ) => {
	const footerBoundary = document.querySelector( 'footer' ).getBoundingClientRect().left;
	let leftOffset = window.pageXOffset + select.getBoundingClientRect().left;
	const screenWidth = window.screen.width;
	let xPadding = 0;
	if ( screenWidth > 480 && screenWidth <= 768 ) {
		xPadding = 15;
	} else if ( screenWidth > 768 && screenWidth <= 1280 ) {
		xPadding = 40;
	} else if ( screenWidth > 1280 ) {
		leftOffset -= footerBoundary;
		xPadding = 40;
	} else {
		leftOffset = 0;
	}
	const totalOffset = leftOffset - xPadding > 0 ? leftOffset - xPadding : 0;
	modal.style.left = `${ totalOffset }px`;
};

/**
 * Close the modal and collapse the selector for a given pair.
 *
 * @param {HTMLElement} selectorEl Selector element
 * @param {HTMLElement} modalEl    Related modal element
 */
const closeModal = ( selectorEl, modalEl ) => {
	if ( selectorEl.classList.contains( 'expanded' ) || ! modalEl.classList.contains( 'd-none' ) ) {
		selectorEl.classList.remove( 'expanded' );
		modalEl.classList.add( 'd-none' );
	}
};

export const initRSFooter = () => {
	const footer = document.querySelector( '.region-selection-footer' );

	if ( footer ) {
		const countrySelector = footer.querySelector( '.region-select' );
		const countryModal = footer.querySelector( '.modal__region' );
		const languageSelector = footer.querySelector( '.language-select' );
		const languageModal = footer.querySelector( '.modal__language' );

		modalAction( countrySelector, languageSelector, countryModal, languageModal );
		modalAction( languageSelector, countrySelector, languageModal, countryModal );

		// Collapse select modals on resize
		window.addEventListener( 'resize', () => {
			closeModal( countrySelector, countryModal );
			closeModal( languageSelector, languageModal );
		} );

		// Collapse select modals on click outside
		document.addEventListener( 'click', ( e ) => {
			if ( ! footer.contains( e.target ) ) {
				closeModal( countrySelector, countryModal );
				closeModal( languageSelector, languageModal );
			}
		} );

		// Reposition modals on init,...
		positionModal( countrySelector, countryModal );
		positionModal( languageSelector, languageModal );

		// ... resize,...
		// window.onresize = () => {
		window.addEventListener( 'resize', () => {
			positionModal( countrySelector, countryModal );
			positionModal( languageSelector, languageModal );
		} );

		// ... and click.
		countrySelector.addEventListener( 'click', () => {
			positionModal( countrySelector, countryModal );
			positionModal( languageSelector, languageModal );
		} );

		const regions = document.querySelectorAll( '.region' );
		regions.forEach( ( region ) => {
			const { countryCode, countryName } = region.dataset;
			region.addEventListener( 'click', ( e ) => {
				e.preventDefault();

				if ( region.classList.contains( 'multilingual' ) ) {
					// Close the country selector modal
					closeModal( countrySelector, countryModal );

					// Update the closed country selector values
					const countrySelectorFlagIcon = countrySelector.querySelector( '.flag-icon' );
					const countrySelectorText = countrySelector.querySelector( '.selector' );
					countrySelectorFlagIcon.className = countrySelectorFlagIcon.className.replace(
						/\bflag-icon-[a-z]{2}\b/,
						''
					);
					countrySelectorFlagIcon.classList.add(
						`flag-icon-${ countryCode.toLowerCase() }`
					);
					countrySelectorText.textContent = countryName;

					// Show the language selector
					positionModal( languageSelector, languageModal );
					languageSelector.classList.remove( 'd-none' );

					// Show only this countries languages, if multilingual
					languageModal.querySelectorAll( '.language' ).forEach( ( lang ) => {
						if ( lang.classList.contains( countryCode.toLowerCase() ) ) {
							lang.classList.remove( 'd-none' );
						} else {
							lang.classList.add( 'd-none' );
						}
					} );

					// Open the language selection modal by default
					if ( languageModal.classList.contains( 'd-none' ) ) {
						positionModal( languageSelector, languageModal );
						languageModal.classList.remove( 'd-none' );
						languageSelector.classList.add( 'expanded' );
					}

					footer.className = footer.className.replace( /\bregion-[a-z]{2}\b/, '' );
					footer.classList.add( `region-${ countryCode.toLowerCase() }` );
				} else {
					languageSelector.classList.add( 'd-none' );
					languageModal.classList.add( 'd-none' );

					setUserCountryCode( countryCode );
					setUserCountryName( countryName );
					track( 'gtm', {
						event: 'linkClick',
						ctaText: countryName.toLowerCase().replace( / /g, '' ),
						ctaSection: 'footer',
					} );
					window.location = e.target.href;
				}
			} );
		} );
	}
};
