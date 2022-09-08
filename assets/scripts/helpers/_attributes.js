/**
 * Helper functions for dealing with HTMLElement attributes and data-attributes.
 */

import { toCamelCase } from 'scripts/helpers/_strings';

/**
 * @param {string} attrName
 * @return {string} Formatted data key.
 */
export const datasetKeyName = ( attrName = '' ) => {
	return toCamelCase( attrName.replace( /^(?:data-|data([A-Z]))/, '$1' ) );
};

/**
 * Get the value of a data-attribute from a DOM element.
 *
 * @param {HTMLElement} element  DOM element.
 * @param {string}      attrName Attribute name with optional data- prefix (eg, 'data-example' or 'example').
 */
export const getDataAttr = ( element, attrName ) => {
	if ( hasDataAttr( element, attrName ) ) {
		const datasetKey = datasetKeyName( attrName );
		if ( datasetKey && datasetKey in element.dataset ) {
			return element.dataset[ datasetKey ];
		}
	}

	// Returns null to match the spec of getAttribute.
	return null;
};

/**
 * Check if an element has a given data-attribute.
 *
 * @param {HTMLElement} element  DOM element.
 * @param {string}      attrName Attribute name with optional data- prefix (eg, 'data-example' or 'example').
 */
export const hasDataAttr = ( element, attrName ) => {
	if ( element && attrName ) {
		return (
			( attrName.startsWith( 'data-' ) && element.hasAttribute( attrName ) ) ||
			element.hasAttribute( `data-${ attrName }` )
		);
	}

	// Returns false to match the spec of hasAttribute.
	return false;
};

/**
 * Set the value of a data-attribute for a DOM element.
 *
 * @param {HTMLElement} element   DOM element.
 * @param {string}      attrName  Attribute name with optional data- prefix (eg, 'data-example' or 'example').
 * @param {string}      attrValue Attribute value.
 */
export const setDataAttr = ( element, attrName, attrValue ) => {
	if ( element && attrName && undefined !== attrValue ) {
		const datasetKey = datasetKeyName( attrName );
		if ( datasetKey ) {
			element.dataset[ datasetKey ] = attrValue;
		}
	}
};

/**
 * Get the value of an attribute from an element as either a standard
 * DOM attribute or data-attribute.
 *
 * @param {HTMLElement} element  DOM element.
 * @param {string}      attrName Attribute name with optional data- prefix (eg, 'data-example' or 'example').
 */
export const getAttrOrData = ( element, attrName ) => {
	if ( element && attrName ) {
		if ( hasDataAttr( element, attrName ) ) {
			return getDataAttr( element, attrName );
		}
		if ( element.hasAttribute( attrName ) ) {
			return element.getAttribute( attrName );
		}

		return element.getAttribute( attrName.replace( /^data-/, '' ) );
	}

	// Returns null to match the spec of getAttribute.
	return null;
};

/**
 * Check if an element has an attribute as a standard DOM attribute
 * or data-attribute.
 *
 * @param {HTMLElement} element  DOM element.
 * @param {string}      attrName Attribute name with optional data- prefix (eg, 'data-example' or 'example').
 */
export const hasAttrOrData = ( element, attrName ) => {
	if ( element && attrName ) {
		return (
			element.hasAttribute( attrName ) ||
			element.hasAttribute( attrName.replace( /^data-/, '' ) ) ||
			hasDataAttr( element, attrName )
		);
	}

	// Returns false to match the spec of hasAttribute.
	return false;
};
