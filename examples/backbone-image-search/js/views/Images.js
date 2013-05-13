var ImagesView = Backbone.View.extend({
    initialize: function (options) {
        this.el = options.el; //Should be removed?
        this.images = options.images;

        events.on('images:fetchSuccess', this.fetchImagesSuccessHandler, this);
        events.on('LoadMore:click', this.images.fetch, this);
        events.on('SearchTagForm:submit', this.images.empty, this);
        events.on('SearchTagForm:submit', this.images.fetch, this);
    },

    /**
     * Clear element
     */
    empty: function () {
        this.el.empty();
    },

    /**
     * Append data to HTML & retrieve more data if we're not done yet
     *
     * @param returnData
     * @see images.fetch
     */
    fetchImagesSuccessHandler: function (returnData) {
        if (returnData.data === undefined) {
            return;
        }

        //Loop through data & append images in wrapper div
        var instagramData = returnData.data;
        for (var i in instagramData) {
            var captionText = instagramData[i].caption !== null ? instagramData[i].caption.text : '';
            var images = instagramData[i].images;

            //Create template & add to gallery with colorbox options
            var imgDiv = this.imageTemplate(images.thumbnail.url, images.standard_resolution.url, captionText);
            var colorBoxImg = $(imgDiv).colorbox($.extend(colorboxOptions, {title: this.colorBoxTitle(instagramData[i])}));
            this.el.append(colorBoxImg);
        }

        //Set the ID so it can be used within the next AJAX call
        nextMaxTagId = returnData.pagination.next_max_tag_id;
    },
    /**
     * Format a string for the current instagramEntry, as a title for the colorBox popup
     *
     * @param instagramEntry
     * @return {String}
     */
    colorBoxTitle: function (instagramEntry) {
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
    },

    /**
     * Template for image div
     *
     * @param imageUrlThumb
     * @param imageUrlFull
     * @param caption
     * @return {String}
     */
    imageTemplate: function (imageUrlThumb, imageUrlFull, caption) {
        return "<img src='" + imageUrlThumb + "' href='" + imageUrlFull + "' alt='" + caption + "' title='" + caption + "' />";
    }
});