<?php
use PHPMailer\PHPMailer\PHPMailer;

require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";

$mail = new PHPMailer(true);

$alert = '';

if(isset($_POST['name']) && isset($_POST['email'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    try{
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = "fit2101team35@gmail.com";
        $mail->Password = "fit2101Team35monash";
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = '587';

        $mail->setFrom('fit2101team35@gmail.com');
        $mail->addAddress('fit2101team35@gmail.com');

        $mail->isHTML(true);
        $mail->Subject= 'Message Received (Contact Page)';
        $mail->Body = "<h3>Name : $name <br>Email: $email <br>Message: $message</h3>";

        $mail->send();
        $alert = '<div class="alert-success">
                        <span style="background-color: green">Message sent! Thank you for contacting us.</span>
                 </div>';
        header("Location: php/map.php");
    } catch (Exception $e){
        $alert = '<div class="alert-error">
                       <span style="background-color: red">Something went wrong! Please try again.</span>
                  </div>';
    }
}