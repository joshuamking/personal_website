<?php
	//    FUNCTIONS

	function calcAreaOfCircle( $radius ) {
		return pi() * $radius * $radius;
	}

	function fahrenheitToCelsius( $fahrenheit ) {
		return ( 5 / 9 ) * ( $fahrenheit - 32 );
	}

	function charAfterFirstOccurrence( $str, $searchStr ) {
		$index = strpos( $str, $searchStr );
		if ( $index ) {
			return substr( $str, $index + strlen( $searchStr ), 1 );
		} else {
			return "[NOT FOUND]";
		}
	}

	function isPalindrome( $str ) {
		return substr_compare( $str, join( array_reverse( str_split( $str ) ) ), 0, strlen( $str ), true ) == 0;
	}

	function echoIf( $bool, $strTrue, $strFalse = false ) {
		if ( $bool ) {
			echo( $strTrue );
		} else if ( $strFalse ) {
			echo( $strFalse );
		}
	}

	function isEven( $num ) {
		return $num % 2 == 0;
	}

	function getFib( $n ) {
		return round( pow( ( sqrt( 5 ) + 1 ) / 2, $n ) / sqrt( 5 ) );
	}

	function isPrime( $num ) {
		return ( ( pow( 2, ( $num - 1 ) ) ) % $num == 1 );
	}

	function getUsernameFromEmail( $email ) {
		preg_match( "/(.*)@.*/", $email, $matches );

		return $matches[1];
	}

	function randElement( $arr ) {
		return $arr[ rand( 0, sizeof( $arr ) ) ];
	}