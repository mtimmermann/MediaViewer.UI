var BaseClasses = BaseClasses || {};

/**
 * BaseClasses.RegionFadeIn class
 *
 * Extends the Marionette.Region class. Overrides the open method
 * to add a fade in / fade out animation.
 */
BaseClasses.RegionFadeIn = Backbone.Marionette.Region.extend({

    // initialize: function(options) {
    //     var options = options || {};
    //     if (!options.el) {
    //         throw (new Error('BaseClasses.RegionFadeIn: el option is required'));
    //     }
    //     this.el = options.el;
    // },

    open: function(view) {
        this.$el.hide();
        this.$el.html(view.el);
        this.$el.fadeIn();
    }

});