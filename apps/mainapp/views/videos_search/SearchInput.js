define(function(require, exports, module) {

    var SearchInputTemplate = require('tpl!templates/videos_search/search_input.jst'),
        Videos = require('collections/Videos'),
        SearchResultsView = require('views/videos_search/SearchResults');

    /**
     * SearchInput class - Item view
     */
    return Backbone.Marionette.ItemView.extend({

        //template: SearchInputTemplate,

        events: {
            'keyup [data-model-search="input"]': 'search',
            'keypress [data-model-search="input"]': 'onkeypress'
        },

        initialize: function(/*model,options*/) {
            this.searchResults = new Videos();

            this.searchResultsView = new SearchResultsView({ 'collection': this.searchResults });

            this.listenTo(this.searchResults, 'reset', this.update);

            this._searchKey = '';
            this._xhr_search = null; // Current search request
            this._search_timeout = null;
        },

        update: function (/*model, collection, options*/) {
            if (this.searchResults.length > 0)
                this.$('.dropdown').addClass('open');
            else
                this.$('.dropdown').removeClass('open');
        },

        render: function() {
            this.$el.html(SearchInputTemplate());
            this.renderSearchResults();
            return this;
        },

        renderSearchResults: function() {
            this.$('[data-model-search="form"]').append(
                this.searchResultsView.render().el);
        },

        search: function (e) {
            var self = this;
            //if (e.keyCode == 40) { // Down
            //    $('ul.dropdown-menu').find('a').first().focus();
            //} else if (e.keyCode == 38) { // Up
            //}

            var lastValue = this._searchKey;

            this._searchKey = $.trim($(e.currentTarget).val());
            if (this._searchKey.length === 0) {
                this.searchResults.reset();
                this.$('.dropdown').removeClass('open');
                return;
            }

            // Delay search by 1 second to elimnate excess ajax search requests
            // Only invoke search if the last and current search value is different
            //   and the current search value contains more than trailing spaces
            if (this._searchKey !== lastValue) {
                if (this._search_timeout) {
                    clearTimeout(this._search_timeout);
                }
                this._search_timeout = setTimeout(function () {

                    // If previous search request is pending, abort and re-fetch
                    if (self._xhr_search && self._xhr_search.state() === 'pending') {
                        self._xhr_search.abort();
                    }

                    self._xhr_search = self.searchResults.fetch({reset: true, data: 'search='+ self._searchKey});
                }, 400);
            }
        },

        onkeypress: function (e) {
            if (e.keyCode === 13) { // enter key pressed
                return false; // Prevent form submit
            }
        }

    });

});