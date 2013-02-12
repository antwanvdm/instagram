var searchTag = '';
var nextMaxTagId = null;
var colorboxOptions = {
    rel:'gallery',
    maxHeight:'100%',
    current:'{current} / {total}',
    fixed:true
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
        url:'../../includes/services.php',
        success:fetchImagesSuccessHandler,
        error:fetchImagesErrorHandler
    });
}

/**
 * Append data to HTML & retrieve more data if we're not done yet
 *
 * @param returnData
 * @see fetchImages()
 */
function fetchImagesSuccessHandler(returnData) {
    if (returnData.data === undefined) {
        return;
    }

    //Loop through data & append images in wrapper div
    var instagramData = returnData.data;
    for (var i in instagramData) {
        var captionText = instagramData[i].caption !== null ? instagramData[i].caption.text : '';
        var images = instagramData[i].images;

        //Create template & add to gallery with colorbox options
        var imgDiv = imageTemplate(images.thumbnail.url, images.standard_resolution.url, captionText);
        var colorBoxImg = $(imgDiv).colorbox($.extend(colorboxOptions, {title:colorBoxTitle(instagramData[i])}));
        $('#images').append(colorBoxImg);
    }

    //Set the ID so it can be used within the next AJAX call
    nextMaxTagId = returnData.pagination.next_max_tag_id;

    togglePreloader();
}

/**
 * Format a string for the current instagramEntry, as a title for the colorBox popup
 *
 * @param instagramEntry
 * @return {String}
 */
function colorBoxTitle(instagramEntry) {
    //Get likes & username to create colorBox title
    var totalLikes = instagramEntry.likes.count;
    var username = instagramEntry.user.username;
    var fullNameTitle = 'Visit profile of ' + instagramEntry.user.full_name;
    var colorBoxTitle = totalLikes + ' &hearts; | <a title="' + fullNameTitle + '" href="http://instagram.com/' + username + '" target="_blank">@' + username + '</a>';

    //Add location linkmarker to colorBox title if any lat/lng are available
    var location = instagramEntry.location;
    if (location !== null && location.latitude && location.longitude) {
        var googleMapsLink = 'http://maps.google.com/maps?q=' + location.latitude + ',+' + location.longitude;
        var locationName = $.trim('Find ' + (location.name ? location.name : '')) + ' on Google Maps';
        colorBoxTitle += ' | <a title="' + locationName + '" class="location" href="' + googleMapsLink + '" target="_blank"></a>';
    }

    return colorBoxTitle;
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
 * @param response
 * @see fetchImages()
 */
function fetchImagesErrorHandler(response) {
    togglePreloader();
    $('#load-more').hide();

    var responseObject = JSON.parse(response.responseText);
    alert(responseObject.message);
}

/**
 * Show preloader, hide 'load more' text
 */
function togglePreloader() {
    $('#load-more span').toggle();
}