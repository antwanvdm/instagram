var SearchTagFormView = Backbone.View.extend({
    /**
     * Init view with Backbone magic
     */
    initialize: function () {
        this.$el.on('submit', _.bind(this.submitHandler, this));
    },

    /**
     * Handler for form submit for searching a tag
     *
     * @param e
     * @return {Boolean}
     * @see SearchTagFormView.initialize
     */
    submitHandler: function (e) {
        e.preventDefault();

        //Trigger event for outside world
        events.trigger('SearchTagForm:submit', this.$('#tag').val());
    }
});