/* eslint-env jest */

import * as _forms from 'scripts/modules/_forms';

import isPlainObject from 'is-plain-obj';

const testData = {};

const testDataSrc = {
	fields: {
		alpha: {
			tagName: 'input',
			type: 'text',
			name: 'first-name',
			value: 'Bruce',
			dataset: {
				validation: 'is-alpha',
			},
		},
		checkbox: {
			tagName: 'input',
			type: 'checkbox',
			name: 'single-checkbox',
			value: 'yes',
			checked: true,
		},
		customType: {
			tagName: 'input',
			type: 'text',
			name: 'custom-type',
			dataset: {
				type: 'some-custom-type',
			},
		},
		email: {
			tagName: 'input',
			type: 'email',
			name: 'email-address',
			value: 'example@example.com',
		},
		empty: {
			tagName: 'input',
			type: 'text',
			name: 'empty-input',
			value: '',
		},
		maxlength: {
			tagName: 'input',
			type: 'text',
			name: 'max-length',
			maxLength: '8',
			value: '12345678',
		},
		minlength: {
			tagName: 'input',
			type: 'text',
			name: 'min-length',
			minLength: '8',
			value: '12345678',
		},
		multiselect: {
			tagName: 'select',
			name: 'flavours',
			value: [ 'chocolate', 'orange' ],
			multiple: true,
			options: [
				{
					text: 'Select one or more',
					disabled: true,
				},
				{
					value: 'chocolate',
					text: 'Chocolate',
					selected: true,
				},
				{
					value: 'lemon',
					text: 'Lemon',
				},
				{
					value: 'orange',
					text: 'Orange',
					selected: true,
				},
				{
					value: 'strawberry',
					text: 'Strawberry',
				},
			],
		},
		novalue: {
			tagName: 'input',
			type: 'text',
			name: 'no-value',
		},
		password: {
			tagName: 'input',
			type: 'password',
			name: 'password',
			value: 'P@$$vv0rd',
		},
		phone: {
			tagName: 'input',
			type: 'tel',
			name: 'phone-number',
			value: '+1 (234) 567-8900',
		},
		radio: {
			tagName: 'input',
			type: 'radio',
			name: 'single-radio-button',
			value: 'on',
			checked: true,
		},
		required: {
			tagName: 'input',
			type: 'text',
			name: 'required',
			value: '',
			required: true,
		},
		select: {
			tagName: 'select',
			name: 'colours',
			value: 'blue',
			options: [
				{
					text: 'Select one',
					disabled: true,
				},
				{
					value: 'red',
					text: 'Red',
				},
				{
					value: 'green',
					text: 'Green',
				},
				{
					value: 'blue',
					text: 'Blue',
					selected: true,
				},
			],
		},
		text: {
			tagName: 'input',
			type: 'text',
			name: 'company',
			value: 'FreshBooks',
		},
		username: {
			tagName: 'input',
			type: 'text',
			name: 'username',
			value: '1337haX0r',
			dataset: {
				validation: 'is-alphanumeric no-spaces',
			},
		},
	},
	fieldGroups: {
		checkboxGroup: [
			{
				tagName: 'input',
				type: 'checkbox',
				name: 'chipmunks[]',
				value: 'alvin',
				checked: true,
			},
			{
				tagName: 'input',
				type: 'checkbox',
				name: 'chipmunks[]',
				value: 'simon',
				checked: true,
			},
			{
				tagName: 'input',
				type: 'checkbox',
				name: 'chipmunks[]',
				value: 'theodore',
				checked: true,
			},
			{
				tagName: 'input',
				type: 'checkbox',
				name: 'chipmunks[]',
				value: 'dave',
			},
		],
		radioButtonGroup: [
			{
				tagName: 'input',
				type: 'radio',
				id: 'choice1',
				name: 'alignment',
				value: 'left',
			},
			{
				tagName: 'input',
				type: 'radio',
				id: 'choice2',
				name: 'alignment',
				value: 'middle',
				checked: true,
			},
			{
				tagName: 'input',
				type: 'radio',
				id: 'choice3',
				name: 'alignment',
				value: 'right',
			},
		],
	},
	buttons: {
		button: {
			tagName: 'button',
			name: 'button',
		},
		imageButton: {
			tagName: 'input',
			type: 'image',
			name: 'imageButton',
		},
		inputButton: {
			tagName: 'input',
			type: 'button',
			name: 'inputButton',
		},
		resetButton: {
			tagName: 'input',
			type: 'reset',
			name: 'resetButton',
		},
		submitButton: {
			tagName: 'input',
			type: 'submit',
			name: 'submitButton',
		},
	},
};

