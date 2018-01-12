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
    <style type="text/css" rel="stylesheet">
        .formatted_text {
        <?php
		$color = $_POST['color'];
		$size  = $_POST['size'];
		$font  = $_POST['font'];

		if($font == "Times"){
		    $font = "Times Roman";
		}

		echo "color: $color;";
		echo "font-size: $size;";
		echo "font-family: $font;";
	    ?>
        }
    </style>
</head>
<body>
<h2>Formatted text below..</h2>
<p class="formatted_text">
	<?php
		echo $_POST['msg'];
	?>
</p>
</body>
</html>
