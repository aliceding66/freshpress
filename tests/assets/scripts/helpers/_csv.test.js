/* eslint-env jest */

import * as _csv from 'scripts/helpers/_csv';

describe( 'helpers/_csv', () => {
	describe( 'strGetCsv', () => {
		test( 'strGetCsv function exists', () => {
			expect( typeof _csv.strGetCsv ).toBe( 'function' );
		} );

		test( 'strGetCsv parses simple CSV', () => {
			const csvText = '1,2,3,4';
			expect( _csv.strGetCsv( csvText ) ).toStrictEqual( [ '1', '2', '3', '4' ] );
		} );
	} );

	describe( 'fpParseCsv', () => {
		test( 'fpParseCsv function exists', () => {
			expect( typeof _csv.fpParseCsv ).toBe( 'function' );
		} );

		test( 'fpParseCsv parses simple CSV', () => {
			const csvText = 'id,name\n1,John\n2,Jane';
			expect( _csv.fpParseCsv( csvText ) ).toStrictEqual( {
				data: [
					new Map( [
						[ 'id', '1' ],
						[ 'name', 'John' ],
					] ),
					new Map( [
						[ 'id', '2' ],
						[ 'name', 'Jane' ],
					] ),
				],
				headers: [ 'id', 'name' ],
			} );
		} );
	} );

	describe( 'fpFormatVartype', () => {
		test( 'fpFormatVartype function exists', () => {
			expect( typeof _csv.fpFormatVartype ).toBe( 'function' );
		} );

		test( 'fpFormatVartype handles truthy/falsy strings', () => {
			expect( _csv.fpFormatVartype( 'true' ) ).toBe( true );
			expect( _csv.fpFormatVartype( 'false' ) ).toBe( false );
			expect( _csv.fpFormatVartype( 'yes' ) ).toBe( true );
			expect( _csv.fpFormatVartype( 'no' ) ).toBe( false );
			expect( _csv.fpFormatVartype( '1' ) ).toBe( true );
			expect( _csv.fpFormatVartype( '0' ) ).toBe( false );
		} );

		test( 'fpFormatVartype leaves empty string as is', () => {
			expect( _csv.fpFormatVartype( '' ) ).toBe( '' );
		} );

		test( 'fpFormatVartype converts number values to type Number', () => {
			expect( typeof _csv.fpFormatVartype( '123' ) ).toBe( 'number' );
			expect( _csv.fpFormatVartype( '123' ) ).toBe( 123 );
		} );

		test( 'fpFormatVartype leaves any other strings as is', () => {
			expect( _csv.fpFormatVartype( 'Lorem ipsum.' ) ).toBe( 'Lorem ipsum.' );
		} );
	} );
} );
