<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/vendor/autoload.php';

if( isset($_POST['contact_name']) && isset($_POST['contact_email']) && isset($_POST['contact_message']))
{

    // Define form field variable

    $contact_name = $_POST['contact_name'];
    $contact_email = $_POST['contact_email'];
    $contact_message = $_POST['contact_message'];

    if(isset($_POST['contact_subject'])){
        $contact_subject = $_POST['contact_subject'];
    } else {
        $contact_subject = "None.";
    }

    if(isset($_POST['contact_iama'])){
        $contact_iama = $_POST['contact_subject'];
    } else {
        $contact_iama = "None.";
    }

    $email_html = '<p><strong>You\'ve recieved a message from The Abundancy website contact form!</strong></p>';
    $email_html .= '<h3 style="color: #c55227;">Name:</h3>';
    $email_html .= '<p><span style="color: #000000;">' . $contact_name .'</span></p>';
    $email_html .= '<h3 style="color: #c55227;">Email:</h3>';
    $email_html .= '<p>'. $contact_email .'</p>';
    $email_html .= '<h3 style="color: #c55227;">Subject:</h3>';
    $email_html .= '<p>'. $contact_subject .'</p>';
    $email_html .= '<h3 style="color: #c55227;">I Am A:</h3>';
    $email_html .= '<p>'. $contact_iama .'</p>';
    $email_html .= '<h3 style="color: #c55227;">Message:</h3>';
    $email_html .= '<p>'. $contact_message .'</p>';

    $mail = new PHPMailer;

    //Tell PHPMailer to use SMTP
    $mail->isSMTP();

    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    $mail->SMTPDebug = 0;

    //Ask for HTML-friendly debug output
    $mail->Debugoutput = 'html';

    //Set the hostname of the mail server
    $mail->Host = 'smtp.gmail.com';
    // use
    // $mail->Host = gethostbyname('smtp.gmail.com');
    // if your network does not support SMTP over IPv6

    //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
    $mail->Port = 587;

    //Set the encryption system to use - ssl (deprecated) or tls
    $mail->SMTPSecure = 'tls';

    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;

    //Username to use for SMTP authentication - use full email address for gmail
    $mail->Username = "it@theabundancy.com";

    //Password to use for SMTP authentication
    $mail->Password = "!1234Abcd";

    //Set who the message is to be sent from
    $mail->setFrom('it@theabundancy.com', 'The Abundancy');

    //Set who the message is to be sent to
    $mail->addAddress('joe.ahern@theabundancy.com', 'Joseph Ahern');

    $mail->isHTML(true);

    //Set the subject line
    $mail->Subject = 'The Abundancy - Contact Form Submission';

    //Read an HTML message body from an external file, convert referenced images to embedded,
    //convert HTML into a basic plain-text alternative body
    $mail->Body = $email_html;

    //send the message, check for errors
    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message sent!";
    }

} else {

    echo 'Sorry, but you did not supply the correct information to process your request. Please try again';

}

?>