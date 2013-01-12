<?php
require_once "initialize.php";
$data = array();

//Switch on the given method
switch ($_GET['method']) {
	case 'getImagesbyTag':
		$instagram->accessToken = $_SESSION['accessToken'];
		$params = array("max_tag_id" => (isset($_GET['nextMaxTagId']) ? $_GET['nextMaxTagId'] : null));
		$entries = $instagram->recentMediaByTag("ajax", $params);

		$data['nextMaxTagId'] = $entries['pagination']['next_max_tag_id'];
		$data['data'] = $entries['data'];
		break;

	default:
		$data = array("error" => "no valid method");
		break;
}

echo json_encode($data);
exit();