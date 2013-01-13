var searchTag = '';
var nextMaxTagId = null;

$(document).ready(init);

/**
 * Init the JS code
 */
function init() {
    $('#search-tag-form').on('submit', tagSearchHandler);
    $('#load-more').on('click', loadMoreHandler);
}

/**
 * Handler for form submit for searching a tag
 *
 * @return {Boolean}
 */
function tagSearchHandler() {
    searchTag = $('#tag').val();
    $('#images').empty();
    $('#load-more').fadeIn();
    fetchImages();

    return false;
}

/**
 * Handler for clicking the 'load more' button
 *
 * @return {Boolean}
 */
function loadMoreHandler() {
    fetchImages();
    return false;
}

/**
 * Fetch Images with AJAX request
 */
function fetchImages() {
    $.ajax({
        type:'GET',
        data:{
            method:'apiTagsMediaRecent',
            tag:searchTag,
            nextMaxTagId:nextMaxTagId
        },
        contentType:'application/json',
        dataType:'json',
        url:'includes/services.php',
        success:fetchImagesSuccessHandler,
        error:fetchImagesErrorHandler
    });
}

/**
 * Append data to HTML & retrieve more data if we're not done yet
 *
 * @param data
 * @see fetchImages()
 */
function fetchImagesSuccessHandler(data) {
    if (data.data === undefined) {
        return;
    }

    //Loop through data & append images in wrapper div
    var instagramData = data.data;
    for (var i in instagramData) {
        var captionText = instagramData[i].caption !== null ? instagramData[i].caption.text : '';
        var imgDiv = imageTemplate(instagramData[i].images.thumbnail.url, captionText);
        $('#images').append(imgDiv);
    }

    //Set the ID so it can be used within the next AJAX call
    nextMaxTagId = data.nextMaxTagId;
}

/**
 * @param error
 * @see fetchImages()
 */
function fetchImagesErrorHandler(error) {
    console.log("something went wrong.", error);
}

/**
 * Template for image div
 *
 * @param imageUrl
 * @param captionText
 * @return {String}
 */
function imageTemplate(imageUrl, captionText) {
    return "<img src='" + imageUrl + "' alt='" + captionText + "' title='" + captionText + "' />";
}