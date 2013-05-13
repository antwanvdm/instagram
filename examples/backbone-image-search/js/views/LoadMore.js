var LoadMoreView = Backbone.View.extend({
    initialize: function (options) {
        this.el = options.el; //Should be removed?
        this.$('.preloader').hide();
        this.el.on('click', this.click, this);

        events.on('images:fetchSuccess', this.fetchImagesSuccessHandler, this);
        events.on('images:fetchError', this.fetchImagesErrorHandler, this);
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
     * @param returnData
     */
    fetchImagesSuccessHandler: function (returnData) {
        if (returnData.data === undefined) {
            return;
        }

        this.toggle();
    },

    /**
     * Error handler for loading data
     */
    fetchImagesErrorHandler: function () {
        this.toggle();
        this.el.hide();
    },

    /**
     * Show preloader, hide 'load more' text
     */
    toggle: function () {
        this.el.fadeIn();
        this.$('span').toggle();
    }
});