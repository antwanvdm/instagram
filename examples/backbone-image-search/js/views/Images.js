var ImagesView = Backbone.View.extend({
    searchTag: '',
    nextMaxTagId: null,
    colorboxOptions: {
        rel: 'gallery',
        maxHeight: '100%',
        current: '{current} / {total}',
        fixed: true
    },

    /**
     * Init view with Backbone magic
     */
    initialize: function () {
        events.on('LoadMore:click', this.fetchImages, this);
        events.on('SearchTagForm:submit', this.empty, this);
        events.on('SearchTagForm:submit', this.fetchImages, this);
    },

    /**
     * Clear element & nextMaxTagId for next search
     *
     * @see ImagesView.initialize
     */
    empty: function () {
        this.$el.empty();
        this.nextMaxTagId = null;
    },

    /**
     * Fetch images from model
     *
     * @see ImagesView.initialize
     */
    fetchImages: function (searchTag) {
        this.searchTag = _.isUndefined(searchTag) ? this.searchTag : searchTag;
        this.model.fetch({
            data: {
                method: 'apiTagsMediaRecent',
                arguments: JSON.stringify({
                    replace: this.searchTag,
                    params: {
                        max_tag_id: this.nextMaxTagId
                    }
                })
            },
            success: _.bind(this.fetchImagesSuccessHandler, this),
            error: _.bind(this.fetchImagesErrorHandler, this)
        });
    },

    /**
     * Append data to HTML & retrieve more data if we're not done yet
     *
     * @param model
     * @param response
     * @param options
     * @see ImagesView.fetchImages
     */
    fetchImagesSuccessHandler: function (model, response, options) {
        this.model.clear();
        events.trigger('Images:fetchSuccess', model, response, options);
        if (response.data === undefined) {
            return;
        }

        //Loop through data & append images in wrapper div
        var instagramData = response.data;
        for (var i in instagramData) {
            var captionText = instagramData[i].caption !== null ? instagramData[i].caption.text : '';
            var images = instagramData[i].images;

            //Create template & add to gallery with colorbox options
            var imgDiv = this.imageTemplate(images.thumbnail.url, images.standard_resolution.url, captionText);
            var colorBoxImg = $(imgDiv).colorbox($.extend(this.colorboxOptions, {title: this.colorBoxTitle(instagramData[i])}));
            this.$el.append(colorBoxImg);
        }

        //Set the ID so it can be used within the next AJAX call
        this.nextMaxTagId = response.pagination.next_max_tag_id;
    },

    /**
     * Error handler for fetching images
     *
     * @param model
     * @param response
     * @param options
     * @see ImagesView.fetchImages
     */
    fetchImagesErrorHandler: function (model, response, options) {
        events.trigger('Images:fetchError', model, response, options);
    },

    /**
     * Format a string for the current instagramEntry, as a title for the colorBox popup
     *
     * @param instagramEntry
     * @return {String}
     * @see ImagesView.fetchImagesSuccessHandler
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
     * @see ImagesView.fetchImagesSuccessHandler
     */
    imageTemplate: function (imageUrlThumb, imageUrlFull, caption) {
        return "<img src='" + imageUrlThumb + "' href='" + imageUrlFull + "' alt='" + caption + "' title='" + caption + "' />";
    }
});