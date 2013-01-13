<?php
require_once "initialize.php";
$instagram->accessToken = isset($_SESSION['accessToken']) ? $_SESSION['accessToken'] : null;
$data = array();

//Get Arguments ready to make a dynamic call to the Instagram API
$method = $_GET['method'];
$arguments = json_decode($_GET['arguments'], true);

//Make a call & catch any possible errors thrown by the __call function
try {
	$data = $instagram->{$method}($arguments['replace'], $arguments['params']);
} catch (InstagramApiMethodCallException $e) {
	header('HTTP/1.1 500 Internal Server Error');
	$data = array("message" => $e->getMessage());
} catch (BadMethodCallException $e) {
	header('HTTP/1.1 500 Internal Server Error');
	$data = array("message" => $e->getMessage());
}

//Set the header, output & bye bye
header('Content-Type: application/json');
echo json_encode($data);
exit();