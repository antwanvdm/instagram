<?php
require_once "initialize.php";
$instagram->accessToken = isset($_SESSION['accessToken']) ? $_SESSION['accessToken'] : null;
$data = array();

//Get Arguments ready to make a dynamic call to the Instagram API
$method = $_GET['method'];
$arguments = json_decode(stripslashes($_GET['arguments']), true); //Stripslashes fixes a weird error of 3 (\\\) slashes instead of 1 (\) on some servers..

//Make a call & catch any possible errors thrown by the __call function
try {
	$data = $instagram->{$method}($arguments['replace'], $arguments['params']);
} catch (Exception $e) {
	header('HTTP/1.1 500 Internal Server Error');
	$data = array("message" => $e->getMessage(), "type" => get_class($e));
}

//Set the header, output & bye bye
header('Content-Type: application/json');
echo json_encode($data);
exit();