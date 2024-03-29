<!DOCTYPE html>
<html>

<head>
    <title>Login System</title>
    <link rel="stylesheet" href="../loginpage.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32x32.png">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
</head>

<body>
<form action="login.php" method="post">
    <div class="container">
        <h4 class="sent-notification"></h4>
        <form action="" method="post">
            <h2>Login</h2>
            <?php if (isset($_GET['error'])) { ?>
                <p style="color: red"><?php echo $_GET['error']; ?></p>
            <?php } ?>
            <div class="form-group">
                <label>Username: </label>
                <input type="text" name="uname" placeholder="User Name" required>

            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" required>
            </div>
            <br><br>
            <div class="buttonList">
                <input type="submit" name="submit" value="Log in">
                <br>
                <button id="register" type="button" onclick="location.href='registerpage.php';">Register</button>
            </div>
        </form>
    </div>
</form>
</body>

</html>