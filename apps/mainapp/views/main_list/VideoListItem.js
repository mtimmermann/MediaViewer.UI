define(function(require, exports, module) {

	var VideoListItemTemplate = require('tpl!templates/main_list/video_list_item.jst');

    /**
     * VideoListItem class - Item view
     */
    //return Backbone.Marionette.ItemView.extend({
    return BaseClasses.ItemViewFadeIn.extend({
        tagName: 'li',
        className: 'thumbnail-container',
        template: VideoListItemTemplate
    });

});