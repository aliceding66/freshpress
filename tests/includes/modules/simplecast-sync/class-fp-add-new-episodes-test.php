<?php
/**
 * Tests fp_add_new_episodes() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Add_New_Episodes_Test class.
 */
class FP_Add_New_Episodes_Test extends FP_Base_Test {

	const EXISTING_PODCAST_TITLE = 'exists';
	const NOT_EXISTING_PODCAST_TITLE = 'not-exists';
	const EXISTING_PODCAST_HREF = 'href-existing-podcast';
	const NOT_EXISTING_PODCAST_HREF = 'href-not-existing-podcast';
	const PODCAST_WITH_NEWLINES_NOTES_HREF = 'href-podcast-with-newlines-notes';
	const PODCAST_WITH_BOLDED_NOTES_HREF = 'href-podcast-with-bolded-notes';
	const PODCAST_WITH_ITALIC_NOTES_HREF = 'href-podcast-with-italic-notes';

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mockFunction(
			'update_field',
			function( $field, $value, $post_id ) {
				return true;
			}
		);

		WP_Mock::userFunction(
			'post_exists',
			[
				'return' => function( $title ) {
					return self::EXISTING_PODCAST_TITLE === $title;
				},
			]
		);

		WP_Mock::userFunction(
			'wp_remote_get',
			[
				'args'   => self::EXISTING_PODCAST_HREF,
				'return' => $this->mockEpisode( self::EXISTING_PODCAST_TITLE, '' ),
			]
		);

		WP_Mock::userFunction(
			'wp_remote_get',
			[
				'args'   => self::NOT_EXISTING_PODCAST_HREF,
				'return' => $this->mockEpisode( self::NOT_EXISTING_PODCAST_TITLE, '' ),
			]
		);

