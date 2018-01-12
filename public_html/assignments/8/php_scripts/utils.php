<?php

    $server = "localhost";
    $username = "sshah46";
    $password = "sshah46";
    $db_name = "sshah46";

    mysql_connect($server, $username, $password) or die("cannot connect to server");
    mysql_select_db($db_name) or die("cannot select db");

    echo "Successfully connected.";