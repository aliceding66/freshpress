import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { trimChar } from 'scripts/helpers/_strings';

export default ( props ) => {
	const { openModal, removeLink, target = '_self', title = '', url = '', script = '' } = props;

	return (
		<div>
			{ url ? (
				<div className="card" style={ { wordWrap: 'break-word', wordBreak: 'break-all' } }>
					<p>{ title }</p>
					{ ( url && target === '_self' ) ||
						( target === '_blank' && (
							<a href={ url } target="_blank" rel="noreferrer">
								{ url }
							</a>
						) ) }
					{ url && target === 'modal' && (
						<p>
							{ __( 'Opens modal with ID:', 'freshpress-website' ) }{ ' ' }
							{ trimChar( url, '#' ) }
						</p>
					) }
					{ url && target === 'drift' && (
						<p>{ __( 'Opens DriftChat Box', 'freshpress-website' ) }</p>
					) }
					{ url && target === 'script' && (
						<p>
							{ __( 'Executes script:', 'freshpress-website' ) }{ ' ' }
							<pre>
								<code dangerouslySetInnerHTML={ { __html: script } } />
							</pre>
						</p>
					) }

					<div>
						<Button
							isSecondary
							text={ __( 'Edit link', 'freshpress-website' ) }
							icon="edit"
							onClick={ openModal }
						/>
						<Button
							isDestructive
							text={ __( 'Remove link', 'freshpress-website' ) }
							icon="no-alt"
							onClick={ removeLink }
						/>
					</div>
				</div>
			) : (
				<Button
					isSecondary
					text={ __( 'Add link', 'freshpress-website' ) }
					onClick={ openModal }
				/>
			) }
		</div>
	);
};
