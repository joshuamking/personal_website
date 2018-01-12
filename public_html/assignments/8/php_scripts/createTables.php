<?php

	include( 'mysql_connection.php' );

	$dal->drop_table( "Tracks" );
	$dal->drop_table( "Albums" );
	$dal->drop_table( "Artists" );

	$dal->create_tables();

	//	mysqli_close( $connection );