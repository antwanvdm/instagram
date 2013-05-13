var ErrorView = Backbone.View.extend({
    initialize: function () {
        events.on('images:fetchError', this.fetchImagesErrorHandler, this);
    },

    /**
     * Error handler
     *
     * @param response
     */
    fetchImagesErrorHandler: function (response) {
        console.log(response);
        var responseObject = JSON.parse(response.responseText);
        alert(responseObject.message);
    }
});