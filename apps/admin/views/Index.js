define(function(require, exports, module) {

    var IndexTemplate = require('tpl!templates/index.jst');

    /**
     * Index class - Item view
     * Admin index page
     */
    return BaseClasses.ItemViewFadeIn.extend({

        tagName: 'div',
        className: 'admin-index',
        template: IndexTemplate,

    });

});