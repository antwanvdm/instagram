Instagram PHP/JS code (v1.0)
=========
Go the http://instagram.com/developer/ to register your Instagram application.

Create a settings.php file (in the includes folder) with the following constants, and add your parameters:

    define("INSTAGRAM_CLIENT_ID", "");
    define("INSTAGRAM_CLIENT_SECRET", "");
    define("INSTAGRAM_HOME_URL", "");
    define("INSTAGRAM_REDIRECT_URL", "");

##Requirements

* PHP Minimum 5.2.17
* Enable curl (PHP.ini: extension=php_curl.dll)
* Enable openssl (PHP.ini: extension=php_openssl.dll)

##Examples

There are a few examples included within this project. Take a look on the following URL's:

* Gallery with Colorbox: http://antwan.eu/instagram/examples/image-search/
* Google Maps slideshow: http://antwan.eu/instagram/examples/maps-images/