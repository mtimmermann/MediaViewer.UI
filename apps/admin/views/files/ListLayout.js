define(function(require, exports, module) {

	var ListLayoutTemplate = require('tpl!templates/files/list_layout.jst');

    /**
     * ListLayout class - layout view
     */
    return Backbone.Marionette.Layout.extend({

        template: ListLayoutTemplate,

        regions: {
            paginatorTop: '#paginator-top',
            list: '#file-list',
            paginatorBottom: '#paginator-bottom'
        }
    });

});