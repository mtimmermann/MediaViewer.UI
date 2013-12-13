define(function(require, exports, module) {

	var VideoListItemTemplate = require('tpl!templates/main_list/video_list_item.jst');

    /**
     * VideoListItem class - Item view
     *
     * Extends the BaseClasses.View.ItemFadeIn class, which
     * extends the the Marionette.ItemView class.
     */
    return BaseClasses.View.ItemFadeIn.extend({
        tagName: 'li',
        className: 'thumbnail-container',
        template: VideoListItemTemplate
    });

});