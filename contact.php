<?php
include 'php/sendEmail.php';

session_start();
if (isset($_SESSION['id']) && isset($_SESSION['user_name'])){

?>
<!DOCTYPE html>
<?php echo $alert;?>
<html lang="en">
    <head>
        <title>Feedback form</title>
        <link rel="stylesheet" href="feedback.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
    </head>
    <body>
    <section>
        <div class="container">
            <h4 class="sent-notification"></h4>
            <form action="" method="post">
                <h2>Give us feedback</h2>

                <div class = "form-group">
                    <label>Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter Name" required>

                </div>
                <div class = "form-group">
                    <label>Email</label>
                    <input type="text" id="email" name="email" placeholder="Enter Email" required>
                </div>
                <div class="form-group">
                    <p>Message</p>
                    <textarea name="message" id="message" rows="5" placeholder="Type Message" required></textarea>
                </div>
                <br><br>
                <input type="submit" name="submit" value="Send">
                <a href="php/map.php"><input type="cancel" name="cancel" value="Cancel"></a>
            </form>
        </div>
    </section>
    <script type="text/javascript">
        if(window.history.replaceState){
            window.history.replaceState(null, null, window.location.href);
        }
    </script>
    </body>
</html>
    <?php
}else{
    header("Location: index.php");
    exit();
}
?>