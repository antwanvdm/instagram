<?php
require_once "includes/initialize.php";
$code = "";

//Authorisation process
if (isset($_GET['code'])) {
	$code = $_GET['code'];
	if ($instagram->retrieveAccessToken($code) !== false) {
		$_SESSION['accessToken'] = $instagram->accessToken;
		header("Location: " . INSTAGRAM_HOME_URL);
		exit();
	}
} elseif (isset($_GET['error'])) {
	//Error
} else {
	$instagram->authorize();
}