		WP_Mock::passthruFunction( 'wp_update_post' );
	}

	/**
	 * Checks whether function fp_add_new_episodes() return expected value.
	 *
	 * @dataProvider addsProperNewEpisodesAmountDataProvider
	 *
	 * @param array      $main_api_call_return Return value for main API call.
	 * @param string|int $expected_new_episodes_amount Expected new added episodes value.
	 */
	public function testIfAddsProperNewEpisodesAmount( $main_api_call_return, $expected_new_episodes_amount ) {
		WP_Mock::userFunction(
			'wp_remote_get',
			[
				'times'  => 1,
				'args'   => 'https://api.simplecast.com/podcasts/e02b7b65-cf0b-45b3-923c-0959e07b9369/episodes?limit=9999',
				'return' => $main_api_call_return,
			]
		);

		if ( Error::class === $expected_new_episodes_amount ) {
			$this->expectException( Error::class );
		} else {
			WP_Mock::userFunction( 'wp_insert_post', [ 'times' => $expected_new_episodes_amount ] );
			WP_Mock::userFunction(
				'wp_send_json',
				[
					'args'  => [ [ 'new_episodes_number' => $expected_new_episodes_amount ] ],
					'times' => 1,
				]
			);
		}

		fp_add_new_episodes();
	}

	/**
	 * Data provider for testIfAddsProperNewEpisodesAmount().
	 *
	 * @return array
	 */
	public function addsProperNewEpisodesAmountDataProvider() {
		return [
			'main API call returns error'       => [
				'main_api_call_return'         => new WP_Error(),
				'expected_new_episodes_amount' => Error::class,
			],
			'main API call returns no episodes' => [
				'main_api_call_return'         => $this->mockResponseWithEpisodes( [] ),
				'expected_new_episodes_amount' => 0,
			],
			'main API call returns episode that already exists' => [
				'main_api_call_return'         => $this->mockResponseWithEpisodes( [ [ 'href' => self::EXISTING_PODCAST_HREF ] ] ),
				'expected_new_episodes_amount' => 0,
			],
			'main API call returns episode that not exists yet' => [
				'main_api_call_return'         => $this->mockResponseWithEpisodes( [ [ 'href' => self::NOT_EXISTING_PODCAST_HREF ] ] ),
				'expected_new_episodes_amount' => 1,
			],
			'main API call returns episode that not exists and exists' => [
				'main_api_call_return'         => $this->mockResponseWithEpisodes( [ [ 'href' => self::EXISTING_PODCAST_HREF ], [ 'href' => self::NOT_EXISTING_PODCAST_HREF ] ] ),
				'expected_new_episodes_amount' => 1,
			],
		];
	}

	/**
	 * Checks whether parsed episodes has properly formatted notes.
	 *
	 * @dataProvider makeProperFormattingOnEpisodeNotesDataProvider
	 *
	 * @param string $long_description Input episode notes.
	 * @param string $expected_episode_notes Expected output episode notes.
	 */
	public function testIfMakeProperFormattingEpisodeNotes( $long_description, $expected_episode_notes ) {
		$episode_notes_matches_expectations = false;

		WP_Mock::userFunction(
			'wp_remote_get',
			[
				'times'  => 1,
				'args'   => 'test-episode-notes',
				'return' => $this->mockEpisode( 'test-episode-notes', $long_description ),
			]
		);

		WP_Mock::userFunction(
			'wp_remote_get',
			[
				'times'  => 1,
				'args'   => 'https://api.simplecast.com/podcasts/e02b7b65-cf0b-45b3-923c-0959e07b9369/episodes?limit=9999',
				'return' => $this->mockResponseWithEpisodes(
					[
						[
							'href' => 'test-episode-notes',
						],
					]
				),
			]
		);

		WP_Mock::passthruFunction( 'wp_insert_post' );
		WP_Mock::passthruFunction( 'wp_send_json' );

		$this->mockFunction(
			'fp_get_episode_content',
			function( $id, $description, $episode_notes ) use ( &$episode_notes_matches_expectations, $expected_episode_notes ) {
				$episode_notes_matches_expectations = $episode_notes === $expected_episode_notes;
			}
		);

		fp_add_new_episodes();

		$this->assertTrue( $episode_notes_matches_expectations, 'Episode notes do not matches expected formatting.' );
	}

	/**
	 * Data provider for testIfAddsProperNewEpisodesAmount().
	 *
	 * @return array
	 */
	public function makeProperFormattingOnEpisodeNotesDataProvider() {
		return [
			'prepends newlines with HTML newlines'      => [
				'long_description'       => "1st line\n2nd line\n3rd line",
				'expected_episode_notes' => "1st line<br />\n2nd line<br />\n3rd line",
			],
			'replaces markdown bold with HTML bold'     => [
				'long_description'       => 'normal **bolded bolded** normal',
				'expected_episode_notes' => 'normal <strong>bolded bolded</strong> normal',
			],
			'replaces markdown italic with HTML italic' => [
				'long_description'       => 'normal *italic italic* normal',
				'expected_episode_notes' => 'normal <em>italic italic</em> normal',
			],
			'replaces italic within bold'               => [
				'long_description'       => 'normal **bolded *italic italic* bolded** normal',
				'expected_episode_notes' => 'normal <strong>bolded <em>italic italic</em> bolded</strong> normal',
			],
			'replaces bold within italic'               => [
				'long_description'       => 'normal *italic **bolded bolded** italic* normal',
				'expected_episode_notes' => 'normal <em>italic <strong>bolded bolded</strong> italic</em> normal',
			],
		];
	}

	/**
	 * Helper function to return main API call response with episodes.
	 *
	 * @param array $episodes Episodes to mock.
	 *
	 * @return array
	 */
	private function mockResponseWithEpisodes( $episodes = [] ) {
		return [
			'body' => json_encode(
				[
					'collection' => $episodes,
				]
			),
		];
	}

	/**
	 * Helper function to mock episodes.
	 *
	 * @param string $title Title.
	 * @param string $long_description Long description.
	 *
	 * @return array
	 */
	private function mockEpisode( $title, $long_description ) {
		return [
			'body' => json_encode(
				[
					'title'            => $title,
					'long_description' => $long_description,
					'status'           => 'published',
					'id'               => 1,
					'description'      => '',
					'published_at'     => '',
					'number'           => 1,
					'season'           => [
						'number' => 1,
					],
				]
			),
		];
	}
}
