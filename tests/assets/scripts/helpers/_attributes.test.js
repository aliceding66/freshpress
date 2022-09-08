/* eslint-env jest */

import * as _attributes from 'scripts/helpers/_attributes';

let testElement;

beforeEach( () => {
	// Initialise test element.
	testElement = document.createElement( 'div' );
} );

describe( 'helpers/_attributes', () => {
	describe( 'datasetKeyName', () => {
		test( 'datasetKeyName function exists', () => {
			expect( typeof _attributes.datasetKeyName ).toBe( 'function' );
		} );
		test( 'datasetKeyName returns correct format for full data attribute name', () => {
			expect( _attributes.datasetKeyName( 'data-attr-test' ) ).toBe( 'attrTest' );
		} );
		test( 'datasetKeyName returns correct format for short attribute name', () => {
			expect( _attributes.datasetKeyName( 'attr-test' ) ).toBe( 'attrTest' );
		} );
		test( 'datasetKeyName returns correct format for already converted attribute name', () => {
			expect( _attributes.datasetKeyName( 'dataAttrTest' ) ).toBe( 'attrTest' );
		} );
		test( 'datasetKeyName returns correct format for already converted short attribute name', () => {
			expect( _attributes.datasetKeyName( 'attrTest' ) ).toBe( 'attrTest' );
		} );
	} );

	describe( 'getDataAttr', () => {
		test( 'getDataAttr function exists', () => {
			expect( typeof _attributes.getDataAttr ).toBe( 'function' );
		} );
		test( 'getDataAttr returns data attribute value', () => {
			testElement.dataset.attrTest = 'qatunezo';
			expect( _attributes.getDataAttr( testElement, 'data-attr-test' ) ).toBe( 'qatunezo' );
		} );
		test( 'getDataAttr returns data attribute value for short attribute name', () => {
			testElement.dataset.attrTest = 'qatunezo';
			expect( _attributes.getDataAttr( testElement, 'attr-test' ) ).toBe( 'qatunezo' );
		} );
		test( 'getDataAttr returns null when data attribute is missing', () => {
			expect( _attributes.getDataAttr( testElement, 'attr-test' ) ).toBeNull();
		} );
		test( 'getDataAttr returns null when data attribute is missing but short attribute name exists', () => {
			testElement.setAttribute( 'attr-test', 'qatunezo' );
			expect( testElement.getAttribute( 'attr-test' ) ).toBe( 'qatunezo' );
			expect( _attributes.getDataAttr( testElement, 'attr-test' ) ).toBeNull();
		} );
		test( 'getDataAttr returns null when data attribute is missing but attribute exists and full data attribute name requested', () => {
			testElement.setAttribute( 'attr-test', 'qatunezo' );
			expect( testElement.getAttribute( 'attr-test' ) ).toBe( 'qatunezo' );
			expect( _attributes.getDataAttr( testElement, 'data-attr-test' ) ).toBeNull();
		} );
		test( 'getDataAttr returns value for existing data attribute with empty value', () => {
			testElement.dataset.attrTest = '';
			expect( _attributes.getDataAttr( testElement, 'data-attr-test' ) ).toBe( '' );
		} );
		test( 'getDataAttr returns value for existing data attribute with 0 value', () => {
			testElement.dataset.attrTest = '0';
			expect( _attributes.getDataAttr( testElement, 'data-attr-test' ) ).toBe( '0' );
		} );
	} );

	describe( 'hasDataAttr', () => {
		test( 'hasDataAttr function exists', () => {
			expect( typeof _attributes.hasDataAttr ).toBe( 'function' );
		} );
		test( 'hasDataAttr returns true for existing data attribute', () => {
			testElement.dataset.attrTest = 'qatunezo';
			expect( _attributes.hasDataAttr( testElement, 'data-attr-test' ) ).toBe( true );
		} );
		test( 'hasDataAttr returns true for existing data attribute with short attribute name', () => {
			testElement.dataset.attrTest = 'qatunezo';
			expect( _attributes.hasDataAttr( testElement, 'attr-test' ) ).toBe( true );
		} );
		test( 'hasDataAttr returns false when data attribute is missing', () => {
			expect( _attributes.hasDataAttr( testElement, 'data-attr-test' ) ).toBe( false );
		} );
		test( 'hasDataAttr returns false when data attribute is missing but short attribute name exists', () => {
			testElement.setAttribute( 'attr-test', 'qatunezo' );
			expect( testElement.hasAttribute( 'attr-test' ) ).toBe( true );
			expect( _attributes.hasDataAttr( testElement, 'attr-test' ) ).toBe( false );
		} );
		test( 'hasDataAttr returns false when data attribute is missing but attribute exists and full data attribute name requested', () => {
			testElement.setAttribute( 'attr-test', 'qatunezo' );
			expect( testElement.hasAttribute( 'attr-test' ) ).toBe( true );
			expect( _attributes.hasDataAttr( testElement, 'data-attr-test' ) ).toBe( false );
		} );
		test( 'hasDataAttr returns true for existing data attribute with empty value', () => {
			testElement.dataset.attrTest = '';
			expect( _attributes.hasDataAttr( testElement, 'data-attr-test' ) ).toBe( true );
		} );
		test( 'hasDataAttr returns true for existing data attribute with 0 value', () => {
			testElement.dataset.attrTest = 0;
			expect( _attributes.hasDataAttr( testElement, 'data-attr-test' ) ).toBe( true );
		} );
	} );

	describe( 'setDataAttr', () => {
		test( 'setDataAttr function exists', () => {
			expect( typeof _attributes.setDataAttr ).toBe( 'function' );
		} );
		test( 'setDataAttr sets data attribute value', () => {
			_attributes.setDataAttr( testElement, 'data-attr-test', 'qatunezo' );
			expect( testElement.dataset.attrTest ).toBe( 'qatunezo' );
		} );
		test( 'setDataAttr sets data attribute value for short attribute name', () => {
			_attributes.setDataAttr( testElement, 'attr-test', 'qatunezo' );
			expect( testElement.dataset.attrTest ).toBe( 'qatunezo' );
		} );
		test( 'setDataAttr sets data attribute with 0 value', () => {
			_attributes.setDataAttr( testElement, 'data-attr-test', 0 );
			expect( testElement.dataset.attrTest ).toBe( '0' );
		} );
		test( 'setDataAttr sets data attribute with empty string value', () => {
			_attributes.setDataAttr( testElement, 'data-attr-test', '' );
			expect( testElement.dataset.attrTest ).toBe( '' );
		} );
		test( 'setDataAttr does not set a data attribute if value missing', () => {
			_attributes.setDataAttr( testElement, 'data-attr-test' );
			expect( testElement.dataset ).not.toHaveProperty( 'attrTest' );
		} );
	} );

	describe( 'getAttrOrData', () => {
		test( 'getAttrOrData function exists', () => {
			expect( typeof _attributes.getAttrOrData ).toBe( 'function' );
		} );
		test( 'getDataAttr returns data attribute value', () => {
			testElement.dataset.attrTest = 'qatunezo';
			expect( _attributes.getAttrOrData( testElement, 'data-attr-test' ) ).toBe( 'qatunezo' );
		} );
		test( 'getDataAttr returns data attribute value for short attribute name', () => {
			testElement.dataset.attrTest = 'qatunezo';
			expect( _attributes.getAttrOrData( testElement, 'attr-test' ) ).toBe( 'qatunezo' );
		} );
		test( 'getAttrOrData returns null when data attribute and attribute are missing', () => {
			expect( testElement.hasAttribute( 'attr-test' ) ).toBe( false );
			expect( _attributes.getAttrOrData( testElement, 'attr-test' ) ).toBeNull();
		} );
		test( 'getAttrOrData returns attribute value when data attribute is missing but short attribute name exists', () => {
			testElement.setAttribute( 'attr-test', 'qatunezo' );
			expect( testElement.getAttribute( 'attr-test' ) ).toBe( 'qatunezo' );
			expect( _attributes.getAttrOrData( testElement, 'attr-test' ) ).toBe( 'qatunezo' );
		} );
		test( 'getAttrOrData returns attribute value when data attribute is missing but attribute exists and full data attribute name requested', () => {
			testElement.setAttribute( 'attr-test', 'qatunezo' );
			expect( testElement.getAttribute( 'attr-test' ) ).toBe( 'qatunezo' );
			expect( _attributes.getAttrOrData( testElement, 'data-attr-test' ) ).toBe( 'qatunezo' );
		} );
		test( 'getAttrOrData returns data attribute value when both data attribute and attribute exist', () => {
			testElement.dataset.attrTest = 'qatunezo-data';
			testElement.setAttribute( 'attr-test', 'qatunezo-attr' );
			expect( testElement.getAttribute( 'attr-test' ) ).toBe( 'qatunezo-attr' );
			expect( _attributes.getAttrOrData( testElement, 'attr-test' ) ).toBe( 'qatunezo-data' );
		} );
		test( 'getAttrOrData returns data attribute value when both data attribute and attribute exist and full data attribute name requested', () => {
			testElement.dataset.attrTest = 'qatunezo-data';
			testElement.setAttribute( 'attr-test', 'qatunezo-attr' );
			expect( testElement.getAttribute( 'attr-test' ) ).toBe( 'qatunezo-attr' );
			expect( _attributes.getAttrOrData( testElement, 'data-attr-test' ) ).toBe(
				'qatunezo-data'
			);
		} );
		test( 'getAttrOrData returns data attribute value when both data attribute and attribute exist and data attribute value is empty', () => {
			testElement.dataset.attrTest = '';
			testElement.setAttribute( 'attr-test', 'qatunezo' );
			expect( testElement.getAttribute( 'attr-test' ) ).toBe( 'qatunezo' );
			expect( _attributes.getAttrOrData( testElement, 'attr-test' ) ).toBe( '' );
		} );
		test( 'getAttrOrData returns data attribute value when both data attribute and attribute exist and data attribute value is 0', () => {
			testElement.dataset.attrTest = '0';
			testElement.setAttribute( 'attr-test', 'qatunezo' );
			expect( testElement.getAttribute( 'attr-test' ) ).toBe( 'qatunezo' );
			expect( _attributes.getAttrOrData( testElement, 'attr-test' ) ).toBe( '0' );
		} );
	} );

	describe( 'hasAttrOrData', () => {
		test( 'hasAttrOrData function exists', () => {
			expect( typeof _attributes.hasAttrOrData ).toBe( 'function' );
		} );
		test( 'hasAttrOrData returns true for existing data attribute', () => {
			testElement.dataset.attrTest = 'qatunezo';
			expect( _attributes.hasAttrOrData( testElement, 'data-attr-test' ) ).toBe( true );
		} );
		test( 'hasAttrOrData returns true for existing data attribute with short attribute name', () => {
			testElement.dataset.attrTest = 'qatunezo';
			expect( _attributes.hasAttrOrData( testElement, 'attr-test' ) ).toBe( true );
		} );
		test( 'hasAttrOrData returns false when data attribute is missing', () => {
			expect( _attributes.hasAttrOrData( testElement, 'data-attr-test' ) ).toBe( false );
		} );
		test( 'hasAttrOrData returns true when data attribute is missing but short attribute name exists', () => {
			testElement.setAttribute( 'attr-test', 'qatunezo' );
			expect( testElement.hasAttribute( 'attr-test' ) ).toBe( true );
			expect( _attributes.hasAttrOrData( testElement, 'attr-test' ) ).toBe( true );
		} );
		test( 'hasAttrOrData returns true when data attribute is missing but attribute exists and full data attribute name requested', () => {
			testElement.setAttribute( 'attr-test', 'qatunezo' );
			expect( testElement.hasAttribute( 'attr-test' ) ).toBe( true );
			expect( _attributes.hasAttrOrData( testElement, 'data-attr-test' ) ).toBe( true );
		} );
		test( 'hasAttrOrData returns true for existing data attribute with empty value', () => {
			testElement.dataset.attrTest = '';
			expect( _attributes.hasAttrOrData( testElement, 'attr-test' ) ).toBe( true );
		} );
		test( 'hasAttrOrData returns true for existing data attribute with 0 value', () => {
			testElement.dataset.attrTest = '0';
			expect( _attributes.hasAttrOrData( testElement, 'attr-test' ) ).toBe( true );
		} );
		test( 'hasAttrOrData returns true for attribute with empty value and data attribute missing', () => {
			testElement.setAttribute( 'attr-test', '' );
			expect( _attributes.hasAttrOrData( testElement, 'attr-test' ) ).toBe( true );
		} );
		test( 'hasAttrOrData returns true for attribute with 0 value and data attribute missing', () => {
			testElement.setAttribute( 'attr-test', '0' );
			expect( _attributes.hasAttrOrData( testElement, 'attr-test' ) ).toBe( true );
		} );
	} );
} );
