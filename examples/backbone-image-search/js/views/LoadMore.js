var LoadMoreView = Backbone.View.extend({
    /**
     * Init view with Backbone magic
     */
    initialize: function () {
        this.$('.preloader').hide();
        this.$el.on('click', _.bind(this.click, this));

        events.on('Images:fetchSuccess', this.fetchImagesSuccessHandler, this);
        events.on('Images:fetchError', this.toggle, this);
        events.on('SearchTagForm:submit', this.toggle, this);
    },

    /**
     * Handler for clicking the 'load more' button
     *
     * @param e
     * @return {Boolean}
     */
    click: function (e) {
        e.preventDefault();
        this.toggle();
        events.trigger('LoadMore:click');
    },

    /**
     * Success handler for loading data
     *
     * @param model
     * @param response
     * @param options
     */
    fetchImagesSuccessHandler: function (model, response, options) {
        if (response.data === undefined) {
            return;
        }

        this.toggle();
    },

    /**
     * Show preloader, hide 'load more' text
     */
    toggle: function () {
        this.$el.fadeIn();
        this.$('span').toggle();
    }
});