import apiFetch from '@wordpress/api-fetch';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { RawHTML, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { name as blockName } from '../block.json';

const Loading = () => (
	<div className="subnav__desktop">
		<nav className="subnav__items">
			<ul className="subnav_menu d-flex flex-nowrap justify-content-around align-items-center list-unstyled mb-0 py-0">
				<li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-109579 text-center flex-grow-1 flex-shrink-0 mb-0 py-1 menu-item-109579">
					{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
					<a className="text-decoration-none d-block py-3">
						<span>{ __( 'Fetching menu…', 'freshpress-website' ) }</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
);

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `subnav py-1 d-block ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	const [ loading, setLoading ] = useState( true );
	const [ menus, setMenus ] = useState( {} );

	useEffect( () => {
		setLoading( true );
		const { subnav_menu: subnavMenu = 'primary-navigation' } = attributes;

		apiFetch( { path: `fp/v1/get_subnav_menus/${ subnavMenu }` } )
			.then( ( result ) => {
				setMenus( result );
			} )
			.finally( () => {
				setLoading( false );
			} );
	}, [ attributes.subnav_menu ] );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Select name="subnav_menu" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				{ loading === true && <Loading /> }
				{ loading === false && (
					<>
						<RawHTML>{ menus?.desktop }</RawHTML>
						<RawHTML>{ menus?.mobile }</RawHTML>
					</>
				) }
			</div>
		</EditorControls.Context.Provider>
	);
}
