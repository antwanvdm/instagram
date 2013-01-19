<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/api-center.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script type="text/javascript" src="js/api-center.js"></script>
</head>
<body>
<div id="container">
    <form>
        <div class="api-call">
            <label for="tags"></label>
            <input id="tags" name="replace" type="text"/>
            <a href="#" rel="apiTags">apiTags</a>
        </div>
        <div class="api-call">
            <label for="tags-media-recent"></label>
            <input id="tags-media-recent" name="replace" type="text"/>
            <a href="#" rel="apiTagsMediaRecent">apiTagsMediaRecent</a>
        </div>
        <div class="api-call">
            <label for="tags-search"></label>
            <input id="tags-search" name="q" type="text"/>
            <a href="#" rel="apiTagsSearch">apiTagsSearch</a>
        </div>
        <div class="api-call">
            <label for="media-search-lat"></label>
            <input id="media-search-lat" name="lat" type="text"/>
            <label for="media-search-lon"></label>
            <input id="media-search-lon" name="lon" type="text"/>
            <a href="#" rel="apiMediaSearch">apiMediaSearch</a>
        </div>
        <div class="api-call">
            <a href="#" rel="apiMediaPopular">apiMediaPopular</a>
        </div>
		<?php if (isset($_SESSION['user'])) { ?>
        <div><a href="#" rel="apiUsers"></a></div>
        <div><a href="#" rel="apiUsersSelfFeed"></a></div>
        <div><a href="#" rel="apiUsersMediaRecent"></a></div>
        <div><a href="#" rel="apiUsersSelfMediaLiked"></a></div>
        <div><a href="#" rel="apiUsersSearch"></a></div>
		<?php } ?>
    </form>
</div>

<div id="login-overlay">
    <a href="login.php">If you want more functionality, please login!</a>
</div>
</body>
</html>
