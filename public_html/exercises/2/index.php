<html>
<head>
    <style type="text/css">
        .italic { font-style : italic; }

        .bold { font-weight : bolder; }
    </style>
    <title>Joshua King - PHP - In-class 0</title>
    <?php
    include '../../php_functions.php';
    ?>
</head>
<body>

<h1>Joshua King's PHP In-class 0</h1>

<ol>
    <li><p class="italic"><?php echo( "\"Good morning, Dave,\" said HAL." ); ?></p></li>
    <li>
		<?php
			$radius = 5;
			$area   = calcAreaOfCircle( $radius );
			echo( "The area of a circle with a radius of $radius is $area" );
		?>
    </li>
    <li>
        <p>Fahrenheit to Celsius conversion:</p>
        <ul>
            <li>
				<?php
					$fahrenheit = 32;
					$celsius    = fahrenheitToCelsius( $fahrenheit );
					echo( "$fahrenheit degrees fahrenheit is equal to $celsius degrees celsius." );
				?>
            </li>
            <li>
				<?php
					$fahrenheit = 212;
					$celsius    = fahrenheitToCelsius( $fahrenheit );
					echo( "$fahrenheit degrees fahrenheit is equal to $celsius degrees celsius." );
				?>
            </li>
            <li>
				<?php
					$fahrenheit = 98.6;
					$celsius    = fahrenheitToCelsius( $fahrenheit );
					echo( "$fahrenheit degrees fahrenheit is equal to $celsius degrees celsius." );
				?>
            </li>
        </ul>
    </li>
    <li>
        <p>
			<?php
				$str    = " PHP is fun ";
				$str    = trim( $str );
				$length = strlen( $str );
				echo( "String has $length characters" );
			?>
        </p>
    </li>
    <li>
        <p>
			<?php
				$str = "WDWWLWWWLDDWDLL";
				echo( charAfterFirstOccurrence( $str, "WWW" ) );
			?>
        </p>
    </li>
    <li>
        <p>Palindromes</p>
        <ul>
            <li>
				<?php
					$str = "kayak";
					echoIf( isPalindrome( $str ), "\"$str\" is a palindrome!", "\"$str\" is NOT a palindrome!" );
				?>
            </li>
            <li>
				<?php
					$str = "Hannah";
					echoIf( isPalindrome( $str ), "\"$str\" is a palindrome!", "\"$str\" is NOT a palindrome!" );
				?>
            </li>
            <li>
				<?php
					$str = "Able was I ere I saw Elba";
					echoIf( isPalindrome( $str ), "\"$str\" is a palindrome!", "\"$str\" is NOT a palindrome!" );
				?>
            </li>
            <li>
				<?php
					$str = "Hello";
					echoIf( isPalindrome( $str ), "\"$str\" is a palindrome!", "\"$str\" is NOT a palindrome!" );
				?>
            </li>
            <li>
				<?php
					$str = "World";
					echoIf( isPalindrome( $str ), "\"$str\" is a palindrome!", "\"$str\" is NOT a palindrome!" );
				?>
            </li>
            <li>
				<?php
					$str = "This is PHP";
					echoIf( isPalindrome( $str ), "\"$str\" is a palindrome!", "\"$str\" is NOT a palindrome!" );
				?>
            </li>
        </ul>
    </li>
    <li>
        <p>Evens and Odds</p>
        <ul>
            <li>
				<?php
					$num = 5;
					echo( "$num is an " );
					echoIf( isEven( $num ), "even", "odd" );
					echo( " number." );
				?>
            </li>
            <li>
				<?php
					$num = 6;
					echo( "$num is an " );
					echoIf( isEven( $num ), "even", "odd" );
					echo( " number." );
				?>
            </li>
            <li>
				<?php
					$num = 7;
					echo( "$num is an " );
					echoIf( isEven( $num ), "even", "odd" );
					echo( " number." );
				?>
            </li>
            <li>
				<?php
					$num = 8;
					echo( "$num is an " );
					echoIf( isEven( $num ), "even", "odd" );
					echo( " number." );
				?>
            </li>
            <li>
				<?php
					$num = 9;
					echo( "$num is an " );
					echoIf( isEven( $num ), "even", "odd" );
					echo( " number." );
				?>
            </li>
        </ul>
    </li>
    <li>
        <p>
            <span class="bold">
			<?php
				date_default_timezone_set( "UTC" );
				echoIf( date( "L" ) == 1, "It is", "It isn't" );
			?>
            </span>
            <span>a leap year.</span>
        </p>
    </li>
</ol>
</body>
</html>