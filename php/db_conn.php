<?php

$sname= "127.0.0.1";
$unmae= "brandoncakeproj";
$password = "brandoncakeproj";

$db_name = "brandoncakeproj";

$conn = mysqli_connect($sname, $unmae, $password, $db_name);

if (!$conn) {
    echo "Connection failed!";
}