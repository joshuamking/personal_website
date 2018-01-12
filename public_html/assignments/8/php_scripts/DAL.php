<?php

	class DALQueryResult {

		private $_results = [];

		public function __construct() {
		}

		public function __get( $var ) {
			if ( isset( $this->_results[ $var ] ) ) {
				return $this->_results[ $var ];
			} else {
				return null;
			}
		}

		public function __set( $var, $val ) {
			$this->_results[ $var ] = $val;
		}
	}

	class DAL {

		public function __construct() {
		}

		public function drop_table( $table_name ) {
			$conn       = $this->dbconnect();
			$table_name = $this->sql_escape( $table_name, $conn );

			return $this->query( "DROP TABLE IF EXISTS " . $table_name, $conn );
		}

		private function dbconnect() {
			$DB_HOST     = "localhost";
			$DB_USER     = "jking82";
			$DB_PASSWORD = "jking82";
			$DB_DB       = "jking82";

			$conn = mysql_connect( $DB_HOST, $DB_USER, $DB_PASSWORD )
			or die ( "<br/>Could not connect to MySQL server" );

			mysql_select_db( $DB_DB, $conn )
			or die ( "<br/>Could not select the indicated database" );

			return $conn;
		}

		private function sql_escape( $var, $conn ) {
			$post = mysql_real_escape_string( $var, $conn );

			return $post;
		}

		private function query( $sql, $conn ) {

			$res = mysql_query( $sql );

			if ( $res ) {
				if ( strpos( $sql, 'SELECT' ) === false && strpos( $sql, 'INSERT' ) === false ) {
					return true;
				}
			} else {
				if ( strpos( $sql, 'SELECT' ) === false && strpos( $sql, 'INSERT' ) === false ) {
					return false;
				} else {
					return null;
				}
			}

			$results = [];

			if ( ! ( strpos( $sql, 'INSERT' ) === false ) ) {
				return mysql_insert_id( $conn );
			}

			while ( $row = mysql_fetch_array( $res ) ) {

				$result = new DALQueryResult();

				foreach ( $row as $k => $v ) {
					$result->$k = $v;
				}

				$results[] = $result;
			}

			return $results;
		}

		public function create_tables() {
			$this->query( "CREATE TABLE Artists ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, CONSTRAINT Artist_id_uindex UNIQUE (id), CONSTRAINT Artists_name_uindex UNIQUE (name) )", $this->dbconnect() );
			$this->query( "CREATE TABLE Albums ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, artist INT NOT NULL, CONSTRAINT Album_id_uindex UNIQUE (id), CONSTRAINT Album_name_uindex UNIQUE (name), CONSTRAINT Album_Artist_id_fk FOREIGN KEY (artist) REFERENCES Artists (id) )", $this->dbconnect() );
			$this->query( "CREATE TABLE Tracks ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, length TIME NOT NULL, album INT NOT NULL, position_on_album INT NOT NULL, CONSTRAINT Tracks_id_uindex UNIQUE (id), CONSTRAINT Tracks_Album_id_fk FOREIGN KEY (album) REFERENCES Albums (id) )", $this->dbconnect() );
		}

		public function get_albums_by_artist_name( $artist_name ) {
			$conn        = $this->dbconnect();
			$artist_name = $this->sql_escape( $artist_name, $conn );
			$sql         = "SELECT Albums.id as id, Albums.name as name, Artists.name as artist FROM Albums INNER JOIN Artists ON Albums.artist=Artists.id WHERE Artists.name='$artist_name'";

			return $this->query( $sql, $conn );
		}

		public function get_tracks_by_album( Album $album ) {
			$conn     = $this->dbconnect();
			$album_id = $album->id;
			$album_id = $this->sql_escape( $album_id, $conn );
			$sql      = "SELECT Tracks.id as id, Tracks.name as name, Tracks.length as length, Tracks.position_on_album as position_on_album, Albums.id as album FROM Tracks INNER JOIN Albums ON Tracks.album=Albums.id WHERE Albums.id='$album_id' ORDER BY position_on_album ASC";


			return $this->query( $sql, $conn );
		}

		public function get_album_by_id( $album_id ) {
			$conn     = $this->dbconnect();
			$album_id = $this->sql_escape( $album_id, $conn );
			$sql      = "SELECT Albums.id as id, Albums.name as name, Artists.id as artist FROM Albums INNER JOIN Artists ON Albums.artist=Artists.id WHERE Albums.id='$album_id'";

			return $this->query( $sql, $conn );
		}

		public function get_all_albums() {
			$conn = $this->dbconnect();
			$sql  = "SELECT Albums.id AS id, Albums.name AS name, Artists.id AS artist FROM Albums INNER JOIN Artists ON Albums.artist=Artists.id";

			return $this->query( $sql, $conn );
		}

		public function get_artist_by_id( $artist_id ) {
			$conn      = $this->dbconnect();
			$artist_id = $this->sql_escape( $artist_id, $conn );
			$sql       = "SELECT Artists.id as id, Artists.name as name FROM Artists WHERE Artists.id='$artist_id'";

			return $this->query( $sql, $conn );
		}

		public function create_artist( $artist_name ) {
			$conn        = $this->dbconnect();
			$artist_name = $this->sql_escape( $artist_name, $conn );
			$sql         = "INSERT INTO Artists (name) VALUES ('$artist_name')";

			return $this->query( $sql, $conn );
		}

		public function get_all_artists() {
			$conn = $this->dbconnect();
			$sql  = "SELECT Artists.id AS id, Artists.name AS name FROM Artists";

			return $this->query( $sql, $conn );
		}

		public function create_album( $artist_id, $album_name ) {
			$conn       = $this->dbconnect();
			$artist_id  = $this->sql_escape( $artist_id, $conn );
			$album_name = $this->sql_escape( $album_name, $conn );
			$sql        = "INSERT INTO Albums (name, artist) VALUES ('$album_name', $artist_id)";

			return $this->query( $sql, $conn );
		}

		public function add_track_to_album( $album_id, $track_name, $track_length, $position_on_album ) {
			$conn              = $this->dbconnect();
			$track_name        = $this->sql_escape( $track_name, $conn );
			$track_length      = $this->sql_escape( $track_length, $conn );
			$album_id          = $this->sql_escape( $album_id, $conn );
			$position_on_album = $this->sql_escape( $position_on_album, $conn );
			$sql               = "INSERT INTO Tracks (name, length, album, position_on_album) VALUES ('$track_name', '00:$track_length', $album_id, $position_on_album)";

			return $this->query( $sql, $conn );
		}
	}
 