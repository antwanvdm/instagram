//Map vars
var map;
var mapOptions = {
    zoom:3,
    minZoom:3,
    center:new google.maps.LatLng(52.1374, 5.3284),
    mapTypeId:google.maps.MapTypeId.TERRAIN
};
var markers = [];

//Geocoder vars
var geocoder = new google.maps.Geocoder();
var cities = ["Amsterdam", "Bergen op Zoom", "Paris", "New York", "Sydney", "Berlin", "Cairo", "Mexico City", "Tokyo"];

//InfoWindow vars
var infoWindow;
var infoWindowOptions = {
    pixelOffset:new google.maps.Size(-75, -180),
    boxStyle:{
        width:"150px",
        height:"150px"
    },
    closeBoxMargin:"0px 0px -20px 0px"
}

//Intervals
var geocodeInterval = null;
var focusMarkersInterval = null;

$(document).ready(init);

/**
 * Initialize Application
 */
function init() {
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    getLatLngForCity();

    geocodeInterval = setInterval(getLatLngForCity, 10000);
    focusMarkersInterval = setInterval(focusToMarker, 5000);

    $("#slideshow").on('click', focusMarkersSlideshowToggle);
}

/**
 * Create a marker for the map
 *
 * @param data
 * @return {google.maps.Marker}
 */
function createDataMarker(data) {
    var latLngPosition = new google.maps.LatLng(data.location.latitude, data.location.longitude);

    //Create marker with custom assets
    var marker = new google.maps.Marker({
        position:latLngPosition,
        title:data.caption !== null ? data.caption.text : '',
        map:map
    });

    //Add click event for markers to add overlay
    google.maps.event.addListener(marker, 'click', $.proxy(openMarkerInfo, this, marker, data));

    return marker;
};

/**
 * Open the info window (& close others)
 *
 * @param marker
 * @param data
 */
function openMarkerInfo(marker, data) {
    if (infoWindow) {
        infoWindow.close();
    }

    //Create infoBox with configured options
    infoWindow = new InfoBox();
    infoWindow.setOptions(infoWindowOptions);

    var markerTemplate = markerWindowTemplate(data);
    infoWindow.setContent(markerTemplate);

    //Open window and bind event when dom is ready loading the infoWindow
    infoWindow.open(map, marker);
};

/**
 * HTML template for infoWindow
 *
 * @param data
 * @return {String}
 * @see openMarkerInfo
 */
function markerWindowTemplate(data) {
    return '<img src="' + data.images.thumbnail.url + '" alt=""/>';
};

/**
 * Fetch Images with AJAX request
 *
 * @param lat
 * @param lng
 */
function fetchImages(lat, lng) {
    $.ajax({
        type:'GET',
        data:{
            method:'apiMediaSearch',
            arguments:JSON.stringify({
                replace:'',
                params:{
                    lat:lat,
                    lng:lng,
                    distance:5000
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
 * @see fetchImages
 */
function fetchImagesSuccessHandler(returnData) {
    if (returnData.data === undefined) {
        return;
    }

    var instagramData = returnData.data;
    for (var i in instagramData) {
        markers.push(createDataMarker(instagramData[i]));
    }
}

/**
 * @todo if fails, return city back into array for another try (API has some weird timeouts.
 * @param response
 * @see fetchImages
 */
function fetchImagesErrorHandler(response) {
    var responseObject = JSON.parse(response.responseText);
    console.log(responseObject);
}

/**
 * Get the lat/long for a city, when all cities are done: clearInterval
 */
function getLatLngForCity() {
    if (cities.length > 0) {
        //Get a random city
        randomArrayNumber = Math.floor(Math.random() * cities.length);
        var city = cities[randomArrayNumber];

        //Remove city from array & get geoInformation
        cities.splice(randomArrayNumber, 1);
        geocoder.geocode({'address':city }, geocodeHandler);
    } else {
        clearInterval(geocodeInterval);
    }
}

/**
 * Handler for the google maps geocode request
 *
 * @param data
 * @param status
 * @see getLatLngForCity
 */
function geocodeHandler(data, status) {
    //If something in the call failed, return.
    if (status != google.maps.GeocoderStatus.OK) {
        return;
    }

    //Fetch images with returned lat/long data
    fetchImages(data[0].geometry.location.lat(), data[0].geometry.location.lng());
}

/**
 * Focus to a random marker & open the infoWindow
 */
function focusToMarker() {
    if (markers.length == 0) {
        return;
    }

    map.setZoom(14);
    randomArrayNumber = Math.floor(Math.random() * markers.length);
    google.maps.event.trigger(markers[randomArrayNumber], 'click');
}

/**
 * Toggle the slideshow by setting the interval on/off
 * @see focusToMarker
 */
function focusMarkersSlideshowToggle() {
    $("#slideshow").attr("checked", !$("#slideshow").attr("checked"));

    if (focusMarkersInterval === null) {
        focusMarkersInterval = setInterval(focusToMarker, 5000);
    } else {
        clearInterval(focusMarkersInterval);
        focusMarkersInterval = null;
    }
}