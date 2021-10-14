<!DOCTYPE html>
<html>

<head>
    <title>Registration System</title>
    <link rel="stylesheet" href="../register.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
</head>

<body>
<form action="register.php" method="post">
    <div class="container">
        <h4 class="sent-notification"></h4>
        <form action="" method="post">
            <h2>Create new account</h2>
            <?php if (isset($_GET['error'])) { ?>
                <p style="color: red"><?php echo $_GET['error']; ?></p>
            <?php } ?>
            <div class="form-group">
                <label>Username: </label>
                <input type="text" name="username" placeholder="User Name" required>

            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="pwd" placeholder="Password" required>
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" name="passwordcfm" placeholder=" Confirm Password" required>
            </div>
            <br>
            <div class="buttonList">
                <input type="submit" name="submit" value="Create new account">
            </div>
            <br><br>
            <p>
                Already have an account? <a href="loginpage.php">Log in</a>
            </p>
        </form>
    </div>
</form>
</body>
</html>