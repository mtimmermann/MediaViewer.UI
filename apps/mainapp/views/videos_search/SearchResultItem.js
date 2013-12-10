define(function(require, exports, module) {

    var SearchResultItemTemplate = require('tpl!templates/videos_search/search_result_item.jst');

    /**
     * SearchResultItem class - Item view
     */
    return Backbone.Marionette.ItemView.extend({
        tagName: 'li',

        initialize: function(options) {
            options = options || {};
            if (!options.model) {
                throw (new Error('SearchResultItem View: model option is required'));
            }
            this.model = options.model;
        },

        render: function() {
            this.$el.html(SearchResultItemTemplate(this.model.attributes));
            return this;
        }
    });

});