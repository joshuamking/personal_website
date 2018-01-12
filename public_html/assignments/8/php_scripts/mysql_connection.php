<?php

//	$host   = "localhost";
//	$user   = "jking82";
//	$pass   = "jking82";
//	$db     = "jking82";
//	$mysqli = new mysqli( $host, $user, $pass, $db );
//
//	function execute_query( $query ) {
//		global $mysqli;
//
//		if ( mysqli_connect_errno() ) {
//			printf( "Connect failed: %s\n", mysqli_connect_error() );
//			exit();
//		}
//
//		if ( $stmt = $mysqli->prepare( $query ) ) {
//			if ( ! $stmt->execute() ) {
//				print_r( $mysqli->error_list );
//
//				return false;
//			}
////				print_r( $mysqli->error_list );
//
//			$results = [];
//			while ( $row = $stmt->bind_result( $row ) ) {
//				print_r( $row );
//				array_push( $results, $row );
//			}
//
//			$stmt->close();
////			$mysqli->close();
//
//
//			if ( count( $results ) == 1 ) {
//				return $results[0];
//			} else if ( count( $results ) > 1 ) {
//				return $results;
//			}
//
//			return false;
//		} else {
////			$mysqli->close();
//
//			return false;
//		}
//	}


	require_once( "DAL.php" );

	$dal = new DAL();