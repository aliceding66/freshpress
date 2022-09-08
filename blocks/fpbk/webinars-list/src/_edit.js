import apiFetch from '@wordpress/api-fetch';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Notice, PanelBody } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import blockTemplate from '../templates/block.mustache';
import { templateString as webinarPartial } from '../templates/webinar.partial.mustache';
import { name as blockName } from '../block.json';

let testApiTimeout = null;
const apiTestStateStatusMessages = {
	info: __( 'Checking API credentials…', 'freshpress-website' ),
	error: __( 'Invalid API credentials', 'freshpress-website' ),
	success: __( 'Correct API credentials', 'freshpress-website' ),
};

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `webinars-list ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	const [ apiTestState, setApiTestState ] = useState( '' );
	useEffect( () => {
		setApiTestState( '' );
		clearTimeout( testApiTimeout );
		testApiTimeout = setTimeout( () => {
			if ( attributes.user_id && attributes.api_key && attributes.api_secret ) {
				setApiTestState( 'info' );
				apiFetch( {
					path: 'fp/v1/test-webinars-api',
					method: 'POST',
					data: {
						user_id: attributes.user_id,
						api_key: attributes.api_key,
						api_secret: attributes.api_secret,
					},
				} )
					.then( ( result ) => {
						setApiTestState( result === true ? 'success' : 'error' );
					} )
					.catch( () => {
						setApiTestState( 'error' );
					} );
			}
		}, 2500 );
	}, [ attributes.user_id, attributes.api_key, attributes.api_secret ] );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Text name="user_id" />
					<EditorControls.Text name="api_key" />
					<EditorControls.Text name="api_secret" />
					<EditorControls.Number name="visible_count" />
					{ apiTestState !== '' && (
						<Notice status={ apiTestState } isDismissible={ false }>
							{ apiTestStateStatusMessages[ apiTestState ] }
						</Notice>
					) }
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ webinarsListTemplateData } // eslint-disable-line no-undef
					partials={ {
						webinar: webinarPartial,
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
