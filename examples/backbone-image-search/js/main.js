var searchTag = '';
var nextMaxTagId = null;
var colorboxOptions = {
    rel: 'gallery',
    maxHeight: '100%',
    current: '{current} / {total}',
    fixed: true
};

var events = _.clone(Backbone.Events);

var InstagramModel = Backbone.Model.extend({
    url: '../../includes/services.php'
});

var Instagram = function () {
};

/**
 * Fetch Images with AJAX request
 */
Instagram.prototype.fetch = function () {
    var model = new InstagramModel();
    model.fetch(
        {
            data: {
                method: 'apiTagsMediaRecent',
                arguments: JSON.stringify({
                    replace: searchTag,
                    params: {
                        max_tag_id: nextMaxTagId
                    }
                })
            },
            success: function (model, data) {
                events.trigger('images:fetchSuccess', data)
            },
            error: function (model, data) {
                events.trigger('images:fetchError', data);
            }
        });
};

$(document).on('ready', init);

/**
 * Init the JS code
 */
function init() {
    var images = new Instagram();
    new SearchTagFormView({el: $('#search-tag-form')});
    new ImagesView({el: $('#images'), images: images});
    new LoadMoreView({el: $('#load-more')});
    new ErrorView();
}

//https://github.com/kjbekkelund/writings/blob/master/published/understanding-backbone.md#handling-several-models