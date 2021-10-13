<!DOCTYPE html>
<html>
<head>
    <title>Login System</title>
</head>
<body>
<form action="login.php" method="post">
    <h2>Login</h2>
    <?php if (isset($_GET['error'])) { ?>
        <p class="error"><?php echo $_GET['error']; ?></p>
    <?php } ?>
    <label>Username: </label>
    <input type="text" name="uname" placeholder="User Name">
    <br>
    <label>Password: </label>
    <input type="password" name="password" placeholder="Password">
    <br>
    <button type="submit">Login</button>
    <a href="registerpage.php">Sign up</a>
</form>
</body>
</html>