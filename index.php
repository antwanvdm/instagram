<?php
session_start();
require_once "settings.php";
require_once "Instagram.php";

$instagram = new Instagram(INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET, INSTAGRAM_REDIRECT_URL);
$code = "";

if (isset($_SESSION['accessToken'])){
	$instagram->accessToken = $_SESSION['accessToken'];
	$instagram->search("ajax");
}else{
	if (isset($_GET['code'])){
		$code = $_GET['code'];
		if ($instagram->retrieveAccessToken($code) !== false){
			$_SESSION['accessToken'] = $instagram->accessToken;
			$instagram->search("ajax");
		}
	}elseif (isset($_GET['error'])){
		//Error
	}else{
		$instagram->authorize();
	}
}
?>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="">
    <script type="text/javascript" src=""></script>
</head>
<body>
<?php //echo $code; ?>
</body>
</html>