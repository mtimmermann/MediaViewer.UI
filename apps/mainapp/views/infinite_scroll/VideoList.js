define(function(require, exports, module) {

    var ContactListItemTemplate = require('tpl!templates/infinite_scroll/video_list_item.jst');

    /**
     * VideoList class - Item view
     */
    return Backbone.Marionette.ItemView.extend({

        tagName: 'div',
        className: 'video-list-infinite-scroll',

        initialize: function(options) {
            options = options || {};
            if (!options.collection) {
                throw (new Error('VideoList View: collection option is required'));
            }

            this._isLoading = false; // True if currently requesting a page

            var self = this;
            this._scrollListener = function(evt) {
                self._checkScroll();
            };
            window.addEventListener('scroll', this._scrollListener, false);

        },

        render: function() {
            var self = this;
            _.each(this.collection.models, function(model) {
                self.$el.append(ContactListItemTemplate(model.attributes));
            });

            // Fadein new section effect
            this.$('[data-video-list-inf-scroll="item"]').fadeIn(1500);

            // Fade in one at a time effect
            // var delay = 0,
            //     delayInc = 100;
            // _.each(this.$('[data-contact-list-inf-scroll="item"]'), function(item) {
            //     setTimeout(function() {
            //         $(item).fadeIn(1500);
            //     }, delay);
            //     delay += delayInc;
            // });

            return this;
        },

        _checkScroll: function() {
            if (this.collection.currentPage === this.collection.totalPages) {
                // Remove the scroll listener
                window.removeEventListener('scroll', this._scrollListener, false);
                return; // Disabled
            }

            var triggerPoint = 20; // 20px from the bottom
            if (!this._isLoading &&
                ($(window).scrollTop() + $(window).height() > $(document).height() - triggerPoint)) {
                    this._getNext();
            }
        },

        _getNext: function() {
            var self = this;

            // Save the current collection list perform page.
            //var currentList = _(this.collection.models).clone();
            this._isLoading = true;
            this.collection.nextPage({});
            this.collection.getCollection();

            $.when(this.collection.deferred.promise()).done(function () {
                // Reset the list with currentList + newList
                // var newList = _(self.collection.models).clone();
                // _.each(newList, function(model) {
                //     currentList.push(model);
                // });
                // self.collection.reset(currentList);
                self._isLoading = false;
                self.render();
            });
        }

    });

});