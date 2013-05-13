var SearchTagFormView = Backbone.View.extend({
    initialize: function (options) {
        this.el = options.el; //Should be removed?
        this.el.on('submit', _.bind(this.submitHandler, this));
    },

    /**
     * Handler for form submit for searching a tag
     *
     * @return {Boolean}
     */
    submitHandler: function (e) {
        e.preventDefault();

        //Set vars for searching
        searchTag = $('#tag').val();
        nextMaxTagId = null;

        //Fetch images & prevent default behavior
        events.trigger('SearchTagForm:submit');
    }
});