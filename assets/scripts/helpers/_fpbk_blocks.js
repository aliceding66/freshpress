import { useDispatch } from '@wordpress/data';
import { useEffect, useReducer, useState } from '@wordpress/element';

/**
 * Helper functions for working with Gutenberg's blocks.
 */

/**
 * @param {string} blockName
 * @return {string} Returns block ID value.
 */
export function generateBlockId( blockName ) {
	const randomString = ( length ) => {
		const chars = [];

		for ( let i = 0; i < length; i++ ) {
			const randomChar = Math.floor( Math.random() * 36 );
			chars.push( randomChar.toString( 36 ) );
		}

		return chars.join( '' );
	};

	const hash = randomString( 4 );
	return `${ blockName.replace( '/', '-' ) }-${ hash }`;
}

export class BlockStateManager {
	constructor( attributes, setAttributes ) {
		this.attributes = attributes;
		this.setAttributes = setAttributes;
		this.timeouts = {};

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { lockPostSaving, unlockPostSaving } = useDispatch( 'core/editor' );
		const lockEditorKey = 'BlockStateManagerProxy';
		this.lockEditor = () => lockPostSaving( lockEditorKey );
		this.unlockEditor = () => unlockPostSaving( lockEditorKey );
	}

	addReducerManager( reducer, fieldName, proxyTimeout = 100 ) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [ state, dispatch ] = useReducer( reducer, this.attributes[ fieldName ] );

		this.#setProxy( fieldName, `reducer_${ fieldName }`, state, proxyTimeout );

		return [ state, dispatch ];
	}

	addStateManager( fieldName, proxyTimeout = 100 ) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [ state, setState ] = useState( this.attributes[ fieldName ] );

		this.#setProxy( fieldName, `state_${ fieldName }`, state, proxyTimeout );

		return [ state, setState ];
	}

	#setProxy( fieldName, timeoutName, state, proxyTimeout ) {
		try {
			this.timeouts[ timeoutName ] = null;

			// eslint-disable-next-line react-hooks/rules-of-hooks
			useEffect( () => {
				this.lockEditor();
				if ( proxyTimeout > 0 ) {
					if ( this.timeouts[ timeoutName ] ) {
						clearTimeout( this.timeouts[ timeoutName ] );
					}

					this.timeouts[ timeoutName ] = setTimeout( () => {
						this.setAttributes( { [ fieldName ]: state } );
						this.unlockEditor();
					}, proxyTimeout );
				} else {
					this.setAttributes( { [ fieldName ]: state } );
					this.unlockEditor();
				}
			}, [ state ] );
		} catch ( _ ) {
			this.unlockEditor();
		}
	}
}
