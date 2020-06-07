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

if (isset($_POST['inputEmail'])) {
  //check if any of the inputs are empty
  if (empty($_POST['inputEmail'])) {
    $data = array('success' => false, 'messageSpanish' => 'Por favor completa el formulario.', 'messageEnglish' => 'Please fill in the form.');
    echo json_encode($data);
    exit;
  }

  $data = array('success' => true, 'messageSpanish' => 'Success', 'messageEnglish' => 'Success');

  // saving lead
  save_lead("email=" . $_POST['inputEmail'] . "&name=Unknown" . "&site=NewBrew&notes=Step1");

  echo json_encode($data);
} else {
  $data = array('success' => false, 'messageSpanish' => 'Por favor completa el formulario.', 'messageEnglish' => 'Please add your email');
  echo json_encode($data);
}
