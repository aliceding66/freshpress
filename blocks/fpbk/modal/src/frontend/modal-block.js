/**
 * Modal.
 */
import { initBlock } from 'scripts/helpers/_blocks';
import { readCookie, createCookieIfMissing } from 'scripts/modules/_cookies';
import { getSiteCountryCode } from 'scripts/modules/_i18n';
import 'bootstrap/js/dist/modal';

const handleExitIntention = ( modal, bsModal ) => {
	// eslint-disable-next-line @wordpress/no-global-event-listener
	document.addEventListener( 'mouseout', ( e ) => {
		const shouldShowExitIntent = ! e.toElement && ! e.relatedTarget && e.clientY < 10;

		if ( shouldShowExitIntent && ! readCookie( 'seo-exit-popup-dismissed' ) ) {
			bsModal.modal( 'show' );

			// This event handler cannot use addEventListener and must use jQuery due to bootstrap's internal code.
			// eslint-disable-next-line no-undef
			$( modal ).on( 'hidden.bs.modal', () => {
				createCookieIfMissing( 'seo-exit-popup-dismissed', 'true', 30 );
			} );
			// eslint-disable-next-line @wordpress/no-global-event-listener
			window.addEventListener( 'message', ( messageEvent ) => {
				if ( messageEvent.data.success ) {
					createCookieIfMissing( 'seo-exit-popup-dismissed', 'true', 30 );
				}
			} );
		}
	} );
};

const initModal = ( modal ) => {
	const shownBefore = readCookie( `modal-id-${ modal.id }-dismissed` );
	const openOnce = modal.matches( '[data-open-once="1"]' );
	const showWhenCookiesAccepted = modal.matches( '[data-show-when-cookies-accepted="1"]' );
	const cookiesAccepted = readCookie( `cookies-declined` ) === 'false';
	const pardotForm = modal.querySelector( 'iframe' );

	if ( modal && modal.matches( '[data-auto-show="1"]' ) ) {
		// eslint-disable-next-line no-undef
		const bsModal = $( modal );
		const delay = parseInt( modal.dataset.delay, 10 ) * 1000;
		const userAction = modal.dataset.userAction;
		const modalVisibility = modal.dataset.visibility;
		const conditions = [
			modalVisibility === 'everyone',
			modalVisibility === 'nfb_customers' && readCookie( 'smux_login' ),
			modalVisibility === 'not_nfb_customers' && ! readCookie( 'smux_login' ),
			modalVisibility === 'location' &&
				readCookie( 'country-code' ) === 'GB' &&
				getSiteCountryCode() === 'US',
		];
		const showModal = conditions.some( ( item ) => item );
		if (
			( ! openOnce || ( openOnce && ! shownBefore ) ) &&
			( ! showWhenCookiesAccepted || ( showWhenCookiesAccepted && cookiesAccepted ) )
		) {
			if ( showModal && userAction === 'none' ) {
				setTimeout( () => {
					bsModal.modal( 'show' );
					if ( openOnce ) {
						createCookieIfMissing( `modal-id-${ modal.id }-dismissed`, 'true', 30 );
					}
				}, delay );
			} else if (
				showModal &&
				userAction === 'page_leave' &&
				! readCookie( 'seo-exit-popup-dismissed' )
			) {
				setTimeout( () => {
					handleExitIntention( modal, bsModal );
					if ( openOnce ) {
						createCookieIfMissing( `modal-id-${ modal.id }-dismissed`, 'true', 30 );
					}
				}, delay );
			}
		}
	}

	if ( modal.classList.contains( 'is-style-with-stages' ) ) {
		const stagesContainer = modal.querySelector( '.modal__stages' );
		const stages = modal.querySelectorAll( '.modal__stage' );
		const nextButtons = modal.querySelectorAll( 'a[data-stage="next"]' );
		modal.currentStage = 0;

		const setModalStage = ( stageNumber ) => {
			const nextStage = stages[ modal.currentStage + 1 ];

			modal.currentHeight = Math.ceil( stagesContainer.getBoundingClientRect().height );
			stagesContainer.style.height = `${ modal.currentHeight }px`;
			Array.from( stages ).forEach( ( stage ) => stage.classList.remove( 'active' ) );
			nextStage.classList.add( 'active' );
			setTimeout( () => {
				const nextStageHeight = nextStage.scrollHeight; // eslint-disable-line
				stagesContainer.animate(
					[
						{ height: `${ modal.currentHeight }px` },
						{ height: `${ nextStageHeight }px` },
					],
					{
						duration: 200,
						fill: 'forwards',
					}
				);

				modal.currentHeight = nextStageHeight;
			}, 100 );

			modal.currentStage = stageNumber;
		};

		if ( nextButtons ) {
			nextButtons.forEach( ( nextButton ) => {
				nextButton.addEventListener( 'click', () => {
					setModalStage( modal.currentStage + 1 );
				} );
			} );
		}

		// eslint-disable-next-line @wordpress/no-global-event-listener
		window.addEventListener( 'message', ( messageEvent ) => {
			const isSameSource = messageEvent.source === pardotForm.contentWindow;
			const hasCurrentStageForm = stages[ modal.currentStage ].querySelector( 'iframe' );

			if ( messageEvent.data && messageEvent.data.frameHeight && hasCurrentStageForm ) {
				const modalActiveStage = modal.querySelector( '.modal__stage.active' );
				modal.iframeHeight = messageEvent.data.frameHeight;
				stagesContainer.animate(
					[
						{ height: `${ modal.currentHeight }px` },
						{ height: `${ modalActiveStage.scrollHeight }px` },
					],
					{
						duration: 200,
						fill: 'forwards',
					}
				);
			}

			if (
				( messageEvent.data.formSubmitted || 2 === messageEvent.data.formStage ) &&
				isSameSource &&
				hasCurrentStageForm
			) {
				setModalStage( modal.currentStage + 1 );
			}
		} );
	}
};

initBlock( '.modal', initModal );
