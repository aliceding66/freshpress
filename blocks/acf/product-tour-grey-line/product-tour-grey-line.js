/**
 * Product Tour Grey Line.
 */

import { initBlock } from 'scripts/helpers/_blocks';

const positionAbsoluteClass = 'position-absolute';
const transitionDisabledClass = 'transition-disabled';
const checkpointClass = 'product-tour-grey-line__circle-marker-checkpoint';
const checkpointActiveClass = `${ checkpointClass }--active`;
const checkpointFirstClass = `${ checkpointClass }--first`;

class ProductTourGreyLine {
	constructor( productTourGreyLine ) {
		this.productTourGreyLineId = productTourGreyLine.id;
		this.scrollCallbackTimeout = null;
		this.topOffset = 0;

		this.container = this.selectInProductTourDOM( 'container' );
		this.circleMarker = this.selectInProductTourDOM( 'circle-marker-main' );
		this.coordinators = {
			vertical: this.selectInProductTourDOM( 'circle-marker-coordinator--vertical' ),
			horizontal: this.selectInProductTourDOM( 'circle-marker-coordinator--horizontal' ),
		};
		this.lines = {
			leftBottom: {
				line: this.selectInProductTourDOM( 'line-left-bottom' ),
				revealer: this.selectInProductTourDOM( 'line-left-bottom--revealer' ),
				color: this.selectInProductTourDOM( 'line-left-bottom--color' ),
			},
			bottomFinish: {
				line: this.selectInProductTourDOM( 'line-bottom-finish' ),
				revealer: this.selectInProductTourDOM( 'line-bottom-finish--revealer' ),
				color: this.selectInProductTourDOM( 'line-bottom-finish--color' ),
			},
		};
		this.blocksInsideGreyLine = this.selectInProductTourDOM( ' > .fp-block', false, true );
		this.lines.leftBottom.colorRect = this.lines.leftBottom.color.getBoundingClientRect();
		this.lines.bottomFinish.colorRect = this.lines.bottomFinish.color.getBoundingClientRect();
		this.lastCheckpoint = this.selectInProductTourDOM( 'circle-marker-checkpoint--last' );

		this.checkpoints = [];
		this.snapToCheckpointThreshold = parseInt(
			this.container.dataset.snapToCheckpointThreshold
		);
		this.checkpointPlacement = this.container.dataset.checkpointPlacement;
		this.showStartCheckpoint = this.container.dataset.showStartCheckpoint > 0;

		this.init();
	}

	init() {
		window.addEventListener( 'load', () => {
			setTimeout( () => {
				try {
					this.prepareDOMElements();
					this.calculateTopOffset();
					this.insertCheckpoints();
					this.prepareDOMEventsHandlers();

					this.showGreyLine();
				} catch ( error ) {
					//Do not show invalid Grey Line.
					this.hideGreyLine();
				}
			}, 50 );
		} );
	}

	prepareDOMElements() {
		//Temporarily disable transitions
		this.lines.leftBottom.color.classList.add( transitionDisabledClass );
		this.lines.bottomFinish.color.classList.add( transitionDisabledClass );
		this.lines.leftBottom.revealer.classList.add( transitionDisabledClass );
		this.lines.bottomFinish.revealer.classList.add( transitionDisabledClass );

		//Set inner elements sizes with pixels instead of percents (to prevent autoresizing them)
		this.lines.leftBottom.color.setAttribute(
			'style',
			`width:${ this.lines.leftBottom.colorRect.width }px;height:${ this.lines.leftBottom.colorRect.height }px;`
		);
		this.lines.bottomFinish.color.setAttribute(
			'style',
			`width:${ this.lines.bottomFinish.colorRect.width }px;height:${ this.lines.bottomFinish.colorRect.height }px;`
		);

		//Reset CSS variables used to reveal colored lines (2px is line width)
		this.lines.leftBottom.revealer.style.setProperty( '--revealed-y', '0%' );
		this.lines.bottomFinish.revealer.style.setProperty( '--revealed-y', '2px' );
		this.lines.leftBottom.revealer.style.setProperty( '--revealed-x', '0%' );
		this.lines.bottomFinish.revealer.style.setProperty( '--revealed-x', '0%' );
		this.lines.bottomFinish.revealer.style.opacity = 0;
	}

