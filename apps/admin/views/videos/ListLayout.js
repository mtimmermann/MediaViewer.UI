define(function(require, exports, module) {

	var ListLayoutTemplate = require('tpl!templates/videos/list_layout.jst');

    /**
     * ListLayout class - layout view
     */
    return Backbone.Marionette.Layout.extend({

        template: ListLayoutTemplate,

        regions: {
            paginatorTop: '#paginator-top',
            list: '#video-list',
            paginatorBottom: '#paginator-bottom'
        }
    });

});