<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Instagram | API Center</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/api-center.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script type="text/javascript" src="js/api-center.js"></script>
</head>
<body>
<div id="container">
    <form>
        <fieldset class="api-call">
            <legend>apiTags</legend>
            <label for="tags"></label>
            <input id="tags" placeholder="Enter tagname" name="replace" type="text"/>
            <a href="#" rel="apiTags">apiTags</a>
			<div class="code"></div>
        </fieldset>
        <fieldset class="api-call">
            <legend>apiTagsMediaRecent</legend>
            <label for="tags-media-recent"></label>
            <input id="tags-media-recent" placeholder="Enter tagname" name="replace" type="text"/>
            <a href="#" rel="apiTagsMediaRecent">apiTagsMediaRecent</a>
            <div class="code"></div>
        </fieldset>
        <fieldset class="api-call">
            <legend>apiTagsSearch</legend>
            <label for="tags-search"></label>
            <input id="tags-search" placeholder="Enter tagname" name="q" type="text"/>
            <a href="#" rel="apiTagsSearch">apiTagsSearch</a>
            <div class="code"></div>
        </fieldset>
        <fieldset class="api-call">
            <legend>apiMediaSearch</legend>
            <label for="media-search-lat"></label>
            <input id="media-search-lat" placeholder="Enter latitude" name="lat" type="text"/>
            <label for="media-search-lng"></label>
            <input id="media-search-lng" placeholder="Enter longitude" name="lng" type="text"/>
            <a href="#" rel="apiMediaSearch">apiMediaSearch</a>
            <div class="code"></div>
        </fieldset>
        <fieldset class="api-call">
            <legend>apiMediaPopular</legend>
            <a href="#" rel="apiMediaPopular">apiMediaPopular</a>
            <div class="code"></div>
        </fieldset>
		<?php if (isset($_SESSION['user'])) { ?>
        <fieldset class="api-call">
            <legend>apiUsers</legend>
            <label for="users"></label>
            <input id="users" placeholder="Enter user ID" name="replace" value="<?php print $_SESSION['user']['id']; ?>" type="text"/>
            <a href="#" rel="apiUsers">apiUsers</a>
            <div class="code"></div>
        </fieldset>
        <fieldset class="api-call">
            <legend>apiUsersSelfFeed</legend>
            <label for="users-self-feed"></label>
            <input id="users-self-feed" placeholder="Enter count to return" name="count" type="text"/>
            <a href="#" rel="apiUsersSelfFeed">apiUsersSelfFeed</a>
            <div class="code"></div>
        </fieldset>
        <fieldset class="api-call">
            <legend>apiUsersMediaRecent</legend>
            <label for="users-media-recent-replace"></label>
            <input id="users-media-recent-replace" placeholder="Enter user ID" name="replace" value="<?php print $_SESSION['user']['id']; ?>" type="text"/>
            <label for="users-media-recent-count"></label>
            <input id="users-media-recent-count" placeholder="Enter count to return" name="count" type="text"/>
            <a href="#" rel="apiUsersMediaRecent">apiUsersMediaRecent</a>
            <div class="code"></div>
        </fieldset>
        <fieldset class="api-call">
            <legend>apiUsersSelfMediaLiked</legend>
            <label for="users-self-media-liked"></label>
            <input id="users-self-media-liked" placeholder="Enter count to return" name="count" type="text"/>
            <a href="#" rel="apiUsersSelfMediaLiked">apiUsersSelfMediaLiked</a>
            <div class="code"></div>
        </fieldset>
        <fieldset class="api-call">
            <legend>apiUsersSearch</legend>
            <label for="users-search"></label>
            <input id="users-search" placeholder="Enter a name" name="q" type="text"/>
            <a href="#" rel="apiUsersSearch">apiUsersSearch</a>
            <div class="code"></div>
        </fieldset>
		<?php } ?>
    </form>
</div>

<div id="login-overlay">
    <a href="login.php">If you want to test user specific API calls, please login!</a>
</div>
</body>
</html>