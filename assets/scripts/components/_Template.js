import parse from 'html-react-parser';

const getReplaceComponentKey = ( componentName ) => `__component__${ componentName }__`;

export default ( props ) => {
	const { template, components = {}, partials = {} } = props;
	const attributes = { ...props.attributes };
	const hasComponents = Object.keys( components ).length > 0;

	if ( hasComponents ) {
		Object.keys( components ).forEach( ( componentName ) => {
			attributes[ componentName ] = getReplaceComponentKey( componentName );
		} );
	}

	const parsedTemplate = parse( template( attributes, partials ), {
		replace: ( domNode ) => {
			if ( hasComponents && domNode.type.toLowerCase() === 'text' && domNode.data ) {
				const replacementDomNodes = [];
				Object.keys( components ).forEach( ( componentName ) => {
					if ( domNode.data?.indexOf( `__${ componentName }__` ) >= 0 ) {
						replacementDomNodes.push( components[ componentName ] );
					}
				} );

				if ( replacementDomNodes.length > 0 ) {
					return <>{ replacementDomNodes }</>;
				}
				return domNode;
			}
		},
	} );

	return <>{ parsedTemplate }</>;
};
