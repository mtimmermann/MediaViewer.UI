var BaseClasses = BaseClasses || {};
BaseClasses.View = BaseClasses.View || {};

/**
 * BaseClasses.ItemViewFadeIn class
 *
 * Extends the Marionette.ItemView class. Adds fadein animation
 * using the ItemView onRender and onShow callbacks.
 */
BaseClasses.View.ItemFadeIn = Backbone.Marionette.ItemView.extend({

    onRender: function() {
        this.$el.hide();
    },

    onShow: function() {
        this.$el.fadeIn();
    }

});