<?php
include 'php/sendEmail.php';
?>
<!DOCTYPE html>
<?php echo $alert;?>
<html lang="en">
<head>
    <title>Feedback form</title>
</head>
<body>
<h4 class="sent-notification"></h4>
<form action="" method="post">
    <h2>Contact Us</h2>

    <label>Name</label>
    <input type="text" name="name" placeholder="Enter Name" required>
    <br><br>
    <label>Email</label>
    <input type="text" name="email" placeholder="Enter Email" required>
    <br><br>
    <p>Message</p>
    <textarea name="message" rows="5" placeholder="Type Message" required></textarea>
    <br><br>
    <input type="submit" name="submit" value="Send">
</form>

<script type="text/javascript">
    if(window.history.replaceState){
        window.history.replaceState(null, null, window.location.href);
    }
</script>
</body>
</html>
