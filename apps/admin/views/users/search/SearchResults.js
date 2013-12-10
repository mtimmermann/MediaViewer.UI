define(function(require, exports, module) {

    var SearchResultsTemplate = require('tpl!templates/users/search/search_results.jst'),
        SearchResultItemView = require('views/users/search/SearchResultItem');

    /**
     * SearchResults class - view
     */
    // Note, not taking advantage of the Marionette Composite view,
    //  using a layout with one region would have been slight overkill.
    //return Backbone.Marionette.CompositeView.extend({
    return Backbone.View.extend({
        tagName: 'ul',

        attributes: {
            'class': 'dropdown-menu'
        },

        initialize: function(options) {
            options = options || {};
            if (!options.collection) {
                throw (new Error('SearchResults View: collection option is required'));
            }

            this.collection.on("reset", this.render, this);
            // this.collection.on("add", function (contact) {
            //     self.$el.append(new SearchResultItemView({model:contact}).render().el);
            // });
        },

        render: function() {
            this.$el.empty();
            _.each(this.collection.models, function (model) {
                this.$el.append(new SearchResultItemView({model:model}).render().el);
            }, this);
            return this;
        }
    });

});