	prepareDOMEventsHandlers() {
		//Attach mutation observer to recalculate checkpoint's positions if grey line container has changed
		const containerChangedCallback = () => {
			this.calculateTopOffset();
			this.recalculateCheckpoints();
		};
		// eslint-disable-next-line no-undef
		const mutationObserver = new MutationObserver( containerChangedCallback );
		if ( this.blocksInsideGreyLine ) {
			this.blocksInsideGreyLine.forEach( ( blockInsideGreyLine ) => {
				mutationObserver.observe( blockInsideGreyLine, {
					attributes: true,
					childList: true,
					subtree: true,
				} );
			} );
		}
		window.removeEventListener( 'resize', containerChangedCallback );
		window.addEventListener( 'resize', containerChangedCallback );

		//Reattach scroll listener and trigger it once immediately
		const scrollCallback = () => {
			this.scrollCallback();
		};
		window.removeEventListener( 'scroll', scrollCallback );
		window.addEventListener( 'scroll', scrollCallback );
		this.scrollCallback();
	}

	calculateTopOffset() {
		if ( ! this.showStartCheckpoint ) {
			if (
				this.blocksInsideGreyLine.length > 0 &&
				this.blocksInsideGreyLine[ 0 ] &&
				this.blocksInsideGreyLine[ 0 ].id
			) {
				this.container.style.setProperty( '--top-offset', '0px' );
				this.topOffset = this.getCheckpointTop(
					this.blocksInsideGreyLine[ 0 ],
					this.checkpointPlacement === 'center'
				);
			}
		}

		this.container.style.setProperty( '--top-offset', `${ this.topOffset }px` );
	}

	insertCheckpoints() {
		if ( this.blocksInsideGreyLine ) {
			this.blocksInsideGreyLine.forEach( ( blockInsideGreyLine, index ) => {
				const newCheckpoint = document.createElement( 'DIV' );
				const isFirstBlockInsideGreyLine = index === 0;
				newCheckpoint.className = `${ checkpointClass } ${ positionAbsoluteClass }`;
				if ( isFirstBlockInsideGreyLine ) {
					newCheckpoint.className += ` ${ checkpointFirstClass }`;
				}

				const checkpointTop = this.getCheckpointTop(
					blockInsideGreyLine,
					! isFirstBlockInsideGreyLine
				);

				if (
					isFirstBlockInsideGreyLine ||
					( ! isFirstBlockInsideGreyLine && checkpointTop > 0 )
				) {
					newCheckpoint.style.top = `${ checkpointTop }px`;

					this.lines.leftBottom.line.appendChild( newCheckpoint );
					this.checkpoints.push( {
						blockInsideGreyLine,
						node: newCheckpoint,
					} );
				}
			} );
		}
	}

	recalculateCheckpoints() {
		this.checkpoints.forEach( ( checkpoint, index ) => {
			const { blockInsideGreyLine, node } = checkpoint;
			const isFirstCheckpoint = index === 0;

			if ( blockInsideGreyLine && node ) {
				const checkpointTop = this.getCheckpointTop(
					blockInsideGreyLine,
					! isFirstCheckpoint
				);

				if ( parseInt( node.style.top ) !== checkpointTop ) {
					node.style.top = `${ checkpointTop }px`;
				}
			}
		} );
	}

