define(function(require, exports, module) {

	var ListItemTemplate = require('tpl!templates/videos/list_item.jst');

    /**
     * ListItem class - Item view
     *
     * Extends the BaseClasses.View.ItemFadeIn class, which
     * extends the the Marionette.ItemView class.
     */
    return BaseClasses.View.ItemFadeIn.extend({
        tagName: 'tr',
        template: ListItemTemplate

        // events: {
        //     'mouseover td': 'hover'
        // },
        // hover: function(e) {
        //     $(e.currentTarget).tooltip();
        // }
    });

});