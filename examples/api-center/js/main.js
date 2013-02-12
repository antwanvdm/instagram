var currentApiCallLink = null;
var preLoader = null;

$(document).ready(init);

/**
 * Init the JS code
 */
function init() {
    preLoader = $("<span>");
    preLoader.addClass("preloader");

    $(".api-call a").on("click", formatApiData);
    geoLocationAskPermission();
}

/**
 * Format data for API Call
 *
 * @param event
 * @return {Boolean}
 */
function formatApiData(event) {
    $('.api-call .code').hide();
    currentApiCallLink = $(this);
    currentApiCallLink.after(preLoader);

    var replace = '';
    var params = {};

    //Loop through all the fields in this set & add data parameters
    currentApiCallLink.siblings('input').each(function () {
        var name = $(this).attr('name');
        if (name == 'replace') {
            replace = $(this).val();
        } else {
            params[name] = $(this).val();
        }
    });

    var method = currentApiCallLink.attr('rel');
    var arguments = JSON.stringify({
        replace:replace,
        params:params
    });

    //Do the actual apiCall & return false for default behavior
    apiCall(method, arguments);
    return false;
}

/**
 * Fetch Images with AJAX request
 */
function apiCall(method, arguments) {
    $.ajax({
        type:'GET',
        data:{
            method:method,
            arguments:arguments
        },
        contentType:'application/json',
        dataType:'json',
        url:'../../includes/services.php',
        success:apiCallSuccessHandler,
        error:apiCallErrorHandler
    });
}

/**
 * Success Handler for API call
 *
 * @param data
 */
function apiCallSuccessHandler(data) {
    var pre = $("<pre>");
    pre.text(dump(data));

    currentApiCallLink.siblings('.code').show().append(pre);
    currentApiCallLink.siblings('.preloader').remove();
}

/**
 * Error Handler for API call
 *
 * @param error
 */
function apiCallErrorHandler(error) {
    console.log(error);
}

/**
 * Ask user permission if GeoLocation functionality is available
 */
function geoLocationAskPermission() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoLocationHandler);
    }
}

/**
 * Handle geoLocation when permission is given (pre-fill Fields)
 *
 * @param data
 */
function geoLocationHandler(data) {
    $('#media-search-lat').val(data.coords.latitude);
    $('#media-search-lng').val(data.coords.longitude);
}

/**
 * Function like print_r in PHP to return a string representation of an Array/Object
 *
 * @param arr
 * @param level
 * @return {String}
 * @link http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr, level) {
    var dumped_text = "";
    if (!level) level = 0;

    //The padding given at the beginning of the line.
    var level_padding = "";
    for (var j = 0; j < level; j++) level_padding += "    ";

    if (typeof(arr) == 'object') { //Array/Hashes/Objects
        for (var item in arr) {
            var value = arr[item];

            if (typeof(value) == 'object') { //If it is an array,
                dumped_text += level_padding + item + ": {\n";
                dumped_text += dump(value, level + 1);
                dumped_text += level_padding + "}\n";
            } else {
                dumped_text += level_padding + item + ": \"" + value + "\"\n";
            }
        }
    } else { //Stings/Chars/Numbers etc.
        dumped_text = "===>" + arr + "<===(" + typeof(arr) + ")";
    }
    return dumped_text;
}