<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>jking82 - Assignment 3</title>
	<?php
		include '../../php_functions.php';
	?>

    <style type="text/css">
        #checker-board td.red {
            background-color : red;
        }

        #checker-board td.black {
            background-color : black;
        }

        #checker-board {
            border-spacing : 1px
        }

        #checker-board td {
            height  : 35px;
            padding : 1px;
        }

        div.children-side-by-side {
            display         : flex;
            justify-content : space-around;
        }
    </style>

</head>
<body>
<?php
	function isBitten() {
		return rand( 0, 1 ) >= 0.5;
	}

?>

<ol>
    <li>
		<?php
			echoIf( isBitten(), "Charlie ate my lunch!", "Charlie did not eat my lunch!" );
		?>
    </li>
    <li>
        <table id="checker-board" style="width: 300px;" border="1px solid black">
			<?php
				$num_of_squares = 7;
				for ( $i = 0; $i < $num_of_squares; $i ++ ) {
					echo "<tr>";
					for ( $j = 0; $j < $num_of_squares; $j ++ ) {
						$color = $j % 2 == 0 ? "red" : "black";
						echo "<td class=\"$color\"></td>";
					}
					echo "</tr>";
				}
			?>
        </table>
    </li>
    <li>
		<?php
			$months                = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			];
			$months_alphabetically = $months;
			sort( $months_alphabetically );
		?>
        <ul>
            <li>
                <p>In order with for</p>
                <ol>
					<?php
						for ( $i = 0; $i < sizeof( $months ); $i ++ ) {
							echo "<li>$months[$i]</li>";
						}
					?>
                </ol>
            </li>
            <li>
                <p>Alphabetically with for</p>
                <ol>
					<?php
						for ( $i = 0; $i < sizeof( $months_alphabetically ); $i ++ ) {
							echo "<li>$months_alphabetically[$i]</li>";
						}
					?>
                </ol>
            </li>
            <li>
                <p>In order with foreach</p>
                <ol>
					<?php
						foreach ( $months as $month ) {
							echo "<li>$month</li>";
						}
					?>
                </ol>
            </li>
            <li>
                <p>Alphabetically with foreach</p>
                <ol>
					<?php
						foreach ( $months_alphabetically as $month ) {
							echo "<li>$month</li>";
						}
					?>
                </ol>
            </li>
        </ul>
    </li>
    <li>
		<?php
			$restaurant_data         = [
				[ "Rank" => 1, "Name" => "Chama Gaucha", "Price" => "$40.50", ],
				[ "Rank" => 2, "Name" => "Aviva by Kameel", "Price" => "$15.00", ],
				[ "Rank" => 3, "Name" => "Bone’s Restauran", "Price" => "$65.00", ],
				[ "Rank" => 4, "Name" => "Umi Sushi Buckhead", "Price" => "$40.50", ],
				[ "Rank" => 5, "Name" => "Fandangles", "Price" => "$30.00", ],
				[ "Rank" => 6, "Name" => "Capital Grille", "Price" => "$60.50", ],
				[ "Rank" => 7, "Name" => "Canoe", "Price" => "$35.50", ],
				[ "Rank" => 8, "Name" => "One Flew South", "Price" => "$21.00", ],
				[ "Rank" => 9, "Name" => "Fox Bros. BBQ", "Price" => "$15.00", ],
				[ "Rank" => 10, "Name" => "South City Kitchen Midtown", "Price" => "$29.00", ],
			];
			$restaurant_data_by_name = $restaurant_data;

			function createTableFrom2DArraySortedBy( $data, $sortBy, $reverse = false ) {
				if ( sizeof( $data ) <= 0 ) {
					return "<p>No data</p>";
				} else {
					$data_tmp_clone = $data;
					usort( $data_tmp_clone, function ( $l, $r ) use ( $reverse, $sortBy ) {
						return strnatcmp( $r[ $sortBy ], $l[ $sortBy ] ) * ( $reverse ? 1 : - 1 );
					} );
					$data = $data_tmp_clone;
				}

				$table_id = "data-table-" . round( rand( 0, getrandmax() ) );
				$out      = "<style type=\"text/css\">table#$table_id p { margin : 0; } table#$table_id { border: 2px solid black; } table#$table_id th { border: 1px solid black; padding: 10px; } table#$table_id td { border: 1px solid black; padding: 3px; }</style>";
				$out      .= "<table id=\"$table_id\">";
				$out      .= "<tr>";
				foreach ( array_keys( $data[0] ) as $key ) {
					$out .= "<th>";
					if ( $key == $sortBy ) {
						$out .= "<p style=\"text-decoration: underline\">";
					} else {
						$out .= "<p>";
					}
					$out .= "$key";
					$out .= "</p>";
					$out .= "</th>";
				}
				$out .= "</tr>";

				foreach ( $data as $item ) {
					$out .= "<tr>";
					foreach ( $item as $item_attr ) {
						$out .= "<td><p>$item_attr</p></td>";
					}
					$out .= "</tr>";
				}

				$out .= "</table>";

				return $out;
			}

		?>
        <ul>
            <li>
                <p>Top 10 Atlanta Restaurants by Votes</p>
                <div class="children-side-by-side">
                    <div>
                        <h3>Ascending</h3>
						<?php echo createTableFrom2DArraySortedBy( $restaurant_data, "Rank" ) ?>
                    </div>
                    <div>
                        <h3>Descending</h3>
						<?php echo createTableFrom2DArraySortedBy( $restaurant_data, "Rank", true ) ?>
                    </div>
                </div>
                </div>
            </li>

            <li>
                <p>Top 10 Atlanta Restaurants by Name</p>
                <div class="children-side-by-side">
                    <div>
                        <h3>Ascending</h3>
						<?php echo createTableFrom2DArraySortedBy( $restaurant_data, "Name" ) ?>
                    </div>
                    <div>
                        <h3>Descending</h3>
						<?php echo createTableFrom2DArraySortedBy( $restaurant_data, "Name", true ) ?>
                    </div>
                </div>
            </li>

            <li>
                <p>Top 10 Atlanta Restaurants by Price</p>
                <div class="children-side-by-side">
                    <div>
                        <h3>Ascending</h3>
						<?php echo createTableFrom2DArraySortedBy( $restaurant_data, "Price" ) ?>
                    </div>
                    <div>
                        <h3>Descending</h3>
						<?php echo createTableFrom2DArraySortedBy( $restaurant_data, "Price", true ) ?>
                    </div>
                </div>
            </li>
        </ul>
    </li>
</ol>

</body>
</html>