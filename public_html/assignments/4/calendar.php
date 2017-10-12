<?php
	#!/usr/local/bin/php -d display_errors=STDOUT
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Calendar - jking82</title>
    <meta charset='utf-8'>
    <link rel="stylesheet" href="https://grid.cs.gsu.edu/~csclxh/csc4370_6370/calendar.css" />
	<?php
		date_default_timezone_set( "America/New_York" );
		include( "../../php_functions.php" );
	?>
    <style type="text/css" rel="stylesheet">
        table {
            border-spacing : 10px;
        }

        table td {
            padding    : 5px;
            text-align : center !important;
        }

        h1 {
            text-align  : center;
            font-weight : bolder;
        }
    </style>
<body>
<?php
	function get_hour_string( $timestamp ) {
		return date( "h:00a", $timestamp );
	}

	$hours_to_show = 12;
	$hours         = [];
	for ( $i = 0; $i < $hours_to_show; $i ++ ) {
		$hour        = strtotime( "+$i hours" );
		$hours[ $i ] = get_hour_string( $hour );
	}
?>
<div class="container">
    <h1><?php echo "Today is " . date( "l M d, Y" ) . ".<br>Currently it is " . date( "h:i A" ) ?></h1>
    <hr>
    <table id="event_table">
        <tr class="table_header">
            <td class="hr_td">Hours</td>
			<?php
				$people = [ "Jack", "Bill", "Freddie", "Angela", "Savannah", "Lucibeth", "Janae", ];
				sort( $people );

				foreach ( $people as $person ) {
					echo "<td class=\"hr_td\">$person</td>";
				}
			?>
        </tr>
		<?php
			for ( $i = 0; $i < $hours_to_show; $i ++ ) {
				$class = $i % 2 == 1 ? "odd_row" : "even_row";
				echo "<tr class=\"$class\">";
				echo "<td>" . $hours[ $i ] . "</td>";
				foreach ( $people as $person ) {
					echo "<td class=\"hr_td\">" . randElement( [ "Busy", "", "", "", "" ] ) . "</td>";
				}
				echo "</tr>";
			}
		?>
    </table>
</div>

</body>
</html>
