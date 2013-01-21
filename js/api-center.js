var currentApiCallFieldset = null;

$(document).ready(init);

/**
 * Init the JS code
 */
function init() {
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
    currentApiCallFieldset = $(this);
    var replace = '';
    var params = {};

    //Loop through all the fields in this set & add data parameters
    currentApiCallFieldset.siblings('input').each(function () {
        var name = $(this).attr('name');
        if (name == 'replace') {
            replace = $(this).val();
        } else {
            params[name] = $(this).val();
        }
    });

    var method = currentApiCallFieldset.attr('rel');
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
        url:'includes/services.php',
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
    currentApiCallFieldset.siblings('.code').show().append(pre);
    console.log(data);
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
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr, level) {
    var dumped_text = "";
    if (!level) level = 0;

    //The padding given at the beginning of the line.
    var level_padding = "";
    for (var j = 0; j < level + 1; j++) level_padding += "    ";

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