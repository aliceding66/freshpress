<?php
/**
 * TeamMembers class.
 *
 * @package FreshpressBlocks\TeamMembers
 * @subpackage TeamMembers
 */

namespace FreshpressBlocks;

/**
 * Class TeamMembers

 * @package FreshpressBlocks
 */
class TeamMembersBlock extends ABlock {
	/**
	 * TeamMembersBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_style();
		$this->enqueue_editor_script();
		$this->enqueue_style();
	}
	/**
	 * Return evaluated Mustache template
	 *
	 * @param string $local_path Local path to template.
	 * @param array  $template_data Data to be passed to Mustache template.
	 *
	 * @return string
	 */
	public function load_template( $local_path, $template_data ) {
		$this->set_template_partials(
			[
				'team_member' => 'templates/team_member.mustache',
			]
		);

		return parent::load_template( $local_path, $template_data );
	}
	/**
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		if ( function_exists( 'fp_render_img' ) && ! empty( $additional_template_data['team_members'] ) ) {
			foreach ( $additional_template_data['team_members'] as $index => $team_member ) {
				if ( ! empty( $team_member['image'] ) ) {
					$additional_template_data['team_members'][ $index ]['image'] = fp_render_img(
						$team_member['image'],
						[ 'class' => 'team-members__image w-100 h-auto' ]
					);
				} else {
					$additional_template_data['team_members'][ $index ]['image'] = '';
				}
			}
		}

		return parent::get_template_data( $additional_template_data );
	}

	/**
	 * Function passed to "render_callback".
	 *
	 * @param array  $attributes Block's attributes.
	 * @param string $inner_blocks_content <InnerBlocks.Content /> passed from index.js.
	 *
	 * @return string
	 */
	public function render( $attributes, $inner_blocks_content ) {
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => 'd-md-flex flex-wrap justify-content-center px-lg-5',
			]
		);

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}
}
