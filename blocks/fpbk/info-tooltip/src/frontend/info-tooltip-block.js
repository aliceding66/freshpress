/**
 * Info Tooltip.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import 'bootstrap/js/dist/tooltip';

const initInfoTooltip = ( infoTooltip ) => {
	// eslint-disable-next-line no-undef
	$( infoTooltip ).find( '.info-tooltip__button' ).tooltip();
};

initBlock( '.info-tooltip', initInfoTooltip );