const createElement = ( field = {} ) => {
	if ( typeof field === 'string' ) {
		const element = document.createElement( null );
		element.innerHTML = field;
		return element;
	}

	if ( ! field.tagName ) {
		return;
	}

	const element = document.createElement( field.tagName );

	Object.keys( field ).forEach( ( prop ) => {
		if ( prop !== 'tagName' ) {
			if ( prop === 'options' && Array.isArray( field[ prop ] ) ) {
				field[ prop ].forEach( ( data ) => {
					data.tagName = 'option';
					element.appendChild( createElement( data ) );
				} );
			} else if ( prop === 'dataset' && isPlainObject( field[ prop ] ) ) {
				Object.keys( field[ prop ] ).forEach( ( key ) => {
					element[ prop ][ key ] = field[ prop ][ key ];
				} );
			} else {
				element[ prop ] = field[ prop ];
			}
		}
	} );

	return element;
};

beforeEach( () => {
	document.body.innerHTML = '';

	// Initialise test form element.
	testData.form = document.createElement( 'form' );
	testData.form.classList.add( 'fp-form' );
	testData.form.id = 'test-form';

	// Initialise test field and button elements.
	Object.keys( testDataSrc ).forEach( ( group ) => {
		testData[ group ] = [];
		Object.keys( testDataSrc[ group ] ).forEach( ( key ) => {
			testData[ group ].push( createElement( testDataSrc[ group ][ key ] ) );
		} );
	} );
} );

