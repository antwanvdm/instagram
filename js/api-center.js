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
    var replace = '';
    var params = {};

    //Loop through all the fields in this set & add data parameters
    $(event.currentTarget).siblings('input').each(function () {
        var name = $(this).attr('name');
        if (name == 'replace') {
            replace = $(this).val();
        } else {
            params[name] = $(this).val();
        }
    });

    var method = $(event.currentTarget).attr('rel');
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
function geoLocationAskPermission(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geoLocationHandler);
    }
}

/**
 * Handle geoLocation when permission is given (pre-fill Fields)
 *
 * @param data
 */
function geoLocationHandler(data){
    $('#media-search-lat').val(data.coords.latitude);
    $('#media-search-lng').val(data.coords.longitude);
}