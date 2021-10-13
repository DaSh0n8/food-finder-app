<?php

$sname= "sql6.freesqldatabase.com";
$unmae= "sql6444158";
$password = "sl9KcEkUCH";

$db_name = "sql6444158";

$conn = mysqli_connect($sname, $unmae, $password, $db_name);

if (!$conn) {
    echo "Connection failed!";
}