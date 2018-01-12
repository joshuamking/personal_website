<html>
<head>
    <style type="text/css">
        .italic { font-style : italic; }

        .bold { font-weight : bolder; }
    </style>
    <title>Joshua King - PHP - In-class 0</title>

	<?php
		include '../php_functions.php';
	?>
</head>
<body>

<?php
	$max = 5;
	for ( $i = 1; $i <= $max; $i ++ ) {
		echo( "$i " );
		for ( $j = $max - $i + 1; $j <= 5; $j ++ ) {
			echo( "* " );
		}
		echo( "<br>" );
	}
?>


<?php
	echo( "<br>" );
	echo( "<br>" );
	echo( "<br>" );
	echo( getUsernameFromEmail( "jking82@student.gsu.edu" ) );
	echo( "<br>" );
	echo( getUsernameFromEmail( "joshua@antechdevelopment.com" ) );
	echo( "<br>" );
	echo( getUsernameFromEmail( "joshua.king@sorigo.com" ) );
	echo( "<br>" );
	echo( getUsernameFromEmail( "joshuak@us.ibm.com" ) );
	echo( "<br>" );
	echo( getUsernameFromEmail( "joshua.king@rolemodelsoftware.com" ) );
	echo( "<br>" );
	echo( getUsernameFromEmail( "joshua4god@gmail.com" ) );
?>
</body>
</html>