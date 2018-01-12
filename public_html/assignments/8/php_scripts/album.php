<?php
	require_once( 'mysql_connection.php' );
	require_once( 'artist.php' );
	require_once( 'track.php' );

	class Album {
		public $id;
		public $artist;
		public $name;
		private $dal;

		public function __construct( DALQueryResult $result = null ) {
			$this->dal = new DAL();

			if ( $result ) {
				$this->id     = $result->id;
				$this->name   = $result->name;
				$this->artist = ( new Artist() )->get_by_id( $result->artist );
			}
		}

		public function get_all_tracks() {
			$results = $this->dal->get_tracks_by_album( $this );

			if ( ! $results ) {
				return $results;
			} else {
				$object_results = [];
				foreach ( $results as $result ) {
					array_push( $object_results, new Track( $result ) );
				}

				return $object_results;
			}
		}

		public function get_all() {
			$results = $this->dal->get_all_albums();

			if ( ! $results ) {
				return $results;
			} else {
				$object_results = [];
				foreach ( $results as $result ) {
					array_push( $object_results, new Album( $result ) );
				}

				return $object_results;
			}
		}

		public function create( $artist_id, $album_name, $album_tracks, $album_track_lengths ) {
			$album_id = $this->dal->create_album( $artist_id, $album_name );

			for ( $i = 1; $i <= count( $album_tracks ); $i ++ ) {
				$index        = $i - 1;
				$track_name   = $album_tracks[ $index ];
				$track_length = $album_track_lengths[ $index ];

				if ( isset( $track_name ) && $track_name != "" && isset( $track_length ) && $track_length != "" ) {
					$this->dal->add_track_to_album( $album_id, $track_name, $track_length, $i );
				}
			}

			return $album_id;
		}

		public function get_by_id( $album_id ) {
			$results = $this->dal->get_album_by_id( $album_id );

			if ( ! $results ) {
				return $results;
			} else {
				$object_results = [];
				foreach ( $results as $result ) {
					array_push( $object_results, new Album( $result ) );
				}

				if ( count( $object_results ) == 0 ) {
					return null;
				} else {
					return $object_results[0];
				}
			}
		}
	}

	$Albums = new Album();