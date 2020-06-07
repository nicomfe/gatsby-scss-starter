<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'phpmailer/PHPMailerAutoload.php';

function save_lead($data = false)
{
  $curl = curl_init();

  curl_setopt($curl, CURLOPT_POST, 1);
  if ($data)
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

  curl_setopt($curl, CURLOPT_URL, "http://hype-leads.ap-southeast-2.elasticbeanstalk.com/signup");
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, false);
  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
  curl_exec($curl);
  curl_close($curl);
}

if (isset($_POST['inputName']) && isset($_POST['inputEmail']) && isset($_POST['inputMessage'])) {
  //check if any of the inputs are empty
  if (empty($_POST['inputName']) || empty($_POST['inputEmail']) || empty($_POST['inputMessage'])) {
    $data = array('success' => false, 'messageSpanish' => 'Por favor completa el formulario.', 'messageEnglish' => 'Please fill in the form.');
    echo json_encode($data);
    exit;
  }

  //create an instance of PHPMailer
  $mail = new PHPMailer();

  $mail->SMTPDebug = 0;
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->Host = 'mail.newbrew.co.nz';
  $mail->SMTPAuth = true;
  $mail->Username = 'bookings@newbrew.co.nz';
  $mail->Password = 'tFyUZsSuEHq4zer';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;

  $mail->From = $_POST['inputEmail'];
  $mail->FromName = $_POST['inputName'];
  $mail->AddReplyTo( $_POST['inputEmail'], $_POST['inputName'] );
  $mail->AddAddress('info@newbrew.co.nz'); //recipient
  $mail->Subject = $_POST['emailTitle'] . " " . $_POST['inputName'];
  $mail->isHTML(true);
  $mail->AltBody = "Name: " . $_POST['inputName'] . "\r\n\r\nPhone: " . stripslashes($_POST['inputPhone']) . "\r\n\r\nEvent Type: " . stripslashes($_POST['eventType']) . "\r\n\r\nEvent Date: " . stripslashes($_POST['inputDate']) . "\r\n\r\nEvent Time: " . stripslashes($_POST['inputTime']) . "\r\n\r\nEstimated Guests: " . stripslashes($_POST['inputEstimatedGuests']) . "\r\n\r\nMessage: " . stripslashes($_POST['inputMessage']);
  $mail->Body = "<div><p> Name: " . $_POST['inputName'] . "</p><p> Phone: " . stripslashes($_POST['inputPhone']) .  "<p>Event Type: " . stripslashes($_POST['eventType']) .  "<p>Event Date: " . stripslashes($_POST['inputDate']) .  "<p>Event Time: " . stripslashes($_POST['inputTime']) .  "<p>Estimated Guests: " . stripslashes($_POST['inputEstimatedGuests']) .  "<p>Message: " . stripslashes($_POST['inputMessage']) . "</p></div>";

  if (isset($_POST['ref'])) {
    $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
  }

  if(!$mail->send()) {
    $data = array('success' => false, 'messageSpanish' => 'Ocurrio un error (Por favor contactanos en hi@thehype.nz). Error: ' . $mail->ErrorInfo , 'messageEnglish'=> 'Unexpected error (Please send us an email to info@newbrew.co.nz). Error: ' . $mail->ErrorInfo);
    echo json_encode($data);
    exit;
  }

  $data = array('success' => true, 'messageSpanish' => 'Gracias por tu mensaje!.', 'messageEnglish' => 'Thanks for your request! We`ll be in touch soon.');

  // saving lead
  save_lead("email=" . $_POST['inputEmail'] . "&name=" . $_POST['inputName'] . "&site=NewBrew&notes=None");

  echo json_encode($data);
} else {
  $data = array('success' => false, 'messageSpanish' => 'Por favor completa el formulario.', 'messageEnglish' => 'Please fill in the form');
  echo json_encode($data);
}
