/**
 * Accounting Partners Form.
 */

import { initBlock } from 'scripts/helpers/_blocks';

const initAccountingPartnersForm = () => {
	const form = document.querySelector( '.accounting-partners-form_default-form' );

	const gRecaptcha = document.createElement( 'script' );
	gRecaptcha.setAttribute( 'src', 'https://www.google.com/recaptcha/api.js' );
	gRecaptcha.setAttribute( 'async', 'async' );
	gRecaptcha.setAttribute( 'defer', 'defer' );
	document.body.appendChild( gRecaptcha );

	const removeItemOnce = ( arr, value ) => {
		const index = arr.indexOf( value );
		if ( index > -1 ) {
			arr.splice( index, 1 );
		}
		return arr;
	};

	const checkEmailMessage = () => {
		const email = document.getElementById( 'email' );
		if ( email.value !== '' ) {
			email
				.closest( '.accounting-partners-form__field' )
				.querySelector( '.invalid-feedback-format' ).style.display = 'block';
			email
				.closest( '.accounting-partners-form__field' )
				.querySelector( '.invalid-feedback-required' ).style.display = 'none';
		} else {
			email
				.closest( '.accounting-partners-form__field' )
				.querySelector( '.invalid-feedback-format' ).style.display = '';
			email
				.closest( '.accounting-partners-form__field' )
				.querySelector( '.invalid-feedback-required' ).style.display = '';
		}
	};

	const phone = document.getElementById( 'work-phone' );

	phone.addEventListener( 'keypress', ( e ) => {
		const keycode = e.which || e.keyCode || 0;
		if (
			! (
				keycode === 46 ||
				keycode === 8 ||
				keycode === 40 ||
				keycode === 41 ||
				keycode === 45 ||
				keycode === 43 ||
				( keycode >= 48 && keycode <= 57 && e.shiftKey === false )
			)
		) {
			e.preventDefault();
		}
	} );

	const checkboxFacadeUL = document.getElementById( 'how-we-help-facade' );
	const checkboxFacaceLI = checkboxFacadeUL.querySelectorAll( 'li' );
	const checkboxFacaceInput = document.getElementById( 'how-we-help' );
	const checkboxFacaceInputValue = [];
	const functionActiveUL = ( event ) => {
		event.preventDefault();
		checkboxFacadeUL.classList.toggle( 'active' );
		event.target.blur();
	};
	checkboxFacaceInput.addEventListener( 'click', functionActiveUL );

	document.getElementById( 'languages' ).addEventListener( 'change', function () {
		const otherLanguages = document.getElementById( 'languages-other' ).parentElement
			.parentElement;
		if ( this.value === 'Other' ) {
			otherLanguages.classList.remove( 'd-none' );
		} else {
			otherLanguages.classList.add( 'd-none' );
		}
	} );

	document.body.addEventListener( 'click', function ( e ) {
		if (
			! e.target.classList.contains( 'how-we-help' ) &&
			e.target.nodeName !== 'LI' &&
			! e.target.classList.contains( 'service-other' )
		) {
			checkboxFacadeUL.classList.remove( 'active' );
		}
	} );

	checkboxFacaceLI.forEach( ( li ) => {
		li.addEventListener( 'click', function () {
			const option = this.innerText;
			if ( this.classList.contains( 'other' ) ) {
				if ( ! this.classList.contains( 'active-item' ) ) {
					checkboxFacaceInputValue.push( 'Other' );
					this.classList.add( 'active-item' );
					this.innerHTML = `<input type="text" class="service-other" placeholder="Other" name="how-we-help-other" id="how-we-help-other">`;
					document.querySelector( '.service-other' ).focus();
				} else {
					removeItemOnce( checkboxFacaceInputValue, 'Other' );
					this.classList.remove( 'active-item' );
					this.innerHTML = `Other`;
				}
			} else if ( ! this.classList.contains( 'active-item' ) ) {
				this.classList.add( 'active-item' );
				checkboxFacaceInputValue.push( option );
			} else {
				this.classList.remove( 'active-item' );
				removeItemOnce( checkboxFacaceInputValue, option );
			}

			checkboxFacaceInput.value = checkboxFacaceInputValue.join( ', ' );
		} );
	} );

	const checkCaptcha = ( formValues ) => {
		let result = false;
		$.ajax( {
			async: false,
			url: '/wp-json/acct-accounting-partners/g-recaptcha',
			type: 'POST',
			dataType: 'json',
			data: {
				values: {
					formValues,
				},
			},
			success( response ) {
				const res = response.body_response;
				if ( res ) {
					result = res;
				}
			},
		} );
		return result;
	};

	const removeRecaptchaError = () => {
		document.querySelector( '.g-recaptcha' ).addEventListener(
			'mouseenter',
			function () {
				setTimeout( () => {
					document.querySelector( '.recaptcha-error-message' ).style.display = 'none';
				}, 700 );
			},
			false
		);
	};

	const submitForm = ( formValues, nonces ) => {
		if ( nonces ) {
			$.ajax( {
				async: true,
				url: '/wp-json/acct-accounting-partners/submit-pardot-forms',
				type: 'POST',
				dataType: 'json',
				data: {
					nonce: nonces.nonce,
					values: {
						formValues,
					},
				},
				success( response ) {
					const res = response.body_response;
					const success = res[ 0 ];
					const partnerName = res[ 1 ];
					if ( success === true ) {
						window.location.href = `//${ window.location.host }${ window.location.pathname }?thank-you&firm-name=${ partnerName }`;
					} else {
						submissionFailed();
					}
				},
				error() {
					submissionFailed();
				},
			} );
		} else {
			submissionFailed();
		}
	};

	form.addEventListener(
		'submit',
		( e ) => {
			// eslint-disable-next-line
			if ( ! form.checkValidity( e ) || grecaptcha.getResponse() === '' ) {
				e.preventDefault();
				e.stopPropagation();
				checkEmailMessage();
				// eslint-disable-next-line
				if ( grecaptcha.getResponse() === '' ) {
					document.querySelector( '.recaptcha-error-message' ).style.display = 'block';

					removeRecaptchaError();
				}
			} else {
				document
					.querySelector( '.accounting-partners-form__submit' )
					.classList.add( 'loading' );
				setTimeout( () => {
					const formValues = new Object();
					[ ...form.elements ].forEach( ( item ) => {
						if ( item.getAttribute( 'type' ) !== 'submit' ) {
							const itemName = item.getAttribute( 'id' );
							let itemValue = item.value;
							if ( item.getAttribute( 'type' ) === 'checkbox' ) {
								itemValue = false;
								if ( item.checked ) {
									itemValue = true;
								}
							}
							formValues[ itemName ] = itemValue;
						}
					} );
					formValues[ 'partner-id' ] = document
						.querySelector( '.accounting-partners-form' )
						.getAttribute( 'data-partner-id' );

					if ( checkCaptcha( formValues ) ) {
						$.ajax( {
							async: true,
							url: '/wp-json/acct-accounting-partners/fp-create-nonce',
							type: 'POST',
							dataType: 'json',
							data: '',
							success( response ) {
								const nonces = response.body_response;
								if ( nonces ) {
									submitForm( formValues, nonces );
								} else {
									submissionFailed();
								}
							},
							error() {
								submissionFailed();
							},
						} );
					} else {
						document.querySelector( '.recaptcha-error-message' ).style.display =
							'block';
						// eslint-disable-next-line
						grecaptcha.reset();
						removeRecaptchaError();
						document
							.querySelector( '.accounting-partners-form__submit' )
							.classList.remove( 'loading' );
					}
				}, 50 );
			}
		},
		false
	);

	const submissionFailed = () => {
		const submit = document.querySelector( '.accounting-partners-form__submit' );
		submit.classList.remove( 'loading' );
		submit.insertAdjacentHTML(
			'afterend',
			'<div class="accounting-partners-form__error-message">There was a problem with your submission. Please try again.</div>'
		);
		setTimeout( () => {
			const errorMessage = document.querySelector(
				'.accounting-partners-form__error-message'
			);
			errorMessage.style.opacity = '0';
			setTimeout( () => {
				errorMessage.remove();
			}, 500 );
		}, 45000 );
	};
};

initBlock( '.accounting-partners-form', initAccountingPartnersForm );
