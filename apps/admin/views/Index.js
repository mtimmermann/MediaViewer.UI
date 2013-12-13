define(function(require, exports, module) {

    var IndexTemplate = require('tpl!templates/index.jst');

    /**
     * Index class - Item view
     * Admin index page
     *
     * Extends the BaseClasses.View.ItemFadeIn class, which
     * extends the the Marionette.ItemView class.
     */
    return BaseClasses.View.ItemFadeIn.extend({

        tagName: 'div',
        className: 'admin-index',
        template: IndexTemplate,

    });

});