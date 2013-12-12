define(function(require, exports, module) {

	var ListTemplate = require('tpl!templates/videos/list.jst'),
		ListItemView = require('views/videos/ListItem');

    /**
     * List class - Composite view
     */
    return Backbone.Marionette.CompositeView.extend({
        tagName: 'div',
        className: 'datagrid',
        template: ListTemplate,
        itemView: ListItemView,

        initialize: function(options) {
            options = options || {};
            if (!options.collection) {
                throw (new Error('List View: collection option is required'));
            }
        },

        appendHtml: function(collectionView, itemView) {
            collectionView.$('tbody').append(itemView.el);
        }

    });

});