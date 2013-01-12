<?php
session_start();
require_once "settings.php";
require_once "classes/Instagram.php";

$instagram = new Instagram(INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET, INSTAGRAM_REDIRECT_URL);
$code = "";

//Check for valid accessToken, else navigate through authorisation process
if (isset($_SESSION['accessToken'])) {
	$instagram->accessToken = $_SESSION['accessToken'];
	$entries = $instagram->recentMediaByTag("ajax");
} else {
	if (isset($_GET['code'])) {
		$code = $_GET['code'];
		if ($instagram->retrieveAccessToken($code) !== false) {
			$_SESSION['accessToken'] = $instagram->accessToken;
			header(INSTAGRAM_REDIRECT_URL);
			exit();
		}
	} elseif (isset($_GET['error'])) {
		//Error
	} else {
		$instagram->authorize();
	}
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Instagram</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script>var nextMaxTagId = <?php echo $entries['pagination']['next_max_tag_id']; ?>;</script>
    <script src="js/main.js"></script>
</head>
<body>
<div class="images">
	<?php
	foreach ($entries['data'] as $data) {
		$imageUrl = $data['images']['thumbnail']['url'];
		$altText = $data['caption']['text'];
		echo "<div class='image'><img src='$imageUrl' alt='$altText' /></div>";
	}
	?>
</div>
</body>
</html>