/* eslint-env jest */

import * as _fpbkBlocks from 'scripts/helpers/_fpbk_blocks';

describe( 'helpers/_fpbk_blocks', () => {
	describe( 'generateBlockId', () => {
		test( 'generateBlockId function exists', () => {
			expect( typeof _fpbkBlocks.generateBlockId ).toBe( 'function' );
		} );

		test( 'generateBlockId generates random ID starting with block name and 4 random chars without invalid block name character', () => {
			expect( _fpbkBlocks.generateBlockId( 'fpbk/block-name' ) ).toMatch(
				/^fpbk-block-name-.{4}$/
			);
		} );
	} );

	describe( 'BlockStateManager', () => {
		test( 'BlockStateManager class exists', () => {
			expect( _fpbkBlocks.BlockStateManager ).toBeDefined();
		} );

		/**
		 * Any other tests for BlockStateManager should be done when investigated React component testing.
		 * BlockStateManager needs to be executed within functional React component.
		 */
	} );
} );
