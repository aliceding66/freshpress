import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import BootstrapClassParser from '../utils/_BootstrapClassParser';
import { name as blockName } from '../block.json';

const widthsInPercentage = [
	'0%',
	'8.33%',
	'16.67%',
	'25%',
	'33.33%',
	'41.67%',
	'50%',
	'58.33%',
	'66.67%',
	'75%',
	'83.33%',
	'91.67%',
	'100%',
];

export default function ( { attributes, setAttributes } ) {
	const bootstrapParser = new BootstrapClassParser( attributes.bootstrap_class );
	const initBreakpointOptions = ( breakpoint, skipEnabled = false ) => {
		const options = {
			auto_width: bootstrapParser.isAutoWidth( breakpoint ),
			width: bootstrapParser.getWidth( breakpoint, 12 ),
			offset: bootstrapParser.getOffset( breakpoint, 0 ),
			order: bootstrapParser.getOrder( breakpoint, 0 ),
			hidden: bootstrapParser.isHidden( breakpoint ),
		};

		if ( ! skipEnabled ) {
			options.enabled = bootstrapParser.breakpointExists( breakpoint );
		}

		return options;
	};
	const [ columnBreakpoints, setColumnBreakpoints ] = useState( {
		general: initBreakpointOptions( 'general', true ),
		sm: initBreakpointOptions( 'sm' ),
		md: initBreakpointOptions( 'md' ),
		lg: initBreakpointOptions( 'lg' ),
		xl: initBreakpointOptions( 'xl' ),
		xxl: initBreakpointOptions( 'xxl' ),
	} );

	const enabledBreakpoints = Object.entries( columnBreakpoints )
		.filter( ( [ , val ] ) => val.enabled || val.enabled === undefined )
		.map( ( [ key ] ) => key );

	const [ selectedSize, setSelectedSize ] = useState(
		BootstrapClassParser.getViewportBreakpoint( enabledBreakpoints )
	);

	const enabledChar = ( size ) => {
		const { enabled = true } = columnBreakpoints[ size ];
		return `[${ enabled ? '✓' : '✗' }] `;
	};

	const labels = {
		general: enabledChar( 'general' ) + __( 'General', 'freshpress-website' ),
		sm: enabledChar( 'sm' ) + __( 'Mobile (sm)', 'freshpress-website' ),
		md: enabledChar( 'md' ) + __( 'Tablet', 'freshpress-website' ),
		lg: enabledChar( 'lg' ) + __( 'Desktop', 'freshpress-website' ),
		xl: enabledChar( 'xl' ) + __( 'Desktop FullHD', 'freshpress-website' ),
		xxl: enabledChar( 'xxl' ) + __( 'Desktop HD', 'freshpress-website' ),
	};

	const bootstrapClass = BootstrapClassParser.buildClassFromBreakpoints( columnBreakpoints );
	setAttributes( {
		bootstrap_class: bootstrapClass,
	} );

	let activeControls = null;
	let screenRange = null;
	if (
		columnBreakpoints[ selectedSize ].enabled ||
		typeof columnBreakpoints[ selectedSize ].enabled === 'undefined'
	) {
		activeControls = (
			<>
				{ /* Width */ }
				<EditorControls.TrueFalse
					label={ __( 'Auto width', 'freshpress-website' ) }
					value={ columnBreakpoints[ selectedSize ]?.auto_width }
					onChange={ ( value ) =>
						setColumnBreakpoints( {
							...columnBreakpoints,
							[ selectedSize ]: {
								...columnBreakpoints[ selectedSize ],
								auto_width: value,
							},
						} )
					}
				/>
				{ columnBreakpoints[ selectedSize ]?.auto_width < 1 && (
					<EditorControls.Range
						label={
							__( 'Width', 'freshpress-website' ) +
							` (${ widthsInPercentage[ columnBreakpoints[ selectedSize ]?.width ] })`
						}
						min={ 1 }
						max={ 12 }
						value={ columnBreakpoints[ selectedSize ]?.width }
						onChange={ ( value ) =>
							setColumnBreakpoints( {
								...columnBreakpoints,
								[ selectedSize ]: {
									...columnBreakpoints[ selectedSize ],
									offset: Math.min(
										12 - value,
										columnBreakpoints[ selectedSize ].offset
									),
									width: value,
								},
							} )
						}
					/>
				) }
				{ /* Offset */ }
				<EditorControls.Range
					label={
						__( 'Offset', 'freshpress-website' ) +
						` (${ widthsInPercentage[ columnBreakpoints[ selectedSize ]?.offset ] })`
					}
					min={ 0 }
					max={ 11 }
					value={ columnBreakpoints[ selectedSize ]?.offset }
					onChange={ ( value ) =>
						setColumnBreakpoints( {
							...columnBreakpoints,
							[ selectedSize ]: {
								...columnBreakpoints[ selectedSize ],
								offset: value,
								width: Math.min(
									columnBreakpoints[ selectedSize ].width,
									12 - value
								),
							},
						} )
					}
				/>
				{ /* Order */ }
				<EditorControls.Number
					label={ __( 'Order', 'freshpress-website' ) }
					value={ columnBreakpoints[ selectedSize ]?.order }
					instructions={ __( '0 is default order', 'freshpress-website' ) }
					min={ 0 }
					max={ 99 }
					onChange={ ( value ) =>
						setColumnBreakpoints( {
							...columnBreakpoints,
							[ selectedSize ]: {
								...columnBreakpoints[ selectedSize ],
								order: value,
							},
						} )
					}
				/>
				{ /* Hidden */ }
				<EditorControls.TrueFalse
					label={ __( 'Hide block', 'freshpress-website' ) }
					value={ columnBreakpoints[ selectedSize ]?.hidden }
					onChange={ ( value ) =>
						setColumnBreakpoints( {
							...columnBreakpoints,
							[ selectedSize ]: {
								...columnBreakpoints[ selectedSize ],
								hidden: value,
							},
						} )
					}
				/>
			</>
		);
		screenRange = (
			<p>{ BootstrapClassParser.getRangeForBreakpoint( columnBreakpoints, selectedSize ) }</p>
		);
	}

	const blockProps = useBlockProps( {
		className: `column mr-0 my-2 ${ bootstrapClass }`,
	} );

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Select
						label={ __( 'Select screen size', 'freshpress-website' ) }
						choices={ labels }
						value={ selectedSize }
						onChange={ ( newSelectedSize ) => {
							setSelectedSize( newSelectedSize );
						} }
					/>
					{ screenRange }
					{ typeof columnBreakpoints[ selectedSize ].enabled !== 'undefined' && (
						<EditorControls.TrueFalse
							label={ __( 'Enable screen size', 'freshpress-website' ) }
							value={ columnBreakpoints[ selectedSize ]?.enabled }
							onChange={ ( value ) =>
								setColumnBreakpoints( {
									...columnBreakpoints,
									[ selectedSize ]: {
										...columnBreakpoints[ selectedSize ],
										enabled: value,
									},
								} )
							}
						/>
					) }
					{ activeControls }
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>
			<div { ...blockProps }>
				<InnerBlocks renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> } />
			</div>
		</EditorControls.Context.Provider>
	);
}
