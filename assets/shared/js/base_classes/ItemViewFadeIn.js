var BaseClasses = BaseClasses || {};

/**
 * BaseClasses.ItemViewFadeIn class
 *
 * Extends the Marionette.ItemView class. Adds fadein animation
 * using the ItemView onRender and onShow callbacks.
 */
BaseClasses.ItemViewFadeIn = Backbone.Marionette.ItemView.extend({

    onRender: function() {
        this.$el.hide();
    },

    onShow: function() {
        this.$el.fadeIn();
    }

});