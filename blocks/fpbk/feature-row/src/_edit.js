import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { BlockStateManager, generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import FeatureRowPanel from './components/_FeatureRowPanel';
import Template from 'scripts/components/_Template';
import contentTemplate from '../templates/content.partial.mustache';
import imageTemplate from '../templates/image.partial.mustache';
import tabsTemplate from '../templates/tabs.partial.mustache';
import * as columnActions from '../state/columns/_actions';
import columnReducer from '../state/columns/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `feature-row container-fluid px-0' ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ columns, columnDispatch ] = blockStateManager.addReducerManager(
		columnReducer,
		'columns'
	);

	const contentFirst = 'content' === columns[ 0 ] && columns[ 0 ]?.type;
	const reverseWrap = attributes.reverse_stack;
	const smWrapDirection =
		( contentFirst && ! reverseWrap ) || ( ! contentFirst && reverseWrap )
			? 'flex-column'
			: 'flex-column-reverse';

	const partialTemplates = [];

	{
		columns.forEach( ( column, index ) => {
			const partialTemplate =
				// eslint-disable-next-line no-nested-ternary
				column.type === 'content'
					? contentTemplate
					: column.type === 'image'
					? imageTemplate
					: tabsTemplate;
			column.side = 0 === index ? 'start' : 'end';
			let alignGutter = 'text-center';
			if ( column.align_to_gutter ) {
				if ( 'start' === column.side ) {
					alignGutter = 'text-left';
				} else {
					alignGutter = 'text-right';
				}
			}
			let tabbedCardsAttributes = {};
			if ( Array.isArray( columns.cards ) && columns.cards.length > 0 ) {
				tabbedCardsAttributes = column.cards;
			}
			partialTemplates.push(
				<Template
					attributes={ { ...column } }
					template={ partialTemplate }
					components={ {
						image: (
							<div className={ `w-100 ${ alignGutter }` }>
								<EditorControls.Image
									inline
									className="feature-row__image img-fluid"
									value={ column.image }
									onChange={ ( value ) =>
										columnDispatch( {
											type: columnActions.EDIT_COLUMN_IMAGE,
											index,
											value,
										} )
									}
									previewSize="large"
								/>
							</div>
						),
						header: (
							<EditorControls.RichText
								isSimple
								value={ column.header }
								onChange={ ( value ) =>
									columnDispatch( {
										type: columnActions.EDIT_COLUMN_HEADER,
										index,
										value,
									} )
								}
								placeholder={ __( 'Insert header', 'freshpress-website' ) }
							/>
						),
						body: (
							<EditorControls.RichText
								value={ column.body }
								onChange={ ( value ) =>
									columnDispatch( {
										type: columnActions.EDIT_COLUMN_BODY,
										index,
										value,
									} )
								}
								placeholder={ __( 'Insert body', 'freshpress-website' ) }
							/>
						),
						subtext: (
							<EditorControls.RichText
								isSimple
								value={ column.subtext }
								onChange={ ( value ) =>
									columnDispatch( {
										type: columnActions.EDIT_COLUMN_SUBTEXT,
										index,
										value,
									} )
								}
								placeholder={ __( 'Insert subtext', 'freshpress-website' ) }
							/>
						),
						tabs_html: (
							<InnerBlocks
								template={ [ [ 'fpbk/tabbed-cards', tabbedCardsAttributes ] ] }
								templateLock="all"
							/>
						),
					} }
				/>
			);
		} );
	}

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<FeatureRowPanel columns={ columns } dispatch={ columnDispatch } />

			<div { ...blockProps }>
				<div
					className={ `row d-flex ${ smWrapDirection } flex-wrap flex-lg-row flex-lg-nowrap mx-auto` }
				>
					{ partialTemplates }
				</div>
			</div>
		</EditorControls.Context.Provider>
	);
}
