var events = _.clone(Backbone.Events);
$(document).on('ready', init);

/**
 * Init the JS code
 */
function init() {
    var instagramModel = new InstagramModel();
    new SearchTagFormView({el: $('#search-tag-form')});
    new ImagesView({el: $('#images'), model: instagramModel});
    new LoadMoreView({el: $('#load-more')});
    new ErrorView();
}