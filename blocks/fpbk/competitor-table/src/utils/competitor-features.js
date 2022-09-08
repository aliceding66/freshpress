import { nanoid } from 'nanoid';

export const changeCompetitorFeature = (
	competitorIndex,
	featureIndex,
	featureValues,
	FLAG = 'update',
	competitors,
	setAttributes
) => {
	if ( competitors.length > 0 ) {
		const newCompetitors = [ ...competitors ];
		switch ( FLAG ) {
			case 'update':
				if ( competitorIndex !== false ) {
					newCompetitors[ competitorIndex ].features[ featureIndex ] = featureValues;
				} else {
					newCompetitors.forEach( ( competitor ) => {
						competitor.features[ featureIndex ] = featureValues;
					} );
				}
				break;
			case 'add':
				newCompetitors.forEach( ( competitor ) => {
					competitor.features.push( {
						key: `competitor-feature_${ nanoid() }`,
						text: '',
						checkmark: false,
						crossmark: false,
					} );
				} );
				break;
			case 'remove':
				newCompetitors.forEach( ( competitor ) => {
					competitor.features.splice( featureIndex, 1 );
				} );
				break;
			case 'move_up':
				newCompetitors.forEach( ( competitor ) => {
					const fromIndex = featureIndex;
					const toIndex = featureIndex - 1;
					const row = competitor.features.splice( fromIndex, 1 )[ 0 ];

					competitor.features.splice( toIndex, 0, row );
				} );
				break;
			case 'move_down':
				newCompetitors.forEach( ( competitor ) => {
					const fromIndex = featureIndex;
					const toIndex = featureIndex + 1;
					const row = competitor.features.splice( fromIndex, 1 )[ 0 ];

					competitor.features.splice( toIndex, 0, row );
				} );
				break;
			default:
				break;
		}
		setAttributes( {
			competitors: newCompetitors,
		} );
	}
};
