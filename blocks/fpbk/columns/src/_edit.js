import {
	InspectorControls,
	useBlockProps,
	store as blockEditorStore,
	useInnerBlocksProps as __latestUserInnerBlocksProps,
	__experimentalUseInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, Notice } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const sameHeight = attributes.same_height ? 'columns--same-height' : '';
	const blockProps = useBlockProps( {
		className: `columns my-0 d-flex ${ sameHeight } ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	const useInnerBlocksProps = __latestUserInnerBlocksProps
		? __latestUserInnerBlocksProps
		: __experimentalUseInnerBlocksProps;
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'fpbk/column' ],
		orientation: 'horizontal',
	} );

	const currentBlocks = useSelect(
		( select ) => select( blockEditorStore ).getBlocks( clientId ),
		[ clientId ]
	);

	const hasInnerBlocks = currentBlocks.length > 0;
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	useEffect( () => {
		replaceInnerBlocks( clientId, currentBlocks );
	}, [ currentBlocks.length ] );

	const changeNumBlocks = ( newBlockCount ) => {
		const delta = newBlockCount - currentBlocks.length;
		const replacementBlocks =
			delta > 0
				? currentBlocks.concat(
						Array.from( { length: delta }, () => createBlock( 'fpbk/column' ) )
				  )
				: currentBlocks.slice( 0, delta );

		replaceInnerBlocks( clientId, replacementBlocks );
	};

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.TrueFalse
						name="same_height"
						label={ __( 'Make columns same height', 'freshpress-website' ) }
					/>
					<EditorControls.Range
						label={ __( 'Columns', 'freshpress-website' ) }
						value={ currentBlocks.length }
						onChange={ ( count ) => {
							changeNumBlocks( count );
						} }
						min={ 1 }
						max={ Math.max( 6, currentBlocks.length ) }
					/>
					{ currentBlocks.length > 6 && (
						<Notice status="warning" isDismissible={ false }>
							{ __(
								'This column count exceeds the recommended amount and may cause visual breakage.'
							) }
						</Notice>
					) }
					<EditorControls.Text name="data-column-layout" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>
			{ ! hasInnerBlocks && (
				<div { ...blockProps }>
					<EditorControls.Special.VariationPicker
						name={ blockName }
						clientId={ clientId }
					/>
				</div>
			) }

			{ hasInnerBlocks && <div { ...innerBlocksProps } /> }
		</EditorControls.Context.Provider>
	);
}
