const breakpoints = {
	general: 0,
	sm: 480,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1600,
};

export default class BootstrapClassParser {
	class = '';
	constructor( className ) {
		this.class = className;
	}

	static getViewportBreakpoint( enabledBreakpoints ) {
		const { innerWidth } = window;
		const entries = Object.entries( breakpoints ).filter( ( [ key ] ) =>
			enabledBreakpoints.includes( key )
		);

		for ( let i = 0; i < entries.length; i++ ) {
			const [ , val ] = entries[ i ];
			if ( innerWidth < val ) {
				return entries[ i - 1 ][ 0 ];
			}
		}
		return entries[ entries.length - 1 ][ 0 ];
	}

	static buildClassFromBreakpoints( columnBreakpoints ) {
		let bootstrapClass = '';
		for ( let [
			currentSize,
			{ auto_width: autoWidth, width, offset, order, hidden, enabled = true },
		] of Object.entries( columnBreakpoints ) ) {
			if ( enabled ) {
				currentSize = currentSize === 'general' ? '' : `-${ currentSize }`;

				if ( autoWidth ) {
					bootstrapClass += `col${ currentSize } `;
				} else {
					bootstrapClass += `col${ currentSize }-${ width } `;
				}
				bootstrapClass += `offset${ currentSize }-${ offset } `;

				if ( order > 0 ) {
					bootstrapClass += `order${ currentSize }-${ order } `;
				}

				if ( hidden ) {
					bootstrapClass += `d${ currentSize }-none `;
				} else {
					bootstrapClass += `d${ currentSize }-flex `;
				}
			}
		}
		return bootstrapClass;
	}

	static getRangeForBreakpoint( columnBreakpoints, selectedSize ) {
		const enabledSizes = [];
		for ( const [ key, { enabled = true } ] of Object.entries( columnBreakpoints ) ) {
			if ( enabled ) {
				enabledSizes.push( key );
			}
		}

		let x = '';
		let y = '';
		if ( enabledSizes.includes( selectedSize ) ) {
			const nextSmallest = enabledSizes[ enabledSizes.indexOf( selectedSize ) + 1 ];

			x = breakpoints[ selectedSize ];
			y = breakpoints[ nextSmallest ] - 1 || '∞ ';
		}

		return `Column width on screen range: ${ x }px- ${ y }px`;
	}

	formatBreakpoint( breakpoint ) {
		return breakpoint === 'general' ? '' : `-${ breakpoint }`;
	}

	isAutoWidth( breakpoint ) {
		const regex = new RegExp( `col${ this.formatBreakpoint( breakpoint ) }(?!-)` );
		return !! this.class.match( regex );
	}

	getWidth( breakpoint, defaultValue ) {
		const regex = new RegExp( `col${ this.formatBreakpoint( breakpoint ) }-(\\d\\d?)` );
		return this.returnResult( regex.exec( this.class ), defaultValue );
	}

	getOffset( breakpoint, defaultValue ) {
		const regex = new RegExp( `offset${ this.formatBreakpoint( breakpoint ) }-(\\d\\d?)` );
		return this.returnResult( regex.exec( this.class ), defaultValue );
	}

	getOrder( breakpoint, defaultValue ) {
		const regex = new RegExp( `order${ this.formatBreakpoint( breakpoint ) }-(\\d\\d?)` );
		return this.returnResult( regex.exec( this.class ), defaultValue );
	}

	isHidden( breakpoint ) {
		const regex = new RegExp( `d${ this.formatBreakpoint( breakpoint ) }-none` );
		return !! this.class.match( regex );
	}

	breakpointExists( breakpoint ) {
		return this.isAutoWidth( breakpoint ) || this.getWidth( breakpoint ) > 0;
	}

	returnResult( result, defaultValue ) {
		if ( ! result ) {
			return defaultValue;
		}

		switch ( typeof defaultValue ) {
			case 'number':
				return parseInt( result[ 1 ] );
			default:
				return result[ 1 ];
		}
	}
}
