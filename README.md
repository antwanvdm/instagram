Instagram PHP/JS code (v0.4)
=========
Go the http://instagram.com/developer/ to register your Instagram application.

Create a settings.php file (in the includes folder) with the following constants, and add your parameters:

    define("INSTAGRAM_CLIENT_ID", "");
    define("INSTAGRAM_CLIENT_SECRET", "");
    define("INSTAGRAM_HOME_URL", "");
    define("INSTAGRAM_REDIRECT_URL", "");

##Requirements

* PHP 5.3
* Enable curl (PHP.ini: extension=php_curl.dll)
* Enable openssl (PHP.ini: extension=php_openssl.dll)
* jQuery 1.8.3 (included from googleapis.com)
* Colorbox 1.3.29 (downloaded from http://www.jacklmoore.com/colorbox)