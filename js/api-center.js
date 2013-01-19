$(document).ready(init);

/**
 * Init the JS code
 */
function init() {
    $(".api-call a").on("click", formatApiData);
}

function formatApiData(event) {
    var params = {};
    var replace = '';

    $(event.currentTarget).siblings('input').each(function(){
        var name = $(this).attr('name');
        if (name == 'replace'){
            replace = $(this).val();
        }else{
            params[name] = $(this).val();
        }
    });

    var method = $(event.currentTarget).attr('rel');
    var arguments = JSON.stringify({
        replace:replace,
        params:params
    });

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

function apiCallSuccessHandler(data) {
    console.log(data);
}

function apiCallErrorHandler(error) {
    console.log(error);
}