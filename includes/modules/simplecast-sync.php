<?php
/**
 * Pull Podcast Episodes feature functions.
 *
 * @package FreshPress\Website
 */

/**
 * Create button which sends an action to wp ajax
 *
 * @param string $which The location of the extra table nav markup: 'top' or 'bottom'.
 */
function fp_add_podcasts_button( $which ) {
	global $typenow;

	if ( 'podcast' === $typenow && 'top' === $which ) {
		?>
		<div class="alignright actions" style="padding-right: 0; display: flex; align-items: center; flex-wrap: wrap; margin-left: 14px; width: 300px; justify-content: flex-end;">
			<img class="podcast-loader" src="/wp-admin/images/spinner.gif" alt="Loading new episodes..." style="display: none;">
			<input type="button" name="fetch-podcasts" class="button" value="Pull new Podcasts" style="margin: 1px 0 0 6px;">
			<p class="loading-info" style="text-align: right; display: none;"><?= esc_html( __( 'Download in progress. It may take few minutes. Do not close the tab.', 'freshpress-website' ) ); ?></p>
		</div>
		<script>
		  window.addEventListener( 'DOMContentLoaded', () => {
			const pullPodcastsButton = document.querySelector( 'input[name="fetch-podcasts"]' );

			const sendWpAjaxAction = () => {
			  fetch( '<?= esc_url( admin_url( 'admin-ajax.php' ) ); ?>?action=fp_add_new_episodes', {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				  'Cache-Control': 'no-cache',
				},
				credentials: 'same-origin',
			  } )
				.then( response => response.json() )
				.then( data => {
				  alert(`Added ${ data.new_episodes_number } new episode${ data.new_episodes_number === 1 ? '' : 's' }`);
				  window.location.reload();
				} )
				.catch( ( error ) => {
				  console.error( 'Error:', error );
				} );
			};

			const handleButtonClick = () => {
			  const loaderIcon = document.querySelector( '.podcast-loader' )
			  const loadingInfo = document.querySelector( '.loading-info' )
			  pullPodcastsButton.setAttribute( 'disabled', true );
			  loaderIcon.style.display = 'block';
			  loadingInfo.style.display = 'block';

			  sendWpAjaxAction();
			}

			pullPodcastsButton.addEventListener( 'click', handleButtonClick );
		  });
		</script>
		<?php
	}
}

add_action( 'manage_posts_extra_tablenav', 'fp_add_podcasts_button', 20, 1 );

/**
 * Returns post's content with block comments.
 *
 * @param string $episode_id SimpleCast's episode ID.
 * @param string $episode_summary SimpleCast's episode description.
 * @param string $episode_description SimpleCast's episode long_description.
 */
function fp_get_episode_content( $episode_id, $episode_summary, $episode_description ) {
	if ( empty( $episode_id ) || empty( $episode_summary ) || empty( $episode_description ) ) {
		return '';
	}

	return <<<EOD
<!-- wp:fpbk/iframe {"id":"block_en-us_60b49c05f5f7c","iframe_url":"https://player.simplecast.com/$episode_id?dark=false","className":"mb-4"} /-->

<!-- wp:heading {"level":3,"className":"text-primary"} -->
<h3 class="text-primary">Episode Summary</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>$episode_summary</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"className":"text-primary"} -->
<h3 class="text-primary">Episode Notes</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
$episode_description
<!-- /wp:paragraph -->
EOD;
}

/**
 * Fetch SimpleCast and save episodes as CPT.
 */
function fp_add_new_episodes() {
	$response = wp_remote_get( 'https://api.simplecast.com/podcasts/e02b7b65-cf0b-45b3-923c-0959e07b9369/episodes?limit=9999' );
	$response_decode = json_decode( $response['body'] );
	$podcast_episodes = $response_decode->collection;
	$new_episodes_number = 0;

	foreach ( $podcast_episodes as $episode ) {
		$episode_json = wp_remote_get( $episode->href );
		$episode_decode = json_decode( $episode_json['body'] );

		$initial_episode_notes = $episode_decode->long_description;
		$episode_notes_without_nl = nl2br( $initial_episode_notes );
		$episode_notes_bolded = preg_replace( '/\*\*(.*?)\*\*/', '<strong>$1</strong>', $episode_notes_without_nl );
		$episode_notes = preg_replace( '/\*(.*?)\*/', '<em>$1</em>', $episode_notes_bolded );

		$episode_data = [
			'post_title'   => $episode_decode->title,
			'post_status'  => 'published' === $episode_decode->status ? 'publish' : 'draft',
			'post_type'    => 'podcast',
			'post_content' => fp_get_episode_content( $episode_decode->id, $episode_decode->description, $episode_notes ),
			'post_excerpt' => $episode_decode->description,
			'post_date'    => $episode_decode->published_at,
		];

		if ( ! post_exists( $episode_decode->title, '', $episode_decode->published_at, 'podcast' ) ) {
			$post_id = wp_insert_post( $episode_data );

			update_field( 'episode_number', $episode_decode->number, $post_id );
			update_field( 'season_number', $episode_decode->season->number, $post_id );
			update_field( 'nerdisode', empty( $episode_decode->number ) && 4 <= intval( $episode_decode->season->number ), $post_id );

			// Update the publication date to override PublishPress.
			wp_update_post(
				[
					'ID'        => $post_id,
					'post_date' => $episode_decode->published_at,
				]
			);

			$new_episodes_number++;
		}
	}

	wp_send_json( [ 'new_episodes_number' => $new_episodes_number ] );
}

add_action( 'wp_ajax_fp_add_new_episodes', 'fp_add_new_episodes' );