describe( 'modules/_forms', () => {
	describe( 'initForms function', () => {
		test( 'initForms function exists', () => {
			expect( typeof _forms.initForms ).toBe( 'function' );
		} );
		test( 'initForms function registers event handlers', () => {
			// Preparation.
			document.body.innerHTML = `
				<form>
					<input name="field_a" />
					<input name="field_b" />
				</form>
				<form>
					<input name="field_c" />
					<input name="field_d" />
				</form>
			`;

			const forms = _forms.getAllForms();
			const formFieldGroups = Array.from( forms ).map( ( form ) => {
				return _forms.getAllFormFields( form );
			} );

			const formSpies = Array.from( forms ).map( ( form ) =>
				jest.spyOn( form, 'addEventListener' )
			);
			const formFieldGroupSpies = formFieldGroups.map( ( formFields ) =>
				formFields.map( ( field ) => jest.spyOn( field, 'addEventListener' ) )
			);

			// Call function.
			_forms.initForms();

			// Test expectations.
			formSpies.forEach( ( spy ) => {
				expect( spy ).toHaveBeenNthCalledWith( 1, 'submit', expect.any( Function ) );
			} );
			formFieldGroupSpies.forEach( ( formFieldSpies ) => {
				formFieldSpies.forEach( ( spy ) => {
					expect( spy ).toHaveBeenNthCalledWith( 1, 'keyup', expect.any( Function ) );
				} );
			} );
		} );
	} );

	describe( 'filterInputFields function', () => {
		test( 'filterInputFields function exists', () => {
			expect( typeof _forms.filterInputFields ).toBe( 'function' );
		} );
		test( 'filterInputFields removes button input fields', () => {
			const filtered = _forms.filterInputFields( testData.fields );
			expect(
				filtered.some( ( f ) => [ 'button', 'submit' ].includes( f.type ).length )
			).toBe( false );
		} );
	} );

	describe( 'getAllForms function', () => {
		test( 'getAllForms function exists', () => {
			expect( typeof _forms.getAllForms ).toBe( 'function' );
		} );

		test( 'getAllForms get all forms with parent and not', () => {
			// Preparation.
			document.body.innerHTML = `
			<form></form>
			<div class="test-parent">
				<form></form>
			</div>
			`;

			// Test expectations.
			expect( _forms.getAllForms().length ).toBe( 2 );
			expect( _forms.getAllForms( '.test-parent' ).length ).toBe( 1 );
		} );
	} );

	describe( 'getAllFormFields function', () => {
		test( 'getAllFormFields function exists', () => {
			expect( typeof _forms.getAllFormFields ).toBe( 'function' );
		} );
		test( 'getAllFormFields returns empty array if no fields', () => {
			const allFormFields = _forms.getAllFormFields( testData.form );
			expect( Array.isArray( allFormFields ) ).toBe( true );
			expect( allFormFields.length ).toBe( 0 );
		} );
		test( 'getAllFormFields returns fields in array', () => {
			testData.form.appendChild( testData.fields[ 0 ] );
			const allFormFields = _forms.getAllFormFields( testData.form );
			expect( Array.isArray( allFormFields ) ).toBe( true );
			expect( allFormFields.length ).toBe( 1 );
		} );
		test( 'getAllFormFields contains an <input> button element', () => {
			testData.fields.forEach( ( field ) => {
				testData.form.appendChild( field );
			} );
			testData.form.appendChild(
				testData.buttons[ Object.keys( testDataSrc.buttons ).indexOf( 'inputButton' ) ]
			);
			const allFormFields = _forms.getAllFormFields( testData.form );
			expect( Array.isArray( allFormFields ) ).toBe( true );
			expect( allFormFields.length ).toBe( testData.fields.length );
		} );
		test( 'getAllFormFields contains a <button> element', () => {
			testData.fields.forEach( ( field ) => {
				testData.form.appendChild( field );
			} );
			testData.form.appendChild(
				testData.buttons[ Object.keys( testDataSrc.buttons ).indexOf( 'button' ) ]
			);
			const allFormFields = _forms.getAllFormFields( testData.form );
			expect( Array.isArray( allFormFields ) ).toBe( true );
			expect( allFormFields.length ).toBe( testData.fields.length );
		} );
	} );

	describe( 'getFieldType function', () => {
		test( 'getFieldType function exists', () => {
			expect( typeof _forms.getFieldType ).toBe( 'function' );
		} );
		test( 'getFieldType correctly identifies an <input type="text"> element', () => {
			const field = testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'text' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'text' );
		} );
		test( 'getFieldType correctly identifies an <input type="email"> element', () => {
			const field = testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'email' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'email' );
		} );
		test( 'getFieldType correctly identifies an <input type="phone"> element', () => {
			const field = testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'phone' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'tel' );
		} );
		test( 'getFieldType correctly identifies an <input type="password"> element', () => {
			const field =
				testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'password' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'password' );
		} );
		test( 'getFieldType correctly identifies a <select> element', () => {
			const field = testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'select' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'select' );
		} );
		test( 'getFieldType correctly identifies an <input type="checkbox"> element', () => {
			const field =
				testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'checkbox' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'checkbox' );
		} );
		test( 'getFieldType correctly identifies an <input type="radio"> element', () => {
			const field = testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'radio' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'radio' );
		} );
		test( 'getFieldType correctly identifies a <button> element', () => {
			const field =
				testData.buttons[ Object.keys( testDataSrc.buttons ).indexOf( 'button' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'button' );
		} );
		test( 'getFieldType correctly identifies an <input type="button"> element', () => {
			const field =
				testData.buttons[ Object.keys( testDataSrc.buttons ).indexOf( 'inputButton' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'button' );
		} );
		test( 'getFieldType correctly identifies an <input type="submit"> element', () => {
			const field =
				testData.buttons[ Object.keys( testDataSrc.buttons ).indexOf( 'submitButton' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'submit' );
		} );
		test( 'getFieldType correctly identifies an <input type="reset"> element', () => {
			const field =
				testData.buttons[ Object.keys( testDataSrc.buttons ).indexOf( 'resetButton' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'reset' );
		} );
		test( 'getFieldType correctly identifies an <input type="image"> element', () => {
			const field =
				testData.buttons[ Object.keys( testDataSrc.buttons ).indexOf( 'imageButton' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'image' );
		} );
		test( 'getFieldType correctly identifies a custom typed element', () => {
			const field =
				testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'customType' ) ];
			expect( _forms.getFieldType( field ) ).toBe( 'some-custom-type' );
		} );
	} );

	describe( 'getFieldValue function', () => {
		test( 'getFieldValue function exists', () => {
			expect( typeof _forms.getFieldValue ).toBe( 'function' );
		} );
		[ 'email', 'empty', 'multiselect', 'password', 'phone', 'select', 'text' ].forEach(
			( key ) => {
				const index = Object.keys( testDataSrc.fields ).indexOf( key );
				test( `getFieldValue returns correct value for ${ key } element`, () => {
					const field = testData.fields[ index ];
					expect( _forms.getFieldValue( field ) ).toEqual(
						testDataSrc.fields[ key ].value
					);
				} );
			}
		);
		test( `getFieldValue returns empty string for input with no value param`, () => {
			const field = testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'novalue' ) ];
			expect( _forms.getFieldValue( field ) ).toEqual( '' );
		} );
		test( `getFieldValue returns true/false for a checkbox`, () => {
			const field =
				testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'checkbox' ) ];
			field.checked = true;
			expect( _forms.getFieldValue( field ) ).toEqual( true );
			field.checked = false;
			expect( _forms.getFieldValue( field ) ).toEqual( false );
		} );
		test( `getFieldValue returns true/false for a radio button`, () => {
			const field = testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'radio' ) ];
			field.checked = true;
			expect( _forms.getFieldValue( field ) ).toEqual( true );
			field.checked = false;
			expect( _forms.getFieldValue( field ) ).toEqual( false );
		} );
	} );

	describe( 'setFieldValue function', () => {
		test( 'setFieldValue function exists', () => {
			expect( typeof _forms.setFieldValue ).toBe( 'function' );
		} );

		test( 'setFieldValue returns the same field', () => {
			const field = testData.fields[ 0 ];
			expect( _forms.setFieldValue( field, 'unimportant value' ) ).toEqual( field );
		} );

		[
			{
				key: 'checkbox',
				tests: [
					{ value: true, expected: true },
					{ value: false, expected: false },
					{ value: 1, expected: true },
					{ value: 0, expected: false },
					{ value: null, expected: false },
					{ value: '', expected: false },
				],
			},
			{
				key: 'email',
				tests: [
					{ value: 'test@example.com', expected: 'test@example.com' },
					{ value: '!@#$#%^$%^&aslkdfjh', expected: '!@#$#%^$%^&aslkdfjh' },
				],
			},
			{
				key: 'maxlength',
				tests: [
					{ value: '12345678', expected: '12345678' },
					{ value: '1234567890', expected: '12345678' },
				],
			},
			{
				key: 'multiselect',
				tests: [
					{ value: [ 'lemon' ], expected: [ 'lemon' ] },
					{ value: 'orange', expected: [ 'orange' ] },
					{ value: [ 'lemon', 'orange' ], expected: [ 'lemon', 'orange' ] },
				],
			},
			{
				key: 'phone',
				tests: [
					{ value: '123-456-7890', expected: '123-456-7890' },
					{ value: '(123) 456-7890', expected: '(123) 456-7890' },
					{ value: '+1.234.567.8900', expected: '+1.234.567.8900' },
				],
			},
			{
				key: 'radio',
				tests: [
					{ value: true, expected: true },
					{ value: false, expected: false },
					{ value: 1, expected: true },
					{ value: 0, expected: false },
					{ value: null, expected: false },
					{ value: '', expected: false },
				],
			},
			{
				key: 'select',
				tests: [
					{ value: 'red', expected: 'red' },
					{ value: 'green', expected: 'green' },
					{ value: 'brown', expected: '' },
				],
			},
			{
				key: 'text',
				tests: [
					{ value: '', expected: '' },
					{ value: true, expected: 'true' },
					{ value: null, expected: '' },
					{ value: ' abc 123 .,$ ', expected: ' abc 123 .,$ ' },
				],
			},
		].forEach( ( setFieldTestData ) => {
			const fieldIndex = Object.keys( testDataSrc.fields ).indexOf( setFieldTestData.key );
			setFieldTestData.tests.forEach( ( t ) => {
				test( `setFieldValue sets value correctly for ${ setFieldTestData.key } element (value='${ test.value }')`, () => {
					const field = testData.fields[ fieldIndex ];
					_forms.setFieldValue( field, t.value );
					expect( _forms.getFieldValue( field ) ).toEqual( t.expected );
				} );
			} );
		} );
	} );

	describe( 'getValidationRules function', () => {
		test( 'getValidationRules function exists', () => {
			expect( typeof _forms.getValidationRules ).toBe( 'function' );
		} );

		[
			{
				key: 'alpha',
				expected: [ 'isAlpha' ],
			},
			{
				key: 'checkbox',
				expected: [],
			},
			{
				key: 'customType',
				expected: [],
			},
			{
				key: 'email',
				expected: [ 'isEmail' ],
			},
			{
				key: 'multiselect',
				expected: [],
			},
			{
				key: 'password',
				expected: [],
			},
			{
				key: 'phone',
				expected: [ 'isPhone' ],
			},
			{
				key: 'radio',
				expected: [],
			},
			{
				key: 'required',
				expected: [ 'required' ],
			},
			{
				key: 'select',
				expected: [],
			},
			{
				key: 'text',
				expected: [],
			},
			{
				key: 'username',
				expected: [ 'isAlphanumeric', 'noSpaces' ],
			},
		].forEach( ( rulesTestData ) => {
			const fieldIndex = Object.keys( testDataSrc.fields ).indexOf( rulesTestData.key );
			test( `getValidationRules gets the correct validation type for ${ rulesTestData.key } element`, () => {
				const field = testData.fields[ fieldIndex ];
				expect( _forms.getValidationRules( field ) ).toEqual( rulesTestData.expected );
			} );
		} );
	} );

	describe( 'validateField function', () => {
		test( 'validateField function exists', () => {
			expect( typeof _forms.validateField ).toBe( 'function' );
		} );
		test( 'validateField returns true for input with no minlength and not required', () => {
			const field = testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'empty' ) ];
			expect( _forms.validateField( field ) ).toBe( true );
		} );
		test( 'validateField returns false for input with no minlength but required', () => {
			const field = testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'empty' ) ];
			field.required = true;
			expect( _forms.validateField( field ) ).toBe( false );
		} );
		test( 'validateField perform validation for email on field with type "email"', () => {
			const field = testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'email' ) ];

			field.value = 'example@example.com';
			expect( _forms.validateField( field ) ).toBe( true );

			field.value = 'invalid-email-com';
			expect( _forms.validateField( field ) ).toBe( false );
		} );
		test( 'validateField perform validation for phone on field with type "tel"', () => {
			const field = testData.fields[ Object.keys( testDataSrc.fields ).indexOf( 'phone' ) ];

			field.value = '+1 (234) 567-8900';
			expect( _forms.validateField( field ) ).toBe( true );

			field.value = 'Cell Phone';
			expect( _forms.validateField( field ) ).toBe( false );
		} );
	} );

	describe( 'validateAllFields function', () => {
		test( 'validateAllFields function exists', () => {
			expect( typeof _forms.validateAllFields ).toBe( 'function' );
		} );
	} );
} );
