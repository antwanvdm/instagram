<?php
session_start();
require_once "settings.php";
require_once "classes/Instagram.php";

$instagram = new Instagram(INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET, INSTAGRAM_REDIRECT_URL);
$data = array();

//Switch on the given method
switch($_GET['method']){
	case 'getImagesbyTag':
		$instagram->accessToken = $_SESSION['accessToken'];
		$entries = $instagram->recentMediaByTag("ajax", (isset($_GET['nextMaxTagId']) ? $_GET['nextMaxTagId'] : null));
		$data['nextMaxTagId'] = $entries['pagination']['next_max_tag_id'];
		$data['data'] = $entries['data'];
		break;

	default:
		$data = array("error" => "no valid method");
		break;
}

echo json_encode($data);
exit();