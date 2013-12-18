define(function(require, exports, module) {

	var VideoListLayoutTemplate = require('tpl!templates/main_list/video_list_layout.jst');

    /**
     * VideoListLayout class - layout view
     */
    return Backbone.Marionette.Layout.extend({

        template: VideoListLayoutTemplate,
        tagName: 'div',
        //className: 'content-region-box',

        regions: {
            paginatorTop: '#paginator-top',
            search: '#video-search',
            //list: BaseClasses.RegionFadeIn.extend({ el: '#video-list' }),
            list: '#video-list',
            paginatorBottom: '#paginator-bottom'
        }
    });

});