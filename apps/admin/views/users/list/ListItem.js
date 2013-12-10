define(function(require, exports, module) {

	var ListItemTemplate = require('tpl!templates/users/list/list_item.jst');

    /**
     * ListItem class - Item view
     */
    //return Backbone.Marionette.ItemView.extend({
    return BaseClasses.ItemViewFadeIn.extend({
        tagName: 'li',
        className: 'thumbnail-container',
        template: ListItemTemplate
    });

});