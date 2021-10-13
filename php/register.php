<?php
session_start();
include "db_conn.php";

if (isset($_POST["submit"])){
    $username = $_POST['username'];
    $password = $_POST['pwd'];
    $passwordcfm = $_POST['passwordcfm'];
    $check_username = mysqli_query($conn, "SELECT user_name FROM users where user_name = '$username'");

    if (empty($username)){
        header("Location: registerpage.php?error=Username is required");
    }else if (empty($password)){
        header("Location: registerpage.php?error=Password is required");
    }else {
        if(mysqli_num_rows($check_username) > 0){
            echo "Username already exists";
        }
        else{
            $query = "INSERT INTO users (user_name, password) VALUES ('$username', '$password')";
            $result = mysqli_query($conn, $query);
            header("Location: loginpage.php?register=success");
        }
    }
}
else{
    header("Location: registerpage.php?register=fail");
}