import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';

export default ( props ) => {
	const { attributes } = props;

	return (
		<div>
			<div className="h4">{ __( 'Signup Form', 'freshpress-website' ) }</div>
			<EditorControls.RichText
				isSimple
				placeholder={ __( 'Insert E-Mail placeholder text', 'freshpress-website' ) }
				name="signup_form_email_placeholder_text"
			/>
			<EditorControls.RichText
				isSimple
				placeholder={ __( 'Insert Password placeholder text', 'freshpress-website' ) }
				name="signup_form_password_placeholder_text"
			/>
			<div className="btn btn-cta-green btn-block btn-lg">
				<EditorControls.RichText
					isSimple
					placeholder={ __( 'Insert Signup Button Text', 'freshpress-website' ) }
					name="signup_form_submit_button_text"
				/>
			</div>
			{ attributes.signup_form_include_default_terms_of_service ? (
				<div
					className="hero__terms"
					style={ { color: attributes.signup_form_hero_terms_of_service_colour.hex } }
				>
					{ __(
						'I confirm that I have read and agree to FreshBooks Terms of Service and Privacy Policy. Security Safeguards',
						'freshpress-website'
					) }
				</div>
			) : (
				<EditorControls.RichText
					isSimple
					placeholder={ __( 'Insert Custom Terms of Service', 'freshpress-website' ) }
					className="hero__terms"
					name="signup_form_custom_terms_of_service"
				/>
			) }
		</div>
	);
};
