define(function(require, exports, module) {

	var ListLayoutTemplate = require('tpl!templates/users/list/list_layout.jst');

    /**
     * ListLayout class - layout view
     */
    return Backbone.Marionette.Layout.extend({

        template: ListLayoutTemplate,

        regions: {
            paginatorTop: '#paginator-top',
            search: '#user-search',
            list: '#user-list',
            paginatorBottom: '#paginator-bottom'
        }
    });

});