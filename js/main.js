var searchTag = '';
var nextMaxTagId = null;
var colorboxOptions = {
    rel:'gallery',
    maxHeight:'100%',
    current:'{current} / {total}'
};

$(document).ready(init);

/**
 * Init the JS code
 */
function init() {
    $('.preloader').hide();
    $('#search-tag-form').on('submit', tagSearchHandler);
    $('#load-more').on('click', loadMoreHandler);
}

/**
 * Handler for form submit for searching a tag
 *
 * @return {Boolean}
 */
function tagSearchHandler() {
    //Set vars for searching
    searchTag = $('#tag').val();
    nextMaxTagId = null;

    //Remove all current images & fade Load more button in
    $('#images').empty();
    $('#load-more').fadeIn();

    //Fetch images & prevent default behavior
    togglePreloader();
    fetchImages();
    return false;
}

/**
 * Handler for clicking the 'load more' button
 *
 * @return {Boolean}
 */
function loadMoreHandler() {
    togglePreloader();
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
            arguments:JSON.stringify({
                replace:searchTag,
                params:{
                    max_tag_id:nextMaxTagId
                }
            })
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
        var images = instagramData[i].images;
        var totalLikes = instagramData[i].likes.count;

        var imgDiv = imageTemplate(images.thumbnail.url, images.standard_resolution.url, captionText);
//        var colorboxHTML = colorboxTemplate(images.standard_resolution.url, captionText, totalLikes);

        var colorBoxImg = $(imgDiv).colorbox($.extend(colorboxOptions, {title:totalLikes + ' &hearts;'}));
        $('#images').append(colorBoxImg);
    }

    //Set the ID so it can be used within the next AJAX call
    nextMaxTagId = data.pagination.next_max_tag_id;

    togglePreloader();
}

/**
 * @param response
 * @see fetchImages()
 */
function fetchImagesErrorHandler(response) {
    var responseObject = JSON.parse(response.responseText);
    alert(responseObject.message);
}

/**
 * Template for image div
 *
 * @param imageUrlThumb
 * @param imageUrlFull
 * @param caption
 * @return {String}
 */
function imageTemplate(imageUrlThumb, imageUrlFull, caption) {
    return "<img src='" + imageUrlThumb + "' href='" + imageUrlFull + "' alt='" + caption + "' title='" + caption + "' />";
}

/**
 * @todo Implement?
 * @param imageUrl
 * @param caption
 * @param totalLikes
 * @return {String}
 */
function colorboxTemplate(imageUrl, caption, totalLikes) {
    return "<div>" +
        "<div><img src='" + imageUrl + "' alt='" + caption + "' title='" + caption + "' /></div>" +
        "<div><span>" + totalLikes + "&hearts;</span></div>" +
        "</div>";
}

/**
 * Show preloader, hide 'load more' text
 */
function togglePreloader() {
    $('#load-more span').toggle();
}