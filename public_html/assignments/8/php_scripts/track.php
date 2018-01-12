<?php
	require_once( 'mysql_connection.php' );
	require_once( 'album.php' );

	class Track {
		public $id;
		public $album;
		public $name;
		public $length;
		public $position_on_album;
		private $dal;

		public function __construct( DALQueryResult $result = null ) {
			$this->dal = new DAL();

			if ( $result ) {
				$this->id                = $result->id;
				$this->name              = $result->name;
				$this->length            = $result->length;
				$this->position_on_album = $result->position_on_album;
				$this->album             = ( new Album( null ) )->get_by_id( $result->album );
			}
		}

//		public function __get($var){
//			switch ($var){
//				case 'id':
//					return $this->_id;
//					break;
//				case 'make':
//					return $this->_make;
//					break;
//				case 'name':
//					return $this->_name;
//					break;
//				default:
//					return null;
//					break;
//			}
//		}

		public function get_all_tracks() {
			$results = $this->dal->get_tracks_by_album( $this->album );

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
	}

	$Tracks = new Track();