	getCheckpointTop( blockInsideGreyLine, middleOfCircle = true ) {
		const circleOffset = middleOfCircle ? this.circleMarker.clientHeight / 2 : 0;

		if ( this.checkpointPlacement === 'center' ) {
			return parseInt(
				blockInsideGreyLine.offsetTop +
					blockInsideGreyLine.clientHeight / 2 -
					circleOffset -
					this.topOffset
			);
		} else if ( this.checkpointPlacement === 'heading' ) {
			const headings = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ];
			const foundHeadings = this.selectInProductTourDOM(
				headings
					.map( ( heading ) => `#${ blockInsideGreyLine.id } ${ heading }` )
					.join( ', ' ),
				false,
				true
			);

			//Align to first found heading
			if ( foundHeadings.length > 0 && foundHeadings[ 0 ] ) {
				const firstHeadingRect = foundHeadings[ 0 ].getBoundingClientRect();
				const containerRect = this.selectInProductTourDOM(
					'container'
				).getBoundingClientRect();
				return parseInt( firstHeadingRect.top - containerRect.top + circleOffset );
			}
		} else {
			return 0;
		}
	}

	scrollCallback() {
		clearTimeout( this.scrollCallbackTimeout );

		//Use timeout to reduce amount of function call while scrolling occurs
		this.scrollCallbackTimeout = setTimeout( () => {
			if ( this.container.dataset.finished < 1 ) {
				//Those transitions needed to be disabled later than init
				this.lines.leftBottom.revealer.classList.remove( transitionDisabledClass );
				this.lines.bottomFinish.revealer.classList.remove( transitionDisabledClass );

				//Gets fresh rect for container
				const containerRect = this.container.getBoundingClientRect();
				const leftBottomLineRect = this.lines.leftBottom.line.getBoundingClientRect();
				const scrollMaxHeight =
					leftBottomLineRect.height - this.circleMarker.clientHeight / 2;

				//Calculates new marker position
				const productTourGreyLineStart = window.pageYOffset + containerRect.top;
				let newCircleMarkerYInPx =
					window.pageYOffset -
					productTourGreyLineStart +
					window.innerHeight / 2 -
					this.circleMarker.clientHeight / 2;

				//Compare new position with checkpoints
				this.checkpoints.forEach( ( checkpoint ) => {
					const checkpointTop = parseInt( checkpoint.node.style.top );
					if ( newCircleMarkerYInPx >= checkpointTop - this.snapToCheckpointThreshold ) {
						if (
							newCircleMarkerYInPx <=
							checkpointTop + this.snapToCheckpointThreshold
						) {
							newCircleMarkerYInPx = checkpointTop;
						}

						if ( ! checkpoint.node.classList.contains( checkpointActiveClass ) ) {
							checkpoint.node.classList.add( checkpointActiveClass );
						}
					}
				} );

				//Threshold for finishing
				if ( newCircleMarkerYInPx > scrollMaxHeight * 0.95 ) {
					newCircleMarkerYInPx = scrollMaxHeight;
				}

				if (
					newCircleMarkerYInPx > 0 &&
					newCircleMarkerYInPx >
						parseInt( this.coordinators.vertical.style.getPropertyValue( '--y' ) )
				) {
					//Sets CSS variables to move marker and reveal more colored line
					this.coordinators.vertical.style.setProperty(
						'--y',
						`${ newCircleMarkerYInPx }px`
					);
					this.lines.leftBottom.revealer.style.setProperty(
						'--revealed-y',
						`${ newCircleMarkerYInPx + this.circleMarker.clientHeight / 2 }px`
					);

					//Check if trigger finish animation (with going through rounded corners)
					if ( newCircleMarkerYInPx >= scrollMaxHeight ) {
						this.finish();
					}
				}
			}
		}, 10 );
	}

	finish() {
		//Set end flag and sets all pixel values to 100% (prevents any further grey line container changes bugs)
		this.container.dataset.finished = '1';
		this.lines.leftBottom.revealer.style.setProperty( '--revealed-y', '100%' );
		this.coordinators.vertical.style.setProperty( '--y', '100%' );

		setTimeout( () => {
			this.triggerFinishAnimation();
		}, 800 );
	}

	triggerFinishAnimation() {
		//Triggers full values for revealing
		//Rounded corner are smoothed in animation with proper timing/delaying animations + easing them in transitions
		setTimeout( () => {
			this.coordinators.horizontal.style.setProperty( '--x', `100%` );
			this.lines.leftBottom.revealer.style.setProperty( '--revealed-x', '100%' );
			this.lines.bottomFinish.revealer.style.setProperty( '--revealed-x', '100%' );
			this.lines.bottomFinish.revealer.style.setProperty( '--revealed-y', '100%' );
		}, 100 );

		//Hack to hide and show in proper situation small border dot issue that I couldn't hide without destroying other parts of block layout
		setTimeout( () => {
			this.lines.bottomFinish.revealer.style.opacity = 1;
			this.lastCheckpoint.classList.add( checkpointActiveClass );
		}, 600 );

		//"Park in next node"
		setTimeout( () => {
			this.circleMarker.setAttribute( 'style', 'transform: translateY(100px);' );
		}, 900 );
	}

	showGreyLine() {
		this.container.style.opacity = 1;
	}

	hideGreyLine() {
		this.container.style.opacity = 0;
	}

	//Helper function
	selectInProductTourDOM( elementClassDefiner, greyLineItemsOnly = true, multipleItems = false ) {
		const selectFn = multipleItems ? 'querySelectorAll' : 'querySelector';
		return document[ selectFn ](
			`#${ this.productTourGreyLineId } ${
				greyLineItemsOnly ? '.product-tour-grey-line__' : ''
			}${ elementClassDefiner }`
		);
	}
}

const initProductTourGreyLine = ( productTourGreyLine ) => {
	new ProductTourGreyLine( productTourGreyLine );
};

initBlock( '.product-tour-grey-line', initProductTourGreyLine );
