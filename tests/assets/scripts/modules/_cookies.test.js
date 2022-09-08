/* eslint-env jest */

import * as _cookies from 'scripts/modules/_cookies';

const baseCookieValue = 'intial-cookie=initial-value';
const jsCookieDefaults = { path: '/', domain: window.location.host };

beforeAll( () => {
	_cookies.initCookieDefaults( jsCookieDefaults );
} );

beforeEach( () => {
	document.cookie = baseCookieValue;
} );

describe( 'modules/_cookies', () => {
	describe( 'createCookie', () => {
		test( 'createCookie function exists', () => {
			expect( typeof _cookies.createCookie ).toBe( 'function' );
		} );
		test( 'createCookie creates a cookie', () => {
			_cookies.createCookie( 'test-cookie', 'test-create' );
			expect( document.cookie ).toBe( `${ baseCookieValue }; test-cookie=test-create` );
		} );
	} );

	describe( 'readCookie', () => {
		test( 'readCookie function exists', () => {
			expect( typeof _cookies.readCookie ).toBe( 'function' );
		} );
		test( 'readCookie reads a cookie value', () => {
			document.cookie = 'test-cookie=test-read';
			expect( _cookies.readCookie( 'test-cookie' ) ).toBe( 'test-read' );
		} );
	} );

	describe( 'eraseCookie', () => {
		test( 'eraseCookie function exists', () => {
			expect( typeof _cookies.eraseCookie ).toBe( 'function' );
		} );
		test( 'eraseCookie erases a cookie', () => {
			_cookies.createCookie( 'test-cookie', 'test-erase' );
			expect( document.cookie ).toBe( `${ baseCookieValue }; test-cookie=test-erase` );
			_cookies.eraseCookie( 'test-cookie' );
			expect( document.cookie ).toBe( baseCookieValue );
		} );
	} );

	describe( 'createCookieIfMissing', () => {
		test( 'createCookieIfMissing function exists', () => {
			expect( typeof _cookies.createCookieIfMissing ).toBe( 'function' );
		} );
		test( 'createCookieIfMissing creates a cookie', () => {
			expect( document.cookie ).toBe( baseCookieValue );
			_cookies.createCookieIfMissing( 'test-cookie', 'test-create-if-missing' );
			expect( document.cookie ).toBe(
				`${ baseCookieValue }; test-cookie=test-create-if-missing`
			);
		} );
		test( 'createCookieIfMissing ignores an already set cookie', () => {
			_cookies.createCookie( 'test-cookie', 'test-create' );
			expect( document.cookie ).toBe( `${ baseCookieValue }; test-cookie=test-create` );
			_cookies.createCookieIfMissing( 'test-cookie', 'test-create-if-missing' );
			expect( document.cookie ).toBe( `${ baseCookieValue }; test-cookie=test-create` );
		} );
		test( 'createCookieIfMissing ignores an already set cookie with value 0', () => {
			_cookies.createCookie( 'test-cookie', 0 );
			expect( document.cookie ).toBe( `${ baseCookieValue }; test-cookie=0` );
			_cookies.createCookieIfMissing( 'test-cookie', 'test-create-if-missing' );
			expect( document.cookie ).toBe( `${ baseCookieValue }; test-cookie=0` );
		} );
		test( 'createCookieIfMissing ignores an already set cookie with no value', () => {
			_cookies.createCookie( 'test-cookie', '' );
			expect( document.cookie ).toBe( `${ baseCookieValue }; test-cookie=` );
			_cookies.createCookieIfMissing( 'test-cookie', 'test-create-if-missing' );
			expect( document.cookie ).toBe( `${ baseCookieValue }; test-cookie=` );
		} );
		test( 'createCookieIfMissing sets a cookie that has been erased', () => {
			_cookies.createCookie( 'test-cookie', 'test-erase' );
			expect( document.cookie ).toBe( `${ baseCookieValue }; test-cookie=test-erase` );
			_cookies.createCookieIfMissing( 'test-cookie', 'test-create-if-missing' );
			expect( document.cookie ).toBe( `${ baseCookieValue }; test-cookie=test-erase` );
			_cookies.eraseCookie( 'test-cookie' );
			expect( document.cookie ).toBe( baseCookieValue );
			_cookies.createCookieIfMissing( 'test-cookie', 'test-create-if-missing' );
			expect( document.cookie ).toBe(
				`${ baseCookieValue }; test-cookie=test-create-if-missing`
			);
		} );
	} );
} );
