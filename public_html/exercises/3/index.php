<?php
	/**
	 * Created by PhpStorm.
	 * User: joshuaking
	 * Date: 9/27/17
	 * Time: 00:55
	 */

	date_default_timezone_set( "UTC" );
?>
<html>
<head>
    <meta charset="UTF-8">
    <title>Form 2</title>
    <link type="text/css" href="main.css" />
</head>
<body>
<h3>
	<?php
		$title       = $_POST['title'];
		$firstName   = $_POST['firstName'];
		$familyName  = $_POST['familyName'];
		$address     = $_POST['address'];
		$yearOfBirth = $_POST['yearOfBirth'];

		$yearOfBirth = substr( $yearOfBirth, 0, 4 );
		$yearOfBirth = date_parse_from_format( "yyyy", $yearOfBirth )["year"];
		$thisYear    = date( "Y" );
		$age         = $thisYear - $yearOfBirth;

		print "<p>Hello, $title $firstName $familyName of $address.<br>You will be $age this year.</p>";
	?>
</h3>
</body>
</html>
