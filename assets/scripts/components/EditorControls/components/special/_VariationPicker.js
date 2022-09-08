import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalBlockVariationPicker as BlockVariationPicker,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate, store as blocksStore } from '@wordpress/blocks';
import { getEditorControlsContext } from '../../_helpers';

export default ( props ) => {
	const {
		children,
		name,
		clientId = getEditorControlsContext()?.clientId,
		setAttributes = getEditorControlsContext()?.setAttributes,
		...restProps
	} = props;

	const { blockType, defaultVariation } = useSelect(
		( select ) => {
			const { getBlockType, getDefaultBlockVariation } = select( blocksStore );

			return {
				blockType: getBlockType( name ),
				defaultVariation: getDefaultBlockVariation( name, 'block' ),
			};
		},
		[ name ]
	);

	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	const hasInnerBlocks = useSelect(
		( select ) => select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);

	if ( hasInnerBlocks ) {
		return children;
	}
	return (
		<BlockVariationPicker
			{ ...restProps }
			icon={ blockType?.icon?.src }
			label={ blockType?.title }
			variations={ blockType.variations }
			onSelect={ ( nextVariation = defaultVariation ) => {
				if ( nextVariation.attributes ) {
					setAttributes( nextVariation.attributes );
				}
				if ( nextVariation.innerBlocks ) {
					replaceInnerBlocks(
						clientId,
						createBlocksFromInnerBlocksTemplate( nextVariation.innerBlocks ),
						true
					);
				}
			} }
		/>
	);
};
