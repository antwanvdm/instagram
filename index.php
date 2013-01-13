<!DOCTYPE html>
<html>
<head>
    <title>Instagram</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="js/main.js"></script>
</head>
<body>
<div id="container">
    <div id="search">
        <form id="search-tag-form">
            <label for="tag">Enter a tag for Instagram search</label>
            <input type="text" name="tag" id="tag"/>
            <input type="submit" value="Load"/>
        </form>
    </div>
    <div id="images"></div>
    <div id="load-more">
        <a href="#"><span>Load More</span></a>
    </div>
</div>

<div id="login-overlay">
    <a href="login.php">If you want more functionality, please login!</a>
</div>

<div id="preloader"></div>
</body>
</html>