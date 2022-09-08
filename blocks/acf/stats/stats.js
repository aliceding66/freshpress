/**
 * Stats.
 */

import { initBlock } from 'scripts/helpers/_blocks';

const countUpClass = 'stats__count-up';

const initStats = ( stats ) => {
	const countUpStep = ( node ) => {
		const currentValue = Number( node.innerText );
		const countTo = Number( node.dataset.countTo );

		if ( node.dataset.countTo > 0 && currentValue < countTo ) {
			let countStep = Number( node.dataset.countStep );
			if ( currentValue + countStep > countTo ) {
				countStep = countTo - currentValue;
			}

			setTimeout( () => {
				node.innerText = Number( currentValue + countStep ).toFixed(
					parseInt( node.dataset.countDecimalAmount )
				);
				countUpStep( node );
			}, parseInt( node.dataset.countSpeed ) );
		}
	};

	const countUpCallback = ( entries ) => {
		entries.forEach( ( entry ) => {
			if ( entry.isIntersecting && parseInt( entry.target.dataset.countStarted ) === 0 ) {
				entry.target.dataset.countStarted = '1';
				countUpStep( entry.target );
			}
		} );
	};

	// eslint-disable-next-line no-undef
	const countUpObserver = new IntersectionObserver( countUpCallback );
	document.querySelectorAll( `#${ stats.id } .${ countUpClass }` ).forEach( ( countUpNode ) => {
		countUpObserver.observe( countUpNode );
	} );
};

initBlock( '.stats', initStats );
