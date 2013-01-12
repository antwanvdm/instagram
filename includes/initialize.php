<?php
session_start();

$projectRoot = dirname(dirname(__FILE__));
require_once $projectRoot . "/includes/settings.php";
require_once $projectRoot . "/classes/InstagramApiMethodCallException.php";
require_once $projectRoot . "/classes/Instagram.php";

$instagram = new Instagram(INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET, INSTAGRAM_REDIRECT_URL);