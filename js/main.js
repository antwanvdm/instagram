var totalImages = 0;
var maxImages = 100;

$(document).ready(init);

/**
 * Init the JS code
 */
function init(){
    totalImages = $('.image').size();
    fetchMoreImages(nextMaxTagId);
}

/**
 * Fetch Images with AJAX request
 *
 * @param nextMaxTagId
 */
function fetchMoreImages(nextMaxTagId) {
    $.ajax({
        type:'GET',
        data: {
            method: 'getImagesbyTag',
            nextMaxTagId: nextMaxTagId
        },
        contentType:'application/json',
        dataType:'json',
        url:'includes/services.php',
        success:fetchMoreImagesSuccessHandler,
        error:fetchMoreImagesErrorHandler
    });
}

/**
 * Append data to HTML & retrieve more data if we're not done yet
 *
 * @param data
 * @see fetchMoreImages()
 */
function fetchMoreImagesSuccessHandler(data){
    var instagramData = data.data;
    for(var i in instagramData){
        var imgDiv = imageTemplate(instagramData[i].images.thumbnail.url, instagramData[i].caption.text);
        $('.images').append(imgDiv);
    }

    totalImages += instagramData.length;
    if (totalImages < maxImages){
        fetchMoreImages(data.nextMaxTagId);
    }
}

/**
 * @param error
 * @see fetchMoreImages()
 */
function fetchMoreImagesErrorHandler(error){
    console.log("something went wrong.", error);
}

/**
 * Template for image div
 *
 * @param imageUrl
 * @param altText
 * @return {String}
 */
function imageTemplate(imageUrl, altText) {
    return "<div class='image'>" +
        "<img src='" + imageUrl + "' alt='" + altText + "' title='" + altText + "' />" +
    "</div>";
}