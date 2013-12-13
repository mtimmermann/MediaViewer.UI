define(function(require, exports, module) {

	var AboutTemplate = require('tpl!templates/about.jst');

    /**
     * About class - Item view
     *
     * Extends the BaseClasses.View.ItemFadeIn class, which
     * extends the the Marionette.ItemView class.
     */
    return BaseClasses.View.ItemFadeIn.extend({
        template: AboutTemplate
    });

});