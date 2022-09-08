/* eslint-env jest */

import * as _validation from 'scripts/modules/_validation';

const testParams = {
	testValUndefined: undefined,
	testValNull: null,
	emptyString: '',
	filledString: 'a string',
	testVal1: 1,
	testVal0: 0,
};

describe( 'modules/_validation', () => {
	describe( 'isEmpty', () => {
		test( 'isEmpty function exists', () => {
			expect( typeof _validation.isEmpty ).toBe( 'function' );
		} );

		test( 'isEmpty returns true for undefined', () => {
			expect( _validation.isEmpty( testParams.testValUndefined ) ).toBe( true );
		} );

		test( 'isEmpty returns true for null', () => {
			expect( _validation.isEmpty( testParams.testValNull ) ).toBe( true );
		} );

		test( 'isEmpty returns true for empty string', () => {
			expect( _validation.isEmpty( testParams.emptyString ) ).toBe( true );
		} );

		test( 'isEmpty returns false for a filled string', () => {
			expect( _validation.isEmpty( testParams.filledString ) ).toBe( false );
		} );
		test( 'isEmpty returns false for a filled string - allowSpaces true', () => {
			expect( _validation.isEmpty( testParams.filledString, { allowSpaces: true } ) ).toBe(
				false
			);
		} );
		test( 'isEmpty returns false for a filled string - allowSpaces false', () => {
			expect( _validation.isEmpty( testParams.filledString, { allowSpaces: false } ) ).toBe(
				false
			);
		} );

		const justASpace = ' ';
		test( 'isEmpty returns true for a string with just a space', () => {
			expect( _validation.isEmpty( justASpace ) ).toBe( true );
		} );
		test( 'isEmpty returns false for a string with just a space - allowSpaces true', () => {
			expect( _validation.isEmpty( justASpace, { allowSpaces: true } ) ).toBe( false );
		} );
		test( 'isEmpty returns true for a string with just a space - allowSpaces false', () => {
			expect( _validation.isEmpty( justASpace, { allowSpaces: false } ) ).toBe( true );
		} );

		test( 'isEmpty returns false for the number 1', () => {
			expect( _validation.isEmpty( testParams.testVal1 ) ).toBe( false );
		} );

		test( 'isEmpty returns true for the number 0, no parameter', () => {
			expect( _validation.isEmpty( testParams.testVal0 ) ).toBe( true );
		} );
		test( 'isEmpty returns true for the number 0 - allowZero false', () => {
			expect( _validation.isEmpty( testParams.testVal0, { allowZero: false } ) ).toBe( true );
		} );
		test( 'isEmpty returns false for the number 0 - allowZero true', () => {
			expect( _validation.isEmpty( testParams.testVal0, { allowZero: true } ) ).toBe( false );
		} );

		test( 'isEmpty returns true for NaN', () => {
			expect( _validation.isEmpty( 0 / 0 ) ).toBe( true );
		} );
		test( 'isEmpty returns true for NaN - allowZero true', () => {
			expect( _validation.isEmpty( 0 / 0, { allowZero: true } ) ).toBe( true );
		} );
		test( 'isEmpty returns true for NaN - allowZero false', () => {
			expect( _validation.isEmpty( 0 / 0, { allowZero: false } ) ).toBe( true );
		} );

		const emptyObject = {};
		test( 'isEmpty returns true for an empty object', () => {
			expect( _validation.isEmpty( emptyObject ) ).toBe( true );
		} );

		const filledObject = {
			prop1: 1,
			prop2: 'something',
			prop3: [ 1, 2, 3 ],
		};
		test( 'isEmpty returns false for a filled object', () => {
			expect( _validation.isEmpty( filledObject ) ).toBe( false );
		} );

		const emptyArray = [];
		test( 'isEmpty returns true for an empty array', () => {
			expect( _validation.isEmpty( emptyArray ) ).toBe( true );
		} );

		const filledArray = [ 1, 2, 3 ];
		test( 'isEmpty returns false for an filled array', () => {
			expect( _validation.isEmpty( filledArray ) ).toBe( false );
		} );
	} );

	describe( 'isAlpha', () => {
		test( 'isAlpha function exists', () => {
			expect( typeof _validation.isAlpha ).toBe( 'function' );
		} );

		test( 'isAlpha returns true for alpha string', () => {
			expect( _validation.isAlpha( 'This is a string with alpha only' ) ).toBe( true );
		} );

		test( 'isAlpha returns true for alpha string - no spaces', () => {
			expect( _validation.isAlpha( 'Thisisastring' ) ).toBe( true );
		} );

		test( 'isAlpha returns false for alpha string with symbols', () => {
			expect( _validation.isAlpha( 'This is a string with alpha only!' ) ).toBe( false );
		} );

		test( 'isAlpha returns false for undefined', () => {
			expect( _validation.isAlpha( testParams.testValUndefined ) ).toBe( false );
		} );

		test( 'isAlpha returns false for an empty string', () => {
			expect( _validation.isAlpha( testParams.emptyString ) ).toBe( false );
		} );
	} );

	describe( 'isAlphanumeric', () => {
		test( 'isAlphanumeric function exists', () => {
			expect( typeof _validation.isAlphanumeric ).toBe( 'function' );
		} );

		test( 'isAlphanumeric returns true for alphanumeric string', () => {
			expect(
				_validation.isAlphanumeric( 'This is a string with alpha and numbers 1234567890' )
			).toBe( true );
		} );

		test( 'isAlphanumeric returns false for alphanumeric string with symbols', () => {
			expect(
				_validation.isAlphanumeric( 'This is a string with alpha and numbers 1234567890.' )
			).toBe( false );
		} );

		test( 'isAlphanumeric returns false for undefined', () => {
			expect( _validation.isAlphanumeric( testParams.testValUndefined ) ).toBe( false );
		} );

		test( 'isAlphanumeric returns false for an empty string', () => {
			expect( _validation.isAlphanumeric( testParams.emptyString ) ).toBe( false );
		} );
	} );

	describe( 'isNumber', () => {
		test( 'isNumber function exists', () => {
			expect( typeof _validation.isNumber ).toBe( 'function' );
		} );

		test( 'isNumber returns true for number - 0', () => {
			expect( _validation.isNumber( '0' ) ).toBe( true );
		} );

		test( 'isNumber returns true for number - 1', () => {
			expect( _validation.isNumber( '1' ) ).toBe( true );
		} );

		test( 'isNumber returns false for undefined', () => {
			expect( _validation.isNumber( testParams.testValUndefined ) ).toBe( false );
		} );

		test( 'isNumber returns false for an empty string', () => {
			expect( _validation.isNumber( testParams.emptyString ) ).toBe( false );
		} );
	} );

	describe( 'isPostalCode', () => {
		test( 'isPostalCode function exists', () => {
			expect( typeof _validation.isPostalCode ).toBe( 'function' );
		} );

		test( 'isPostalCode returns true for M5V 3R3 - Canada', () => {
			expect( _validation.isPostalCode( 'M5V 3R3', 'CA' ) ).toBe( true );
		} );

		test( 'isPostalCode returns true for M5V3R3 - Canada', () => {
			expect( _validation.isPostalCode( 'M5V3R3', 'CA' ) ).toBe( true );
		} );

		test( 'isPostalCode returns true for 32540 - United States', () => {
			expect( _validation.isPostalCode( '32540', 'US' ) ).toBe( true );
		} );

		test( 'isPostalCode returns false for undefined', () => {
			expect( _validation.isPostalCode( testParams.testValUndefined ) ).toBe( false );
		} );

		test( 'isPostalCode returns false for an empty string', () => {
			expect( _validation.isPostalCode( testParams.emptyString ) ).toBe( false );
		} );
	} );

	describe( 'isURL', () => {
		test( 'isURL function exists', () => {
			expect( typeof _validation.isURL ).toBe( 'function' );
		} );

		test( 'isURL returns true for http://freshbooks.com', () => {
			expect( _validation.isURL( 'http://freshbooks.com' ) ).toBe( true );
		} );

		test( 'isURL returns true for https://freshbooks.com', () => {
			expect( _validation.isURL( 'https://freshbooks.com' ) ).toBe( true );
		} );

		test( 'isURL returns false for undefined', () => {
			expect( _validation.isURL( testParams.testValUndefined ) ).toBe( false );
		} );

		test( 'isURL returns false for an empty string', () => {
			expect( _validation.isURL( testParams.emptyString ) ).toBe( false );
		} );
	} );

	describe( 'isInRange', () => {
		test( 'isInRange function exists', () => {
			expect( typeof _validation.isInRange ).toBe( 'function' );
		} );

		test( 'isInRange returns true for a number in range', () => {
			expect( _validation.isInRange( 1, 0, 3 ) ).toBe( true );
		} );

		test( 'isInRange returns true for a number in range - min case', () => {
			expect( _validation.isInRange( 0, 0, 3 ) ).toBe( true );
		} );

		test( 'isInRange returns true for a number in range - max case', () => {
			expect( _validation.isInRange( 3, 0, 3 ) ).toBe( true );
		} );

		test( 'isInRange returns false for a number in range', () => {
			expect( _validation.isInRange( 5, 0, 3 ) ).toBe( false );
		} );

		test( 'isInRange returns true for a float number', () => {
			expect( _validation.isInRange( 5.2, 0.3, 6.4 ) ).toBe( true );
		} );

		test( 'isInRange returns false for undefined - single', () => {
			expect( _validation.isInRange( testParams.testValUndefined, 0, 3 ) ).toBe( false );
		} );

		test( 'isInRange returns false for undefined - all', () => {
			expect(
				_validation.isInRange(
					testParams.testValUndefined,
					testParams.testValUndefined,
					testParams.testValUndefined
				)
			).toBe( false );
		} );

		test( 'isInRange returns false for NaN', () => {
			expect( _validation.isInRange( 0 / 0, 0 / 0, 0 / 0 ) ).toBe( false );
		} );
	} );

	describe( 'isEmail', () => {
		test( 'isEmail function exists', () => {
			expect( typeof _validation.isEmail ).toBe( 'function' );
		} );

		test( 'isEmail returns true for a correct email', () => {
			expect( _validation.isEmail( 'test@freshbooks.com' ) ).toBe( true );
		} );

		test( 'isEmail returns true for a correct email - Capital Letters', () => {
			expect( _validation.isEmail( 'TEST@Freshbooks.com' ) ).toBe( true );
		} );

		test( 'isEmail returns false for an incorrect email - Case 1', () => {
			expect( _validation.isEmail( 'testfreshbooks.com' ) ).toBe( false );
		} );

		test( 'isEmail returns false for an incorrect email - Case 2', () => {
			expect( _validation.isEmail( 'testfreshbooks@com' ) ).toBe( false );
		} );

		test( 'isEmail returns false for undefined', () => {
			expect( _validation.isEmail( testParams.testValUndefined ) ).toBe( false );
		} );

		test( 'isEmail returns false for empty', () => {
			expect( _validation.isEmail( testParams.emptyString ) ).toBe( false );
		} );
	} );

	describe( 'isPhone', () => {
		test( 'isPhone function exists', () => {
			expect( typeof _validation.isPhone ).toBe( 'function' );
		} );

		test( 'isPhone returns true for (123) 456-1234', () => {
			expect( _validation.isPhone( '(123) 456-1234' ) ).toBe( true );
		} );

		test( 'isPhone returns true for +9 999-999-9999', () => {
			expect( _validation.isPhone( '+9 999-999-9999' ) ).toBe( true );
		} );

		test( 'isPhone returns true for +999 (999.9) 99-999-9999', () => {
			expect( _validation.isPhone( '+999 (999.9) 99-999-9999' ) ).toBe( true );
		} );

		test( 'isPhone returns true for 999-9999', () => {
			expect( _validation.isPhone( '999-9999' ) ).toBe( true );
		} );

		test( 'isPhone returns true for +1555555555', () => {
			expect( _validation.isPhone( '+1555555555' ) ).toBe( true );
		} );

		test( 'isPhone returns true for 497.433.9296', () => {
			expect( _validation.isPhone( '497.433.9296' ) ).toBe( true );
		} );

		test( 'isPhone returns true for +591 74339296', () => {
			expect( _validation.isPhone( '+591 74339296' ) ).toBe( true );
		} );

		test( 'isPhone returns true for +1 555 555 5554', () => {
			expect( _validation.isPhone( '+1 555 555 5554' ) ).toBe( true );
		} );

		test( 'isPhone returns true for +(591) 7433433', () => {
			expect( _validation.isPhone( '+(591) 7433433' ) ).toBe( true );
		} );

		test( 'isPhone returns true for +(591) (4) 6434850', () => {
			expect( _validation.isPhone( '+(591) (4) 6434850' ) ).toBe( true );
		} );

		test( 'isPhone returns true for 0591 74339296', () => {
			expect( _validation.isPhone( '0591 74339296' ) ).toBe( true );
		} );

		test( 'isPhone returns true for 0001 5555555555', () => {
			expect( _validation.isPhone( '0001 55555555554' ) ).toBe( true );
		} );

		test( 'isPhone returns true for (0001) 5555555', () => {
			expect( _validation.isPhone( '(0001) 5555555' ) ).toBe( true );
		} );

		test( 'isPhone returns true for 59145678464', () => {
			expect( _validation.isPhone( '59145678464' ) ).toBe( true );
		} );

		test( 'isPhone returns true for +44 20 6547 5580', () => {
			expect( _validation.isPhone( '+44 20 6547 5580' ) ).toBe( true );
		} );

		test( 'isPhone returns true for 1555555555 x492', () => {
			expect( _validation.isPhone( '1555555555 x492' ) ).toBe( true );
		} );

		test( 'isPhone returns true for 416-555-5555#2', () => {
			expect( _validation.isPhone( '416-555-5555#2' ) ).toBe( true );
		} );

		test( 'isPhone returns false for undefined', () => {
			expect( _validation.isPhone( testParams.testValUndefined ) ).toBe( false );
		} );

		test( 'isPhone returns false for empty string', () => {
			expect( _validation.isPhone( testParams.emptyString ) ).toBe( false );
		} );
	} );

	describe( 'matchesPatterns', () => {
		test( 'matchesPatterns function exists', () => {
			expect( typeof _validation.matchesPatterns ).toBe( 'function' );
		} );

		test( 'matchesPatterns returns true for matching pattern - alpha', () => {
			expect(
				_validation.matchesPatterns( 'This is a string with alpha', [ /^[a-zA-Z ]+$/ ] )
			).toBe( true );
		} );

		test( 'matchesPatterns returns true for matching pattern - alphanumeric', () => {
			expect(
				_validation.matchesPatterns( 'This is a string with alphanumeric 123', [
					/^[a-zA-Z0-9 ]+$/,
				] )
			).toBe( true );
		} );

		test( 'matchesPatterns returns true for matching pattern - multiple', () => {
			expect(
				_validation.matchesPatterns( 'This is a string with alphanumeric', [
					/^[a-zA-Z0-9 ]+$/,
					/^[a-zA-Z ]+$/,
				] )
			).toBe( true );
		} );
	} );
} );
