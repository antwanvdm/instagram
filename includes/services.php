<?php
require_once "initialize.php";
$instagram->accessToken = isset($_SESSION['accessToken']) ? $_SESSION['accessToken'] : null;
$data = array();

//Switch on the given method
switch ($_GET['method']) {
	case 'apiTagsMediaRecent':
		$params = array("max_tag_id" => (isset($_GET['nextMaxTagId']) ? $_GET['nextMaxTagId'] : null));
		$tag = isset($_GET['tag']) ? $_GET['tag'] : '';
		$entries = $instagram->apiTagsMediaRecent($tag, $params);

		$data['nextMaxTagId'] = $entries['pagination']['next_max_tag_id'];
		$data['data'] = $entries['data'];
		break;

	default:
		$data = array("error" => "no valid method");
		break;
}

echo json_encode($data);
exit();