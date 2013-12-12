define(function(require, exports, module) {

	var ListItemTemplate = require('tpl!templates/videos/list_item.jst');

    /**
     * ListItem class - Item view
     */
    //return Backbone.Marionette.ItemView.extend({
    return BaseClasses.ItemViewFadeIn.extend({
        tagName: 'tr',
        template: ListItemTemplate
    });

});