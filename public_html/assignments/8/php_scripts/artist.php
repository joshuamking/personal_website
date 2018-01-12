<?php
	require_once( 'mysql_connection.php' );

	class Artist {
		public $id;
		public $name;
		private $dal;

		public function __construct( DALQueryResult $result = null ) {
			$this->dal = new DAL();

			if ( $result ) {
				$this->id   = $result->id;
				$this->name = $result->name;
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

		public function get_all_albums() {
			$results = $this->dal->get_albums_by_artist_name( $this->name );

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

		public function get_by_id( $artist_id ) {
			$results = $this->dal->get_artist_by_id( $artist_id );

			if ( ! $results ) {
				return $results;
			} else {
				$object_results = [];
				foreach ( $results as $result ) {
					array_push( $object_results, new Artist( $result ) );
				}

				if ( count( $object_results ) == 0 ) {
					return null;
				} else {
					return $object_results[0];
				}
			}
		}

		public function create( $artist_name ) {
			return $this->dal->create_artist( $artist_name );
		}

		public function get_all() {
			$results = $this->dal->get_all_artists();

			if ( ! $results ) {
				return $results;
			} else {
				$object_results = [];
				foreach ( $results as $result ) {
					array_push( $object_results, new Artist( $result ) );
				}

				return $object_results;
			}
		}
	}

	$Artists = new Artist();