var ErrorView = Backbone.View.extend({
    /**
     * Init view with Backbone magic
     */
    initialize: function () {
        events.on('Images:fetchError', this.fetchImagesErrorHandler, this);
    },

    /**
     * Error handler
     *
     * @param model
     * @param response
     * @param options
     */
    fetchImagesErrorHandler: function (model, response, options) {
        var responseObject = JSON.parse(response.responseText);
        alert(responseObject.message);
    }
});