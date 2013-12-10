define(function(require, exports, module) {

	var VideoListTemplate = require('tpl!templates/main_list/video_list.jst'),
		VideoListItemView = require('views/main_list/VideoListItem');

    /**
     * VideoList class - Composite view
     */
    return Backbone.Marionette.CompositeView.extend({
        tagName: 'ul',
        className: 'thumbnails',
        template: VideoListTemplate,
        itemView: VideoListItemView,
        //collection: Contacts,

        initialize: function(options) {
            options = options || {};
            if (!options.collection) {
                throw (new Error('VideoList View: collection option is required'));
            }
        }

    });

});